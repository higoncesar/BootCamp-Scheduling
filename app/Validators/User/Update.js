'use strict'
const Antl = use('Antl')

class Update {
  get validateAll () {
    return true
  }

  get rules () {
    const userId = this.ctx.params.id
    return {
      username: `required|unique:users,username,id,${userId}`,
      password: 'confirmed'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Update
