const next = require('next')
const nextBuild = require('next/dist/build').default
const supertest = require('supertest')
const fixtures = require('test-fixture')

const withCSS = require('../src')

const DEFAULT_NAME = 'template'

const prepare = async (name, {
  dev = true,
  // actions = [],
  config = {}
}) => {
  const {resolve, copy, fixture} = fixtures(DEFAULT_NAME)

  if (name !== DEFAULT_NAME) {
    await copy({
      clean: true,
      to: fixture(name)
    })
  }

  const dir = resolve()

  const conf = withCSS({
    distDir: '.next',
    ...config
  })

  if (!dev) {
    await nextBuild(dir, conf)
  }

  const app = next({
    dev,
    conf,
    dir
  })

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
  prepare,
  containsCSS
}
