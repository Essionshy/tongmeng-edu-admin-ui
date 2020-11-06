import request from '@/utils/request'

export default{
    //保存小节
    addVideo(video){
        return request({
            url:'/edu/video/save',
            method:'post',
            data:video,
            header:{
                "Content-Type":'application/json'
            }
        })
    },
    //更新小节
    updateVideo(video){
        return request({
            url:'/edu/video/update',
            method:'put',
            data:video,
            header:{
                "Content-Type":'application/json'
            }
        })
    },
    //删除小节
    deleteVideo(videoId){
        return request({
            url:'/edu/video/delete/'+videoId,
            method:'delete'
        })
    },
    //根据小节ID获取小节信息
    getVideo(videoId){
        return request({
            url:'/edu/video/get/'+videoId,
            method:'get'
        })
    }
}