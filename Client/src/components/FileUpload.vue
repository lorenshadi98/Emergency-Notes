<template>
    <div class="container">  
        <table>
            <tr>
                <td>
                    <b-form-input v-model="school" placeholder="Enter School Name"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>
                    <b-form-input v-model="course" placeholder="Enter Course Name"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>
                    <b-form-input v-model="professor" class="inputField" placeholder="Enter Professor Name"></b-form-input>
                </td>
            </tr>
            <tr>
                <td>
                    <fileselect v-model="file"></fileselect>
                </td>
            </tr>
          <select v-model="username">
            <option value="Public">Public</option>
            <option >MyNotes</option>
          </select>
            <tr>
                <td><b-button pill v-on:click="submitFile()">Submit File</b-button></td>
            </tr>
        </table>

    </div>
</template>

<style>

button{
    font-size: 110%;
    border-radius: .2rem;
    color:black
}
b-form-input{
    color:black;
    border-radius: .2rem;
    
}
table{
    width: 500px;
    margin-left: auto;
    margin-right: auto;
    align-self: center;
    border-radius: .5rem;
    
    border: 1px solid #4c8cfe;
    background-color: #fcf8f3;
}
tr, td{
    padding: 30px;
    font-size: 110%; 
    
}


</style>


<script>
import fileselect from './fileSelector.vue';

import * as requests from '../request';
//import axios from 'axios';
//const serverBase = 'http://localhost:3000';
    export default {
        components:{
            fileselect
        },
        data(){
            return {
                course: '',
                school: '',
                professor: '',
                file: null,
                username: null
            }
        }, 

        methods: {
            submitFile(){
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('school', this.school);
                formData.append('course', this.course);
                formData.append('professor', this.professor);
                formData.append('username', this.username);
                requests.postFile(formData);
                
            },

            handleFileUpload(){
                this.file = this.$refs.file.files[0];
            }
        }
    }
</script>