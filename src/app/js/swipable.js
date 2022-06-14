/**
 * usage: new Swipable(ele, {swipeLeft: cb, swipeRight: cb})
 * 监听元素的滑动事件，触发回调
 */
export default class Swipable {
    constructor(el, callbacks = {}) {
        this.container = typeof el === 'string' ? document.qeurySelector(el) : el;
        this.callbacks = callbacks;
        
        this.isWap = /iphone|android|ios|mobile|watsons/i.test(navigator.userAgent);
        this.events = this.isWap ? ['touchstart', 'touchmove', 'touchend'] : ['mousedown', 'mousemove', 'mouseup'];

        this.init();
    }

    init() {
        if (!this.container) {console.warn('swipable 参数有误..'); return;}
        
        ['onTouchstart', 'onTouchmove', 'onTouchend'].forEach(method => {
            this[method] = this[method].bind(this);
        });
        
        let {container, events} = this;
        let [downEv, moveEv, upEv] = events;
        container.addEventListener(downEv, this.onTouchstart, false);
        container.style.webkitUserSelect = 'none';

    }

    onTouchstart(ev) {
        let touch = this.isWap ? ev.touches[0] : ev;
        this.x1 = touch.clientX;
        this.y1 = touch.clientY;

        let {container, events} = this;
        let [downEv, moveEv, upEv] = events;
        container.addEventListener(moveEv, this.onTouchmove, false);
        container.addEventListener(upEv, this.onTouchend, false);
    }

    onTouchmove(ev) {
        let touch = this.isWap ? ev.touches[0] : ev;
        this.x2 = touch.clientX;
        this.y2 = touch.clientY;
    }

    onTouchend(ev) {
        let deltaX = this.x2 ? this.x2 - this.x1 : 0; // 点击时，没触发touchMove x2==y2==0
        let deltaY = this.y2 ? this.y2 - this.y1 : 0;
        let isMove = [deltaX, deltaY].some(val => Math.abs(val) > 30);
        // console.log('touchend: ',`(${this.x1}, ${this.y1}), (${this.x2}, ${this.y2})`, deltaX, deltaY, isMove);
        if (isMove) {
            let isVertical = Math.abs(deltaY) >= Math.abs(deltaX);
            let dir = isVertical ? ['up', 'down'][Number(deltaY > 0)] : ['left', 'right'][Number(deltaX > 0)];
            dir = 'swipe' + this.captical(dir);
            (typeof this.callbacks[dir] === 'function') && this.callbacks[dir](); // swipeLeft, swipeUp...
        }

        let {container, events} = this;
        let [downEv, moveEv, upEv] = events;
        this.x1 = this.x2 = this.y1 = this.y2 = 0;
        container.removeEventListener(moveEv, this.onTouchmove, false);
        container.removeEventListener(upEv, this.onTouchend, false);
        // container.style.webkitUserSelect = 'text';
    }

    captical(s) {
        return s[0].toUpperCase() + s.slice(1);
    }


}