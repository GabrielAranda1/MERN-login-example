export class User {
  public id!: string

  public name!: string
  public lastname!: string
  public email!: string
  public occupation!: string
  public age!: number
  public password?: string

  constructor(props: Omit<User, 'id'>, id?: string) {
    Object.assign(this, props)
  }
}
