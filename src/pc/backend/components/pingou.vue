<template>
    <div class="topic-pc-pingou" :editing="editing" @mousedown.self="onDrawAreaStart">
        <div class="pingou-area">
            <div class="pingou-area-a"
                v-for="(item, index) in content.area"
                :key="index"
                :style="{
                    left  : item.rect.x * 100 + '%',
                    top   : item.rect.y * 100 + '%',
                    width : item.rect.w * 100 + '%',
                    height: item.rect.h * 100 + '%'
                }"
                :selected="index === selected"
                :type-label="getAreaLinkLabel(item, index)"
                @mousedown="e => onDragArea(index, e)">
                
                <i class="pingou-area-a-ctrl" @mousedown.stop="e => onResizeAreaStart(index, e)"></i>
            </div>

            <!--热区预览-->
            <div class="pingou-area-preview"
                v-if="dragview.dragging"
                :style="previewRectStyle">
                <div class="pingou-area-preview-cell" v-for="n in dragview.column"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        index  : Number,
        cell   : Object,
        editing: Boolean
    },
    data(){
        return {
            dragview: {
                dragging: false,
                mode  : null,
                index : null,
                timer : null,
                target: null,
                column: 1,
                /**
                 * origin 拖拽区在容器的起点
                 * start  拖拽区在页面的起点
                 * end    拖拽区在页面的终点
                 */
                rectMeta: {
                    ox: 0, oy: 0,
                    sx: 0, sy: 0,
                    ex: 0, ey: 0
                }
            },
            selected: -1,
            originBodyStyle: ''
        }
    },
    watch: {
        editing(value){
            if(!value){
                this.selected = -1;
            }
        },
        cell: {
            deep: true,
            handler(value, oldValue){
                if(_.get(value, 'content.area.length') < _.get(oldValue, 'content.area.length')){
                    //被删除了
                    this.onSelectArea(-1)
                }
            }
        }
    },
    computed: {
        content(){
            return this.cell.content
        },
        previewRectStyle(){
            var rect = this.getPreviewRect();
            
            return {
                left  : rect.x + 'px',
                top   : rect.y + 'px',
                width : rect.w + 'px',
                height: rect.h + 'px'
            }
        }
    },
    methods: {
        // 新建热区 mode=draw
        onDrawAreaStart(e){
            this.onSelectArea(-1)

            this.dragview = {
                dragging: true,
                mode    : 'draw',
                index   : null,
                column  : 1,
                rectMeta: {
                    ox: e.offsetX,
                    oy: e.offsetY,
                    sx: e.pageX,
                    sy: e.pageY,
                    ex: e.pageX,
                    ey: e.pageY
                }
            }
            this.originBodyStyle = document.body.style.cssText;
            document.body.style.cssText += '-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;'
            window.addEventListener('mousemove', this.onDrawAreaMove);
            window.addEventListener('mouseup',   this.onDrawAreaEnd);
            window.addEventListener('keydown',   this.onDrawAreaSplit);
        },
        onDrawAreaMove(e){
            this.dragview.rectMeta.ex = e.pageX;
            this.dragview.rectMeta.ey = e.pageY;
        },
        onDrawAreaEnd(e){
            this.dragview.dragging = false;
            document.body.style.cssText = document.body.style.cssText;
            window.removeEventListener('mousemove', this.onDrawAreaMove);
            window.removeEventListener('mouseup',   this.onDrawAreaEnd);
            window.removeEventListener('keydown',   this.onDrawAreaSplit);

            var rect = this.getPreviewRect();
            var col  = this.dragview.column;
            // 热区过小不算
            if(rect.w < 20*col || rect.h < col) return;
            this.createArea(rect, col)
            this.onSelectArea(this.content.area.length)
        },
        onDrawAreaSplit(e){
            if(e.shiftKey){
                this.dragview.column = (this.dragview.column % 4) + 1;
            }
        },

        // 移动热区 mode=move
        onDragArea(index, e){
            this.onSelectArea(index);

            _.assign(this.dragview, {
                mode    : 'move',
                index,
                rectMeta: {
                    ox: e.offsetX,
                    oy: e.offsetY,
                    sx: e.pageX,
                    sy: e.pageY,
                    ex: e.pageX,
                    ey: e.pageY
                }
            })

            document.body.style.cssText = '-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;'
            window.addEventListener('mouseup',   this.onDropArea);
            this.dragview.timer = setTimeout(() => {
                this.dragview.dragging = true;
                window.addEventListener('mousemove', this.onMoveArea);
            }, 300)
        },
        onMoveArea(e){
            this.dragview.rectMeta.ex = e.pageX;
            this.dragview.rectMeta.ey = e.pageY;
        },
        onDropArea(e){
            clearTimeout(this.dragview.timer);

            this.dragview.dragging = false;
            document.body.style.cssText = '';
            window.removeEventListener('mousemove', this.onMoveArea);
            window.removeEventListener('mouseup',   this.onDropArea);
            
            this.changeArea(this.getPreviewRect(), this.dragview.index);
        },

        // 缩放热区 mode=resize
        onResizeAreaStart(index, e){
            _.assign(this.dragview, {
                dragging: true,
                mode    : 'resize',
                index,
                rectMeta: {
                    ox: e.offsetX,
                    oy: e.offsetY,
                    sx: e.pageX,
                    sy: e.pageY,
                    ex: e.pageX,
                    ey: e.pageY
                }
            })
            document.body.style.cssText = '-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer;'
            window.addEventListener('mousemove', this.onResizeAreaMove);
            window.addEventListener('mouseup',   this.onResizeAreaEnd);
        },
        onResizeAreaMove(e){
            this.dragview.rectMeta.ex = e.pageX;
            this.dragview.rectMeta.ey = e.pageY;
        },
        onResizeAreaEnd(e){
            this.dragview.dragging = false;
            document.body.style.cssText = '';
            window.removeEventListener('mousemove', this.onResizeAreaMove);
            window.removeEventListener('mouseup',   this.onResizeAreaEnd);

            this.changeArea(this.getPreviewRect(), this.dragview.index);
        },

        // 获取热区label
        getAreaLinkLabel(item, index){
            if(item.link.type === 'none'){
                return (index + 1)
            }else{
                return (index+1) + '#' + (item.link.label || '')
            }
        },

        // 获取热区的尺寸
        getPreviewRect(){
            var {ox, oy, sx, sy, ex, ey} = this.dragview.rectMeta;
            var {clientWidth:mw, clientHeight:mh} = this.$el;
            var rect = _.get(this.content, `area[${this.dragview.index}].rect`, {});
            var rx = rect.x * mw;
            var ry = rect.y * mw;
            var rw = rect.w * mw;
            var rh = rect.h * mw;
            var p1={}, p2={};

            switch(this.dragview.mode){
                case 'draw':
                    p1.x = _.clamp(ox, 0, mw);
                    p1.y = _.clamp(oy, 0, mh);
                    p2.x = _.clamp(ox + (ex - sx), 0, mw);
                    p2.y = _.clamp(oy + (ey - sy), 0, mh);

                    return {
                        x : Math.min(p1.x,  p2.x),
                        y : Math.min(p1.y,  p2.y),
                        w : Math.abs(p1.x - p2.x),
                        h : Math.abs(p1.y - p2.y)
                    }

                case 'move':
                    var dx = _.clamp(ex - sx, -rx, mw - rx - rw);
                    var dy = _.clamp(ey - sy, -ry, mh - ry - rh);

                    return {
                        x : rx + dx,
                        y : ry + dy,
                        w : rw,
                        h : rh,
                    }
                
                case 'resize':
                    p1.x = rx;
                    p1.y = ry;
                    p2.x = _.clamp(rx + rw + (ex - sx), 0, mw);
                    p2.y = _.clamp(ry + rh + (ey - sy), 0, mh);

                    return {
                        x : Math.min(p1.x,  p2.x),
                        y : Math.min(p1.y,  p2.y),
                        w : Math.abs(p1.x - p2.x),
                        h : Math.abs(p1.y - p2.y)
                    }
            }
        },

        // 生成热区
        createArea(rect, col){
            var result = [];

            for(let i=0; i<col; i++){
                result.push({
                    x: (rect.x + rect.w / col * i) / this.$el.clientWidth,
                    y: (rect.y)                    / this.$el.clientWidth,
                    w: (rect.w / col)              / this.$el.clientWidth,
                    h: (rect.h)                    / this.$el.clientWidth
                })
            }
            this.$emit('custom', {
                type : 'createArea',
                value: {
                    rect: result
                }
            })
        },

        // 改变热区
        changeArea(rect, index){
            this.$emit('custom', {
                type : 'changeArea',
                value: {
                    index,
                    rect: {
                        x: rect.x / this.$el.clientWidth,
                        y: rect.y / this.$el.clientWidth,
                        w: rect.w / this.$el.clientWidth,
                        h: rect.h / this.$el.clientWidth
                    }
                }
            })
        },

        // 选择热区
        onSelectArea(index){
            if(!this.editing || this.selected === index) return;
            
            this.selected = index;
            this.$emit('custom', {
                type : 'selectArea',
                value: {
                    index
                }
            })
        }
    }
}
</script>

<style scoped>
.topic-pc-pingou{
    position:relative;overflow:hidden;

    .pingou-area {
        position:absolute;top:0;left:0;width:100%;pointer-events:none;
        &::before{content:'';display:block;overflow:hidden;width:100%;height:0;padding-bottom:100%;}

        &-a{
            position:absolute;background:rgba(0,0,0,0.6);box-sizing:border-box;border:1px solid #fff;color:#fff;word-break:break-all;cursor:pointer;pointer-events:auto;
            &[selected]{z-index:1;background:rgba(191, 217, 215, 0.8);border-color:rgb(31, 61, 59);color:#000;}

            &::before{content:attr(type-label);position:absolute;top:0;left:0;overflow:hidden;width:100%;height:100%;padding:0 5px;box-sizing:border-box;font-size:12px;line-height:1.5em;}

            &[selected] &-ctrl{
                position:absolute;bottom:-5px;right:-5px;width:10px;height:10px;border:1px solid #000;box-sizing:border-box;background:#fff;
            }
        }

        &-preview{
            position:absolute;z-index:2;display:flex;

            &-cell{flex:1;background:rgba(131, 165, 164, 0.6);box-sizing:border-box;border:1px dashed #fff;}
        }
    }

    &:not([editing]) &-area-a{background:rgba(192,192,192,0.6);}
}
</style>