import type { Meta, StoryObj } from '@storybook/vue3';
import AppLoader from './AppLoader.vue';

const meta = {
  title: 'Components/AppLoader',
  component: AppLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0b0f14' },
        { name: 'light', value: '#ffffff' },
        { name: 'ink', value: '#111' },
      ],
    },
    docs: {
      description: {
        component:
          'AppLoader',
      },
    },
  },
} satisfies Meta<typeof AppLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Базовый пример (≈ 20em при font-size: 16px)
 */
export const Default: Story = {
  render: () => ({
    components: { AppLoader },
    template: `<div style="font-size:16px"><AppLoader /></div>`,
  }),
  name: 'Default (16px)',
};

/**
 * Маленький — уменьшаем корневой font-size
 */
export const Small: Story = {
  render: () => ({
    components: { AppLoader },
    template: `<div style="font-size:10px"><AppLoader /></div>`,
  }),
  name: 'Small (10px)',
};

/**
 * Большой — увеличиваем корневой font-size
 */
export const Large: Story = {
  render: () => ({
    components: { AppLoader },
    template: `<div style="font-size:24px"><AppLoader /></div>`,
  }),
  name: 'Large (24px)',
};

/**
 * Несколько лоадеров в сетке — удобно для визу регрессии
 */
export const Multiple: Story = {
  render: () => ({
    components: { AppLoader },
    template: `
      <div style="display:grid; gap:24px; grid-template-columns: repeat(3, min-content); align-items:center">
        <div style="font-size:10px"><AppLoader /></div>
        <div style="font-size:16px"><AppLoader /></div>
        <div style="font-size:24px"><AppLoader /></div>
      </div>
    `,
  }),
};

/**
 * Reduced motion: отключаем анимации через локальную обёртку
 * (эмулирует users с prefers-reduced-motion)
 */
export const ReducedMotion: Story = {
  render: () => ({
    components: { AppLoader },
    template: `
      <div style="font-size:16px">
        <style>
          /* локально в сторе: убираем все animation у .loader* */
          .story-reduced .loader,
          .story-reduced .loader::before,
          .story-reduced .loader::after,
          .story-reduced .loader__inner,
          .story-reduced .loader__orbit { animation: none !important; }
        </style>
        <div class="story-reduced">
          <AppLoader />
        </div>
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          'Демонстрирует поведение без движения. Можно подключить addon-a11y и снапшоты для VRT.',
      },
    },
  },
};
