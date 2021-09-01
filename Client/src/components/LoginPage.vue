<template>
    <div id="login">
        <h1>Login</h1>
         <label for="username">Username:</label>
                <input type="username" v-model="username" name="username" class="form-control"/>
        
        <label htmlFor="password">Password:</label>
                <input type="password" v-model="password" name="password" class="form-control"/>
      <div id="LoginButton">
           <b-button pill v-on:click="login()" style="margin-top: 20px;">Login</b-button>
           
       </div>
    </div>
</template>

<script>
    import * as requests from '../request';
    export default {
        //name: 'Login',
        data() {
            return {
                input: {
                    username: "",
                    password: "",
                }
            }
        },
        methods: {
            login() {
                let formData = new FormData(); 
                    formData.append('username',this.username);
                    formData.append("password",this.password);
                    requests.login(formData);
            },
            logoff() {
                requests.logoff();
            }
        }
    }
</script>

<style scoped>
    #login {
        width: 500px;
        border: 1px solid #4c8cfe;
        background-color: #fcf8f3;
        margin: auto;
        padding: 20px;
    }
</style>