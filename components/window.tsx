import * as React from "react";

export default class Window extends React.Component<{title: string, statusbar?: React.ReactNode}> {
    render() {
        const {title, children, statusbar} = this.props;
        return <div className="window">
            <div className="title-bar">
                <div className="title-bar-text">{title}</div>
                <div className="title-bar-controls">
                    <button aria-label="Minimize"></button>
                    <button aria-label="Maximize"></button>
                    <button aria-label="Close"></button>
                </div>
            </div>
            <div className="window-body">{children}</div>
            {statusbar && <div className="status-bar">{statusbar}</div>}
      </div>;
    }
}