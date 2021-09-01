<template>
    <label class="file-select">
        <div class="select-button">
            <span v-if="value">Selected File: {{value.name}}</span>
            <span v-else>Click here to select a file</span>
        </div>
        <input type="file" @change="handleFileChange"/>
    </label>
</template>

<style scoped>
    .file-select > .select-button{
        
        padding-left: 3rem;
        padding-right: 3rem;
        color: #6c757d;
        background-color:white;
        box-shadow: 2px 2px  #343a40;

        border-radius: .3rem;

        text-align: center;
        font-weight: bold;
    }

    .file-select > input[type="file"]{
        display: none;
    }
</style>

<script>
export default {
    props:{
        value: File
    },
    methods:{
        handleFileChange(e){
            this.$emit('input',e.target.files[0])
        }
    }
}
</script>