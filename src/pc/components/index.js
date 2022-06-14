/**
 * 注释的webpackChunkName，用于代码分割时的文件名，必填
 */
export default {
    'pc-pingou': () => import(
        /* webpackChunkName: "pc-pingou" */
        'root/pc/components/pingou'
    ),
    'pc-image-list': () => import(
        /* webpackChunkName: "pc-image-list" */
        'root/pc/components/image-list'
        ),
    'pc-item-list': () => import(
        /* webpackChunkName: "pc-item-list" */
        'root/pc/components/item-list'
        ),
    'pc-space': () => import(
        /* webpackChunkName: "pc-space" */
        'root/pc/components/space'
    ),
    'pc-title': () => import(
        /* webpackChunkName: "pc-title" */
        'root/pc/components/title'
    ),
    'pc-image': () => import(
        /* webpackChunkName: "pc-image" */
        'root/pc/components/image'
    ),
    'pc-banner': () => import(
        /* webpackChunkName: "pc-banner" */
        'root/pc/components/banner'
    ),
    'pc-richtext': () => import(
        /* webpackChunkName: "pc-richtext" */
        'root/pc/components/richtext'
    ),
}