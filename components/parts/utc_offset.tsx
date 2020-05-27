import * as React from 'react';

import moment from 'moment';
import 'moment-timezone';

export default class UTCOffset extends React.Component<{timezone: string}> {
    render() {

        // get the offset of the given zone
        const {timezone} = this.props;
        const offset = moment().tz(timezone).utcOffset();

        // bail out if we have UTC
        if (offset === 0) return <>in sync with</>;

        // compute before / after
        const preposition = (offset < 0) ? 'behind' : 'ahead of';
        
        let minutes = Math.abs(offset);
        const hours = Math.floor(minutes / 60);
        minutes -= hours * 60;

        if (minutes === 0) return <>{hours} hours {preposition}</>;
        return <>{hours} hours and {minutes} minutes {preposition}</>;
    }
}