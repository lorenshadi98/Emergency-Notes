<template>

    
    <div id="ErrorPage">
        <h1 style="color:Tomato;">Opssss. Looks like you are lost.</h1>
        <img alt="ErrorImage" src="../assets/error.png" style="width:600px;height:300px;"> 
        <h3 style="color:#7847E8 ">Let's take you back where you started!</h3> 
        <router-link to="/" exact>
         <button  class="btn success"  style="background-color:#DDE4EA" >Go to Home Page</button>  
                 
        </router-link>

    </div>
    
    
</template>

