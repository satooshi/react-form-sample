import { Story, Meta } from '@storybook/react';
import React from 'react';
import { FileDropArea, Props } from './FileDropArea';

export default {
  argTypes: {},
  component: FileDropArea,
  title: 'Framework/Views/Components/Bootstrap/FileDropArea',
} as Meta;

const Template: Story<Props> = (args) => <FileDropArea {...args} />;

export const TextDropArea = Template.bind({});
TextDropArea.args = {
  children: 'Drop your file here',
  id: 'file-drop',
};
