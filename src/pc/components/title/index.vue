<template>
    <div :style="style" :name="common.name" v-text="content.text"></div>
</template>

<script>
    export default {
        props: ['mode', 'instance_id', 'common', 'content'],
        computed: {
            style() {
                return {
                    fontSize: this.content.size + 'px',
                    lineHeight: 1.5,
                    paddingTop: (this.content.top || 0) + 'px',
                    paddingRight: (this.content.right || 0) + 'px',
                    paddingBottom: (this.content.bottom || 0) + 'px',
                    paddingLeft: (this.content.left || 0) + 'px',
                    textAlign: this.content.align,
                    color: this.content.color,
                    background: this.content.bg_color,
                }
            }
        }
    }
</script>