const User = require('./user')

class UserManager {
  constructor() {
    this.list = [];
    this.idCounter = 0;
  }

  createUser(name, password) {
    return new User(name, password, this.idCounter++)
  }

  add(user) {
    this.list.push(user)
    console.log(this.list);
  }

  addIfNotPresentedByName(user) {
    const similarUsers = this.findByName(user.name)
    if (!similarUsers) {
      this.add(user)
      console.log("no such users");
    }
  }

  findByName(name, userList) {
    return (userList || this.getAll())
      .filter(it => it.name === name).pop()
  }

  findByToken(token, userList) {
    return (userList || this.getAll())
      .filter(it => it.token === token).pop()
  }

  searchByName(name, userList) {
    return (userList || this.getAll())
      .filter(it => it.name.includes(name))
  }

  getAll() {
    return this.list
  }


  getById(id) {
    return this.list.find(it => it.id === id)
  }

  changeUser(id, changeSet) {
    const user = this.getById(id)
    if (user) {
      Object.keys(user)
        .forEach(field => {
          if (field in changeSet) {
            user[field] = changeSet[field];
          }
        })
    }
  }

  remove(user) {
    if(this.list.user === user) {
      this.list.user.token = undefined
    }
  }
}

module.exports = UserManager;
