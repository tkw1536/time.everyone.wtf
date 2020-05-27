import * as React from 'react';

import moment from 'moment';
import 'moment-timezone';

export default class TimePicker extends React.Component<{current: string, onChange: (newFunction: string) => void}> {
    static timezones = moment.tz.names();
    private onChangeTime = ({target: {value}}: React.ChangeEvent<HTMLSelectElement>) => {
        const { onChange } = this.props;
        onChange(value);
    }
    render() {
        const { current } = this.props;
        return <select value={current} onChange={this.onChangeTime}>
            {TimePicker.timezones.map(tz => <option value={tz} key={tz}>{tz}</option>)}
        </select>;
    }
}