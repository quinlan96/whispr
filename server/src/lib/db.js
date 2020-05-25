/**
 * @file Initialises the MongoDB connection.
 */

import mongoose from 'mongoose'

const uri = process.env.MONGODB_CONNECTION_STRING

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	authSource: 'admin'
}

export default function connect() {
	return mongoose.connect(uri, options)
}
