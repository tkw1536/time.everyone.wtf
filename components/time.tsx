import * as React from 'react';

interface TimeState {
    time?: Date
}

export default class Time extends React.Component<{updateInterval?: number}, TimeState> {
    state: TimeState = {};
    private interval: number | null = null;
    componentDidMount() {
        this.updateTime();
        this.interval = setInterval(this.updateTime.bind(this));
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }

    private updateTime() {
        this.setState({time: new Date()});
    }

    render() {
        const {time} = this.state;
        if (time === undefined) return "";
        return time.toISOString();
    }
}