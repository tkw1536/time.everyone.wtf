import * as React from "react";
import { GetStaticPaths, GetStaticProps } from 'next';
import { withRouter, Router } from 'next/router'

import AnywhereOnEarth from '../../components/parts/anywhere';
import UTCTime from '../../components/parts/utc';
import LocalTime from '../../components/parts/localtime';

import moment from 'moment';
import 'moment-timezone';

import Head from 'next/head';

interface ZoneProps {
    timezone: string;
    isAutoZone: boolean;
    router: Router
}

class ZonePage extends React.Component<ZoneProps> {
    private goHome = () => this.props.router.push('/');
    private goTz = (tz: string) => this.props.router.push(`/tz/${tz}`);

    render() {
        const { timezone } = this.props;
        return <>
            <Head>
                <title>Time in {timezone}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            
            <LocalTime timezone={timezone} onChange={this.goTz} onReset={this.goHome} />
            <UTCTime timezone={timezone} />
            <AnywhereOnEarth timezone={timezone} />
        </>;
    }
}
export default withRouter(ZonePage);

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