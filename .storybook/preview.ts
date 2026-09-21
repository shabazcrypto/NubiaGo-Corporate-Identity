import type { Preview } from '@storybook/react';
import React from 'react';
import { BrandProvider } from '../src/lib/brand-context';
import '../src/index.css';

const preview: Preview = {
  decorators: [
    (Story) =>
      React.createElement(BrandProvider, null, React.createElement(Story))
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    viewport: {
      viewports: {
        a4: { name: 'A4', styles: { width: '794px', height: '1123px' } },
        a4Landscape: { name: 'A4 landscape', styles: { width: '1123px', height: '794px' } },
        card: { name: 'Business card 85×55mm', styles: { width: '321px', height: '208px' } },
        slide: { name: '16:9 slide', styles: { width: '1280px', height: '720px' } },
        linkedIn: { name: 'LinkedIn 1200×627', styles: { width: '1200px', height: '627px' } },
        square: { name: 'Feed 1080×1080', styles: { width: '1080px', height: '1080px' } }
      }
    },
    layout: 'centered'
  }
};

export default preview;
