export const getAuth = jest.fn(() => ({
  currentUser: {
    getIdToken: jest.fn(),
  },
}))
export const signInAnonymously = jest.fn()
export const onAuthStateChanged = jest.fn()
export const onIdTokenChanged = jest.fn()
