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
 * 三方登录 通过unionId 获取当前登录信息
 * 当token与mobile不存在或均为null时，即需要完善资料
 * @param data {Object} {unionId:三方标识, source:注册来源}
 * 注册来源: 1为pc，2为webapp，3为微信小程序，4为Android，5为ios,6为qq, 7为微信
 * @returns {*}
 */
export function getLoginInfoByUnionIdApi(data) {
  return request.post('/login/social', data)
}

/**
 * 获取短信验证码-登录-PC-已经注册过的手机
 * @param data {Object} {mobile:手机号}
 * @returns {*}
 */
export function sendLoginCodeApi(data) {
  return request.get('/login/code', data)
}

/**
 * 获取短信验证码-三方登录_发送(已有/绑定)账号短信
 * @param data {Object} {mobile:手机号}
 * @returns {*}
 */
export function sendBindCodeApi(data) {
  return request.get('/login/social/code', data)
}
/**
 * 获取短信验证码-注册并绑定完善资料
 * @param data {Object} {mobile:手机号}
 * @returns {*}
 */
export function sendRegisterWithBindCodeApi(data) {
  return request.get('/register/code', data)
}
/**
 * 三方登录_账号绑定, 通过三方id绑定手机
 * @param data {Object} {unionId,mobile,code}
 * @returns {*}
 */
export function bindMobileByUnionIdApi(data) {
  return request.post('/login/social/bind', data)
}

/**
 * 三方登录-完善信息
 * @param data {Object} 详细见api文档
 * @returns {*}
 */
export function bindUserInfoByUnionIdApi(data) {
  return request.post(`/login/social/${data.unionId}/complement`, data)
}
