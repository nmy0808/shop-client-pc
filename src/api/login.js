import request from '@/uitls/request'

export function loginApi (data) {
  return request.post('/login', data)
}
