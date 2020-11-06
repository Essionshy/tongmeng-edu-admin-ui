import request from '@/utils/request'

//获取课程列表树
// 获取讲师列表
export function getSubjectListTree() {
    return request({
        url: '/edu/subject/list/tree',
        method: 'get'
    })
}
