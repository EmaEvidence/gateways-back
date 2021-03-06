import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Route from './routes';


dotenv.config();

async function main() {
  await mongoose.connect(process.env.DB_CONNECTION);
}

main();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers',
  'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(Route);

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to IP GATEWAY MANAGER API',
    data: []
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('We are live', port);
});
