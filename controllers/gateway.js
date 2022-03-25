import dotenv from 'dotenv';
import { Gateway } from "../models/schemas/gateway";
import handleResponse from '../helpers/handleResponse';

dotenv.config();

const gateway = {
  add: async (req, res) => {
    const { name, address, serialNumber } = req.body;
    try {
      const result = await new Gateway({name, address, serialNumber}).save();
      return handleResponse(res, 201, 'Gateway created', result);
    } catch (error) {
      if (error.code === 11000) {
        return handleResponse(res, 409, `Gateway with provided Detail ${JSON.stringify(error.keyValue)} already exist!`);
      }
      return handleResponse(res, 500, 'Error adding Gateway!');
    }
  },

  get: async (req, res) => {
    const gatewayId = req.params.id;
    try {
      const result = await Gateway.findOne({_id: gatewayId}).exec();
      if (!result) {
        return handleResponse(res, 404, 'Gateway with provided details not found!', result);
      }
      return handleResponse(res, 200, 'Gateway Loaded', result);
    } catch (error) {
      return handleResponse(res, 500, 'Error fetching Gateway');
    }
  },

  getAll: async (req, res) => {
    try {
      const result = await Gateway.find().exec();
      if (!result.length) {
        return handleResponse(res, 404, 'No Gateway found!', result);
      }
      return handleResponse(res, 200, 'Gateways Loaded!', result);
    } catch (error) {
      return handleResponse(res, 500, 'Error fetching Gateways!');
    }
  },

  delete: async (req, res) => {
    const gatewayId = req.params.id;
    try {
      const result = await Gateway.deleteOne({_id: gatewayId}).exec();
      if (!result) {
        return handleResponse(res, 404, 'Gateway with provided details not found!', result);
      }
      return handleResponse(res, 200, 'Gateway D', result);
    } catch (error) {
      return handleResponse(res, 500, 'Error fetching Gateway');
    }
  },

  addAdp: async (req, res) => {
    const { vendor, dateCreated, status='offline' } = req.body;
    const gatewayId = req.params.id;
    try {
      const result = await Gateway.findOneAndUpdate(
        { "_id": gatewayId },
        { 
          "$push": {
              "adp": {
                  vendor, dateCreated, status
              }
          }
        },
        { returnDocument: 'after'}
      )
      if (!result) {
        return handleResponse(res, 404, 'No Gateway found!', result);
      }
      return handleResponse(res, 200, 'Adp added!', result);
    } catch (error) {
      return handleResponse(res, 500, 'Error adding adp to Gateways!');
    }
  },

  removeAdp: async (req, res) => {
    const gatewayId = req.params.id;
    const adpId = req.params.adpId;
    try {
      const result = await Gateway.findOneAndUpdate(
        { "_id": gatewayId },
        { 
          "$pull": {
              "adp": {
                  _id: adpId
              }
          }
        },
        { returnDocument: 'after'}
      )
      if (!result) {
        return handleResponse(res, 404, 'No Gateway found', result);
      }
      return handleResponse(res, 200, 'ADP removed', result);
    } catch (error) {
      return handleResponse(res, 500, 'Error removing ADP!');
    }
  },
  
};

export default gateway;