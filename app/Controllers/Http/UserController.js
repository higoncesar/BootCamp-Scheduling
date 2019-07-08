'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UserController {
  async store ({ request, response }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }

  async update ({ request, response, auth }) {
    const { user } = auth
    const data = request.only(['username', 'password', 'password_current'])

    if (data.password && !data.password_current) {
      return response.status(401).send({
        error: {
          message: 'Confirme a senha atual, para altera-lá'
        }
      })
    }

    if (data.password_current) {
      const isSame = await Hash.verify(data.password_current, user.password)

      if (!isSame) {
        return response.status(401).send({
          error: {
            message: 'A senha atual não esta correta'
          }
        })
      }

      if (!data.password) {
        return response.status(401).send({
          error: {
            message: 'Você não digitou a nova senha'
          }
        })
      }

      delete data.password_current
    }

    if (!data.password) {
      delete data.password
    }

    await user.merge(data)

    await user.save()

    return user
  }
}

module.exports = UserController
