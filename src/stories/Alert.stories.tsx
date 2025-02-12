import { ComponentProps } from 'react';
import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import CustomAlert from '@/components/CustomAlert';
import { alertIcons } from '@/utils/AlertIcons';

type StoryProps = ComponentProps<typeof CustomAlert>

const meta: Meta<StoryProps> = {
  title: 'Components/CustomAlert',
  component: CustomAlert,
  argTypes: {
    title: {
      description: 'The title displayed in the alert.'
    },
    description: {
      description: 'The description or message inside the alert.'
    },
    type: {
      options: ['success', 'error', 'warning', 'info'],
      control: 'select',
      description: 'Choose between the different alert type options'
    },
    variant: {
      options: ['subtle', 'outline'],
      control: 'select',
      description: 'Choose bteween the different alert variant options '
   },
    icon: {
      table: { disable: true}
    },
    children: {
      control: 'text',
      description: 'Additional content inside the alert (optional).'
    },
    onClose: {
      description: 'Callback function triggered when the close button is clicked.'
    }
  }
}

export default meta

type Story = StoryObj<StoryProps>


export const SubtleSuccess: Story = {
  args: {
    title: 'Success',
    description: 'Task finished successfully.',
    type: 'success',
    variant: 'subtle',
    onClose: action('Alert closed!')
  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type]}
    />
  ) 
}

export const SubtleError: Story = {
  args: {
    title: 'An error occurred',
    description: 'There was an error there!',
    type: 'error',
    variant: 'subtle',
    onClose: action('Alert closed!')

  },
  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type]}
    />
  )
}

export const SubtleWarning: Story = {
  args: {
    title: 'Update available',
    description: 'A new version is ready to install',
    type: 'warning',
    variant: 'subtle',
    onClose: action('Alert closed!')

  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type] }
    />
  ) 
}

export const SubtleInfo: Story = {
  args: {
    title: 'Some information',
    description: 'A new version is ready to install',
    type: 'info',
    variant: 'subtle',
    onClose: action('Alert closed!')
  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type] }
    />
  )
}

export const OutlineSuccess: Story = {
  args: {
    title: 'Success',
    description: 'Task finished successfully.',
    type: 'success',
    variant: 'outline',
    onClose: action('Alert closed!')
  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type]}
    />
  ) 
}

export const OutlineError: Story = {
  args: {
    title: 'An error occurred',
    description: 'There was an error there!',
    type: 'error',
    variant: 'outline',
    onClose: action('Alert closed!')

  },
  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type]}
    />
  )
}

export const OutlineWarning: Story = {
  args: {
    title: 'Update available',
    description: 'A new version is ready to install',
    type: 'warning',
    variant: 'outline',
    onClose:  action('Alert closed!')

  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type] }
    />
  ) 
}

export const OutlineInfo: Story = {
  args: {
    title: 'Some information',
    description: 'A new version is ready to install',
    type: 'info',
    variant: 'outline',
    onClose: action('Alert closed!')
  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type] }
    />
  )
}
export const NoTitle: Story = {
  args: {
    type: 'info',
    variant: 'outline',
    description: 'This is a info alert that only has a description',
    onClose: action('Aler closed!')
  },

  render: (args) => (
    <CustomAlert
    {...args}
    icon={args.type && alertIcons[args.type] }
  />
  )
}

export const NoIcon: Story = {
  args: {
    type: 'info',
    title: 'Info ',
    description: 'This is a info alert that has a title and a description',
    onClose: action('Alert closed!')
  },
}

export const NoAction: Story = {
  args: {
    type: 'success',
    title: 'Success',
    description: 'Your operation was successful!',
  },

  render: (args) => (
    <CustomAlert
      {...args}
      icon={args.type && alertIcons[args.type]}
    />
  )
}