let arc = require('@architect/functions')

async function count(payload) {
  console.log(payload)
  return
}

exports.handler = arc.queues.subscribe(count)
