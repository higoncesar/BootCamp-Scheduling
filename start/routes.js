'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User/Store')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.put('users/:id', 'UserController.update').validator('User/Update')

  /**
   * Events
   */
  Route.resource('events', 'EventController')
    .apiOnly()
    .validator(
      new Map([
        [['events.store'], ['Event/CreateUpdate']],
        [['events.update'], ['Event/CreateUpdate']]
      ])
    )
  /**
   * Share Event
   */
  Route.post('events/:id/share', 'EventShareController.store').validator(
    'Event/Share'
  )
}).middleware(['auth'])
