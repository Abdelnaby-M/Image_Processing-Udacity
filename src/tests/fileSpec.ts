import { promises as fs } from 'fs';
import path from 'path';
import File from '../services/file';

describe('Test image processing via sharp', (): void => {
  it('raises an error (invalid width value)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '-100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

  it('raises an error (filename does not exist)', async (): Promise<void> => {
    const error: null | string = await File.createThumb({
      filename: 'foo',
      width: '100',
      height: '500'
    });
    expect(error).not.toBeNull();
  });

});

// Erase test file. Test should not run on productive system to avoid cache loss
afterAll(async (): Promise<void> => {
  const resizedImagePath: string = path.resolve(
    File.imagesThumbPath,
    'fjord-99x99.jpg'
  );

  try {
    await fs.access(resizedImagePath);
    fs.unlink(resizedImagePath);
  } catch {
    // intentionally left blank
  }
});
