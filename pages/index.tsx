import * as React from 'react';
import ZonePage from './zone/[...zone]';

import moment from 'moment';
import 'moment-timezone';

export default class Home extends React.Component<{}, {timezone?: string}> {
  state: {timezone?: string} = {};
  componentDidMount() {
    this.setState({ timezone: moment.tz.guess() })
  }
  render() {
    const { timezone } = this.state;
    if (timezone === undefined) return "";

    return <ZonePage timezone={timezone} isAutoZone={true} />
  }
}
