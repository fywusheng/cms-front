/**
 * 注释的webpackChunkName，用于代码分割时的文件名，必填
 */
export default {
    'pingou': () => import(
        /* webpackChunkName: "pingou" */
        'root/components/pingou'
    ),
    'image-list': () => import(
        /* webpackChunkName: "image-list" */
        'root/components/image-list'
        ),
    'item-list': () => import(
        /* webpackChunkName: "item-list" */
        'root/components/item-list'
        ),
    'item-recommend': () => import(
        /* webpackChunkName: "item-recommend" */
        'root/components/item-recommend'
        ),
    'item-hscroll': () => import(
        /* webpackChunkName: "item-hscroll" */
        'root/components/item-hscroll'
        ),
    'itemgroupTab': () => import(
        /* webpackChunkName: "itemgroup-tab" */
        'root/components/itemgroup-tab'
    ),
    'space': () => import(
        /* webpackChunkName: "space" */
        'root/components/space'
    ),
    'title': () => import(
        /* webpackChunkName: "title" */
        'root/components/title'
    ),
    'video': () => import(
        /* webpackChunkName: "video" */
        'root/components/video'
    ),
    'fixed-image': () => import(
        /* webpackChunkName: "fixed-image" */
        'root/components/fixed-image'
    ),
    'image': () => import(
        /* webpackChunkName: "image" */
        'root/components/image'
    ),
    'navbar': () => import(
        /* webpackChunkName: "navbar" */
        'root/components/navbar'
    ),
    'menu': () => import(
        /* webpackChunkName: "menu" */
        'root/components/menu-list'
        ),
    'banner': () => import(
        /* webpackChunkName: "banner" */
        'root/components/banner'
    ),
    'banner2': () => import(
        /* webpackChunkName: "banner2" */
        'root/components/banner2'
        ),
    'brand': () => import(
        /* webpackChunkName: "brand" */
        'root/components/brand'
        ),
    'richtext': () => import(
        /* webpackChunkName: "richtext" */
        'root/components/richtext'
    ),
}