
export const up = (knex) => {
    return knex.schema
        .createTable('tracks', (table) => {
            table.increments('id')
            table.integer('user_id')
            table.string('title').nullable()
            table.float('duration').nullable()
            table.string('file').nullable()
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('tracks')
};
