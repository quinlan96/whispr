
export const up = (knex) => {
    return knex.schema
        .createTable('roles', (table) => {
            table.increments('id')
            table.string('name')
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('roles')
};
