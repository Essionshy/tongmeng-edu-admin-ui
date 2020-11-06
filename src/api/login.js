import request from '@/utils/request'
/**
 * 用户登录
 * @param {用户名} username 
 * @param {密码} password 
 */
export function login(username, password) {
  return request({
    url: '/admin/sys/login',
    method: 'post',
    data: {
      "username": username,
      "password": password
    }
  })
}

/**
 * 获取当前登录用户的基本信息
 * @param {token} token 
 */
export function getInfo(token) {
  return request({
    url: '/admin/sys/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 登出系统
 */
export function logout() {
  return request({
    url: '/admin/sys/logout',
    method: 'post'
  })
}

/**
 * 获取菜单列表
 */
export function getMenu() {
  return request({
    url: '/admin/sys/menu',
    method: 'get'
  })
}

