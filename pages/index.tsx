import Head from 'next/head'
import Time from "../components/time"

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Time</title>
      </Head>

      <main>
        <Time />
      </main>
    </div>
  )
}
