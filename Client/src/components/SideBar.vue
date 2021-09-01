<template>
    <div>
  <sidebar-menu :menu="menu" hideToggle="true" class="sidebar-menu"/>
  <link href="https://use.fontawesome.com/releases/v5.0.7/css/all.css" rel="stylesheet">
  </div>

</template>
<script>

    export default {
        data() {
            return {
                menu: [
                    {
                        header: false,
                        title: 'Emergency Notes',
                        href:"/",
                        hiddenOnCollapse: false
                    },
                    {
                        href: "/FileUpload",
                        title: 'Upload',
                        icon: 'fas fa-upload'
                    },
                    {
                        href: "/SearchPage",
                        title: 'Search',
                        icon: 'fas fa-search'
                    },
                    {
                        href: "/MyNotes",
                        title: 'My Notes',
                        icon: 'fas fa-sticky-note'
                    },
                    {
                        href: "",
                        title: 'Language',
                        icon: 'fas fa-language',
                        child: [
                            {
                                href: '',
                                title: 'US',
                                icon: 'fa fa-flag-usa'
                            }
                        ]

                    },
                    {
                        href: '',
                        title: 'User',
                        icon: 'fa fa-user',
                        child: [
                            {
                                href: '/Login',
                                title: 'Login',
                                icon: 'fas fa-sign-in-alt'
                            },
                            {
                                href: '/createAccount',
                                title: 'Create Account',
                                icon: 'fa fa-user'
                            },
                            {
                                href: '',
                                title: 'Sign out',
                                icon: 'fas fa-sign-out-alt'
                            }
                        ]
                    }
                ]
            }
        }
    }
</script> 

<style scoped>
.sidebar-menu{
    width: 15%;
}

</style>