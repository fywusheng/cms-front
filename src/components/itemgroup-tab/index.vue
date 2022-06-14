<template>
    <div class="tab itemgroup-wrap" :name="common.name" >
        <div class="tab-title pos-r" v-affix.when="affixed">
            <div class="tab-title-inner">
                <ul class="tab-ttl-list" v-show="hasTitle">
                    <li class="tab-ttl" :class="{active: activeIndex === index}" v-for="(tab, index) in tabs" :key="index" :data-group-id="tab.content.group_id" @click="activeTab(index)" v-show="tab.title" :style="{width: 100/tabs.length + '%'}">
                        {{tab.title}}
                    </li>
                </ul>
                <span class="hl-line" :style="{width: 100/tabs.length+'%', left: activeIndex*100/tabs.length + '%'}" v-show="tabs.length > 1"></span>
            </div>
        </div>
        <div class="tab-content">
            <ul class="tab-con-list">
                <li class="tab-con" v-for="(tab, index) in tabs" :key="index" :class="{active: activeIndex === index}">
                    <component :is="getItemgroup(content.style)" :common="common" :content="tab.content" :mode="mode" :instance_id="tab.instance_id" :active="activeIndex===index"></component>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import directives from './directives';

    export default {
        name: 'ItemgroupWrap',
        props: ['mode', 'instance_id', 'common', 'content'],
        data() {
            return {
                activeIndex: 0
            };
        },
        computed: {
            tabs() {
                let {instance_id, content} = this;
                return content.group ? content.group.map((gp, i) => {
                    let tab = {instance_id: instance_id+'_' +i};
                    let con = _.pick(content, ['bg_color', 'action', 'header']);
                    con.group_id = gp.id;
                    con.title = ''; // 不显示标题
                    con.group_name = gp.name;
                    tab.content = con;
                    tab.title = gp.title;
                    return tab;
                }) : [];
            },
            hasTitle() {
                return this.tabs.some(tab => tab.title);
            },
            affixed() {
                let affix = this.tabs.length > 1; // 默认多tab吸顶, 单tab不吸顶
                let settingAffix = this.content.affix;
                if (!_.isNil(settingAffix)) {
                    affix = settingAffix;
                }
                return affix;
            }
        },
        methods: {
            getItemgroup(style) {
                var itemgroups = {
                    'COLUMN1': 'itemgroup1col',
                    'COLUMN2': 'itemgroup2cols',
                    'COLUMN3': 'itemgroup3cols'
                };
                return itemgroups[style] ? 'topic-' + itemgroups[style] : 'div';
            },
            activeTab(i) {
                this.activeIndex = i;
            },
            swipeRight() {
                this.activeTab(Math.max(this.activeIndex-1, 0));
            },
            swipeLeft() {
                this.activeTab(Math.min(this.tabs.length-1, this.activeIndex + 1));
            }
        },
        directives,
        mounted() {
            let callbacks = _.pick(this, ['swipeLeft', 'swipeRight']);
            this.$nextTick(() => {
                new XIU.Swipable(this.$el, callbacks);
            });
        }
    }
</script>


<style lang="scss" scoped>
    $gray: #aaa;
    $dark: #333;

    .pos-r {
        position: relative;
    }

    .hl-line {
        @include position($p: absolute, $l: 0, $b: 0);
        height: 2px;
        background: #4ad0b9;
        transition: left .3s ease-out;
    }

    .tab-title-inner {
        width: 10rem;
        z-index: 200;
        background: #fff;
    }

    .tab-ttl-list {
        background: #fafafa;
        display: flex;
        flex-flow: row wrap;
        border-bottom: 1px solid lighten($gray, 25%);
        border-top: 1px solid lighten($gray, 25%);
        
        .tab-ttl {
            flex: 0 0 auto;
            @include textOverEffect();
            box-sizing: border-box;
            text-align: center;
            padding: rem(30px) rem(10px);
            color: $gray;
            font-size: rem(32px);

            &.active {
                color: $dark;
            }
        }
    }

    .tab-con {
        display: none;
        &.active {
            display: block;
        }
    }
</style>