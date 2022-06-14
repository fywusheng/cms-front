function callApp(method, params) {
    if(ENV.IS_IOS){
        window.webkit.messageHandlers[method].postMessage(params)
    }else{
        window.native[method](params)
    }
}

const Bridge = {
    //跳转url
    goURL(url) {
        console.info(ENV.IS_APP)
        console.info(url)
        if (ENV.IS_APP) {
            callApp('goURL', url)
        }else if(ENV.IS_PC){
            window.open(url)
        } else {
            location.href = url;
        }
    },
    goTopic(id) {
        this.goURL(`${ENV.ASSETS}/${id}.html`)
    },
    goGroup(id){
        if (ENV.IS_APP) {
            callApp('goGroup', id)
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/group/${id}`
        }  else {
            top.location.href = `${ENV.H5}/search.html?planId=${id}`
        }
    },
    goItem(id) {
        if (ENV.IS_APP) {
            callApp('goItem', id)
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/product/${id}`
        }  else {
            top.location.href = `${ENV.H5}/item.html?id=${id}`
        }
    },
    goCategory(id) {
        if (ENV.IS_APP) {
            callApp('goCategory', id)
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/search?dispId=${id}`
        }  else {
           top.location.href = `${ENV.H5}/search.html?dispId=${id}`
        }
    },
    goBrand(id) {
        if (ENV.IS_APP) {
            callApp('goBrand', id)
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/brand/${id}`
        }  else {
            top.location.href = `${ENV.H5}/brand.html?id=${id}`
        }
    },
    goCart() {
        if (ENV.IS_APP) {
            callApp('goCart')
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/cart`
        }  else {
            top.location.href = `${ENV.H5}/cart.html`
        }
    },
    goUserCenter() {
        if (ENV.IS_APP) {
            callApp('goUserCenter')
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}#/user/center`
        }  else {
            top.location.href = `${ENV.H5}/userCenter.html`
        }
    },
    goHome() {
        if (ENV.IS_APP) {
            callApp('goHome')
        }else if(ENV.IS_PC){
            location.href = `${ENV.PC}`
        }  else {
           top.location.href = `${ENV.H5}/index.html`
        }
    },
}
export default Bridge;
