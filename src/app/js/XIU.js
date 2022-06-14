import Bridge from './Bridge'
import genLink from './gen-link'
import getScript from './tool/get-script'
import getImgFormat from './tool/img-format'
import query from './tool/query'
import validation from './tool/validation'
import autoHeight from './tool/auto-height'
import Swipable from './swipable';
import axios from './axios';
import Toast from './tool/toast';
setTimeout(() => {
    autoHeight(height => {
        // 通知商城
        window.top.postMessage({ method: 'resize', url: location.href, height }, '*');
    })
}, 500)

export default _.merge(
    /**
     * App和H5商城的桥对象
     */
    Bridge,
    {
        Toast,
        /**
         * 通用链接genLink
         */
        genLink,
        /**
         * 通讯总线Bus
         */
        Bus: new Vue,
        /**
         * 加载远程script
         */
        getScript,
        /**
         * 获取阿里云图片
         */
        getImgFormat,
        /**
         * URL的Query对象
         */
        query,
        /**
         * 表单验证
         */
        validation,
        /**
         * pxToRem
         */
        px2rem(value) {
            return window.lib.flexible.px2rem(value) + 'rem'
        },
        Swipable,
        axios
    }
)
