<template>
    <div :style="style" :name="common.name"  v-text="content.text"></div>
</template>

<script>
    export default {
        props: [ 'mode', 'instance_id', 'common', 'content' ],
        computed: {
            style() {
                return {
                    fontSize: window.lib.flexible.px2rem(this.content.size * window.lib.flexible.dpr) + 'rem',
                    lineHeight: 1.5,
                    paddingTop: window.lib.flexible.px2rem((this.content.top || 0)* window.lib.flexible.dpr)+ 'rem',
                    paddingRight: window.lib.flexible.px2rem((this.content.right || 0)* window.lib.flexible.dpr)+ 'rem',
                    paddingBottom: window.lib.flexible.px2rem((this.content.bottom || 0)* window.lib.flexible.dpr)+ 'rem',
                    paddingLeft: window.lib.flexible.px2rem((this.content.left || 0)* window.lib.flexible.dpr)+ 'rem',
                    textAlign: this.content.align,
                    color: this.content.color,
                    background: this.content.bg_color,
                }
            }
        }
    }
</script>