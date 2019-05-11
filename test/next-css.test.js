const test = require('ava')
const {
  prepare,
  containsCSS
} = require('./prepare')

test('normal, should contains .css', async t => {
  const {request} = await prepare({
    dir: 'normal',
    dev: false
  })

  const {
    text
  } = await request.get('/index')

  t.true(containsCSS(text))
})
