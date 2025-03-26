import * as React from 'react';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const ZonePicker = dynamic(() => import('../picker'), { ssr: false, loading: () => <select disabled><option>Loading</option></select> });

import Window from '../window';
import moment from "moment";

interface OverlapState {
    timespan1: TimeSpanWithZone;
    timespan2: TimeSpanWithZone;
    result?: OverlapResult;
    resultIndex: number;
}

interface OverlapResult {
    zone1Offset: number;
    zone2Offset: number;
    difference: number;

    overlapInZone1: Array<TimeSpan>,
    overlapInZone2: Array<TimeSpan>,
}


interface TimeSpanWithZone extends TimeSpan {
    timezone: string;
}

interface TimeSpan {
    start: [number, number];
    end: [number, number];
}

function pair2Time(time: [number, number]): number {
    return time[0] * 60 + time[1];
}

function time2Pair(time: number): [number, number] {
    const minutes = time % 60;
    const hours = (time - minutes) / 60;
    return [hours, minutes];
}

const ONE_DAY_IN_SECONDS = 24 * 60;

function computeOverlap(timespan1: TimeSpanWithZone, timespan2: TimeSpanWithZone): OverlapResult {
    const zone1Offset = moment.tz(timespan1.timezone).utcOffset();
    const zone2Offset = moment.tz(timespan2.timezone).utcOffset();

    // compute start + end in timezone1
    const zone1Start = pair2Time(timespan1.start);
    const zone1End = pair2Time(timespan1.end);

    // compute start + end in timezone2, normalized to zone1
    const delta = zone1Offset - zone2Offset;
    const zone2Start = (pair2Time(timespan2.start) + delta + ONE_DAY_IN_SECONDS) % ONE_DAY_IN_SECONDS;
    const zone2End = (pair2Time(timespan2.end) + delta + ONE_DAY_IN_SECONDS) % ONE_DAY_IN_SECONDS;

    const zone1OverlapsT = overlap(zone1Start, zone1End, zone2Start, zone2End, ONE_DAY_IN_SECONDS);
    const zone2OverlapsT = zone1OverlapsT.map(({start: tStart, end: tEnd}) => ({
        start: (tStart - delta + ONE_DAY_IN_SECONDS) % ONE_DAY_IN_SECONDS,
        end: (tEnd -delta + ONE_DAY_IN_SECONDS) % ONE_DAY_IN_SECONDS,
    }));

    const overlapInZone1 = zone1OverlapsT.map(({start, end}) => ({start: time2Pair(start), end: time2Pair(end)}));
    const overlapInZone2 = zone2OverlapsT.map(({start, end}) => ({start: time2Pair(start), end: time2Pair(end)}));

    const result: OverlapResult = {
        zone1Offset,
        zone2Offset,
        difference: delta,

        overlapInZone1,
        overlapInZone2,
    }

    return result;
}

// overlap computes the overlap of two intervals. 
// only overlap2 may wrap around. 
function overlap(start1: number, end1: number, start2: number, end2: number, mod: number): Array<{start: number, end: number}> {
    // interval 2 does not wrap around, and we can just compute a simple overlap
    if (start2 <= end2 ) {
        return overlapSimple(start1, end1, start2, end2);
    }

    // interval1 does an overlap
    const overlapA = overlapSimple(start1, end1, start2, mod - 1);
    const overlapB = overlapSimple(start1, end1, 0, end2);
    return [...overlapA, ...overlapB];
}

// overlap computes the simple overlap of non-wrapping intervals
function overlapSimple(start1: number, end1: number, start2: number, end2: number): Array<{start: number, end: number}> {
    if (start1 <= start2) {
        if (end1 >= start2) {
            return [{start: start2, end: Math.min(end1, end2)}];
        } else {
            return [];
        }
    } else {
        if (end2 >= start1) {
            return [{start: start1, end: Math.min(end1, end2)}];
        } else {
            return []; 
        }
    }
}

export default class Overlap extends React.Component<{ initial: string }, OverlapState> {
    private onChangeSpan1 = (span: TimeSpanWithZone) => this.setState({ timespan1: span }, this.updateResult);
    private onChangeSpan2 = (span: TimeSpanWithZone) => this.setState({ timespan2: span }, this.updateResult);
    private updateResult = () => {
        const { timespan1, timespan2 } = this.state;
        const result = computeOverlap(timespan1, timespan2);
        this.setState({ result });
    }
    private resetZone1 = () => this.setState({
        timespan1: {
            timezone: this.props.initial,
            start: [0, 0],
            end: [23, 59],
        }
    });
    private resetZone2 = () => this.setState({
        timespan2: {
            timezone: this.props.initial,
            start: [0, 0],
            end: [23, 59],
        }
    });

    private handleResultTabChange = (index: number) => {
        this.setState({ resultIndex: index });
    }

    componentDidMount() {
        this.updateResult();
    }

    state: OverlapState = {
        timespan1: {
            timezone: this.props.initial,
            start: [0, 0],
            end: [23, 59],
        },
        timespan2: {
            timezone: this.props.initial,
            start: [0, 0],
            end: [23, 59],
        },
        resultIndex: 0,
    }
    render() {
        const { timespan1, timespan2, result, resultIndex } = this.state;

        return <>
            <Window title="Overlap">
                <p>
                    Use this page to compute the overlap of two timespans in different timezones.
                </p>
                <p>
                    First select the timezones and timespans for both timezones in the two windows below.
                    Then observe the result in the window below.
                </p>
            </Window>

            <Window title="Timespan 1">
                <TimespanPicker state={timespan1} onChange={this.onChangeSpan1} onReset={this.resetZone1} />
            </Window>

            <Window title="Timespan 2">
                <TimespanPicker state={timespan2} onChange={this.onChangeSpan2} onReset={this.resetZone2} />
            </Window>

            <Window title="Result">
                <XPTab activeIndex={resultIndex} onChange={this.handleResultTabChange}>{[
                    { title: timespan1.timezone, child: <>{result ? <RenderOverlap  zone1={timespan1.timezone} zone2={timespan2.timezone} difference={result.difference} overlap={result.overlapInZone1} /> : ""}</> },
                    { title: timespan2.timezone, child: <>{result ? <RenderOverlap  zone1={timespan2.timezone} zone2={timespan1.timezone} difference={-result.difference} overlap={result.overlapInZone2} /> : ""}</> }
                ]}</XPTab>
            </Window>
        </>
    }
}


interface TimeZonePickerProps {
    state: TimeSpanWithZone,
    onChange: (state: TimeSpanWithZone) => void
    onReset: () => void
}
class TimespanPicker extends React.Component<TimeZonePickerProps> {
    private handleTimezoneChange = (timezone: string) => {
        const { state: { start, end }, onChange } = this.props;
        onChange({ start, end, timezone });
    }

    private handleStartChange = (hours: number, minutes: number) => {
        const { state: { end: _end, timezone }, onChange } = this.props;

        const end: [number, number] = [_end[0], _end[1]];
        if (hours > end[0] || (hours == end[0] && minutes > end[1])) {
            end[0] = hours
            end[1] = minutes
        }

        onChange({ end, start: [hours, minutes], timezone });
    }

    private handleEndChange = (hours: number, minutes: number) => {
        const { state: { start: _start, timezone }, onChange } = this.props;

        const start: [number, number] = [_start[0], _start[1]];
        if (hours < start[0] || (hours == start[0] && minutes < start[1])) {
            start[0] = hours
            start[1] = minutes
        }

        onChange({ start, end: [hours, minutes], timezone });
    }

    render() {
        const { state: { timezone, start, end }, onReset } = this.props;
        return <>
            <div className="field-row">
                <label>Timezone</label>
                <ZonePicker current={timezone} onChange={this.handleTimezoneChange} />
                <button onClick={onReset} >Reset</button>
            </div>
            <div className="field-row">
                <TimePicker hours={start[0]} minutes={start[1]} onChange={this.handleStartChange} />
                &nbsp;
                -
                <TimePicker hours={end[0]} minutes={end[1]} onChange={this.handleEndChange} />
            </div>
        </>
    }
}

interface TimePickerProps {
    hours: number;
    minutes: number;
    onChange?: (hours: number, minutes: number) => void;
}

class TimePicker extends React.Component<TimePickerProps> {
    private changeMinutes = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { hours, onChange } = this.props;
        if (!onChange) return;

        const minutes = parseInt(event.target.value, 10);
        onChange(hours, minutes);
    }
    private changeHours = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { minutes, onChange } = this.props;
        if (!onChange) return;

        const hours = parseInt(event.target.value, 10);
        onChange(hours, minutes);
    }
    private hours = Array.from(Array(24).keys());
    private minutes = Array.from(Array(60).keys());
    render() {
        const { hours, minutes } = this.props;

        return <>
            <select onChange={this.changeHours} value={hours.toString()}>
                {this.hours.map(value => <option key={value.toString()} value={value.toString()}>{pad(value, 2)}</option>)}
            </select>
            &nbsp;:
            <select onChange={this.changeMinutes} value={minutes.toString()}>
                {this.minutes.map(value => <option key={value.toString()} value={value.toString()}>{pad(value, 2)}</option>)}
            </select>
        </>
    }
}

interface XPTabProps {
    activeIndex: number;
    children: Array<{ title: string; child: React.ReactNode }>;
    onChange: (index: number) => void;
}

class XPTab extends React.Component<XPTabProps> {
    render() {
        const { activeIndex, children, onChange } = this.props;

        return <>
            <menu role="tablist">
                {children.map(({ title }, index) => <button
                    aria-selected={activeIndex === index ? "true" : undefined}
                    key={index}
                    onClick={onChange.bind(this, index)}
                >
                    {title}
                </button>
                )}
            </menu>

            {children.map(({ child }, index) => <article
                role="tabpanel"
                hidden={activeIndex !== index}
                key={index}
            >
                {child}
            </article>
            )}
        </>;
    }
}

interface OverlapProps {
    zone1: string;
    zone2: string;
    difference: number;
    overlap: Array<TimeSpan>
}

class RenderOverlap extends React.Component<OverlapProps>{
    render() {
        const { zone1, zone2, difference, overlap} = this.props;

        const absDiff = Math.abs(difference);
        const overlapCount = overlap.length;
        return <>
            <p>
                <b>{zone1}</b> is {absDiff} minute{absDiff != 1 ? "s" : ""} {difference > 0 ? "ahead of" : "behind"} <b>{zone2}</b>.
            </p>
            <p>
                There {overlapCount == 1 ? "is" : "are"} <b>{overlapCount}</b> overlap{overlapCount != 1 ? "s" : ""} between the provided timespans. 
            </p>
            {overlap.map(({start, end}, index) => <p key={index}>
                {pad(start[0], 2)}:{pad(start[1], 2)} - {pad(end[0], 2)}:{pad(end[1], 2)}
            </p>)}
        </>
    }
}

function pad(num: number, size: number): string {
    let theNum = num.toString();
    while (theNum.length < size) theNum = "0" + num;
    return theNum;
}