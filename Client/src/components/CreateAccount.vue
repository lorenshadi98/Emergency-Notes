<template>
    <div id="newAccount">
        <h1>Create Account</h1>
        
        <label for="username">Username:</label>
        <input type="text" v-model="username" name="username" class="form-control"/>
        <!---<input type="text" name="username" v-model="username" placeholder="Username" /> --->
        
        <label for="Password">Password:</label>
        <input type="password" v-model="password" name="password" class="form-control"/>
        <!--- <input type="password" name="password" v-model="password" placeholder="Password" />--->
        
        <label for="Email">Email:</label>
        <input type="email" v-model="email" name="email" class="form-control" />
        <!--<input type="email" name="email" v-model="email" placeholder="Email" />-->

        <b-button pill type="button" v-on:click="submit()"  style="margin-top: 20px;" >Submit</b-button>
    </div>
</template>

<script>
    import * as requests from '../request';
    export default {
        data() {
            return {
                username: "",
                password: "",
                email: ""
            }
        },
        methods: {
            submit() {
                let formData = new FormData(); 
                    formData.append('username',this.username);
                    formData.append('email',this.email);
                    formData.append("password",this.password);

                    requests.createAccount(formData);
            }
        }
    }
</script>

<style scoped>
    #newAccount {
        width: 500px;
        border: 1px solid #4c8cfe;
        background-color: #fcf8f3;
        margin: auto;
       
        padding: 20px;
    }
</style>