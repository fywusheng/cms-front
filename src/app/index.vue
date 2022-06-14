<template>
    <div id="app-topic">
        <!--主布局区-->
        <layout
                :mode="mode"
                :core="core"
                :level="1"
                @update-core="updateCore">
        </layout>
        <go-top></go-top>
        <div v-if="showTabbarPlaceholder" class="app-topic-tabbar-placeholder"></div>
    </div>
</template>

<script>
    import ShareIconDefault from 'root/app/assets/images/wosun-share-icon.jpg'
    import layout from 'root/app/layout'
    import goTop from '../components/go-top'

    export default {
        data() {
            return {
                core: null
            }
        },
        computed: {
            mode() {
                switch (window.CORE) {
                    //本地开发模式
                case undefined:
                case 'LOCAL'  :
                    return 'local';

                    //后台模式
                case 'BACKEND':
                    return 'backend';
                default:
                    //前台模式
                    return 'frontend';
                }
            },
            showTabbarPlaceholder() {
                return XIU.query.haveTabbar === '1'
            }
        },
        methods: {
            setDefaultShare() {
                XIU.shareInit(this.core.share_enable, {
                    title: this.core.share_title || this.core.page_title || '专题',
                    icon: this.core.share_icon || ShareIconDefault.replace(/^\/\//, 'https://'),
                    intro: this.core.share_text || '',
                    url: this.core.share_url || `${ENV.H5}/topic/${this.core.page_id}`
                })
            },
            updateCore(core) {
                this.core = core;
                document.body.style.backgroundColor = core.background;
                if (core.page_title) {
                    document.title = core.page_title;
                }
            },
            scrollTo() {
                location.hash && setTimeout(() => {
                    var target = _.get(document.getElementsByName(location.hash.substr(1)), '0');
                    if (target) {
                        document.body.scrollTop = target.offsetTop - 40;
                    }
                }, 300)
            },
            //修复某些诡异机型的rem计算过小的问题
            fixedRemBug() {
                try {
                    var containerNowWidth = this.$el.getBoundingClientRect().width
                    var containerFullWidth = 10 * parseFloat(document.documentElement.style.fontSize)
                    if (containerNowWidth != containerFullWidth && containerNowWidth > 0) {
                        var newFontSize = containerFullWidth / containerNowWidth * containerFullWidth / 10
                        document.documentElement.setAttribute('style', 'font-size:' + newFontSize + 'px')
                    }
                } catch (e) {
                }
            }
        },
        async mounted() {
            switch (this.mode) {
            case 'local':
                // 若为本地开发，则根据id(?id=mytopic), 获取专题页数据(core)
                const result = await Axios(`${ENV.CMS}/topic/getLayout?id=${XIU.query.id}`);
                console.info(result)
                XIU.query.id && this.updateCore(result.data)
                break;
            case 'frontend':
                this.updateCore(window.CORE)
                //this.setDefaultShare()
                break;
            case 'backend':
                break;
            }
            this.scrollTo();
            this.fixedRemBug();
        },
        components: {
            layout,
            goTop
        }
    }
</script>

<style scoped>
    #app-topic {
        position: relative;
        max-width: 10rem;
        margin: 0 auto;
    }

    .app-topic-tabbar-placeholder {
        height: 98/75rem
    }
</style>
