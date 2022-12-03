import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { mockDate, Provider } from 'src/testUtils'
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

  mockDate('2022-11-29T09:16:39+09:00')

  beforeEach(async () => {
    removeAllListeners()
  })

  describe('Tasks Due Soon', () => {
    it('should render tasks due soon section', async () => {
      render(
        <Provider>
          <Container {...propsData()} />
        </Provider>,
      )

      expect((await screen.findAllByLabelText('task due soon')).length).toBe(4)
    })
  })

  describe('Favorite Projects', () => {
    it('should render favorite projects', async () => {
      render(
        <Provider>
          <Container {...propsData()} />
        </Provider>,
      )

      expect(
        (await screen.findAllByLabelText('favorite project tile item')).length,
      ).toBe(2)
    })
    it('should add favorite item', async () => {
      render(
        <Provider>
          <Container {...propsData()} />
        </Provider>,
      )

      const favoriteItem = (await screen.findAllByLabelText('add favorite'))[0]
      await userEvent.click(favoriteItem)

      expect(
        (await screen.findAllByLabelText('favorite project tile item')).length,
      ).toBe(3)
    })

    it('should delete favorite item', async () => {
      render(
        <Provider>
          <Container {...propsData()} />
        </Provider>,
      )

      const favoriteItem = (
        await screen.findAllByLabelText('delete favorite')
      )[0]
      await userEvent.click(favoriteItem)

      expect(
        (await screen.findAllByLabelText('favorite project tile item')).length,
      ).toBe(1)
    })
  })

  describe('Recent Projects', () => {
    it('should render recent projects', async () => {
      render(
        <Provider>
          <Container {...propsData()} />
        </Provider>,
      )

      expect(
        (await screen.findAllByLabelText('recent project tile item')).length,
      ).toBe(3)
    })
  })
})
