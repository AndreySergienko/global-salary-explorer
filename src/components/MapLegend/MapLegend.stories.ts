import MapLegend from './MapLegend.vue'
import type { Meta, StoryObj } from '@storybook/vue3-vite'

const meta: Meta<typeof MapLegend> = {
  title: 'Components/MapLegend',
  component: MapLegend,
  args: {
    label: 'Франция',
    yearly: 72000,
    monthly: 6000,
  },
}
export default meta
type Story = StoryObj<typeof MapLegend>

export const Default: Story = {}

export const WithoutMonthly: Story = {
  args: { label: 'Италия', yearly: 50000, monthly: null },
}
