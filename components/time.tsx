import * as React from 'react';

import moment, { Moment } from 'moment';
import 'moment-timezone';

interface TimeState {
    time: Moment,
}

export default class Time extends React.Component<{updateInterval?: number, offset?: number, timezone?: string, format?: string}, TimeState> {
    state: TimeState = {
        time: moment()
    };
    private interval: NodeJS.Timeout | null = null;
    componentDidMount() {
        this.interval = setInterval(this.updateTime.bind(this));
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    private updateTime() {
        this.setState({time: moment()});
    }

    render() {
        return <fieldset>{this.renderInner()}</fieldset>;
    }

    renderInner() {
        const {time} = this.state;
        if (time === undefined) return "";
        const { format, offset, timezone } = this.props;
        
        // set the time to the right timezone or offset
        let timeFormat;
        if (timezone !== undefined) {
            timeFormat = time.tz(timezone);
        } else if (offset !== undefined) {
            timeFormat = time.utcOffset(offset);
        } else {
            timeFormat = time.utc();
        }

        // and format it
        if (format === undefined)
            return timeFormat.toISOString();
        
        return timeFormat.format(format);
    }
}