<template>
    <div class="masker" 
        :style="maskerStyle"
        :editing="editing"
        :hiding="hiding"
        @mousedown="onSelect()">

        <div class="masker-container" :style="viewStyle">
            <div class="masker-component">
                <slot>
                    <div class="masker-component-default">默认组件</div>
                </slot>
            </div>
            <div class="masker-corner">
                <span class="masker-corner-index">{{index + 1}}</span>
                <span class="masker-corner-name">
                    <small>{{cell.title || '?'}}</small>
                    <small>{{cell.name}}</small>
                </span>
            </div>
            <div class="masker-operate">
                <component class="masker-operate-custom"
                    :is="custom"
                    :cell="custom ? cell : null"
                    :index="index"
                    :editing="editing"
                    @custom="onCellCustom">
                </component>
            </div>
        </div>
    </div>
</template>

<script>
import message from './message'
import components from './components'

export default { // 组件上方的遮罩组件(显示组件基础信息和画热区)
    extends: message,
    props: {
        index: Number,
        cell : Object
    },
    data(){
        return {
            events: {
                cellInsert          : 'onCellInsert',
                cellInsertPreview   : 'onCellInsertPreview',
                cellInsertPreviewOut: 'onCellInsertPreviewOut',
                cellSelect          : 'onCellSelect'
            },
            selectedIndex: -1,
            insert: null,
            half  : 20
        }
    },
    computed: {
        viewStyle(){
            return {
                outerBefore: {
                    transform: `translateY(${this.half}px)`,
                    background: 'rgba(255,255,255,0.9)'
                },
                before: {
                    transform: `translateY(${this.half}px)`,
                    background: 'rgba(255,255,255,0.9)'
                },
                after: {
                    transform: `translateY(${-this.half}px)`,
                    background: 'rgba(255,255,255,0.9)'
                },
                outerAfter: {
                    transform: `translateY(${-this.half}px)`,
                    background: 'rgba(255,255,255,0.9)'
                }
            }[this.insert]
        },
        maskerStyle(){
            switch(this.insert){
                case 'before':
                case 'outerBefore':
                case 'after':
                case 'outerAfter':
                return {
                    zIndex: 1
                }

                default:
                return null
            }
        },
        editing(){
            return this.selectedIndex !== -1 && this.selectedIndex === this.index;
        },
        hiding(){
            return this.selectedIndex !== -1 && this.selectedIndex !== this.index;
        },
        custom(){ // 遮罩内部自定义组件
            if(components[this.cell.name]){
                return 'backend-' + this.cell.name
            }else{
                return null
            }
        }
    },
    methods: {
        //选择系列
        onSelect(){ // 点击组件的遮罩，通知父页当前选中组件的index
            if(this.editing) return

            this.$topicEmit('topicCellSelect', this.index)
        },
        onCellSelect(index){ // 更新内部状态 selectedIndex, 从而更新遮罩上的组件编辑态
            this.selectedIndex = index;
        },
        // 插入系列
        onCellInsertPreview(y){ // 从父页面收到预览组件插入的通知，稍微移动上下相邻组件
            var rect = this.$el.getBoundingClientRect();
            var half = Math.min(rect.height / 2, this.half);

            switch(true){
                case _.inRange(y, rect.top - half, rect.top):
                this.insert = 'outerBefore';
                break;

                case _.inRange(y, rect.top, rect.top + half):
                this.insert = 'before';
                break;

                case _.inRange(y, rect.top + half, rect.bottom - half):
                this.insert = 'inner';
                break;

                case _.inRange(y, rect.bottom - half, rect.bottom):
                this.insert = 'after';
                break;

                case _.inRange(y, rect.bottom, rect.bottom + half):
                this.insert = 'outerAfter';
                break;

                default:
                this.insert = null
            }
        },
        onCellInsertPreviewOut(){ // 从父页面接受通知，退出插入组件预览态
            this.insert = null;
        },
        onCellInsert(){ // 父页面预览面板释放新组件时，会通知本页面cellInsert, 触发这里的回调
            switch(this.insert){
                case 'before':
                this.$topicEmit('topicCellInsert', this.index)
                break;

                case 'inner':
                //在中间不算插入
                this.$topicEmit('topicCellInsert', -1)
                break;

                case 'after':
                this.$topicEmit('topicCellInsert', this.index + 1)
                break;
            }

            this.insert = null;
        },
        
        //定制系列
        onCellCustom(e){
            this.$topicEmit('topicCellCustom', e);
        }
    },
    components: _.chain(components).mapKeys((v, k) => 'backend-' + k).mapValues(n => n.default).value()
}
</script>

<style scoped>
.masker{
    position:relative;

    &-container{
        position:relative;transition:all .5s;
    }

    &-component{
        display:flex;flex-flow:column;justify-content:center;min-height:60px;pointer-events:none;

        &-default{padding-top:20px;font-size:24px;line-height:80px;text-align:center;color:#bfd9d7;}
    }

    &-corner{
        position:absolute;z-index:10;top:0;left:0;overflow:hidden;display:flex;padding-right:18px;pointer-events:none;transition:all .5s ease-out;

        &::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;box-sizing:border-box;border:1px solid rgb(72, 106, 105);background:rgba(131, 165, 164, 0.8);transform-origin:0 0;transform:skewX(-30deg);}
        span{position:relative;padding:2px 5px;font-size:12px;line-height:30px;color:#fff;}
        &-index{min-width:16px;text-align:center;color:#fff;background:rgba(72, 106, 105, .8)}
        &-name{
            small:nth-child(1){display:block;height:15px;font-size:12px;line-height:15px;}
            small:nth-child(2){display:block;height:15px;font-size:12px;line-height:15px;color:#eee;}
        }
    }

    &-operate{
        position:absolute;z-index:9;top:0;left:0;width:100%;height:100%;
        &::before{content:'';position:absolute;z-index:9;top:0;left:0;width:100%;height:100%;border:1px solid #83a5a4;box-sizing:border-box;pointer-events:none;}

        &-custom{position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:auto;}
    }
    &-container::after{content:'';position:absolute;z-index:9;top:0;left:0;width:100%;height:100%;background:rgba(192,192,192,0.6);visibility:hidden;opacity:0;}
    

    &[hiding] &-container::after{visibility:visible;opacity:1;}
    &[editing] &-operate-custom{pointer-events:auto;}
    &[editing] &-corner{transform:translateX(-100%);opacity:0;}
}
</style>