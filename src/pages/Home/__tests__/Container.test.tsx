import { render, screen } from '@testing-library/react'
import React from 'react'
import { WrappedComponent } from 'src/testUtils'
import { removeAllListeners } from 'src/testUtils/mock/server'
import {
  closeServer,
  resetHandlers,
  resetServer,
  startServer,
} from 'src/testUtils/mock/setup'
import { Container } from '../Container'

type Props = {}
const propsData = (options?: Partial<Props>): Props => ({
  ...options,
})

describe('pages/Home', () => {
  startServer()
  closeServer()
  resetServer()
  resetHandlers()

  beforeEach(async () => {
    removeAllListeners()
  })

  it('renders Home component successfully', async () => {
    render(
      <WrappedComponent>
        <Container {...propsData()} />
      </WrappedComponent>,
    )

    expect(await screen.findByTestId('Home')).toBeInTheDocument()
  })
})
