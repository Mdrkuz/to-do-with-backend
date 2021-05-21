class Requester {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }
  get(path, token) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'get',
      headers: {
        token : token,
        'content-type': 'application/json'
      },
    }).then(it => it.json()).catch(e => {
      throw e.json()
    })
  }
  post(path, body, token) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'post',
      headers: {
        token : token,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(it => it.json()).catch(e => {
      throw e.json()
    })
  }
  put(path, body, token) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'put',
      headers: {
        token : token,
        'content-type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(it => it.json()).catch(e => {
      throw e.json()
    })
  }
  delete(path, token) {
    return fetch(`${this.baseUrl}${path}`, {
      method: 'delete',
      headers: {
        token : token,
        'content-type': 'application/json'
      },
    }).then(it => it.json()).catch(e => {
      throw e.json()
    })
  }
}

const requester =  new Requester('http://localhost:4000')

export default requester;
