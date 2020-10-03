import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'rbac/org/',
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: 'rbac/org/' + id + '/',
    method: 'delete'
  })
}

export function update(id, data) {
  return request({
    url: 'rbac/org/' + id + '/',
    method: 'put',
    data: data
  })
}

export function add(data) {
  return request({
    url: 'rbac/org/',
    method: 'post',
    data: data
  })
}

export default { list, del, update, add }
