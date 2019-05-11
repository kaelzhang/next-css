const test = require('ava')
const prepare = require('./prepare')

const REGEX_CONTAINS_CSS = /href="[^"]+\.css"/

test('normal, should contains .css', async t => {
  const {request} = await prepare({
    dir: 'normal',
    dev: false
  })

  const {
    text
  } = await request.get('/index')

  t.true(REGEX_CONTAINS_CSS.test(text))
})
