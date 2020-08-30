import express, { response, request } from 'express';

import ListsController from './controllers/listsControllers';
import ItemsController from './controllers/itemsControllers';

const routes = express.Router();

const listsController = new ListsController();
const itemsController = new ItemsController();

routes.get('/lists', listsController.Show);
routes.post('/lists', listsController.Create);
routes.get('/lists/:id', listsController.Index);

routes.get('/items', itemsController.Show);
routes.post('/items', itemsController.Create);
routes.put('/items/:id', itemsController.UpdateDone);

export default routes;