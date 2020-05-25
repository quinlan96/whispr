import fs from 'fs'
import fetch from 'node-fetch'
import youtubedl from 'youtube-dl'
import { exec } from 'child_process'
import { promisify } from 'util'

const execPromise = promisify(exec);

const fetchVine =  async (vineId, videoUrl, vineJson, type = 'vine') => {
	const vineDir = `${process.env.DATA_DIR}/vines/${vineId}`

	if(!fs.existsSync(vineDir)) {
		fs.mkdirSync(vineDir)
	}

	if(vineJson) {
		if(!fs.existsSync(`${vineDir}/${vineId}.json`)) {
			fs.writeFileSync(`${vineDir}/${vineId}.json`, JSON.stringify(vineJson, null, 4))
		}
	}

	if(!fs.existsSync(`${vineDir}/${vineId}.mp4`)) {
		await download(videoUrl, `${vineDir}/${vineId}.mp4`, type)
	}

	if(!fs.existsSync(`${vineDir}/${vineId}.png`)) {
		await execPromise(`ffmpeg -i ${vineDir}/${vineId}.mp4 -ss 0 -s 500x500 -vframes 1 ${vineDir}/${vineId}.png`)
	}

	if(!fs.existsSync(`${vineDir}/${vineId}.jpg`)) {
		await execPromise(`convert ${vineDir}/${vineId}.png -quality 90 ${vineDir}/${vineId}.jpg`)
	}
}

const fetchCreator =  async (creatorId, creatorJson) => {
	const creatorDir = `${process.env.DATA_DIR}/creators/${creatorId}`

	if(!fs.existsSync(creatorDir)) {
		fs.mkdirSync(creatorDir)
	}

	if(!fs.existsSync(`${creatorDir}/${creatorId}.json`)) {
		fs.writeFileSync(`${creatorDir}/${creatorId}.json`, JSON.stringify(creatorJson, null, 4))
	}
}

const download = async (vine, path, type) => {
	switch(type) {
		case 'vine':
			await downloadVine(vine, path)
			break
		case 'youtube':
			await downloadYoutube(vine, path)
			break
		case 'video':
			await downloadVideo(vine, path)
	}
}

const downloadVine = async (url, path) => {
	const res = await fetch(url);

	await new Promise((resolve, reject) => {
		const fileStream = fs.createWriteStream(path);

		res.body.pipe(fileStream);
		res.body.on("error", (err) => {
			reject(err);
		});

		fileStream.on("finish", function() {
			resolve();
		});	
	})
}

const downloadYoutube = async (url, path) => {
	const video = youtubedl(url, ['--format=best'], {})


	await new Promise((resolve, reject) => {
		video.on('end', (info) => {
			resolve("Video finished downloading")
		})

		video.pipe(fs.createWriteStream(path))
	})

	await autoScale(path)
}

const downloadVideo = async (file, path) => {
	const rawVideo = decodeURIComponent(escape(Buffer.from(file, 'base64').toString('binary')))

	fs.writeFileSync(path, rawVideo, 'binary')

	await autoScale(path)
}

const autoScale = async (path) => {
	const ratioCmd = await execPromise(`ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 ${path}`)

	const [height, width] = ratioCmd.stdout.trim().split('x')

	const ratio = height / width

	if(ratio != 1) {
		const cropCmd = await execPromise(`ffmpeg -i ${path} -t 1 -vf cropdetect -f null - 2>&1 | awk '/crop/ { print $NF }' | tail -1`)

		const crop = cropCmd.stdout.trim()

		const tmp = path.slice(0, -15) + 'tmp.mp4'

		await execPromise(`ffmpeg -i ${path} -vf ${crop} -y ${tmp}`)

		fs.renameSync(tmp, path)
	}
}

export {
	fetchVine,
	fetchCreator,
}