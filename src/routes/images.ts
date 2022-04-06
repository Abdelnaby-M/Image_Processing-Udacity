import express from 'express';
import File from '../services/file';
import { validate } from '../services/validate';

const images: express.Router = express.Router();

images.get('/',
  async (request: express.Request, 
    response: express.Response): Promise<void> => {
    // Check whether request can be worked with
    const validationMessage: null | string = await validate(request.query);
    if (validationMessage) {
      response.send(validationMessage);
      return;
    }

    let error: null | string = '';

    // Create thumb if not yet available
    if (!(await File.isThumbAvailable(request.query))) {
      error = await File.createThumb(request.query);
    }

    // Handle image processing error
    if (error) {
      response.send(error);
      return;
    }

    // Retrieve appropriate image path and display image
    const path: null | string = await File.getImagePath(request.query);
    if (path) {
      response.sendFile(path);
    } else {
      response.send('This should not have happened :-D What did you do?');
    }
  }
);

export default images;
