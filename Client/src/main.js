//Main
import Vue from 'vue';
import App from './App.vue';

//Libraries
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueSidebarMenu from 'vue-sidebar-menu';
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css';
import VueRouter from 'vue-router';
import BootstrapVueIcons from 'bootstrap-vue';
Vue.use(BootstrapVueIcons)



//Initialization
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueSidebarMenu);
Vue.config.productionTip = false

//Router Setup
import Home from './components/Home.vue';
import About from './components/About.vue';
import LoginPage from './components/LoginPage.vue';
import SearchPage from './components/SearchPage.vue';
import FileUpload from './components/FileUpload.vue';
import ErrorPage from './components/ErrorPage.vue';
import addAccount from './components/CreateAccount.vue';
import adminSearch from './components/AdminSearchPage.vue';
import MyNotesPage from './components/MyNotes.vue'

const router = new VueRouter({
  routes: [
    {path: '/', component: Home},
    {path: '/About', component: About},
    {path: '/Login', component: LoginPage},
    {path: '/SearchPage', component: SearchPage},
    {path: '/ErrorPage', component: ErrorPage},
    {path: '/FileUpload', component: FileUpload},
    {path: '/createAccount', component: addAccount},
    {path: '/adminSearch', component: adminSearch},
    {path: '/MyNotes', component: MyNotesPage}
  ]
});

//Start Website
new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
