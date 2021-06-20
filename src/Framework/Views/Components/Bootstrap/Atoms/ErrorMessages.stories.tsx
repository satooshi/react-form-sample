import { Story, Meta } from '@storybook/react';
import React from 'react';
import { ErrorMessage, Props } from './ErrorMessage';

export default {
  argTypes: {},
  component: ErrorMessage,
  title: 'Framework/Views/Components/Bootstrap/Atoms/ErrorMessage',
} as Meta;

const Template: Story<Props> = (args) => <ErrorMessage {...args} />;

export const NoError = Template.bind({});
NoError.args = {};

export const HasError = Template.bind({});
HasError.args = {
  error: 'Required',
};
