export default {
  // 环境常量
  NODE_ENV: process.env.NODE_ENV,
  NODE_ENV_DEVELOPMENT: process.env.NODE_ENV === 'development',
  NODE_ENV_PRODUCTION: process.env.NODE_ENV === 'production',
  // wosun app
  get IS_APP() {
    return /watsons/i.test(navigator.userAgent)
  },
  get IS_IOS() {
    return /iphone|ipad|ipod/i.test(navigator.userAgent)
  },
  get IS_ANDROID() {
    return /android/i.test(navigator.userAgent)
  },
  get IS_WEIXIN() {
    return /micromessenger/i.test(navigator.userAgent)
  },
  //(运营位)
  CMS: {
    // development: '//112.74.57.226:7001',
    development: '//192.168.1.187:7002',
    test: '//112.74.57.226/cms',
    // 测试环境ip
    production: '//192.168.1.187:7002'
  }[ process.env.NODE_ENV ],
  // WAP
  H5: {
    // development: 'http://112.74.57.226/h5',
    development: 'http://localhost:8800',
    test: 'http://192.168.1.187:8800',
    production: 'http://192.168.1.187:8800'
  }[ process.env.NODE_ENV ],
  // WAP
  PC: {
    development: 'http://112.74.57.226/pc/',
    test: 'http://112.74.57.226/pc/',
    production: 'http://112.74.57.226/pc'
  }[ process.env.NODE_ENV ],
  //静态域
  ASSETS: {
    development: '//127.0.0.1:9091/',
    test: 'http://112.74.57.226/',
    production: '//112.74.57.226/'
  }[ process.env.NODE_ENV ],
  SEARCH: {
    development: '//112.74.34.221:18090/product/search',
    test: '//112.74.34.221:18090/product/search',
    production: '//112.74.34.221:18090/product/search'
  }[ process.env.NODE_ENV ],
  API: {
    development: 'http://112.74.53.138:8081/xiu-api-web-1.0.0-SNAPSHOT/router?appKey=100001&v=1.0',
    test: 'http://112.74.53.138:8081/xiu-api-web-1.0.0-SNAPSHOT/router?appKey=100001&v=1.0',
    production: 'http://112.74.53.138:8081/xiu-api-web-1.0.0-SNAPSHOT/router?appKey=100001&v=1.0'
  }[ process.env.NODE_ENV ],
}
