import isSupported from '@/lib/index'
import { useEffect, useState } from 'react'

const Home = () => {
	const [status, setStatus] = useState<string | null>(null)
	const [metadata, setMetadata] = useState<string | null>(null)

	useEffect(() => {
		const supportedData = isSupported()

		// setStatus()
		// setMetadata(supportedData.metadata)
	}, [])

	return (
		<section className="container bg-[#141F2B] h-screen py-20 space-y-2 flex flex-col items-center text-white">
			<h1 className="text-xl font-semibold">Monogram</h1>
			<p className="text-lg">Next UI</p>
		</section>
	)
}

export default Home
