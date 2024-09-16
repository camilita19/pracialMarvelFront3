import { describe, it, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import GeneralFooter from '../components/layouts/footer/general-footer.component';
import React from 'react';

describe('GeneralFooter', () => {
  describe('when rendering default layout', () => {
    it('should render the powered by text', () => {
      render(<GeneralFooter />);
      const poweredBy = screen.getByText('Powered by');
      expect(poweredBy).toBeInTheDocument();
    });
    it('should render the logo', () => {
      render(<GeneralFooter />);
      const logo = screen.getByAltText('Digital House Logo');
      expect(logo).toBeInTheDocument();
    });
  });
});
