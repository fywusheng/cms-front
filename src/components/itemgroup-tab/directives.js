export default {
    /* .bar > .bar-inner .bar占位 .bar-inner will fixed */
    affix: {
        bind(el, binding, vnode) {
            let vm = vnode.context;
            if (binding.modifiers.when && !binding.value) {return;}

            el.initTop = null;
            vm.$nextTick(() => {
                let remSize = parseFloat(getComputedStyle(document.documentElement, null).fontSize);
                let rect = el.getBoundingClientRect();
                // el.style.height = rect.height + 'px';
                el.style.height = rect.height / remSize + 'rem';
                el.initTop = rect.top;
            });
            let targetEl = el.firstChild;
            if (!targetEl.tagName) {
                console.warn('affix: html结构不正确..');
                return;
            }

            el.bindEvent = (isListen) => {
                let eventMedthod = isListen ? 'addEventListener' : 'removeEventListener';
                window[eventMedthod]('scroll', el.scrollListener, false);
                // 针对tms环境 增加touchmove
                XIU.query.tms === 'true' && window[eventMedthod]('touchmove', el.scrollListener, false);
            };

            el.scrollListener = (ev) => {
                if (el.initTop == null) {return;}
                let rect = el.getBoundingClientRect();
                let prect = el.parentElement.getBoundingClientRect();
                // 导航栏滚出视口时->fixed->父元素底部也将滚出视口时->static
                let pos = rect.top < 0 && prect.bottom > 0? 'fixed' : 'static';
                let top = pos === 'fixed' ? 0 : 'auto';

                
                targetEl.style.position = pos;
                targetEl.style.top = top;
            };

            el.bindEvent(true);
        },
        unbind(el) {
            el.bindEvent(false);
        }
    }
}