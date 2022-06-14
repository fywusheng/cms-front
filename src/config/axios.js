/**
 * 预设的不处理code
 * 200 - 成功
 */
const CODE_IGNORE = [200]

//Axios.defaults.withCredentials = true;
Axios.defaults.baseURL = ENV.API;

function handleCache(res) {
    var data = res.data;
    var config = res.config;
    if (config.cachable && data.code == 200) {
        localStorage[config.cacheKey] = JSON.stringify(data); // add or update..    
    }    
}

/*
Axios.interceptors.request.use(config => {
    return config;
});*/

Axios.interceptors.response.use((res) => {
    handleCache(res);
    if(_.isInteger(res.data.code)){
        if(_.includes(CODE_IGNORE.concat(res.config.codeIgnore), res.data.code)){
            // 由业务自行处理的code的情况
            return res.data;
        }else{
            // 由codeErrorHandler处理的code的情况
            codeErrorHandler(res.data);
            return Promise.reject(res.data)
        }
    }else{
        //非 {code, data, msg} 格式的接口
        return res.data;
    }
}, err => {
    XIU.Toast('[' + _.get(err, 'response.status', 'Error') + '] ' + err.message)
	return Promise.reject(err)
})


//全局错误码的处理器(业务的错误码请用codeIgnore过滤后自行处理)
function codeErrorHandler(data){
    switch(data.code){
        // 未登录或登录过期
        case 50003:
        case 50004:
            if(XIU.loginPop){
                // 登录弹窗
                XIU.Bus.$emit('login')
            }else{
                // 登录页
                XIU.goLogin()
            }
            break;

        default:
            XIU.Toast(data.msg)
    }
}