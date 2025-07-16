export const getAuth = jest.fn(() => ({
  currentUser: {
    getIdToken: jest.fn(),
  },
}))
export const signInAnonymously = jest.fn()
export const onAuthStateChanged = jest.fn((_, nextOrObserver) => {
  nextOrObserver({})
  return jest.fn()
})
export const onIdTokenChanged = jest.fn((_, nextOrObserver) => {
  nextOrObserver({
    getIdToken: jest.fn(() => Promise.resolve('id')),
  })
  return jest.fn()
})
