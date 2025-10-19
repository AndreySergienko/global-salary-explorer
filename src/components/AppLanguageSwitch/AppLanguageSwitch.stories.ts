import AppLanguageSwitch from './AppLanguageSwitch.vue'
import type { Meta, StoryObj } from '@storybook/vue3'

const meta: Meta<typeof AppLanguageSwitch> = {
  title: 'Components/AppLanguageSwitch',
  component: AppLanguageSwitch,
  args: { modelValue: 'ru' }
}
export default meta

type Story = StoryObj<typeof AppLanguageSwitch>
export const Default: Story = {}
export const English: Story = { args: { modelValue: 'en' } }
