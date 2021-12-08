import Mock from 'mockjs'

Mock.mock(/\/member\/collect/, 'get', (config) => {
  return Mock.mock({
    msg: '获取收藏商品成功',
    result: {
      counts: 35,
      pageSize: 10,
      page: 1,
      'items|4': [{
        id: '@id',
        name: '@ctitle(10,20)',
        desc: '@ctitle(4,10)',
        price: '@float(100,200,2,2)',
        picture: `http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/clothes_goods_${Mock.mock('@integer(1,8)')}.jpg`
      }]
    }
  })
})
