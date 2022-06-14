<template>
    <div class="navbar" :fixtop="isFixtop">
        <div class="navbar-area" :class="{hScrollable: hScrollable}" :style="{top: fixtopValue + 'px', backgroundColor: content.bgcolor || '#fff'}">
            <template v-if="content.area.length">
                <nav class="text-nav" v-if="content.tabType == 'text'">
                    <div class="tab-items" ref="tabItems">
                        <a
                            v-for="(item, index) in content.area"
                            :key="index"
                            :style="getAreaStyle(index)"
                            href="javascript:;"
                            class="tab-item"
                            :class="{active: index === activeIndex}"
                            @click="scrollTo(item.link.name, index)">
                            <div class="tab-item-con">{{item.link.text}}</div>
                        </a>
                    </div>
                </nav>
                <nav class="logo-nav" v-else>
                    <div class="tab-items" ref="tabItems">
                        <a
                            v-for="(item, index) in content.area"
                            :key="index"
                            :style="getAreaStyle(index)"
                            href="javascript:;"
                            class="tab-item"
                            :class="{active: index === activeIndex}"
                            @click="scrollTo(item.link.name, index)">
                            <div class="tab-item-con">
                                <img :src="item.link.icon" alt="logo" class="logo">
                                <p class="txt">{{item.link.text}}</p>
                            </div>
                        </a>
                    </div>
                </nav>
                
            </template>
        </div>
    </div>
</template>

<script>
import VueScrollTo from 'vue-scrollto'

export default {
    props: ['mode', 'instance_id', 'common', 'content'],
    data(){
        return {
            isFixtop   : false,
            fixtopValue: 0,
            activeIndex : 0,
            root       : document.getElementById('app-topic'),
            scrolling  : false
        }
    },
    computed: {
        targetFloors(){
            var result = {};
            for(var item in this.content.area){
                var name = _.get(this.content.area[item], 'link.name');
                result[name] = _.get(document.getElementsByName(name), '0')
            }
            return result
        },
        hScrollable() {// content.area.length > 4 , tab过多， 可横向滚动, tab 固定宽度
            return _.get(this.content, 'area', []).length > 4;
        },
        isTextTab() {
            return _.get(this.content, 'tabType', '') === 'text';
        }
    },
    methods: {
        getAreaStyle(index){
            var style = {};

            if(!this.hScrollable) {
                style.width = `${100/this.content.area.length}%`;
            } else {
                style.width = (160 / 750) * 10 + 'rem';
            }

            if(index === this.activeIndex && this.content.color) {
                style[this.isTextTab ? 'color' : 'backgroundColor'] = this.content.color;
            }
            return style;
        },
        scrollTo(name = '', index = 0, autoClick = false){
            if(this.scrolling && !autoClick) return;


            this.activeIndex = index;
            // 缓存点击过的tab
            this.clickedTabs = this.clickedTabs || {};
            var hasClicked = this.clickedTabs[name];

            var target = _.get(document.getElementsByName(name), '0');
            if(!target) return;

            var nowY = document.body.scrollTop;
            var targetY = target.offsetTop - this.$el.offsetHeight;

            var scrollZone = 100;
            if(Math.abs(nowY-targetY) < scrollZone){
                //距离不远, 直接跳
                document.body.scrollTop = targetY
            }else if(nowY < targetY){
                //要往下滚
                document.body.scrollTop = targetY - scrollZone;
            }else{
                //要往上滚
                document.body.scrollTop = targetY + scrollZone;
            }

            this.scrolling = true;
            VueScrollTo.scrollTo(document.body, 300, {
                easing: 'ease-out',
                offset: targetY,
                cancelable: false,
                onDone: () => {
                    console.log('finished activeIndex:', this.activeIndex, 'autoClick:', autoClick);
                    // 锚点跳转完成后，加载接口数据页面高度会变化，
                    // 所以延时自动点击一下同一个tab, 修正滚动高度到锚点位置
                    if(!hasClicked) {
                        setTimeout(() => {
                            this.scrollTo(name, index, true);
                            this.scrolling = false;
                            this.clickedTabs[name] = true;
                        }, 1500);
                    } else {
                        this.scrolling = false;
                    }

                    // this.scrolling = false;
                    // if(document.body.scrollTop < target.offsetTop - this.$el.offsetHeight){
                    //     // 中途高度有变, 重新滚
                    //     // this.scrollTo(name)
                    // }


                }
            })

            // setTimeout(() => {
            //     console.log('reset scrolling..');
            //     this.scrolling = false;
            // }, 400)
        },
        onScroll(e){
            // navbar 切换固定定位 和 默认定位
            this.isFixtop = this.$el.getBoundingClientRect().top < this.root.offsetTop;
            this.fixtopValue = this.isFixtop ? this.root.offsetTop : 0;

            // navbar 高亮对应tab
            this.detectActiveTab();
        },
        _detectActiveTab() {
            // 点击tab跳转时， 由于加载内容scrollY变化，不检查activeTab
            if(this.scrolling) return;
            const floorOffsetTops = {};
            for(var item in this.content.area){
                var name = _.get(this.content.area[item], 'link.name');
                const floor = _.get(document.getElementsByName(name), '0')
                floorOffsetTops[name] = (floor && floor.offsetTop) || 0;
            }
            //var floorOffsetTops = _.mapValues(this.targetFloors, floor => floor ? floor.offsetTop : 0);
            console.info(floorOffsetTops)
            var offsetTops = _.values(floorOffsetTops).sort(function(a, b) { return a - b;});
            var scrollTop = window.scrollY;
            var navbarH = this.$el.offsetHeight;
            var targetIdx = 0;
            

            offsetTops.forEach((offsetTop, i) => {
                if(scrollTop + navbarH >= offsetTop ) {
                    targetIdx = i;
                }
            });

            var floorName = _.keys(floorOffsetTops).find(name => floorOffsetTops[name] === offsetTops[targetIdx]);
            var activeIndex = _.findIndex(this.content.area, item => item.link.name === floorName);

            // console.log(this.targetFloors, this.floorOffsetTops);
            // console.log(floorName, '<-floorName');
            // console.log(activeIndex, '<---activeIndex');
            // console.log(targetIdx, '<---targetIdx');
            //console.info(this.$refs.tabItems.children[activeIndex])
            const tabItems = this.$refs.tabItems;
            const tabItem = this.$refs.tabItems.children[activeIndex];
            const rect = tabItem.getBoundingClientRect();
            if(rect.left > tabItems.getBoundingClientRect().width - rect.width || rect.left < 0){
                tabItems.scrollTo(rect.left < 0 ? tabItems.scrollLeft - rect.width : tabItems.scrollLeft + rect.width, 0)
            }
            this.activeIndex = activeIndex;
        }
    },
    mounted(){
        document.addEventListener('scroll', this.onScroll)
        this.$parent.$el.setAttribute('style', 'z-index:9');

        this.detectActiveTab = _.debounce(this._detectActiveTab.bind(this), 100);
    },
    beforeDestory(){
        document.removeEventListener('scroll', this.onScroll)
    }
}
</script>

<style scoped lang="scss">
.navbar{
    $navbarH: 104px;

    overflow:hidden;position:relative;height:rem($navbarH);

    &-area{
        position:absolute;top:0;width:10rem;height:rem($navbarH);
        
        nav{
            position: relative;
            height:100%;
            .tab-items {
                @include center(false, true);
                width: 100%;
            }
        }

        .tab-items {
            white-space: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
        }

        .tab-item {
            @include oneLine(70px, true);
            @include textOverEffect();
            box-sizing:border-box;
            padding: 0 10px;
            text-decoration:none;
            display: inline-block;            
            font-size: rem(28px);
            color:#919090;
            // &:nth-child(n+2){border-left:1px solid #fff;}
            
            .tab-item-con {
                position: relative;
                display: inline-block;
                max-width: 90%;
                &::after {
                    content: '';
                    @include center(true);
                    bottom: rem(2px);
                    border-bottom-width: 2px;
                    border-bottom-style: solid;
                    width: 90%;
                    visibility: hidden;
                }
            }            

        }

        &.hScrollable {
            .tab-item {
                // padding: 0;
                // padding: 0 rem(24px);
                .tab-item-con {
                    // max-width: none;
                }
            }
        }

        .tab-item.active{
            color: #000;
            .tab-item-con {
                &::after {
                    visibility: visible;                    
                }
            }
        }

        .logo-nav {
            .tab-items {
                height: rem($navbarH);
            }
            .tab-item {
                height: 100%;
                line-height: 1.3;
                color: #fafafa;
                font-size: rem(26px);
                
                .tab-item-con {
                    padding-top: rem(10px);
                    &::after{ display: none;}
                    .logo {
                        @include size(48px, 48px);
                    }
                    .txt {
                        @include textOverEffect();
                    }
                }

            }
            .tab-item.active {
                color: #fff;
            }
        }

    }

    &[fixtop] &-area{position:fixed;z-index:2008;}
}
</style>