<template>
    <div class="backend">
        <transition-group name="list-complete" tag="div">
            <slot></slot>
        </transition-group>
    </div>
</template>

<script>
import message from './message'

export default {
    props: {
        core: Object
    },
    data(){
        return {
            events: {
                coreUpdate: 'onCoreUpdate',
                cellInsert: 'onCellInsert'
            }
        }
    },
    methods: {
        onCellInsert(){ // 通知父页面添加新组件完成
            setTimeout(() => {
                this.$topicEmit('topicCellInsertEnd')
            })
        },
        onCoreUpdate(core){ // 从父页面获取到core, 传递给父组件app.vue，遍历渲染组件列表
            this.$emit('update', core)
        }
    },
    mounted(){ // 通知父页面 子页面初始化完成
        this.$topicEmit('topicInit')
    },
    extends: message
}
</script>

<style>
body{overflow-x:hidden;overflow-y:scroll}
.backend {padding-bottom: 230px;}
.list-complete{
    &-enter{opacity:0}
    &-enter-to{transition:opacity .5s;}
    &-leave-to{opacity:0;transform:translateX(-30px);transition:all .5s}
}
</style>