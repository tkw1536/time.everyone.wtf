import * as React from 'react';

import Head from 'next/head';

import moment from 'moment';
import 'moment-timezone';

import AnywhereOnEarth from '../components/parts/anywhere';
import UTCTime from '../components/parts/utc';
import LocalTime from '../components/parts/localtime';

const ALL_ZONES = moment.tz.names();

interface PageState {
  timezone: string;
  isAutoZone: boolean;
}

export default class Home extends React.Component<{}, PageState> {
  // getter and setter for location.hash
  // because we cannot set this on the server side

  private get hash(): string {
    if(!process.browser) return "";
    return location.hash.substring(1);
  }
  private set hash(newHash: string) {
    if(!process.browser) return;
    location.hash = newHash;
  }

  state: PageState = (() => {
    // get the hash and check if it is a valid timezone;
    if (ALL_ZONES.indexOf(this.hash) !== -1) {
      return {
        timezone: this.hash,
        isAutoZone: false,
      }
    }

    // if it isn't use the guessed zone
    this.hash = '';
    return {
      timezone: moment.tz.guess(),
      isAutoZone: true,
    };
  })();

  private changeTimeZone = (newZone: string) => {
    // check that it's a valid timezone
    if (ALL_ZONES.indexOf(newZone) === -1) return;

    // set it in state and the hash
    this.hash = newZone;
    this.setState({
      timezone: newZone,
      isAutoZone: false,
    })
  }

  private resetTimeZone = () => {
    // reset the current time zone
    this.hash = '';
    this.setState({
      timezone: moment.tz.guess(),
      isAutoZone: true,
    });
  }

  render() {
    const {timezone, isAutoZone} = this.state;
    return <div className="container">
      <Head>
        <title>Time</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <AnywhereOnEarth timezone={timezone} />
        <UTCTime timezone={timezone} />
        <LocalTime timezone={timezone} isAutoZone={isAutoZone} onChange={this.changeTimeZone} onReset={this.resetTimeZone} />
      </main>
    </div>;
  }
}
