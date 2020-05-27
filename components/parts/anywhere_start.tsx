import * as React from 'react';

import moment from 'moment';
import 'moment-timezone';

export default class AnywhereOnEarthStart extends React.Component<{timezone: string}> {
    render() {
        const {timezone} = this.props;
        const dayStart = moment().utcOffset(-12).startOf('day').tz(timezone).format('HH:mm');

        return <>{dayStart}</>;
    }
}