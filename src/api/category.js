import request from '@/uitls/request'

export function getCategoryListApi () {
  return request.get('/home/category/head')
}
