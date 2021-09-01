<template>
    <div id="About">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <p>Emergency notes is a Web based note sharing app developed by a sacramento state based design team.</p>
        <p>This App was designed to aid students in their classes by faciliating the peer to peer learning though</p>
        <p>sharing and commenting on the contents of a class or lecture of a specific teacher via the notes taken.</p>
        <p>as of today Emergency Notes is still a work in progress and so this, below is a simple demonstration of the</p>
        <p>full stack software used in its construction. This page is someting of the test page as of time of writing.</p>
        <button @click="getHello" class="btn btn-dark" >Show hello</button>
        <button @click="getByebye" class="btn btn-dark" > Show goodbye</button>
        <p>{{serverMessage}}</p>
    </div>
</template>

<script>
import * as requests from '../request';
import HelloWorld from './HelloWorld.vue'

export default {
  name: 'About',
  components: {
    HelloWorld
  },
  data: function() {
    return {
      serverMessage: ""
    }
  },
 methods: {
    getHello() {
      requests.getHello()
        .then(serverReply => {
          this.serverMessage = serverReply.data;
        })
        .catch(wat => {
          // eslint-disable-next-line
          console.error(wat)
        })
    },
    getByebye() {
      requests.getGoodbye()
        .then(serverReply => {
          this.serverMessage = serverReply.data;
        })
        .catch(wat => {
          // eslint-disable-next-line
          console.error(wat)
        })
    }
 }
}
</script>