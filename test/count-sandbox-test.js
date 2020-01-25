let test = require('tape')
let sandbox = require('@architect/sandbox')
let {queues} = require('@architect/functions')
let count = require('../src/queues/count')

// this testss directly invoking code in src...this is allowed!
test('queue gets invoked directly', async t=> {
  t.plan(1)

  // this is what a raw SQS payload looks like..
  let raw = {
    Records: [
      {body: '{"message":"hi from direct invoke"}'}
    ] 
  }

  await count.handler(raw)
  t.ok(true)
})

// this will test by mocking the invoke thru sandbox
let end
test('start sandbox in test', async t=> {
  t.plan(1)
  end = await sandbox.start()
  t.ok(true)
})

test('queue gets invoked',async t=> {
  t.plan(1)
  await queues.publish({payload: {message: 'hi'}, name: 'count'}) 
  // adds some fake lantancy to mimic acutal queue and not fail the test
  setTimeout(function delay() {
    t.ok(true)
  }, 1000)
})

test('stop sandbox', async t=> {
  t.plan(1)
  await end()
  t.ok(true)
})
