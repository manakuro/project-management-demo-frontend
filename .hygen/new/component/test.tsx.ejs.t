---
to: <%= absPath %>/__tests__/<%= component_name %>.test.tsx
---
import React from 'react'
import { render, screen } from '@testing-library/react'
import { <%= component_name %> } from '../'

test('renders component successfully', () => {
  render(<<%= component_name %>  />)
  const element = screen.getByTestId(/test/i)
  expect(element).toBeInTheDocument()
})
