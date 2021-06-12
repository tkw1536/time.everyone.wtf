import * as React from "react";
import { GetStaticPaths, GetStaticProps } from 'next';
import { withRouter, default as Router } from 'next/router'

import AnywhereOnEarth from '../../components/parts/anywhere';
import UTCTime from '../../components/parts/utc';
import LocalTime from '../../components/parts/localtime';

import moment from 'moment';
import 'moment-timezone';

import Head from 'next/head';

interface ZoneProps {
    timezone: string;
    isAutoZone: boolean;
}

export default class ZonePage extends React.Component<ZoneProps> {
    private changeTimeZone = (newZone: string) => {
        Router.push(`/zone/${newZone}`);
    }

    private resetTimeZone = () => {
        Router.push('/');
    }

    render() {
        const { timezone, isAutoZone } = this.props;
        return <div className="container">
            <Head>
                <title>Time</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <AnywhereOnEarth timezone={timezone} />
                <UTCTime timezone={timezone} />
                <LocalTime timezone={timezone} onChange={this.changeTimeZone} onReset={this.resetTimeZone} />
            </main>
        </div>;
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const timezone = (context.params!.zone as string[]).join("/");
    return {
        props: {
            timezone,
            isAutoZone: false,
        }
    };
}

export const getStaticPaths: GetStaticPaths = async () => {
    const classes = moment.tz.names().map(c => ({ params: { zone: c.split("/") } }));
    return {
        paths: classes,
        fallback: false,
    };
}