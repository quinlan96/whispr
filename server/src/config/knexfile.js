import { DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '../constants'

module.exports = {
    client: 'postgres',
    connection: {
        user:       DB_USERNAME,
        password:   DB_PASSWORD,
        database:   DB_DATABASE,
		dateStrings: true,
		typeCase: (field, next) => {
			if(field.type == 'TINY' && field.length == 1) {
				return (field.string() == '1')
			}

			return next()
		}

    },
    migrations: {
        directory: '../migrations',
        tableName: 'knex_migrations'
    }
}