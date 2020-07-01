require('dotenv').config({ path: '../../.env'})
import BASE_DIR from 'app-root-path'

export const JWT_SECRET = process.env.JWT_SECRET
export const API_BASE = process.env.API_BASE
export const DB_HOST = process.env.DB_HOST || '127.0.0.1'
export const DB_USERNAME = process.env.DB_USERNAME
export const DB_PASSWORD = process.env.DB_PASSWORD
export const DB_DATABASE = process.env.DB_DATABASE
export const STORAGE_DIR = BASE_DIR + '/storage/tracks'