export type TestUser = {
  email: string
  password: string
  phoneNumber: string
  country: string
  firstName: string
  lastName: string
}

export const defaultUser1: TestUser = {
  email: 'ptest0610+2@gmail.com',
  password: '!Admin1234',
  phoneNumber: '111 111 111',
  country: 'pl',
  firstName: 'Piotr',
  lastName: 'Testowy',
}

export const defaultUser2: TestUser = {
  email: 'jntestsignius+2@gmail.com',
  password: '!Admin1234',
  phoneNumber: '222 222 222',
  country: 'pl',
  firstName: 'Janusz',
  lastName: 'Testowy',
}

export const fakeUser: TestUser = {
  email: 'fakeGuy@gmail.com',
  password: '!Admin1234',
  phoneNumber: '500000000',
  country: 'pl',
  firstName: 'Janusz',
  lastName: 'Testowy',
}
