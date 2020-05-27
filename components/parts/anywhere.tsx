import * as React from 'react';

import moment from 'moment';
import 'moment-timezone';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const Time = dynamic(() => import('../time'), {ssr: false, loading: () => <>&nbsp;</>});
const AnywhereOnEarthStart = dynamic(() => import('./anywhere_start'), {ssr: false, loading: () => <>&nbsp;</>});

export default class AnywhereOnEarth extends React.Component<{timezone: string}> {
    render() {
        const {timezone} = this.props;
        const aoetime = moment().utcOffset(-12).startOf('day').tz(timezone).format('HH:mm');

      return <div>
        <h1>Anywhere On Earth</h1>
        <p>
          Anywhere on Earth is a timezone commonly used for deadlines.
          It usuallly includes only a date, not a time.
          As long as the day is correct (no matter way you are), you are within the deadline.
        </p>
  
        <p>
          The current date in <code>Anywhere On Earth</code> is:
        </p>
  
        <Time offset={-12} format='LL' />

        <p>
            In your timezone, a new <code>Anywhere On Earth</code> day starts at <AnywhereOnEarthStart timezone={timezone} /> localtime. 
        </p>
      </div>;
    }
  }