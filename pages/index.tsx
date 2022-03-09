import isSupported, { DataType } from '@/lib/index'
import { useEffect, useState } from 'react'

const Home = () => {
	const [data, setData] = useState<DataType | null>(null)

	useEffect(() => {
		const supportedData = isSupported()
		console.log(supportedData)

		async function loadThree() {
			const showDemo = (await import('@/lib/demo')).default
			showDemo()
		}

		if (supportedData.status === 'success') {
			loadThree()
		}

		setData(supportedData)
	}, [])

	return (
		<section
			className={`section h-full flex flex-col items-center justify-center text-center ${
				data?.status === 'success' ? 'bg-green-500 text-white' : 'bg-gray-200'
			}`}>
			<div className="container mx-auto z-10">
				<h1 className="text-4xl font-semibold mb-8">{data?.info}</h1>
				<p className="text-lg">
					<p>{data?.gpuData.renderer}</p>
					<p>{data?.gpuData.vendor}</p>
					<p className="hidden" id="motion-reduce-text">
						Prefers Reduced Motion
					</p>
				</p>
			</div>

			{/* Canvas that's used to check if WebGL is supported */}
			<canvas id="glcanvas" width={0} height={0}></canvas>
			<div className="absolute w-full h-full" id="canvas-div"></div>
		</section>
	)
}

export default Home
