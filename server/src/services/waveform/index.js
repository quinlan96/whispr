import AudioContext from 'web-audio-api'
import { TRACK_BARS } from '../../constants'

const generateWaveform = (file) => {
    const audioContext = getContext()

    return new Promise((resolve, reject) => {
        audioContext.decodeAudioData(file, (audioBuffer) => {
            const waveform = processBuffer(audioBuffer)

            resolve(normalizeWaveform(waveform))
        }, (e) => {
            reject(e)
        })
    })
}

const getContext = () => {
    return new AudioContext.AudioContext()
}

const processBuffer = (audioBuffer) => {
    const rawData = audioBuffer.getChannelData(0)
    const samples = TRACK_BARS
    const blockSize = Math.floor(rawData.length / samples)
    const filteredData = []

    for(let i = 0; i < samples; i++) {
        let blockStart = blockSize * i
        let sum = 0

        for(let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[blockStart + j])
		}

        filteredData.push(sum / blockSize)
	}

    return filteredData
}

const normalizeWaveform = (data) => {
    const multiplier = Math.pow(Math.max(...data), -1)

    return data.map(n => n * multiplier)
}

export {
    generateWaveform
}