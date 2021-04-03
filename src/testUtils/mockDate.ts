const OriginalDate = Date as any
export const mockDate = (date: string) => {
  beforeAll(() => {
    const now = new OriginalDate(date) as any
    ;(Date as any).now = jest.fn(() => now)
  })

  afterAll(() => {
    global.Date = OriginalDate
  })
}
