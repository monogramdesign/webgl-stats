//@ts-nocheck

export default isSupported

export interface DataType {
	status: string
	info: string
	gpuData: {
		renderer: string
		vendor: string
	}
}

/**
 * Test if a browser supporsts WebGL.
 */
function isSupported() {
	var canvas
	canvas = document.getElementById('glcanvas')
	var gl = canvas.getContext('experimental-webgl')

	const unmaskedInfo = getUnmaskedInfo(gl)
	const unmaskedRenderer = unmaskedInfo.renderer

	if (unmaskedRenderer.toUpperCase().includes('SwiftShader'.toUpperCase())) {
		// Swift Shader is a CPU based renderer, so we don't want to use it
		return {
			status: 'warning',
			info: 'CPU-based GPU renderer detected.',
			gpuData: unmaskedInfo
		}
	}

	if (!isBrowser()) {
		return {
			status: 'error',
			info: 'Not a Browser',
			gpuData: unmaskedInfo
		}
	}

	if (!isArrayBufferSupported()) {
		return {
			status: 'error',
			info: 'ArrayBuffer Not Supported',
			gpuData: unmaskedInfo
		}
	}

	if (!isWebGLSupported(true)) {
		return {
			status: 'warning',
			info: 'WebGL Not Supported',
			gpuData: unmaskedInfo
		}
	}

	return {
		status: 'success',
		info: 'WebGL Supported',
		gpuData: unmaskedInfo
	}
}

isSupported.webGLContextAttributes = {
	antialias: false,
	alpha: true,
	stencil: true,
	depth: true
}

function getWebGLContext(failIfMajorPerformanceCaveat) {
	var canvas = document.createElement('canvas')

	var attributes = Object.create(isSupported.webGLContextAttributes)
	attributes.failIfMajorPerformanceCaveat = failIfMajorPerformanceCaveat

	return (
		canvas.getContext('webgl', attributes) || canvas.getContext('experimental-webgl', attributes)
	)
}

function isWebGLSupported(failIfMajorPerformanceCaveat) {
	var gl = getWebGLContext(failIfMajorPerformanceCaveat)
	if (!gl) {
		return false
	}

	// Try compiling a shader and get its compile status. Some browsers like Brave block this API
	// to prevent fingerprinting. Unfortunately, this also means that Mapbox GL won't work.
	var shader
	try {
		shader = gl.createShader(gl.VERTEX_SHADER)
	} catch (e) {
		// some older browsers throw an exception that `createShader` is not defined
		// so handle this separately from the case where browsers block `createShader`
		// for security reasons
		return false
	}

	if (!shader || gl.isContextLost()) {
		return false
	}
	gl.shaderSource(shader, 'void main() {}')
	gl.compileShader(shader)
	return gl.getShaderParameter(shader, gl.COMPILE_STATUS) === true
}

function isBrowser() {
	return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function isArrayBufferSupported() {
	return ArrayBuffer.isView
}
function getUnmaskedInfo(gl) {
	var unMaskedInfo = {
		renderer: '',
		vendor: ''
	}

	var dbgRenderInfo = gl.getExtension('WEBGL_debug_renderer_info')
	if (dbgRenderInfo != null) {
		unMaskedInfo.renderer = gl.getParameter(dbgRenderInfo.UNMASKED_RENDERER_WEBGL)
		unMaskedInfo.vendor = gl.getParameter(dbgRenderInfo.UNMASKED_VENDOR_WEBGL)
	}

	return unMaskedInfo
}
