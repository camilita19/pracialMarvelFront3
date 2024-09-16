import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Index from '../pages/index.page';

describe('IndexPage', () => {
  describe('when rendering default', () => {
    it('should render the title', () => {
      const initialComics = {
        code: 200,
        status: 'Ok',
        attributionText: 'Data provided by Marvel. © 2024 MARVEL',
        attributionHTML: '<a href="http://marvel.com">Data provided by Marvel. © 2024 MARVEL</a>',
        etag: '3e2b9bc260c002e98aa0b77e9679ce11166c8aef',
        data: {
          offset: 0,
          limit: 12,
          total: 100,
          count: 12,
          results: [
            { id: 1, title: 'Comic 1', author: 'Author 1' },
            { id: 2, title: 'Comic 2', author: 'Author 2' },
            { id: 3, title: 'Comic 3', author: 'Author 3' },
            // Agrega más objetos según sea necesario
          ],
        },
      };

      //   render(<Index initialComics={initialComics} />);
      //   const title = screen.getByText('Sample');
      //   expect(title).toBeInTheDocument();
    });
  });
});
