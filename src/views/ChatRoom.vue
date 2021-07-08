<template>
  <div>
      <MessageList  :msgs="msgs"/>
      <MessageForm :client="stompClient"/>
  </div>
</template>

<script>
import MessageForm from '@/components/chat/MessageForm.vue'
import MessageList from '@/components/chat/MessageList.vue'
import Stomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import {mapState} from 'vuex'

export default {
    name: 'ChatRoom',
    components: {
        MessageForm,
        MessageList
    },
    computed: {
        ...mapState({
            msgs: $state => $state.stomp.msgs
        })
    },
    created() {
        this.connect();
    },
    methods: {
      connect() {
        const serverURL = "http://localhost:3333";
        var socket = new SockJS(serverURL+'/gs-guide-websocket');
        this.stompClient = Stomp.over(socket);
        console.log(`���� ������ �õ��մϴ�. ���� �ּ�: ${serverURL}`)
        this.stompClient.connect({}, frame=>{
          this.connected = true;
          console.log('success connect socket', frame);
          this.stompClient.subscribe('/topic/greetings', res=>{
            console.log('message from subs', res.body);
            console.log(JSON.parse(res.body));
            // this.recvList.push(JSON.parse(res.body));
            this.$store.commit('stomp/pushMsg', JSON.parse(res.body));
            console.log(this.recvList);
          });
        },
        error => {
          console.log('���� ���� ����', error);
          this.connected = false;
        }
        );
      },
    }
}
</script>

<style>

</style>