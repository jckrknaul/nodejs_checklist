import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('lists', table => {
    table.increments('id').primary;
    table.string('description').notNullable;
    table.dateTime('dateAt').notNullable;
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('lists');
}