import Express from 'express';

import { config } from 'dotenv';
//configure .env variables
config();

//create app
const app = Express();

const PORT = process.env.PORT;

//listen to server on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
