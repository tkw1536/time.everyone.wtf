import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

const trackingCode = "UA-159220391-12";
const analyticsURL = "https://www.googletagmanager.com/gtag/js?id=" + trackingCode;
const analyticsCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ${JSON.stringify(trackingCode)});
`.replace(/\s+/g, ' ');

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script async src={analyticsURL}></script>
          <script dangerouslySetInnerHTML={{__html: analyticsCode}} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
};
