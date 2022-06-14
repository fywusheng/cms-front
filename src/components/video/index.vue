<template>
    <div class="video" :name="common.name"  :style="style">
        <div class="video-wrap">
            <div class="video-body qc-video" v-if="content.type === 'qcloud'" :id="qcVideoId"></div>
            <video class="video-body normal-video" v-if="content.type === 'normal'" :src="content.video"></video>
        </div>
    </div>
</template>

<script>
export default {
    props: ['mode', 'instance_id', 'common', 'content'],
    data(){
        return {
            video: null
        }
    },
    computed: {
        style(){
            return {
                backgroundColor: this.content.color,
                padding        : this.content.padding && `0 ${this.content.padding}px`
            }
        },
        qcVideoId(){
            return this.instance_id + '_video'
        }
    },
    methods: {
        async initQcVideo(){
            var qcVideo = await this.loadQcVideoLib()
            
            this.video = new qcVideo.Player(this.qcVideoId, {
                file_id        : this.content.video,
                app_id         : '1254107791',
                hide_h5_setting: true
            })
        },
        async loadQcVideoLib(){
            return window.qcVideo || new Promise(resolve => {
                var qcVideoLib = document.createElement('script')
                qcVideoLib.onload = function(){
                    resolve(window.qcVideo)
                }
                document.body.appendChild(qcVideoLib)

                qcVideoLib.src = '//qzonestyle.gtimg.cn/open/qcloud/video/h5/h5connect.js'
            })
        }
    },
    mounted(){
        if(this.content.type === 'qcloud' && this.content.video){
            this.initQcVideo();
        }
    }
}
</script>

<style>
.video-wrap{position:relative;height:0;padding-bottom:(9/16*100%)}
.video-body{position:absolute;top:0;left:0;width:100%;height:100%;}
.qc-video>div{position:absolute;height:100% !important;background:none}
.normal-video{position:absolute;width:100%;height:100%;margin:0;border:none;outline:none;}
</style>