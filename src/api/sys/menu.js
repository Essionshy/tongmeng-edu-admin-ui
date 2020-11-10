import request from '@/utils/request'

const api_name = '/admin/sys/permission'

export default {
  getNestedTreeList() {
    return request({
      url: `${api_name}/list/tree`,
      method: 'get'
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/delete/${id}`,
      method: "delete"
    })
  },
  saveLevelOne(menu) {
    return request({
      url: `${api_name}/save`,
      method: "post",
      data: menu
    })
  },
  update(menu) {
    return request({
      url: `${api_name}/update`,
      method: "put",
      data: menu
    })
  },
  toAssign(roleId) {
    return request({
      url: `${api_name}/toAssign/${roleId}`,
      method: 'get'
    })
  },
  doAssign(roleId, permissionIds) {
    return request({
      url: `${api_name}/doAssign/${roleId}`,
      method: "post",
      data:permissionIds
    
       
    })
  }
}
