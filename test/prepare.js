const next = require('next')
const nextBuild = require('next/dist/build').default
const supertest = require('supertest')
const fixtures = require('test-fixture')

const withCSS = require('../src')

const TEMPLATE = 'template'

const create = async (name, {
  dev = true,
  copy: _copy = false,
  config
}) => {
  const {resolve, copy, fixture} = _copy
    ? fixtures(TEMPLATE)
    : fixtures(name)

  if (_copy) {
    await copy({
      clean: true,
      to: fixture(name)
    })
  }

  const dir = resolve()

  const conf = config
    ? withCSS(config)
    : withCSS()

  if (!dev) {
    await nextBuild(dir, conf)
  }

  const app = next({
    dev,
    conf,
    dir
  })

  return app
}

const prepare = async (name, options) => {
  const app = await create(name, options)

  await app.prepare()

  const callback = app.getRequestHandler()
  const request = supertest(callback)

  return {
    request
  }
}

const REGEX_CONTAINS_CSS = /href="[^"]+?\/[a-z]+(?:\.chunk)?\.css"/
const REGEX_CONTAINS_HASHED_CSS = /href="[^"]+?\/[a-z]+\.[a-z0-9]+(?:\.chunk)?\.css"/

const containsCSS = (text, dev) => (
  dev
    ? REGEX_CONTAINS_CSS
    : REGEX_CONTAINS_HASHED_CSS
).test(text)

module.exports = {
  create,
  prepare,
  containsCSS
}
