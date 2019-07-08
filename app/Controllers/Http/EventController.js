'use strict'

const Event = use('App/Models/Event')
const moment = require('moment')

/**
 * Resourceful controller for interacting with events
 */
class EventController {
  /**
   * Show a list of all events.
   * GET events
   */
  async index ({ request, auth }) {
    const { date } = request.get()

    let query = Event.query()

    if (date) {
      const startDay = moment(date)
      const endDay = moment(date).add({ hour: 23, minute: 59, second: 59 })
      query = query.whereBetween('date', [startDay, endDay])
    }

    const events = await query
      .with('user')
      .where('user_id', auth.user.id)
      .fetch()

    return events
  }

  /**
   * Create/save a new event.
   * POST events
   */
  async store ({ request, response, auth }) {
    const data = request.only(['title', 'location', 'date'])

    const isOldDate = moment().isAfter(data.date)

    if (isOldDate) {
      return response.status(401).send({
        error: {
          message: 'Não é possivel cadastrar um evento no passado'
        }
      })
    }

    const eventDuplicated = await Event.query()
      .whereRaw('user_id = ? and date = ?', [auth.user.id, data.date])
      .fetch()

    if (eventDuplicated.rows.length > 0) {
      return response.status(401).send({
        error: {
          message: 'Não é possivel cadastrar dois eventos no mesmo horário'
        }
      })
    }

    const event = await Event.create({ ...data, user_id: auth.user.id })
    return event
  }

  /**
   * Display a single event.
   * GET events/:id
   */
  async show ({ params, response, auth }) {
    try {
      const event = await Event.findOrFail(params.id)
      if (event.user_id !== auth.user.id) {
        return response.status(401).send({
          error: {
            message: 'Ops! Este evento não pertence a vocề'
          }
        })
      }
      return event
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Ops! Este evento não existe'
        }
      })
    }
  }

  /**
   * Update event details.
   * PUT or PATCH events/:id
   */
  async update ({ params, request, response, auth }) {
    try {
      const event = await Event.findOrFail(params.id)

      if (event.user_id !== auth.user.id) {
        return response.status(401).send({
          error: {
            message: 'Ops! Este evento não pertence a você'
          }
        })
      }
      const passed = moment().isAfter(event.date)

      if (passed) {
        return response.status(401).send({
          error: {
            message: 'Não é possivel editar um evento passado'
          }
        })
      }

      const data = request.only(['title', 'location', 'date'])

      const isOldDate = moment().isAfter(data.date)

      if (isOldDate) {
        return response.status(401).send({
          error: {
            message: 'Não é possivel cadastrar um evento no passado'
          }
        })
      }

      event.merge(data)

      await event.save()

      return event
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Ops! Este evento não existe'
        }
      })
    }
  }

  /**
   * Delete a event with id.
   * DELETE events/:id
   */
  async destroy ({ params, response, auth }) {
    try {
      const event = await Event.findOrFail(params.id)
      if (event.user_id !== auth.user.id) {
        return response.status(401).send({
          error: {
            message: 'Ops! Este evento não pertence a você'
          }
        })
      }
      return event
    } catch (error) {
      return response.status(error.status).send({
        error: {
          message: 'Ops! Este evento não existe'
        }
      })
    }
  }
}

module.exports = EventController
