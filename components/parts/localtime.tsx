import * as React from 'react';

// the rendering of these components is dependent on client-side state
// so we dynamically render them without SSR, fixing and potential issues
import dynamic from 'next/dynamic';
const Time = dynamic(() => import('../time'), {ssr: false, loading: () => <>&nbsp;</>});
const TimePicker = dynamic(() => import('../picker'), {ssr: false, loading: () => <select disabled><option>Loading</option></select>});

export default class LocalTime extends React.Component<{timezone: string, isAutoZone: boolean, onChange: (newTimeZone: string) => void, onReset: () => void}> {
    render() {
      const {timezone, isAutoZone, onChange, onReset} = this.props;
  
      return <div>
        <h1>Local Time</h1>
        <p>
          The current time in <TimePicker current={timezone} onChange={onChange} /> is:
        </p>
        <Time timezone={timezone} format="YYYY-MM-DD[T]HH:mm:ss.SSSZZ" />
        <p>
          <button onClick={onReset}>Reset Timezone</button>
        </p>
      </div>
    }
  }
  