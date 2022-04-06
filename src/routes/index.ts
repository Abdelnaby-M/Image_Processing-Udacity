import express from 'express';
import images from './images';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (req: express.Request, res: express.Response): void => {
    // This could be done by serving views ... Just quick and dirty for now :-)
    res.send(
      '<h1>Welcome to image-processing-api</h1><p>Listening at <code><a href="/images">/api/images</a></code> for queries containing at least a valid filename. Optionally use both width and height to set the size...</p><p>Examples:<ul><li><a href="/api/images?filename=fjord">/api/images?filename=fjord</a></li><li><a href="/api/images?filename=fjord&width=100&height=100">/api/images?filename=fjord&width=100&height=100</a></li></ul></p>'
    );
  }
);

export default routes;
