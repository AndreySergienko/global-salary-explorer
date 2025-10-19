import type { Meta, StoryObj } from '@storybook/vue3'
import AppHeader from './AppHeader.vue'

const meta: Meta<typeof AppHeader> = {
  title: 'Components/AppHeader',
  component: AppHeader,
}
export default meta

type Story = StoryObj<typeof AppHeader>

export const Default: Story = {
  render: (args) => ({
    components: { AppHeader },
    setup: () => ({ args }),
    template: `
      <div style="padding:0; margin:0;">
        <AppHeader v-bind="args">
          <template #link="{ to, label, class: className }">
            <a :href="to" :class="className">{{ label }}</a>
          </template>
        </AppHeader>
      </div>
    `,
  }),
}
