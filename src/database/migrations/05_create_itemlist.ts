import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('items_list', table => {
    table.increments('id').primary;
    table.string('description').notNullable;
    table.boolean('done');
    table.integer('list_id').notNullable().references('id').inTable('lists');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('items_list');
}