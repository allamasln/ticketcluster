export const config = {
  endpoints: {
    baseUrl: '/api/users',
    get signup(){return `${this.baseUrl}/signup`},
    get signin(){return `${this.baseUrl}/signin`},
    get signout(){return `${this.baseUrl}/signout`},
    get currentUser(){return `${this.baseUrl}/currentuser`},
  },
  validation: {
    email: {
      validErrorMessage: 'Email must be valid',
    },
    password: {
      minLength: 4,
      maxLength: 16,
      get lengthErrorMessage() {
        return `Password must be between ${this.minLength} and ${this.maxLength} characters`
      },
      requiredErrorMessage: 'You must supply a password',
    },
  }
}
