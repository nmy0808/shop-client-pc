import request from '@/uitls/request'
import axios from 'axios'

/**
 * 获取城市
 * @returns {Promise}
 */
export function getCityApi() {
  return axios.get('https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json')
}
