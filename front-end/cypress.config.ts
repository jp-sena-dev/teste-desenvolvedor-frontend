import { defineConfig } from 'cypress';
import { installPlugin } from '@swimlane/cy-mockapi/build/main/';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      installPlugin(on, config);
    },
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
