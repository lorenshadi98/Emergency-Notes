<template>
    <!--
    <div id="Profile">
        <p>Profile Page will be here</p>
    </div>
    !-->
    <div id="app" :style="{width: loggedIn?'200px':'200px'}">
    <h1>User ID</h1>
    <label for="user-name">Profile Name</label>
    <div class="field">
        <span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
        <input v-model="user.name" v-show="showField('name')" id="user-name" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField">
    </div>
  
    <label for="user-email">Email Address</label>
    <div class="field">
        <span class="field-value" v-show="!showField('email')" @click="focusField('email')">{{user.email}}</span>
        <input v-model="user.email" v-show="showField('email')" type="email" class="field-value form-control" @focus="focusField('email')" @blur="blurField">
    </div>
    
    </div>
    
</template>



<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.3.4/vue.min.js"></script>
<script>
import * as requests from '../request';
    export default {
        
        data(){
            return {
                
                 user : {
                 name: '',
                 email: ''
                 },
                editField : ''
                
             }
                
         },
        methods : {
            focusField(name){
            this.editField = name;
            },
            blurField(){
            this.editField = '';
            },
            showField(name){
            return (this.user[name] == '' || this.editField == name)
            }
        }
    }
</script>
