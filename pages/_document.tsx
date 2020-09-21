import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          <footer style={{position: 'fixed', right: 10, bottom: 10, color: 'white'}}>
            <script src="https://inform.everyone.wtf/legal.min.js" data-site-id="34f5e459-f24f-48a3-b100-a70417f25536"></script>
          </footer>
        </body>
      </Html>
    )
  }
};
