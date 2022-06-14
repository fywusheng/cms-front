<template>
    <div class="topic-menu-list-layout" :name="common.name"  ref="scrollContainer">
        <ul class="topic-menu-list" v-if="dataList && dataList.length" :style="style">
            <li class="menu" v-for="(data,index) in dataList" :key="index">
                <div class="image" v-lazy:background-image="XIU.getImgFormat(data.image)" @click="onClick(data.link)"></div>
                <div class="title" v-if="data.title">{{data.title}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        name: 'Banner',
        props: [ 'mode', 'instance_id', 'common', 'content' ],
        data() {
            return {
                dataList: [],
            }
        },
        computed: {
            style(){
                return this.content.list ? {width: `${this.content.list.length*2.26667 - 1.2}rem`} :{};
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
            onClick(data) {
                XIU.genLink(data)
            }
        },
        created() {
            this.dataList = this.content.list;
        },
        mounted() {
            this.$nextTick(this.initScroll.bind(this));
        },
        components: {

        }
    }
</script>
<style lang="scss" scoped>
    .topic-menu-list-layout {
        width: 100%;
        .topic-menu-list {
            display: flex;
            align-items: center;
            padding: rem(30);
            .menu {
                margin-right: rem(110);
                .image {
                    display: block;
                    width: rem(60);
                    height: rem(60);
                    @include backgroundImage();
                }
                .title {
                    padding-top: rem(28);
                    font-size: rem(30);
                    color: #4a4a4a;
                }
            }
        }
    }
</style>
