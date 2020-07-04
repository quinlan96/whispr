import crypto from 'crypto'
import ApiError from '../../utils/errors/ApiError'

const SALT_LENGTH = 8

const validatePasswords = (password1, password2) => {
    if(password1 !== password2) {
        throw new ApiError(400, 'Passwords do not match')
    }

    return password1
}

const hash = async (password) => {
    return new Promise((resolve, reject) => {
		const salt = crypto.randomBytes(SALT_LENGTH)
		
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err)
			}
			
            resolve(salt.toString('hex') + ':' + derivedKey.toString('hex'))
        })
    })
}

const verify = async (password, hash) => {
    return new Promise((resolve, reject) => {
		const [salt, key] = hash.split(':')

        crypto.scrypt(password, Buffer.from(salt, 'hex'), 64, (err, derivedKey) => {
            if(err) {
                reject(err)
			}

            resolve(key == derivedKey.toString('hex'))
        })
    })
}

export {
	hash,
    verify,
    validatePasswords
}