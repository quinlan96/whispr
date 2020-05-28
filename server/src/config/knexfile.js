import { DB_USERNAME, DB_PASSWORD, DB_DATABASE } from '../constants'

module.exports = {
    client: 'postgres',
    connection: {
        user:       DB_USERNAME,
        password:   DB_PASSWORD,
        database:   DB_DATABASE,
        dateStrings: true

    },
    migrations: {
        directory: '../migrations',
        tableName: 'knex_migrations'
    }
}