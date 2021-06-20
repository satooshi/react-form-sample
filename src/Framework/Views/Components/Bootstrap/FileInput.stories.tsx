import { Story, Meta } from '@storybook/react';
import React from 'react';
import { FileInput, Props } from './FileInput';

export default {
  argTypes: {},
  component: FileInput,
  title: 'Framework/Views/Components/Bootstrap/FileInput',
} as Meta;

const Template: Story<Props> = (args) => <FileInput {...args} />;

const defaultProps = {
  id: 'file-input',
  labelText: 'Single File Upload: ',
};

export const NoError = Template.bind({});
NoError.args = {
  ...defaultProps,
};

export const WithError = Template.bind({});
WithError.args = {
  ...defaultProps,
  error: 'Required',
};
