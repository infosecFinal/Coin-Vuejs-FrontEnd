<template> 
    <div style="padding-bottom: 0.5em">
    <pre> </pre>
        <h4 align="center">Chatting room</h4>
    <pre> </pre>
    <b-list-group>
        <b-list-group-item id="container" class="list-group mb-9">
            <p v-for="(msg, idx) in msgs" :key="idx">{{msg.content}}</p>
        </b-list-group-item>
    </b-list-group>
    </div>
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