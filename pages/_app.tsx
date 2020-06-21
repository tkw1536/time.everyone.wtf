import 'xp.css';
import '../components/background/background.css';

export default function MyApp({ Component, pageProps }) {
    return (<>
    <Component {...pageProps} />
      <small style={{
        "color": "white",
        "position": "absolute",
        "marginBottom": 5,
        "marginRight": 5,
        bottom: 0,
        right: 0,
      }}>
        For legal reasons I must also link <a href="https://inform.everyone.wtf/" target="_blank" style={{color: 'blue'}}>my Privacy Policy and Imprint</a>.
      </small>
    </>);
  }
  