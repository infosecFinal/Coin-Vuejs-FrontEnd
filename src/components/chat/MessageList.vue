<template>
  <div>
    <div class="bg-light py-3">
      <div class="container">
        <div class="row">
          <div class="col-md-12 mb-0">
            <a href="index">Home</a> <span class="mx-2 mb-0">/</span>
            <span class="text-black">Board</span>
            <span class="mx-2 mb-0">/</span>
            <strong class="text-black">Free</strong>
          </div>
        </div>
      </div>
    </div>

    <br />

    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-12">
          <h2 class="h3 mb-5 text-black">Chatroom</h2>
        </div>
      </div>
    </div>
    <div style="padding-bottom: 0.5em">
      <div>
        <b-list-group>
          <b-list-group-item id="container" class="list-group mb-9 zindex">
            <p v-for="(msg, idx) in msgs" :key="idx">{{ msg.content }}</p>
          </b-list-group-item>
        </b-list-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["msgs"],
};
</script>

<style>
.zindex {
  position: absolute;
  top: 100px;
  left: auto;
  bottom: auto;
  right: auto;
}
.list-group {
  top: 300px;
  height: 300px;
  max-height: 300px;
  max-width: 300px;
  margin-bottom: 10px;
  overflow: scroll;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
