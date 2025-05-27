import * as env from '../env'

describe('env utils', () => {
  const OLD_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { ...OLD_ENV }
  })
  afterAll(() => {
    process.env = OLD_ENV
  })

  it('isNetlify returns true if CONTEXT is set', () => {
    process.env.CONTEXT = 'production'
    expect(env.isNetlify()).toBe(true)
    process.env.CONTEXT = ''
    expect(env.isNetlify()).toBe(false)
  })

  it('isProduction returns true only if CONTEXT is production', () => {
    process.env.CONTEXT = 'production'
    expect(env.isProduction()).toBe(true)
    process.env.CONTEXT = 'dev'
    expect(env.isProduction()).toBe(false)
  })

  it('isDev returns true only if CONTEXT is dev', () => {
    process.env.CONTEXT = 'dev'
    expect(env.isDev()).toBe(true)
    process.env.CONTEXT = 'production'
    expect(env.isDev()).toBe(false)
  })

  it('getRootUrl returns correct URL for each context', () => {
    process.env.CONTEXT = 'production'
    process.env.URL = 'https://prod.example.com'
    expect(env.getRootUrl()).toBe('https://prod.example.com')
    process.env.CONTEXT = 'deploy-preview'
    process.env.DEPLOY_URL = 'https://preview.example.com'
    expect(env.getRootUrl()).toBe('https://preview.example.com')
    process.env.CONTEXT = 'branch-deploy'
    process.env.DEPLOY_URL = 'https://branch.example.com'
    expect(env.getRootUrl()).toBe('https://branch.example.com')
    process.env.CONTEXT = 'dev'
    expect(env.getRootUrl()).toBe('http://localhost:3000')
  })

  it('getSiteDomain returns the domain from the root URL', () => {
    process.env.CONTEXT = 'production'
    process.env.URL = 'https://foo.bar.com'
    expect(env.getSiteDomain()).toBe('bar.com')
    process.env.CONTEXT = 'dev'
    expect(env.getSiteDomain()).toBe('localhost')
  })
}) 
