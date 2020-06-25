import crypto from 'crypto'

const SALT_LENGTH = 8

const hash = async (password) => {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(SALT_LENGTH)

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err)
            }

            resolve(salt + ':' + derivedKey.toString('hex'))
        })
    })
}

const verify = async (password, hash) => {
    return new Promise((resolve, reject) => {
        const [salt, key] = hash.split(':')

        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err)
            }

            resolve(key == derivedKey.toString('hex'))
        })
    })
}