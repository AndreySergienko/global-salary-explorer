import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    browser: {
      enabled: true,
      instances: [
        {
          browser: 'chromium',
          headless: true,
        },
        {
          browser: 'firefox',
          headless: true,
        },
        {
          browser: 'webkit',
          headless: true,
        },
      ],
      provider: 'playwright',
    },
    include: ['**/*.contract.test.ts'],
  },
}))
