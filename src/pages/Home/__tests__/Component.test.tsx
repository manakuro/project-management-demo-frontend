import React from 'react'
import { Component } from 'src/pages/Home/Component'
import { render, screen } from '@testing-library/react'
import { WrappedComponent } from 'src/testUtils/'

describe('Home', () => {
  it('renders Home component successfully', () => {
    render(
      <WrappedComponent>
        <Component />
      </WrappedComponent>,
    )

    expect(screen.getByTestId('Home')).toBeInTheDocument()
  })
})
