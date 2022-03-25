import handleResponse from '../helpers/handleResponse';

const ipPattern = /^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$/gm;   

class Validator {
  gateway(req, res, next) {
    const { name, address, serialNumber, } = req.body;
    if (!name || name.trim().length === 0) {
      handleResponse(res, 400, 'Name must be specified');
    } else if (!serialNumber || serialNumber.trim().length === 0) {
      handleResponse(res, 400, 'Invalid serial number supplied');
    } else if (!address || address.trim().length === 0 || !address.match(ipPattern)) {
      handleResponse(res, 400, 'Invalid Address supplied');
    } else {
      next();
    }
  }

  adp(req, res, next) {
    const { vendor, dateCreated, status, } = req.body;
    console.log(status && status !== 'online' && status && status !== 'offline')
    const gatewayId = req.params.id;
    if (!gatewayId) {
      handleResponse(res, 400, 'You must specify a gateway to add the ADP!');
    } else if (!vendor || vendor.trim().length === 0) {
      handleResponse(res, 400, 'vendor must be specified');
    } else if (!dateCreated) {
      handleResponse(res, 400, 'Invalid date supplied');
    } else if (status && status !== 'online' && status && status !== 'offline') {
      handleResponse(res, 400, 'Invalid Status supplied');
    } else {
      next();
    }
  }
}

export default Validator;
