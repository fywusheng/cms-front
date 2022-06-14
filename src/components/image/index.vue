<template>
    <div class="topic-image" :name="common.name" @click="onClick">
        <img v-if="image" v-lazy="image" @touchstart="onTouchStart"/>
    </div>
</template>

<script>
    export default {
        props: ['mode', 'instance_id', 'common', 'content'],
        data() {
            return {
                timer: null
            }
        },
        computed: {
            image() {
                return XIU.getImgFormat(this.content.image, '/resize,w_750')
            }
        },
        methods: {
            onClick() {
                XIU.genLink(this.content.link)
            },
            onTouchStart() {
                this.timer = setTimeout(() => {
                    this.onCancelTouch();
                }, 1000)

                window.addEventListener('touchmove', this.onCancelTouch)
            },
            onCancelTouch() {
                clearTimeout(this.timer);
                window.removeEventListener('touchmove', this.onCancelTouch);
            }
        }
    }
</script>

<style scoped>
    .topic-image {
        img {
            display: block;
            width: 100%;
        }
    }
</style>
