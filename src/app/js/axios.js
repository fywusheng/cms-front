import {toObject as queryParse} from './tool/query';

function handleOperateRequest(url, config) {
    
    var code = config.params && config.params.code;
    if (!code) {
        var query = queryParse(config.url.split('?')[1] || '');
        code = query.code;
    }

    var cacheData = localStorage[code];
    config.cachable = true; // 标记
    config.cacheKey = code;

    if (cacheData) {
        return new Promise(function (resolve) {
            resolve(JSON.parse(cacheData));
            Axios(url, config);
        });
    } else {
        return Axios(url, config);
    }
}

function myAxios(url, config) {
    if (typeof url === 'object' && url) {// myAxios({url:.., method:..})
        config = url;
        url = config.url;
    }
    
    var isOperateApi = /\/tms\/aladdin\/get/.test(url);
    if (isOperateApi) {// 运营位api
        return handleOperateRequest(url, config);
    }

    return Axios(url, config);
}

export default myAxios;