import request from '@/utils/request'

export default{

    //根据日期生成汇总数据
    createData(day){
        return request({
            url:`/sas/count/save/${day}`,
            method:'post'
        })
    },
    //根据条件查询显示图表所需数据
    getData(query){
        return request({
            url:`/sas/list`,
            method:'post',
            data:query
        })
    }

}