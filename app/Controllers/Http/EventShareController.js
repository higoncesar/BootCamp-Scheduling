'use strict'
const Event = use('App/Models/Event')
const Kue = use('Kue')
const Job = use('App/Jobs/EventShareMail')
const moment = require('moment')

class EventShareController {
  async store ({ params, auth, request, response }) {
    try {
      let event = await Event.findOrFail(params.id)

      if (event.user_id !== auth.user.id) {
        return response.status(401).send({
          error: {
            message: 'Este evento não pertence a você'
          }
        })
      }
      const { email } = request.all()

      event.date = moment(event.date)
        .locale('pt-br')
        .format('LLL')

      Kue.dispatch(
        Job.key,
        { email, username: auth.user.username, event },
        {
          attempts: 3
        }
      )

      return response.status(200).send({
        response: {
          message: 'Evento compartilhado com sucesso'
        }
      })
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Este evento não existe'
        }
      })
    }
  }
}

module.exports = EventShareController
