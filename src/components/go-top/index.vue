<template>
    <div class="u-go-top" :class="{active: showTop}" @click="toTop"></div>
</template>

<script>
    export default {
        name: 'goTop',
        data() {
            return {
                showTop: false,
            }
        },
        methods: {
            check() {
                const RAF = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function (callback) {
                    setTimeout(callback, 1 / 60 * 1000);
                };
                RAF(() => {
                    const st = document.body.scrollTop || document.scrollingElement.scrollTop,
                        vh = window.innerHeight;
                    if (st > vh) {
                        this.showTop = true;
                    } else {
                        this.showTop = false;
                    }
                });
            },
            toTop(e) {
                e.preventDefault();
                window.scrollTo(0, 0);
            }
        },
        beforeMount() {
            window.addEventListener('scroll', this.check);
            document.body.addEventListener('touchmove', this.check);
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
    .u-go-top {
        position: fixed;
        right: rem(20);
        bottom: rem(40);
        z-index: 2000;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.15s linear;
        width: rem(92);
        height: rem(92);
        background: url(./go-top.png) center no-repeat;
        background-size: cover;

        &.active {
            opacity: 1;
            pointer-events: auto;
        }
    }
</style>
