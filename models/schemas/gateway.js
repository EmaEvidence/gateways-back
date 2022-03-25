import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adp =  new Schema({
  vendor: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

const gatewaySchema = new Schema({
  serialNumber: {
    type: String,
    unique: true,
    required: true
  },
  address: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  adp: {
    type: [adp],
  },
}, { timestamps: true });

export const Gateway = mongoose.model('Gateway', gatewaySchema);
