import request from '@/uitls/request'

export function getCategoryListApi() {
  return request.get('/home/category/head')
}

// 根据id获取一级类目
export function getCategoryTopApi(id) {
  return request.get('/category', { id })
}
