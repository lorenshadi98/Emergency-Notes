<template>
    <div id="Upload">
        <!--
        <button @click="getupload" class="btn btn-dark" >Upload</button>
        <button @click="getDownload" class = "btn btn-dark">Download</button>
        -->
        <p>{{serverMessage}}</p>
        <FileUpload/>
        <a href="http://localhost:3000/download?filename=test.txt" class="btn btn-primary btn-rounded" >Download Test</a>
        <router-view/>
    </div>
</template>

<script>
import * as requests from '../request';
import FileUpload from './FileUpload.vue'

export default {
  name: 'Upload',
  components: {
    FileUpload
  },
  data: function() {
    return {
      serverMessage: ""
    }
  },
  methods: {
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