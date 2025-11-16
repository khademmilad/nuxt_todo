exports.up = function(knex) {
    return knex.schema.createTable('todos', (table) => {
        table.increments('id').primary();
        table.string('title').notNullable();
        table.boolean('description').nullable(false);
        table.boolean('completed').defaultTo(false);
        table.integer('priority').defaultTo(1);
        table.timestamp('due_date').nullable();
        table.timestamps(true, true);
    });
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('todos');
}