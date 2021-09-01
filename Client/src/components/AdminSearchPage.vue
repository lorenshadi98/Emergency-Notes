<template>
    <div id="Admin">
        <p>Admin Search</p>
        <input v-model="school" placeholder="School">
        <input v-model="course" placeholder="Course">
        <input v-model="professor" placeholder="Professor">
        <select v-model="username">
          <option value="Public">Public</option>
          <option>MyNotes</option>
          </select>
        <button v-on:click="submitAdminSearch()">Search</button>
        <b-table striped hover 
                :items="items" 
                :fields="fields">
            <template v-slot:cell(reported)= "data">
                <b-button size="sm" @click="approveFile(data.item)" class="mr-2">
                    Approve
                </b-button>
            </template>
            <template v-slot:cell(delete)="data">
                <b-button size="sm" @click="deleteFile(data.item)" class="mr-2">
                     Delete 
                </b-button>
            </template>
            <template v-slot:cell(download)="data">
                <b-button size="sm" @click="requestDownload(data.item)" class="mr-2">
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
            deleted:null,
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
          label:'Approve',
          sotable: false,
        },
        {
          key:'delete',
          label:'Delete',
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
          submitAdminSearch() {
              let queryParams = {
                  school: this.school,
                  course: this.course,
                  professor: this.professor,
                  username: this.username
              }
              
              requests.getReportedFiles(queryParams).then((filesReturn) => {
                  /* eslint-disable */
                  //debugger;
                  this.items = filesReturn.data
              });
              
          },
          logItems(item){
              console.log(item);
          },
          approveFile(params){
              let approveparams = {
                filename: params.filename,
                filepath: params.filepath
              }            
              requests.approveFiles(params);
          },
          deleteFile(params){
              let deleteparams = {
                filename: params.filename,
                filepath: params.filepath
              }
              requests.deleteFiles(params).then((response)=>{
              });
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