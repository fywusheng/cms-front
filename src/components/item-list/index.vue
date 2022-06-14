<template>
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="loadData">
        <ul class="topic-item-list" :name="common.name">
            <li class="item" @click="goItem(item)" v-for="(item,index) in list" :key="index">
                <div class="item-logo" data-loading="https://xiu-obs.obs.cn-south-1.myhuaweicloud.com/1555719775998.jpg" v-lazy:background-image="XIU.getImgFormat(item.proPictDir, '/resize,w_750')">
                    <div class="sale-out-wrap"
                         v-if="(item.productState && item.productState != 5) || item.stockBlance == 0">
                        <div class="sale-out"></div>
                    </div>
                </div>
                <div class="brand-name">{{item.brandName}}</div>
                <div class="item-name">{{item.productName}}</div>
                <div class="item-price">
                    &yen;{{item.cuPrice}}
                </div>
            </li>
        </ul>
    </van-list>
</template>

<script>
    import {List} from 'vant';

    export default {
        props: ['mode', 'instance_id', 'common', 'content'],
        data() {
            return {
                timer: null,
                pagination: {
                    current: 1,
                    size: 20,
                },
                loading: false,
                finished: true,
                list: [],
            }
        },
        watch: {
            content(){
                this.loadData();
            }
        },
        computed: {
            image() {
                return XIU.getAliImg(this.content.image)
            },
            style() {
                return {
                    color: this.content.color,
                    backgroundColor: this.content.bg_color,
                }
            }
        },
        components: {
            VanList: List,
        },
        methods: {
            goItem(item) {
                XIU.goItem(item.productSid)
            },
            async loadData() {
                if(!this.content.link.meta){
                    this.finished = true;
                    return  false;
                }
                const params = {
                    pageNum: this.pagination.current++,
                    pageSize: this.pagination.size,
                }
                switch (this.content.link.meta.itemType) {
                    case 0:
                        params.planId = this.content.link.id;
                        break;
                    case 1:
                        params.brandIds = this.content.link.meta.objIds.join(',');
                        break;
                    case 2:
                        params.dispId = this.content.link.meta.objIds.join(',');
                        break;
                }
                this.loading = true;
                const result = await Axios.get(ENV.SEARCH_PLAN, {
                    params: params,
                })
                this.loading = false;
                if (result.result.result == 1) {
                    this.list = this.list.concat(result.data.esProducts)
                    this.finished = this.pagination.current > result.data.totalPage;
                }else{
                    this.finished = true;
                }
            }
        },
        async mounted() {
            if (this.content.link && this.content.link.id) {
                this.loadData();
            }
        }
    }
</script>

<style lang="scss" scoped>

    .topic-item-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding-top: rem(30);
        box-sizing: border-box;

        .item {
            position: relative;
            padding-left: rem(30);
            padding-right: rem(30);
            padding-bottom: rem(30);
            margin-bottom: rem(30);
            border-radius: rem(8);
            background-color: #fff;
            width: rem(375);
            box-sizing: border-box;

            .item-logo {
                position: relative;
                width: rem(315);
                height: rem(315);
                margin-bottom: rem(30);
                background: center no-repeat;
                background-size: contain;

                .sale-out-wrap {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, .3);

                    .sale-out {
                        @include middle-center();
                        width: rem(151);
                        height: rem(151);
                        background: url(./sale-out.png) center no-repeat;
                        background-size: cover;
                    }
                }
            }

            .brand-name {
                font-size: rem(32);
                color: $black;
                @include textOverEffect();
                line-height: rem(42);
            }

            .item-name {
                padding-top: rem(23);
                font-size: rem(26);
                line-height: rem(42);
                color: $black;
                @include textOverEffect();
            }

            .item-price {
                padding-top: rem(30);
                font-size: rem(34);
                color: $black;
                font-weight: bold;
            }
        }
    }
</style>
