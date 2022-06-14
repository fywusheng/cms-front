<template>
    <div class="scroll-container" ref="scrollContainer">
        <ul class="topic-item-list-h" :style="itemStyle" :name="common.name">
            <li class="item" @click="goItem(item)" v-for="(item,index) in list" :key="index">
                <div class="item-logo" v-lazy:background-image="XIU.getImgFormat(item.proPictDir, '/resize,w_750')"></div>
                <div class="item-name">{{item.productName}}</div>
                <div class="item-price">
                    &yen;{{item.cuPrice}}
                </div>
                <!--<div class="more" @click.stop="toMore" v-if="content.link && content.link.id && index === list.length - 1">-->
                <!--查看全部-->
                <!--</div>-->
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        props: ['mode', 'instance_id', 'common', 'content'],
        data() {
            return {
                pagination: {
                    current: 1,
                    size: 30,
                },
                list: [],
            }
        },
        computed: {
            itemStyle() {
                return {width: `${this.list.length * 3.1}rem`};
            }
        },
        methods: {
            goItem(item) {
                XIU.goItem(item.productSid)
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
        },
        async mounted() {
            if (this.content.link && this.content.link.id) {
                const result = await Axios.get(ENV.SEARCH, {
                    params: {
                        pageNum: this.pagination.current,
                        pageSize: this.pagination.size,
                        planId: this.content.link.id,
                    }
                })
                if (result.result.result == 1) {
                    this.list = result.data.esProducts;
                    this.$nextTick(() => {
                        this.initScroll()
                    });
                }
            }
        }
    }
</script>

<style lang="scss">
    .scroll-container {
        width: 100%;
    }

    .topic-item-list-h {
        display: flex;
        align-items: center;
        padding-top: rem(30);
        padding-bottom: rem(30);

        .item {
            position: relative;
            padding-bottom: rem(25);
            width: rem(210);
            margin-right: rem(20);
            box-shadow: rem(1) rem(2.598) rem(7) 0 rgba(0, 0, 0, .1);

            .more {
                position: absolute;
                top: 0;
                right: 0;
                width: rem(210);
                height: rem(185);
                line-height: rem(185);
                font-size: rem(24);
                color: $extra-gray;
                text-align: center;
                background-color: rgba(255, 255, 255, .502);
            }

            .item-logo {
                width: rem(210);
                height: rem(185);
                @include backgroundImage();
            }

            .item-name {
                padding-left: rem(30);
                padding-right: rem(30);
                padding-top: rem(10);
                font-size: rem(26);
                color: #484848;
                @include ellipsis();
            }

            .item-price {
                padding-top: rem(15);
                font-size: rem(28);
                text-align: center;
            }
        }
    }
</style>
