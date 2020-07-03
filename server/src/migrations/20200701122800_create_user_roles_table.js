
export const up = (knex) => {
    return knex.schema
        .createTable('user_roles', (table) => {
            table.integer('user_id').unsigned().notNullable().references('users.id')
            table.integer('role_id').unsigned().notNullable().references('roles.id')
            table.primary(['user_id', 'role_id'])
        })
};

export const down = (knex) => {
    return knex.schema
        .dropTable('user_roles')
};
