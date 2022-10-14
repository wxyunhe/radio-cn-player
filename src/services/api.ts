import CryptoJS from "crypto-js";
import axios from 'axios';

interface getDataOpts {
    name: APIType
    data?: { [key: string]: any }
}

const key = 'f0fc4c668392f9f9a447e48584c214ee'

function md5(str: string) {
    return CryptoJS.MD5(str).toString().toUpperCase()
}

const apiConfig = {
    msApi: 'https://ytmsout.radio.cn',
    msHeader: {
        "Content-Type": "application/json",
        "equipmentId": "0000",
        "platformCode": "WEB",
        "timestamp": 0,
        "sign": ""
    }
}

export enum APIType {
    getStaticData = "getStaticData",
    getRadioProvinceList = "getRadioProvinceList",
    getRadioCategoryList = "getRadioCategoryList",
    getRadioList = "getRadioList",
    getListenBackList = "getListenBackList",
    getProgramList = "getProgramList",
    getPageByColumn = "getPageByColumn",
    getAlbumDetail = "getAlbumDetail",
    pageByAlbum = "pageByAlbum"
}

const API = {
    [APIType.getStaticData]: {
        url: '/web/interactive/getInterface',
        method: 'get',
    },
    [APIType.getRadioProvinceList]: {
        url: '/web/appProvince/list/all',
        method: 'get',
    },
    [APIType.getRadioCategoryList]: {
        url: '/web/appCategory/list/all',
        method: 'get',
    },
    [APIType.getRadioList]: {
        url: '/web/appBroadcast/list',
        method: 'get',
    },
    [APIType.getListenBackList]: {
        url: '/web/appBroadcast/listenbackList',
        method: 'get',
    },
    [APIType.getProgramList]: {
        url: '/web/appProgram/listByDate',
        method: 'get',
    },
    [APIType.getPageByColumn]: {
        url: '/web/appProgram/pageByColumn',
        method: 'get',
    },
    [APIType.getAlbumDetail]: {
        url: '/web/appAlbum/detail',
        method: 'get',
    },
    [APIType.pageByAlbum]: {
        url: '/web/appSingle/pageByAlbum',
        method: 'get',
    }
}

// // 获取sign参数(使用其它参数排序后，拼接Key，转为大写MD5串)
function getParamsOrderByKey(params: { [key: string]: unknown }, methodType: string) {
    if (!methodType) {
        methodType = 'get'
    }
    methodType = methodType.toUpperCase()
    if (methodType === 'POST') {
        return JSON.stringify(params)
    } else {
        var sortArr = Object.keys(params).sort();
        var sortParams = [];
        var tmpKey = '';
        if (sortArr.length) {
            for (var i = 0; i < sortArr.length; i++) {
                tmpKey = sortArr[i];
                sortParams.push(tmpKey + '=' + params[tmpKey])
            }
        }
        return sortParams.join('&')
    }
}

export function getData(opts: getDataOpts) {
    if (!opts.name) {
        return;
    }

    var url = API[opts.name].url;
    if (opts.name === 'getStaticData') {
        opts.data = { id: opts.data![0] }
    }

    var ajaxOpts = {
        headers: apiConfig.msHeader,
        baseURL: apiConfig.msApi,
        url: url,
        method: API[opts.name].method,
        data: opts.data
    }

    var tm = new Date().getTime()
    if (opts.name !== 'getStaticData' && opts.data && Object.keys(opts.data) && Object.keys(opts.data).length === 1) {
        ajaxOpts.url += '/' + opts.data[Object.keys(opts.data)[0]]
    }
    var signText = (opts.data ? (getParamsOrderByKey(opts.data, API[opts.name].method) + '&') : '') + 'timestamp=' + tm + '&key=' + key
    ajaxOpts.headers.timestamp = tm;
    ajaxOpts.headers.sign = md5(signText)

    return axios(ajaxOpts)
}