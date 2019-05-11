const test = require('ava')
const {
  prepare,
  containsCSS
} = require('./prepare')

test('dev, should contains .css', async t => {
  const {request} = await prepare('dev', {
    dev: true,
    config: {
      webpack (config) {
        return config
      }
    }
  })

  const {
    text
  } = await request.get('/index')

  t.true(containsCSS(text))
})
