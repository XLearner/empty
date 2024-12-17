import request from "./index";

const baseURL = "http://api.zhonghanlogistics.cn";

const filterRes = res => res.status === 200 && res.data;

export const apiGetBaseInfo = name => {
    return request({
        url: `${baseURL}/v1/get/info`,
        method: "get",
        params: { name }
    }).then(filterRes);
};

export const apiGetTrack = id => {
    if (!id) {
        return Promise.reject('输入为空');
    }
    if (id == 1) {
        return Promise.resolve({
            code: 0,
            data: {
                orderId: '0012',
                state: '1', // 待上网 / 运输中 / 派送中 / 投递失败 / 成功签收 / 可能异常
                from: '中国',
                end: '越南',
                updateTime: '2024-12-16 19:02',
                history: [
                    {
                        on: true,
                        time: '2024-11-12 13:32:26',
                        txt: '深圳市，已入库【深圳市】'
                    }
                ]
            },
            msg: ''
        })
    }
    if (id == 2) {
        return Promise.resolve({
            code: 0,
            data: [
                {
                    on: true,
                    time: '2024-11-12 13:32:26',
                    txt: '深圳市，已入库【深圳市】'
                },
                {
                    on: true,
                    time: '2024-11-12 13:32:26',
                    txt: '深圳市，已出货【深圳市】'
                },
            ],
            msg: ''
        })
    }
    if (id == 3) {
        return Promise.resolve({
            code: 0,
            data: [
                {
                    on: true,
                    time: '2024-11-12 13:32:26',
                    txt: '深圳市，已入库【深圳市】'
                },
                {
                    on: true,
                    time: '2024-11-12 13:32:26',
                    txt: '深圳市，已出货【深圳市】'
                },
                {
                    on: false,
                    time: '2024-11-12 13:32:26',
                    txt: '运输中，已发出'
                },
            ],
            msg: ''
        })
    } else {
        return Promise.resolve({
            code: 0,
            data: [],
            msg: ''
        })
    }
}