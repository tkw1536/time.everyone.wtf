import * as React from 'react';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const Time = dynamic(() => import('../time'), {ssr: false, loading: () => <>&nbsp;</>});
const UTCOffset = dynamic(() => import('./utc_offset'), {ssr: false, loading: () => <>&nbsp;</>});

export default class UTCTime extends React.Component<{timezone: string}> {
    render() {
      const {timezone} = this.props;
      return <div>
        <h1>UTC</h1>
        <p>
          Coordinated Universal Time is a global time standard that all other timezones are based off. 
        </p>
        <p>
          You current timezone is <UTCOffset timezone={timezone}/> UTC.
        </p>
        <p>
          The current time in <code>UTC</code> is:
        </p>
        <Time />
      </div>
    }
  }
  
  