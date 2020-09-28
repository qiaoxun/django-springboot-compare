import request from '@/utils/request'

export function list(organization, params) {
  return request({
    url: 'rbac/user/?organization=' + organization,
    method: 'get',
    params
  })
}

export function del(id) {
  return request({
    url: 'rbac/user/' + id + '/',
    method: 'delete'
  })
}

export function update(id, data) {
  return request({
    url: 'rbac/user/' + id + '/',
    method: 'put',
    data: data
  })
}

export function add(data) {
  return request({
    url: 'rbac/user/',
    method: 'post',
    data: data
  })
}

export default { list, del, update, add }
