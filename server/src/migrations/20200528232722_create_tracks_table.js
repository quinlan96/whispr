
export const up = (knex) => {
    return knex.schema
        .createTable('tracks', (table) => {
            table.increments('id')
            table.integer('user_id').unsigned().notNullable().references('users.id')
            table.string('title').nullable()
            table.string('description').nullable()
			table.string('status').nullable()
            table.string('file').nullable()
            table.string('original_file').nullable()
            table.float('duration').nullable()
			table.json('waveform').nullable()
            table.timestamps()
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('tracks')
};
