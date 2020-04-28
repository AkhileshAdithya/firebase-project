<template>
    <div class="Navbar">
        <nav class="nav-extended orange">
            <div class="nav-content">
                <span class="nav-title">
                    <router-link :to="{ name: 'Home'}">
                        Notes
                    </router-link>
                </span>
                <span class="fabholder right">
                    <a class="buttonl btn-floating btn-large waves-effect waves-light orange darken-2">
                        <router-link :to="{name: 'NewNote'}"><i class="material-icons">note</i></router-link>
                    </a>
                    <span class="empty"> </span>
                    <a class="buttonl btn-floating btn-large waves-effect waves-light orange darken-2">
                        <router-link :to="{name: 'NewList'}"><i class="material-icons">list</i></router-link>
                    </a>
                </span>
            </div>
            
        </nav>
    </div>
</template>
<script>
export default {
    name: 'Navbar',
    data(){
        return{

        }
    },
    methods:{
        
    }
    
}
</script>
<style>
.nav-content .nav-title{
    padding-left: 3%;
}
.nav-content .fabholder{
    padding: 3.6% 1%;
    display: inline;
}
</style>