import * as React from 'react';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const Time = dynamic(() => import('../time'), {ssr: false, loading: () => <fieldset>&nbsp;</fieldset>});
const UTCOffset = dynamic(() => import('./utc_offset'), {ssr: false, loading: () => <>&nbsp;</>});

import Window from '../window';

export default class UTCTime extends React.Component<{timezone: string}> {
    render() {
      const {timezone} = this.props;
      return <Window title='UTC'>
        <p>
          <b>Coordinated Universal Time</b> is a global time standard that all other timezones are defined relative to. 
        </p>
        <p>
          Your current timezone is <b><UTCOffset timezone={timezone}/></b> UTC.
        </p>
        <p>
          The current time in <b>UTC</b> is:
        </p>
        <Time />
      </Window>
    }
  }
  
  