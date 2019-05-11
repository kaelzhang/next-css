const test = require('ava')
const {
  prepare,
  containsCSS
} = require('./prepare')

test('not dev, should contains .css', async t => {
  const {request} = await prepare('no-dev', {
    dev: false
  })

  const {
    text
  } = await request.get('/index')

  t.true(containsCSS(text))
})
