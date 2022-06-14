<template>
    <div class="pc-pingou">
        <div class="pingou-bg"
             :style="{
                backgroundImage: content.bg.image ? `url(${XIU.getImgFormat(content.bg.image, '/interlace,1/resize,w_1200/quality,q_1')})` : ''
            }">
            <div class="pingou-bg-cell" v-for="n in bgCellsCount" :style="getCellStyle(n)"></div>
        </div>
        <div class="pingou-area">
            <div class="pingou-area-a"
                 v-for="(item, index) in content.area"
                 :style="getAreaStyle(item.rect)"
                 :data-type="item.link.type"
                 :data-desc="item.link.desc"
                 @click="onAreaClick(item, index)">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['mode', 'instance_id', 'common', 'content'],
        data(){
            return {

            }
        },
        computed: {
            bgSize(){
                return {
                    w: this.content.bg.total_width,
                    h: this.content.bg.total_height,
                    c: this.content.bg.cell_height
                }
            },
            bgCellsCount(){
                return Math.ceil(this.bgSize.h / this.bgSize.c)
            }
        },
        methods: {
            getCellStyle(index){
                var height = this.bgSize.c;

                //最后一个特殊处理
                if(index === this.bgCellsCount){
                    height = (this.bgSize.h % this.bgSize.c) || this.bgSize.c
                }

                return {
                    backgroundImage: XIU.getImgFormat(this.content.bg.image, `/resize,w_1200/indexcrop,y_${this.content.bg.cell_height},i_${index-1}`),
                    paddingBottom: height / this.bgSize.w * 100 + '%'
                }
            },
            getAreaStyle(rect){
                const width = this.content.bg.total_width*document.body.clientWidth/1200;
                return{
                    left  : rect.x * 100 + '%',
                    top: rect.y * width + 'px',
                    width : rect.w * 100 + '%',
                    paddingBottom: rect.h * 100 + '%'
                }
            },
            onAreaClick(area){
                XIU.genLink(area.link)
            }
        }
    }
</script>

<style rel="stylesheet/scss" scoped>

    .pc-pingou {
        position: relative;
        overflow: hidden;

        .pingou-bg {
            pointer-events: none;
            background: no-repeat center top;
            background-size: 100%;

            .pingou-bg-cell {
                display: block;
                width: 100%;
                background: center no-repeat;
                background-size: cover;
            }
        }

        .pingou-area {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            &::before {
                content: '';
                display: block;
                overflow: hidden;
                width: 100%;
                height: 0;
                padding-bottom: 100%;
                pointer-events: none;
            }

            .pingou-area-a {
                position: absolute;
                -webkit-tap-highlight-color: transparent;
            }
        }
    }
</style>
