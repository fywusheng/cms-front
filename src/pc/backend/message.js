export default {
    data(){
        return {
            events: {}
        }
    },
    methods: {
        $topicEmit(type, data){ // post message to parent
            window.top.postMessage({
                name: 'topic',
                type,
                data,
            }, '*')
        },
        onMessage(e){ // get message from parent
            if(e.data.name === 'topic'){
                _.invoke(this, _.get(this, `events.${e.data.type}`), e.data.data);
            }
        }
    },
    mounted(){
        window.addEventListener('message', this.onMessage)
    },
    beforeDestory(){
        window.removeEventListener('message', this.onMessage)
    }
}