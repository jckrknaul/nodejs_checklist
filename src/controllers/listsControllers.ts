import { Request, Response } from 'express';
import knex from '../database/connection';

class ListsController {

  async Show(request: Request, response: Response) {
    const lists = await knex('lists').select('*');
    return response.json(lists)
  }

  async Index(request: Request, response: Response){
    const { id } = request.params;

    const list = await knex('lists').where('id', id).first();

    if (!list) {
      return response.status(400).json({message: 'Lista não encontrada!'});
    }

    const items = await knex('items_list')
      .join('lists', 'items_list.list_id', '=', 'lists.id')
      .where('lists.id', id)
      .select('items_list.id', 'items_list.description', 'items_list.done');

    return response.json({list, items});
  };

  async Create(request: Request, response: Response){
    const { description, dateAt } = request.body;
    const transaction = await knex.transaction();

    const lists = { description, dateAt };

    const insertedID = await transaction('lists').insert(lists);
    const id = insertedID[0];

    await transaction.commit();
    return response.json({
        id,
      ...lists
    });
  }
}

export default ListsController;