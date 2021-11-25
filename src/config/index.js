const env = process.env.NODE_ENV || 'production'

const EnvConfig = {
  development: {
    baseURL: '//pcapi-xiaotuxian-front-devtest.itheima.net',
    mockURL: 'https://mock.boxuegu.com/mock/1175'
  },
  test: {
    baseURL: '//pcapi-xiaotuxian-front-devtest.itheima.net',
    mockURL: ''
  },
  production: {
    baseURL: '//pcapi-xiaotuxian-front-devtest.itheima.net',
    mockURL: ''
  }
}

export default {
  env,
  mock: false,
  ...EnvConfig[env]
}
