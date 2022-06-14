<template>
    <div class="topic-image-list" :name="common.name"  v-if="dataList && dataList.length">
        <ul class="img-list" v-for="(imgList,index) in dataList" :key="index">
            <div class="img-wrap" :style="style" v-for="(data,subIndex) in imgList" :key="subIndex">
                <img class="image" v-lazy="XIU.getImgFormat(data.image_url, '/resize,w_1200')"
                     @click="onClick(data.topic_link)">
            </div>
        </ul>
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
                dataList: [],
                feature: {},
                options: {
                    autoplay: 4000,
                    pagination: '.swiper-pagination'
                },
                style: {},
            }
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
                        this.style = {
                            marginRight: (result.data.operation.space_height || 30) + 'px',
                            marginBottom: (result.data.operation.space_height || 30) + 'px',
                        }
                        let number = 1;
                        const dataList = [];
                        switch(result.data.operation.style){
                            case 'column1':
                                number = 1;
                                break;
                            case 'column2':
                                number = 2;
                                break;
                            case 'column3':
                                number = 3;
                                break;
                            case 'column4':
                                number = 4;
                                break;
                            case 'column5':
                                number = 5;
                                break;

                        }
                        while (result.data.contentList.length){
                            dataList.push(result.data.contentList.splice(0, number))
                        }
                        this.dataList = dataList;
                    }
                }
            },
            onClick(data) {
                XIU.genLink(data)
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
<style lang="scss" scoped>
    .topic-image-list {
        .img-list {
            display: flex;
            align-content: space-between;
            .img-wrap {
                flex: 1;
                &:last-child {
                    margin-right: 0;
                }
                .image {
                    display: block;
                    width: 100%;
                }

            }
        }
    }
</style>
