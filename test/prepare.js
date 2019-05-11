const next = require('next')
const nextBuild = require('next/dist/build').default
const path = require('path')
const supertest = require('supertest')

const withCSS = require('../src')

const fixture = (...args) => path.join(__dirname, 'fixtures', ...args)

const prepare = async ({
  dir,
  dev = true
}) => {
  dir = fixture(dir)

  const conf = withCSS({
    distDir: '.next'
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

module.exports = prepare
