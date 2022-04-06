import express, { json } from 'express';
import routerIndex from './routes/index';


const app: express.Application = express();
const port: number = 3000; 

app.use(json());
// Add routes

app.use(routerIndex);

// Start server

app.listen(port, (): void => {
    console.log(`Server is running on port: ${port}`);
  });

export default app;
