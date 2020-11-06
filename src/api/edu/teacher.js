import request from '@/utils/request'

// 分页获取讲师列表
export function getTeachersList(page,limit,teacherQuery) {
    return request({
      url: '/edu/teacher/list/'+page+"/"+limit,
      method: 'post',
      data:teacherQuery,      
      header:{
        "Content-Type":"application/json"
      }
    })
  }

//保存讲师

export function saveTeacher(params){
  return request({
    url:'/edu/teacher/save',
    method:'post',
    data:params,
    header:{
      "Content-Type":"application/json"
    }
  })
}

//更新讲师
export function updateTeacher(params){
  return request({
    url:'/edu/teacher/update',
    method:'put',
    data:params,
    header:{
      "Content-Type":"application/json"
    }
  })
}
//删除讲师

export function deleteTeacher(id){
  return request({
    url:'/edu/teacher/'+id,
    method:'delete' 
  })
}
//获取讲师

export function getTeacher(id){
  return request({
    url:'/edu/teacher/'+id,
    method:'get' 
  })
}

//获取所有讲师列表
export function getTeachers(){
  return request({
    url:'/edu/teacher/list',
    method:'get' 
  })
}