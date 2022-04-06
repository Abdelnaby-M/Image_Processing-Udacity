import File from './file';

// query segments
interface ImageQuery {
    filename?: string;
    width?: string;
    height?: string;
  }
  
  /**
   * Validate query.
   * @param {ImageQuery} query Query object passed by express.
   * @return {null|string} Null if valid or error message.
   */

export const validate = async (query: ImageQuery): Promise<null | string> => {
    // Check if requested file is available
    if (!(await File.isImageAvailable(query.filename))) {
      const availableImageNames: string = (
        await File.getAvailableImageNames()
      ).join(', ');
      return `Please pass a valid filename in the 'filename' query segment. Available filenames are: ${availableImageNames}.`;
    }
  
    if (!query.width && !query.height) {
      return null; // No size values
    }
  
    // Check for valid width value
    const width: number = parseInt(query.width || '');
    if (Number.isNaN(width) || width < 1) {
      return "Please provide a positive numerical value for the 'width' query segment.";
    }
  
    // Check for valid height value
    const height: number = parseInt(query.height || '');
    if (Number.isNaN(height) || height < 1) {
      return "Please provide a positive numerical value for the 'height' query segment.";
    }
  
    return null;
  };

   