require('dotenv').config({ path: '../../.env'})

export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE