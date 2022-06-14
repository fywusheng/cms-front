<template>
    <div class="topic-item-list-pc" :name="common.name">
        <van-list v-model="loading"
                  :finished="finished"
                  finished-text="没有更多了"
                  @load="loadData">
            <ul class="item-list" v-for="(subItemList,index) in list" :key="index">
                <li class="item" @click="goItem(item)" v-for="(item,subIndex) in subItemList" :key="subIndex">
                    <div class="item-logo" v-lazy:background-image="XIU.getImgFormat(item.proPictDir, '/resize,w_750')"></div>
                    <div class="item-point">{{item.brandName}}</div>
                    <div class="item-name">{{item.productName}}</div>
                    <div class="item-price">
                        &yen;{{item.cuPrice}}
                    </div>
                    <div class="sale-out-wrap"
                         v-if="item.isInvalid == 1 || item.stockBlance == 0">
                        <div class="sale-out"></div>
                    </div>
                </li>
            </ul>
        </van-list>
    </div>
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
        components: {
            VanList: List,
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
                    while (result.data.esProducts && result.data.esProducts.length) {
                        this.list.push(result.data.esProducts.splice(0, 4))
                    }
                    this.finished = this.pagination.current > result.data.totalPage;
                }else{
                    this.finished = true;
                }
            }
        },
        async mounted() {
            if (this.content.link && this.content.link.id && this.content.link.meta) {
                this.loadData();
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .topic-item-list-pc {
        margin-right: auto;
        margin-left: auto;

        .item-list {
            display: flex;
            align-content: space-between;
            background-color: #fff;

            .item {
                position: relative;
                width: 300px;
                padding: 20px;
                margin-bottom: 15px;
                margin-right: 15px;
                box-sizing: border-box;
                // border: 1px solid #efefef;
                cursor: pointer;

                &:hover {
                    //border: 2px solid #d5d5d5;
                    box-shadow: 0px 5px 20px 0px rgba(188, 188, 188, 0.4);
                }

                .sale-out-wrap {
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, .3);

                    .sale-out {
                        @include middle-center();
                        width: 102px;
                        height: 102px;
                        background: url(./sale-out.png) center no-repeat;
                        background-size: cover;
                    }
                }

                &:last-child {
                    margin-right: 0;
                }

                .item-logo {
                    display: block;
                    width: 100%;
                    padding-bottom: 120%;
                    margin-bottom: 20px;
                    background: center no-repeat;
                    background-size: cover;
                }

                .item-point {
                    margin-bottom: 10px;
                    font-size: 18px;
                    color: $black;
                }

                .item-name {
                    margin-bottom: 20px;
                    font-size: 16px;
                    line-height: 1.4;
                    color: $gray;
                }


                .item-price {
                    font-size: 20px;
                }
            }
        }
    }
</style>
