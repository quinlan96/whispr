
export const up = (knex) => {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id')
			table.string('email')
			table.string('username')
			table.string('password')
			table.boolean('active').defaultsTo(true)
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('users')
};
