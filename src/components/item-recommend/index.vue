<template>
    <div class="topic-item-recommend" :name="common.name" >
        <!--<ul class="filter-list">-->
            <!--<li class="filter" @click="changeSort({id: 0})" :class="activeId === 0 ? 'active':''">默认</li>-->
            <!--<li class="filter" @click="changeSort(sort)" :key="sort.id" v-for="sort in sortList"-->
                <!--:class="activeId === sort.id ? 'active':''">-->
                <!--{{sort.name}}-->
                <!--<div class="filter-status" :class="sort.sort === 1 ? 'down':'up'"></div>-->
            <!--</li>-->
        <!--</ul>-->
        <ul class="item-list">
            <li class="item" @click="goItem(data)" v-for="(data,index) in list" :key="index">
                <div class="item__logo" v-lazy:background-image="XIU.getImgFormat(data.proPictDir, '/resize,w_750')"></div>
                <div class="item__name">{{data.productName}}</div>
                <div class="item__price">
                    <span class="cu-price">&yen;{{data.cuPrice}}</span>
                    <span class="origin-price">&yen;{{data.originalPrice}}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [ 'mode', 'instance_id', 'common', 'content' ],
        data() {
            return {
                sortList: [
                    {
                        id: 1,
                        sort: 0,
                        name: '按时间',
                    }, {
                        id: 2,
                        sort: 0,
                        name: '按销量',
                    }, {
                        id: 3,
                        sort: 0,
                        name: '按价格',
                    }
                ],
                activeId: 0,
                list: [],
            }
        },
        computed: {},
        methods: {
            changeSort(sort) {
                if (this.activeId === sort.id) {
                    sort.sort = sort.sort === 1 ? 0 : 1;
                }
                this.activeId = sort.id;
                let sortType;
                switch (this.activeId) {
                case 1:
                    sortType = sort.sort === 1 ? 12 : 11;
                    break;
                case 2:
                    sortType = sort.sort === 1 ? 32 : 31;
                    break;
                case 3:
                    sortType = sort.sort === 1 ? 22 : 21;
                    break;
                }
                this.loadData(sortType);
            },
            goItem(item) {
                XIU.goItem(item.productSid)
            },
            async loadData(sortType) {
                const params = {
                    pageNum: 1,
                    pageSize: 50,
                }
                if (sortType) {
                    params.sortType = sortType;
                }
                const result = await XIU.axios('https://search.playlounge.cn/product/search?v=1&appKey=100001', { params: params })
                if (result.result.result == 1) {
                    this.list = result.data.esProducts;
                }
            }
        },
        mounted() {
            this.loadData();
        }
    }
</script>

<style lang="scss" scoped>
    $black: #4a4a4a;
    $red: #DD4E8B;
    .filter-list {
        display: flex;
        align-items: center;
        padding-top: rem(23);
        padding-left: rem(20);
        padding-right: rem(20);
        border-bottom: 1px solid #ddd;
        .filter {
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            flex: 1;
            padding-top: rem(25);
            padding-bottom: rem(25);
            text-align: center;
            color: $black;
            font-size: rem(28);
            outline: none;
            .filter-status {
                margin-left: rem(2);
                width: rem(18);
                height: rem(27);
                background: center no-repeat;
                background-size: contain;
                &.up {
                    background-image: url(./up.png);
                }
                &.down {
                    background-image: url(./down.png);
                }
            }
            &.active {
                color: $red;
                &:after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    bottom: rem(10);
                    width: rem(80);
                    border-bottom: 1px solid $red;
                    transform: translateX(-50%);
                }
            }
        }
    }

    .item-list {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        padding: rem(30) rem(20);
        .item {
            width: rem(345);
            margin-bottom: rem(20);
            padding-bottom: rem(22);
            border: 1px solid #ddd;
            box-sizing: border-box;
            &:nth-child(2n+1) {
                margin-right: rem(20);
            }
            .item__logo {
                width: 100%;
                padding-bottom: 100%;
                background: center no-repeat;
                background-size: contain;
            }
            .item__name {
                padding-left: rem(20);
                padding-right: rem(20);
                width: rem(310);
                padding-top: rem(25);
                font-size: rem(28);
                color: $black;
                line-height: 1.5;
                height: rem(80);
                @include webkitLineClamp(2);
            }
            .item__price {
                padding-top: rem(40);
                padding-left: rem(20);
                .cu-price {
                    font-size: rem(30);
                    color: $red;
                }
                .origin-price {
                    font-size: rem(20);
                    text-decoration: line-through;
                    color: #8C8C8C;
                }
            }
        }
    }
</style>
