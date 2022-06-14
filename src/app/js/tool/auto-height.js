import query from './query'

const doc = document.documentElement
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || (fn => window.setTimeout(fn, 20))
var oldHeight = 0;
var onResize = null;

function onFrame(){
    var newHeight = Math.ceil(doc.offsetHeight)
    if(oldHeight !== newHeight){
        oldHeight = newHeight
        onResize(oldHeight)
    }

    requestAnimationFrame(onFrame)
}

export default function(callback){
    if(typeof callback === 'function'){
        onResize = callback;
        requestAnimationFrame(onFrame)

        if(/iPhone OS 11/i.test(navigator.userAgent)){
            // 修复iOS11会少了20px的bug
            let pad = document.createElement('div')
            pad.setAttribute('style', 'height:20px')
            document.body.appendChild(pad)
        }
    }
}