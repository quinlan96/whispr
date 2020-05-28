
export const up = (knex) => {
    return knex.schema
        .createTable('users', (table) => {
            table.increments('id')
            table.string('username')
            table.string('password')
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('users')
};
