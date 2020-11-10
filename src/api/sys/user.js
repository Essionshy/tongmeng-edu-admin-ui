import request from '@/utils/request'

const api_name = '/admin/sys/user'

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
    
      save(user) {
        return request({
          url: `${api_name}/save`,
          method: 'post',
          data: user
        })
      },
    
      updateById(user) {
        return request({
          url: `${api_name}/update`,
          method: 'put',
          data: user
        })
      },
      getAssign(userId){
        return request({
          url: `${api_name}/toAssign/${userId}`,
          method: 'get'
        })
      },
      saveAssign(userId, roleIds){
        return request({
          url: `${api_name}/doAssign/${userId}`,
          method: 'post',
          data:roleIds,
          header:{
            'Content-Type':'application/json'
          }
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
          data:idList,
          header:{
            'Content-Type':'application/json'
          }
        })
      }
}
