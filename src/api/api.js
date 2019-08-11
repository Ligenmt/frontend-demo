import request from '../utils/requests'


export function getData(params) {
  return request({
    url: '/api/dfit/dfit/getList',
    method: 'POST',
    params: params,
  })
}
