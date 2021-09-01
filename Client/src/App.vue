<template>
  <div id="app">
    <sidebar-menu :menu="menu" />
    
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <img alt="Vue logo" src="./assets/logo.png">
    
    <p>{{serverMessage}}</p>  
    <router-view/>
    
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import SideBar from './components/SideBar.vue'
import * as requests from './request';

export default {
  name: 'app',
  components: {
    HelloWorld,
    'sidebar-menu': SideBar
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
 
    },    
    getupload() {
      requests.getupload()
        .then(serverReply => {
          this.serverMessage = serverReply.data;
        })
        .catch(wat => {
          // eslint-disable-next-line
          console.error(wat)
        })
    },
    getDownload() {
      requests.getDownload()
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 15%;
}
</style>
