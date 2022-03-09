import type { AppProps } from 'next/app'

import MainLayout from '@/layouts/MainLayout'

import '@/styles/global.scss'
import Head from 'next/head'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<MainLayout>
			<Head>
				<title>WebGL Stats</title>
			</Head>
			<Component {...pageProps} />
		</MainLayout>
	)
}

export default App
