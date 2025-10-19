import MapLegend from './MapLegend.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'
import i18n from '@/i18n' // подключаем i18n, тот же что и в приложении

const { t } = i18n.global

const meta: Meta<typeof MapLegend> = {
  title: 'Components/MapLegend',
  component: MapLegend,
  args: {
    label: 'Франция',
    yearly: 72000,
    monthly: 6000,
    t,
  },
}
export default meta

type Story = StoryObj<typeof MapLegend>

export const Default: Story = {}

export const WithoutMonthly: Story = {
  args: {
    label: 'Италия',
    yearly: 50000,
    monthly: null,
    t,
  },
}

export const English: Story = {
  args: {
    label: 'France',
    yearly: 72000,
    monthly: 6000,
    t: i18n.global.t,
  },
}
