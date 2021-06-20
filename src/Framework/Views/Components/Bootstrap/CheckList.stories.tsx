import { Story, Meta } from '@storybook/react';
import React from 'react';
import { CheckList, Props } from './CheckList';

export default {
  argTypes: {},
  component: CheckList,
  title: 'Framework/Views/Components/Bootstrap/CheckList',
} as Meta;

const Template: Story<Props> = (args) => <CheckList {...args} />;

const defaultArgs = {
  id: 'id',
  labelText: 'CheckList',
  options: [
    { label: 'option1', value: 'v1' },
    { label: 'option2', value: 'v2' },
  ],
  values: {},
};

export const NoChecks = Template.bind({});
NoChecks.args = {
  ...defaultArgs,
};

export const Checked = Template.bind({});
Checked.args = {
  ...defaultArgs,
  values: { v1: true },
};

export const WithError = Template.bind({});
WithError.args = {
  ...defaultArgs,
  error: 'Required',
};
