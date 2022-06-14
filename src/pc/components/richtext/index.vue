<template>
    <div>
        <div :name="common.name"  class="richtext-container" v-html="content.text" :style="{backgroundColor:content.color}"></div>
    </div>
</template>

<script>
export default {
    props: ['mode', 'instance_id', 'common', 'content']
}
</script>

<style>
.richtext-container{
    padding:15px;
    p{font-size:13px; line-height:1.5;}
    strong{font-weight:bold}
}
</style>