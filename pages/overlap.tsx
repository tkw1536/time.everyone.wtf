import * as React from 'react';
import Head from 'next/head';

import moment from 'moment';
import 'moment-timezone';

import Overlap from '../components/parts/overlap';

export default class Home extends React.Component<{}, { timezone?: string }> {
    state: { timezone?: string } = {};
    componentDidMount() {
        this.setState({ timezone: moment.tz.guess() })
    }
    render() {
        return <>
            <Head>
                <title>Overlap</title>
            </Head>

            <main>
                <Overlap initial={moment.tz.guess()} />
            </main>
        </>;
    }
}
