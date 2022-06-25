import Document, { Html, Head, Main, NextScript } from 'next/document'

import { portalId } from '~/utils/config'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id={portalId} />
          <NextScript />
        </body>
      </Html>
    )
  }
}
