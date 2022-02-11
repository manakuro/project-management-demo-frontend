import { render, screen } from '@testing-library/react'
import React from 'react'
import { Component } from 'src/pages/Home/Component'
import { WrappedComponent } from 'src/testUtils/'

describe('Home', () => {
  it('renders Home component successfully', () => {
    render(
      <WrappedComponent>
        <Component loading={false} fetchTaskDetailQuery={async () => {}} />
      </WrappedComponent>,
    )

    expect(screen.getByTestId('Home')).toBeInTheDocument()
  })
})
