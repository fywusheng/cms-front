<template>
    <div :style="style" :name="common.name" v-if="dataList && dataList.length">
        <swiper :options="options">
            <swiper-slide v-for="(data, index) in dataList" :key="index">
                <img class="op-banner-cell" :style="style" v-lazy="XIU.getImgFormat(data.image_url, '/resize,w_750')"
                     @click="onClick(data.topic_link)">
            </swiper-slide>
            <div v-show="dataList.length > 1" class="swiper-pagination" slot="pagination"></div>
        </swiper>
    </div>
</template>

<script>
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import 'swiper/dist/css/swiper.css'

    export default {
        name: 'Banner',
        props: [ 'mode', 'instance_id', 'common', 'content' ],
        data() {
            return {
                feature: {},
                options: {
                    autoplay: 4000,
                    pagination: '.swiper-pagination'
                },
                dataList: [],
            }
        },
        computed: {
            style() {
                return {
                    width: '10rem',
                    height: 'auto'
                }
            },
        },
        watch: {
            'content.code': {
                handler() {
                    this.getData()
                }
            }
        },
        methods: {
            async getData(){
                if(this.content.code){
                    const result = await Axios.get(`${ENV.CMS}/operationContent/getByCode?code=${this.content.code}`)
                    if(result.code === 200){
                        this.dataList = result.data.contentList;
                    }
                }
            },
            onClick(link) {
                XIU.genLink(link)
            }
        },
        components: {
            swiper,
            swiperSlide
        },
        mounted(){
            this.getData();
        },
    }
</script>
<style scoped>
    .op-banner-cell {
        display: block;
        width: 100%;
    }
</style>
<style lang="scss">
    .swiper-pagination {
        height: rem(14);
    }

    .swiper-pagination .swiper-pagination-bullet {
        width: rem(14);
        height: rem(14);
        background: #fff;
        opacity: 0.5;
        vertical-align: top;
        box-sizing: border-box;
        border-radius: 50%;
    }

    .swiper-pagination .swiper-pagination-bullet-active {
        opacity: 1;
        background-color: #FE3B2F;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
        bottom: rem(14)
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
        margin: 0;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet:nth-child(n+2) {
        margin-left: rem(14);
    }
</style>
