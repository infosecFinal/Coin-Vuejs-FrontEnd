<template> 
    <b-list-group>
        <b-list-group-item id="container" class="list-group">
            <p v-for="(msg, idx) in msgs" :key="idx">{{msg.content}}</p>
        </b-list-group-item>
    </b-list-group>
</template>

<script>
export default {
    props: ['msgs']
}
</script>

<style>
.list-group{
    height: 300px;
    max-height: 300px;
    margin-bottom: 10px;
    overflow:scroll;
    overflow-x:auto;
    overflow-y:auto;
    
}
</style>