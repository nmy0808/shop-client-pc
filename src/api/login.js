import request from '@/uitls/request'

/**
 * 登录-用户名和密码
 * @param {Object} data  {account:账号, password:密码}
 * @returns {*}
 */
export function loginApi(data) {
  return request.post('/login', data)
}

/**
 * 登录-用户名和手机验证码
 * @param {Object} data  {mobile:账号, code:手机验证码}
 * @returns {*}
 */
export function loginMobileWithCodeApi(data) {
  return request.post('/login/code', data)
}

/**
 * 获取短信验证码-登录-PC
 * @param data {Object} {mobile:手机号}
 * @returns {*}
 */
export function sendLoginCodeApi(data) {
  return request.get('/login/code', data)
}
