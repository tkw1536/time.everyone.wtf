import * as React from 'react';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const Time = dynamic(() => import('../time'), {ssr: false, loading: () => <fieldset>&nbsp;</fieldset>});
const AnywhereOnEarthStart = dynamic(() => import('./anywhere_start'), {ssr: false, loading: () => <>&nbsp;</>});

import Window  from '../window';

export default class AnywhereOnEarth extends React.Component<{timezone: string}> {
    render() {
        const {timezone} = this.props;

      return <Window title="Anywhere On Earth">
        <p>
          Anywhere on Earth is a timezone commonly used for deadlines.
          It usuallly includes only a date, not a time.
          As long as the day is correct (no matter way you are), you are within the deadline.
        </p>
  
        <p>
          The current date in <b>Anywhere On Earth</b> is:
        </p>
  
        <Time offset={-12} format='LL' />

        <p>
            In your timezone, a new <b>Anywhere On Earth</b> day starts at <AnywhereOnEarthStart timezone={timezone} /> localtime. 
        </p>
      </Window>;
    }
  }