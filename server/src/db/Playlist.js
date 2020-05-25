import { Schema, model } from 'mongoose'

const schema = Schema(
	{
		name: String,
		vines: [Schema.Types.ObjectId]
	},
	{
		timestamps: true
	}
)

export default model('Playlist', schema)
