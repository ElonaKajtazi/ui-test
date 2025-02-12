import type { Meta, StoryObj } from '@storybook/react';
import MultiSelect from '../components/MultiSelect';
import { action } from '@storybook/addon-actions'


const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    options: {
      description: 'Array of selectable options or an async function that returns options',
      control: { type: 'object' },
    },
    placeholder: {
      description: 'Placeholder text for the input field',
      control: { type: 'text' },
      defaultValue: 'Select items...',
    },
    isLoading: {
      table: {disable: true}
    },
    onChange: {
      action: 'onChange',
      description: 'Callback function triggered when the selection changes',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MultiSelect>;

const mockOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date', disabled: true },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
];

const fetchOptions = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000)); 
  return mockOptions;
};

export const Default: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Select items...',
    onChange: (selected) => action('Selected:')(selected),
  },
};

export const Loading: Story = {
  args: {
    options: fetchOptions,
    placeholder: 'Loading items...',
    isLoading: true,
    onChange: (selected) => action('Selected:')(selected),
  },
};

export const CustomPlaceholder: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Choose your favorites...',
    onChange: (selected) => action('Selected:')(selected),
  },
};

export const PreSelected: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Select items...',
    preselected: ['apple', 'cherry'],
    onChange: (selected) => action('Selected:')(selected),
    
  },
};

export const WithAsyncOptions: Story = {
  args: {
    options: fetchOptions, 
    placeholder: 'Fetching items...',
    isLoading: false,
    onChange: (selected) => action('Selected:')(selected),
  },
};

export const DisabledOptions: Story = {
  args: {
    options: mockOptions,
    placeholder: 'Select items...',
    onChange: (selected) => action('Selected:')(selected),
  },
};