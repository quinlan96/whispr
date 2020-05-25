import { Schema, model } from 'mongoose'
import mongooseFuzzySearching from 'mongoose-fuzzy-searching'
import router from '../routes/api/upload'
import creatorSchema from './Creator'

const schema = Schema(
	{
		videoId: String,
		title: String,
		description: String,
		url: String,
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'Creator'
		}
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	},
)

schema
	.virtual('vineUrl')
	.get(function() {
		return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.mp4`
	})

schema
	.virtual('thumbnailUrl')
	.get(function() {
		return `${process.env.API_BASE}/static/vines/${this.videoId}/${this.videoId}.jpg`
	})

schema.plugin(mongooseFuzzySearching, {
	fields: ['title', 'description']
})

export default model('Vine', schema)
