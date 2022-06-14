<template>
    <div class="fixed-image" :name="common.name"  :style="{paddingBottom: imageHeight}">
        <div class="fixed-image-link" @click="onClick"><img v-lazy="XIU.getImgFormat(content.image, '/resize,w_750')"/></div>
    </div>
</template>

<script>
export default {
    props: ['mode', 'instance_id', 'common', 'content'],
    data(){
        return {
            imageHeight: 0
        }
    },
    watch: {
        'content.image'(){
            this.updateImageHeight();
        }
    },
    methods: {
        onClick(){
            XIU.genLink(this.content.link)
        },
        updateImageHeight(){
            var image = new Image;
            image.onload = () => {
                this.imageHeight = image.height / image.width * 100 + '%'
            }
            image.src = XIU.getAliImg(this.content.image)
        }
    },
    created(){
        this.updateImageHeight();
    }
}
</script>

<style scoped>
.fixed-image{
    overflow:hidden;height:0;cursor:pointer;

    &-link{
        position:fixed;z-index:999;bottom:0;width:10rem;

        img{display:block;width:100%}
    }
}
</style>
