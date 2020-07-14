
export const up = (knex) => {
    return knex.schema
        .createTable('track_likes', (table) => {
            table.integer('track_id').unsigned().notNullable().references('tracks.id')
            table.integer('user_id').unsigned().notNullable().references('users.id')
            table.primary(['track_id', 'user_id'])
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('track_likes')
};
