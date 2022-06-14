<template>
    <div :name="common.name"  :style="style"></div>
</template>

<script>
export default {
    props: ['mode', 'instance_id', 'common', 'content'],
    computed: {
        style(){
            return {
                height: (this.content.height / 75) + 'rem',
                backgroundColor: this.content.color
            }
        }
    }
}
</script>