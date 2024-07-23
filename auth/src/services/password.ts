export class Password {
  static async toHash(password: string) {
    // PHC format hash with internal salt generation.
    return await Bun.password.hash(password, {
      algorithm: 'argon2id',
      memoryCost: 4,
      timeCost: 10,
    })
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return await Bun.password.verify(storedPassword, suppliedPassword)
  }
}
