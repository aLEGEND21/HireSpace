import express from 'express';
import { json } from 'body-parser';
import { exampleRouter } from './routes/exampleRouter';

const app = express();
app.use(json());
app.use(exampleRouter);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

