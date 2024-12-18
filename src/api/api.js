import request from './index'

const baseURL = 'http://api.zhonghanlogistics.cn'

const filterRes = (res) => res.status === 200 && res.data

export const apiGetBaseInfo = (name) => {
  return request({
    url: `${baseURL}/v1/get/info`,
    method: 'get',
    params: { name },
  }).then(filterRes)
}

export const apiGetTrack = (id) => {
  if (!id) {
    return Promise.reject('输入为空')
  }
  return request({
    url: `${baseURL}/v1/get/track`,
    method: 'get',
    params: { id },
  }).then(filterRes)
}
