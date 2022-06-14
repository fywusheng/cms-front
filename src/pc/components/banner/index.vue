<template>
  <div class="topic-banner-pc" :style="style" :name="common.name" v-if="dataList && dataList.length">
    <swiper :options="options">
      <swiper-slide v-for="(data, index) in dataList" :key="index">
        <img v-if="index === 0" class="op-banner-cell" :style="style" :src="XIU.getImgFormat(data.image_url, '/resize,w_1200')"
             @click="onClick(data.topic_link)">
        <img v-if="index > 0" class="op-banner-cell" :style="style" :src="XIU.getImgFormat(data.image_url, '/resize,w_1200')"
             @click="onClick(data.topic_link)">
      </swiper-slide>
      <div v-show="dataList.length > 1" class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
  import {swiper, swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'

  export default {
    name: 'Banner',
    props: ['mode', 'instance_id', 'common', 'content'],
    data() {
      return {
        feature: {},
        options: {
          autoplay: 3000,
          pagination: '.swiper-pagination'
        },
        dataList: [],
      }
    },
    computed: {
      style() {
        return {
          width: '100%',
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
<style lang="scss">
  .topic-banner-pc {
    .swiper-wrapper {
      height: unset;
      .swiper-slide {
        .op-banner-cell {
          display: block;
          width: 100%;
          cursor: pointer;
        }
      }
    }

    .swiper-pagination {
      height: 15px;
    }

    .swiper-pagination .swiper-pagination-bullet {
      width: 15px;
      height: 15px;
      background: #ccc;
      opacity: 0.5;
      vertical-align: top;
      box-sizing: border-box;
      border-radius: 50%;
    }

    .swiper-pagination .swiper-pagination-bullet-active {
      opacity: 1;
      background-color: #707070;
    }

    .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: 20px
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
      margin: 0;
    }

    .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet:nth-child(n+2) {
      margin-left: 15px;
    }
  }
</style>
