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
		<section
			className={`section h-full flex flex-col items-center justify-center text-center ${
				status === 'success' ? 'bg-green-500 text-white' : 'bg-gray-200'
			}`}
		>
			<div className="container mx-auto">
				<h1 className="text-4xl font-semibold mb-8">WebGL Status/Debug</h1>
				<p className="text-lg">Metadata: {metadata}</p>
			</div>
		</section>
	)
}

export default Home
