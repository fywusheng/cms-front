<template>
    <div class="scroll-container" :name="common.name"  v-show="dataList && dataList.length" ref="scrollContainer">
        <div class="banner-list" :style="bannerStyle">
        <img class="banner" @click="onClick(data.topic_link)" v-for="(data, index) in dataList" :key="index"
                v-lazy="XIU.getImgFormat(data.image_url, '/resize,w_750')">
        </div>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

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
            bannerStyle() {
                return this.dataList ? { width: `${this.dataList.length * 6.93334 + 0.4}rem` } : {};
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
                this.$nextTick(this.initScroll.bind(this));
            },
            initScroll() {
                if (this.scroll) {
                    this.scroll.refresh();
                    return;
                }
                this.scroll = new BScroll(this.$refs.scrollContainer, {
                    eventPassthrough: "vertical",
                    scrollX: true,
                    tap: true,
                    preventDefault: false
                });
            },
            onClick(link) {
                XIU.genLink(link)
            }
        },
        mounted(){
          this.getData();
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .scroll-container {
        width: 100%;
        .banner-list {
            display: flex;
            padding-left: rem(25);
            .banner {
                width: rem(500);
                height: auto!important;
                margin-right: rem(20);
                background: center no-repeat;
                background-size: contain;
            }
        }
    }
</style>
