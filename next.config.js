module.exports = {
	reactStrictMode: true,

	webpack: (config, { dev, isServer }) => {
		if (!isServer && !dev) {
			// Compile to Preact at build time - reduces bundle size by ~30kb
			Object.assign(config.resolve.alias, {
				react: 'preact/compat',
				'react-dom/test-utils': 'preact/test-utils',
				'react-dom': 'preact/compat'
			})
		}

		return config
	}
}
