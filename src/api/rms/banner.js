import request from '@/utils/request'

export default {

    //条件分页查询
    getBannerList(page, limit, params) {
        return request({
            url: `/rms/banner/list/${page}/${limit}`,
            method: 'post',
            data: params,
            header: {
                'Content-Type': 'application/json'
            }
        })
    },
    //根据ID查询Banner

    getBanner(id) {
        return request({
            url: `/rms/banner/get/${id}`,
            method: 'get'
        })
    }
    ,
    saveBanner(params) {
        return request({
            url: `/rms/banner/save`,
            method: 'post',
            data: params,
            header: {
                'Content-Type': 'application/json'
            }
        })
    },
    
    //更新

    updateBanner(params) {
        return request({
            url: `/rms/banner/update`,
            method: 'put',
            data: params,
            header: {
                'Content-Type': 'application/json'
            }
        })
    },
    //根据ID删除Banner

    deleteBanner(id) {
        return request({
            url: `/rms/banner/delete/${id}`,
            method: 'delete'
        })
    }

}