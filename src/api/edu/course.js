import request from '@/utils/request'

//以对象的形式创建方法
export default {


    //保存课程信息
    saveCourseInfo(params) {
        return request({
            url: '/edu/course/save',
            method: 'post',
            data: params,
            header: {
                'Content-Type': 'application/json'
            }
        })
    },
    //根据课程ID查询课程信息
    getCourseInfo(id) {
        return request({
            url: '/edu/course/get/' + id,
            method: 'get'

        })
    },
    //更新课程信息
    updateCourseInfo(params) {
        return request({
            url: '/edu/course/update',
            method: 'put',
            data: params,
            header: {
                'Content-Type': 'application/json'
            }
        })
    }
    ,
     //根据课程ID查询课程发布信息
     getCoursePublishInfo(id) {
        return request({
            url: '/edu/course/get/publish/' + id,
            method: 'get'

        })
    }
    ,
    //根据课程ID发布课程
    publishCourse(id) {
       return request({
           url: '/edu/course/publish/' + id,
           method: 'put'

       })
   },
   //条件分页查询课程列表
   getCourseList(page,limit,params){
    return request({
        url: `/edu/course/list/${page}/${limit}`,
        method: 'post',
        data: params,
        header: {
            'Content-Type': 'application/json'
        }
    })
   },
     //根据课程ID发布课程
     deleteCourse(id) {
        return request({
            url: '/edu/course/delete/' + id,
            method: 'delete'
 
        })
    }
}