import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  
  async Show(request: Request, response: Response) {
    const lists = await knex('items_list').select('*');
  
    return response.json(lists)
  }

  async Create(request: Request, response: Response){
    const {list_id, description, done } = request.body;

    const transaction = await knex.transaction();

    await transaction('items_list').insert({
      list_id, description, done
    });

    await transaction.commit();

    return response.json({message: "success"});
  }

  async UpdateDone(request: Request, response: Response) {
    const { id } = request.params;
    const { done } = request.body;

    const transaction = await knex.transaction();
    await transaction('items_list').update('done', done).where({id});
    await transaction.commit();

    return response.json({message: "success"});
  }

}

export default ItemsController;