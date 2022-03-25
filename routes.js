import { Router } from 'express';
import gatewayController from './controllers/gateway';
import Validator from './middlewares/validator';


const validator = new Validator();

const Route = Router();

Route.post('/gateway', validator.gateway, gatewayController.add);

Route.get('/gateway/:id', gatewayController.get);

Route.delete('gateway', gatewayController.delete);

Route.get('/gateways', gatewayController.getAll);

Route.post('/gateway/:id/adp/', validator.adp, gatewayController.addAdp);

Route.delete('/gateway/:id/adp/:adpId', gatewayController.removeAdp);

export default Route;