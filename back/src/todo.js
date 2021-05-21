class Todo {
  constructor(
    title,
    id,
    user,
    isDone = false,
  ) {
    this.title = title;
    this.id = id;
    this.user = user
    this.isDone = isDone;
  }
}

module.exports = Todo;
