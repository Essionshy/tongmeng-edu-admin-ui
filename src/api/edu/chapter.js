import request from '@/utils/request'

/**根据课程ID获得章节列表 */
export function getChapterList(courseId) {

    return request({
        url: "/edu/chapter/list/" + courseId,
        method: 'get'

    })
}
/**添加章节 */
export function addChapter(chapter) {

    return request({
        url: "/edu/chapter/save",
        method: 'post',
        data: chapter,
        header: {
            "Content-Type": 'application/json'
        }

    })
}
/**更新章节 */

export function updateChapter(chapter) {

    return request({
        url: "/edu/chapter/update",
        method: 'put',
        data: chapter,
        header: {
            "Content-Type": 'application/json'
        }
    })
}

/**根据章节ID获取章节信息 */
export function getChapter(chapterId) {

    return request({
        url: "/edu/chapter/get/" + chapterId,
        method: 'get'
    })
}


/**根据章节ID删除章节信息 */
export function deleteChapter(chapterId) {

    return request({
        url: "/edu/chapter/delete/" + chapterId,
        method: 'delete'
    })
}