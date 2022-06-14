<template>
    <div class="pc-layout" :page-id="core && core.page_id">

        <!--主布局区-->
        <component class="layout-main"
                   v-if="renderable"
                   :is="editable ? 'pc-backend' : 'div'"
                   :core="editable ? core : ''"
                   @update="updateCore">

            <template v-if="core">
                <section
                        v-for="(cell,index) in core.layout"
                        class="layout-section"
                        :key="cell.instance_id"
                        :index="index"
                        :cell="editable ? cell : ''"
                        :name="cell.common && cell.common.name"
                        :data-title="cell.title"
                        :data-name="cell.name"
                        :is="editable ? 'pc-masker' : 'section'">

                    <component
                            v-if="getTopicComponent(cell.name)"
                            :is="getTopicComponent(cell.name)"
                            :level="level"
                            :mode="mode"
                            :instance_id="cell.instance_id"
                            :common="cell.common"
                            :content="cell.content">
                    </component>
                </section>
            </template>
        </component>

        <div v-if="!renderable && mode==='backend'" class="layout-max-render-limit">
            <p>超过最大嵌套层级[{{maxLevel}}层]，无法渲染此专题</p>
            <p>{{core.page_id}}</p>
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            core: Object,
            mode: {
                type: String,
                default: 'frontend'
            },
            level: {
                type: Number,
                required: true
            }
        },
        computed: {
            renderable() {
                return this.level <= this.maxLevel
            },
            editable() {
                return this.mode === 'backend' && this.level === 1
            }
        },
        data() {
            return {
                // 专题嵌套最大层级
                maxLevel: 3
            }
        },
        methods: {
            getTopicComponent(name) {
                var topicComponentName = 'topic-' + name;
                if (Vue.component(topicComponentName)) {
                    return topicComponentName;
                } else {
                    return null
                }
            },
            updateCore(core) {
                this.$emit('update-core', core)
            }
        }
    }
</script>

<style scoped>
    .pc-layout {
        position: relative;
        max-width: 1200px;
        margin: 0 auto;
    }

    .layout-main {
        overflow: hidden;
    }

    .layout-section {
        position: relative;
    }

    .layout-max-render-limit {
        padding: 40px 0;
        font-size: 14px;
        line-height: 20px;
        text-align: center;
        color: rgb(131, 165, 164);
        background: rgb(238, 246, 247);
    }
</style>