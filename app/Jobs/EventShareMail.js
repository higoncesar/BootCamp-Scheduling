'use strict'
const Mail = use('Mail')

class EventShareMail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'EventShareMail-job'
  }

  // This is where the work is done.
  async handle ({ email, username, event }) {
    console.log(`Job: ${EventShareMail.key}`)

    await Mail.send(
      'emails.eventshare',
      { email, username, event },
      message => {
        message.from('empresa@empresa.com.br')
        message.to(email)
        message.subject(`Evento: ${event.title}`)
      }
    )
  }
}

module.exports = EventShareMail
