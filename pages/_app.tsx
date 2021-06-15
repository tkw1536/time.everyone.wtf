import 'xp.css';
import '../components/background/background.css';
import Head from 'next/head';
import Window from '../components/window';
import App from 'next/app';
import { withRouter } from 'next/router'

export class CustomApp extends App {
  private goHome = () => this.props.router.push('/');
  private goOverlap = () => this.props.router.push('/overlap/');

  render() {
    const { Component, pageProps } = this.props;
    return <div className="container">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Window title="time.everyone.wtf - All sorts of info about time" statusbar={<>
          <p className="status-bar-field">
            time.everyone.wtf - All sorts of info about time
          </p>
        </>}>
          <p>
            <button onClick={this.goHome}>Current Time</button>
            &nbsp;
            <button onClick={this.goOverlap}>Overlap</button>
          </p>
        </Window>
        <Component {...pageProps} />;
      </main>
    </div>
  }
}

export default withRouter(CustomApp);
