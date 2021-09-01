<template>
    <div id="SearchPage">
        <p>Advanced Search</p>
        <input v-model="school" placeholder="School">
        <input v-model="course" placeholder="Course">
        <input v-model="professor" placeholder="Professor">
      
        <b-button pill v-on:click="submitSearch()" style="margin-top: 20px; margin-bottom: 20px;" >Search</b-button>
        <b-table striped hover 
                :items="items" 
                :fields="fields">
            <template v-slot:cell(reported)= "data">
                <b-button pill size="sm" @click="reportFile(data.item)" class="mr-2">
                     Report
                </b-button>
            </template>
            <template v-slot:cell(download)="data">
                <b-button pill size="sm" @click="requestDownload(data.item)" class="mr-2">
                     Download
                </b-button>
            </template>
        </b-table>
        </div>
        
    
</template>

<script>

  import * as requests from '../request';

  export default {
    data(){
        return {
          school: null,
          course:null,
          professor:null,
          items: [ {
            school: null,
            course: null,
            professor: null,
            filename: null,
            filepath: null,
            username: null,
            reported:null,
            download: null,
            uploaddate: new Date()
            }],
          fields: [{
            key: 'school',
            label: 'School',
            sortable: true
          },
        {
          key: 'course',
          label: 'Course',
          sortable: true
        },
        {
          key: 'professor',
          label: 'Professor',
          sortable: true
        },
        {
          key: 'filename',
          label: 'File Name',
          sortable: true
        },
        {
          key: 'filepath',
          label: 'File Path',
          sortable: true
        },
        {
          key: 'username',
          label: 'User Name',
          sortable: true,
        },
        {
          key:'reported',
          label:'Report',
          sotable: false,
        },
        {
          key:'download',
          label:'Download',
          sotable: false,
        }]
      }
      }, 

      methods: {
          submitSearch() {
              let queryParams = {
                  school: this.school,
                  course: this.course,
                  professor: this.professor,
                  username: "Public"
              }
              
              requests.getFiles(queryParams).then((filesReturn) => {
                  /* eslint-disable */
                  //debugger;
                  this.items = filesReturn.data
              });
              
          },
          logItems(item){
              console.log(item);
          },
          reportFile(params){
              let reportparams = {
                filename: params.filename,
                filepath: params.filepath
              }            
              requests.reportFiles(params);
          },
          requestDownload(params){
              let downloadparams = {
                filename: params.filename,
                filepath: params.filepath
              }
              console.log("file name:"+ params.filename);
              console.log("file path:"+ params.filepath);
              requests.downloadFiles(params).then((response)=>{
                var fileURL = window.URL.createObjectURL(new Blob([response.data]));
                var fileLink = document.createElement('a');
                fileLink.href = fileURL;
                fileLink.setAttribute('download', params.filename);
                document.body.appendChild(fileLink);
                fileLink.click();
              });
          }
      
      }
  }
</script>

<style scoped>
    #searchpram {
        width: 500px;
        border: 1px solid #4c8cfe;
        background-color: #fcf8f3;
        margin: auto;
        padding: 20px;
    }
</style>

         
