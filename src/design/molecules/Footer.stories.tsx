/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Story, Meta } from '@storybook/react'
import { Footer } from './Footer'

export default {
  title: 'molecules/Footer',
  component: Footer,
} as Meta

const Template: Story<React.ComponentProps<typeof Footer>> = () => <Footer />

export const Default = Template.bind({})
