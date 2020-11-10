import request from '@/utils/request'

const api_name = '/admin/sys/role'

export default {

    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/list/${page}/${limit}`,
            method: 'post',
            data: searchObj // url查询字符串或表单键值对
        })
    },
    getById(id) {
        return request({
          url: `${api_name}/get/${id}`,
          method: 'get'
        })
      },
    
      save(role) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: role
        })
      },
    
      updateById(role) {
        return request({
          url: `${api_name}/update`,
          method: 'put',
          data: role
        })
      },
      getAssign(roleId){
        return request({
          url: `${api_name}/toAssign/${roleId}`,
          method: 'get'
        })
      },
      removeById(id){
        return request({
          url: `${api_name}/delete/${id}`,
          method: 'delete'
        })
      },
      removeRows(idList){
        return request({
          url: `${api_name}/delete/batch`,
          method: 'delete',
          data:idList
        })
      }
      
}
