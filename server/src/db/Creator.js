import { Schema, model, Mongoose } from 'mongoose'
import fs from 'fs'

const schema = Schema(
	{
		creatorId: String,
		username: String,
		url: String
	},
	{
		timestamps: true,
		toObject: {
			virtuals: true
		},
		toJSON: {
			virtuals: true
		}
	}
)

schema
	.virtual('vines', {
		ref: 'Vine',
		localField: '_id',
		foreignField: 'creator',
	})

schema
	.virtual('thumbnailUrl')
	.get(function() {
		if(fs.existsSync(`${process.env.DATA_DIR}/creators/${this.creatorId}/${this.creatorId}.jpg`)) {
			return `${process.env.API_BASE}/static/creators/${this.creatorId}/${this.creatorId}.jpg`
		}

		return null
	})

export default model('Creator', schema)
