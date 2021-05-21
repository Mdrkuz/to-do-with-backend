class User {
  constructor(name, password, id) {
    this.name = name;
    this.password = password
    this.id = id
  }
  setToken(token) {
    this.token = token
  }
}

module.exports = User
