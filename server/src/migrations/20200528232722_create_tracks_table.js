
export const up = (knex) => {
    return knex.schema
        .createTable('tracks', (table) => {
            table.increments('id')
            table.integer('user_id')
            table.string('title').nullable()
            table.string('description').nullable()
            table.boolean('is_private')
            table.string('file').nullable()
            table.string('original_file').nullable()
            table.json('waveform').nullable()
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('tracks')
};
