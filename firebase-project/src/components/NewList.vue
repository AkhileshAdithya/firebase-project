<template>
    <div class="container NewList">
        <h2 class="center-align">Add a New Checklist</h2>
        <form @submit.prevent="AddList">
            <div class="field title">
                <label for="title">List Title:</label>
                <input type="text" name="title" v-model="title" placeholder="title">
            </div>      
            <div class="field content" v-for="(cont, index) in content" :key="index">
                <label for="content">List Content:</label>
                <input type="text" name="contentdone" v-model="content[index]">
                <p v-if="contentStatus[index]">
                    <label>
                        <input type="radio" name="contentl" value="true" checked v-model="contentStatus[index]">
                        <span>True/Done</span>
                    </label>
                </p>
                <p v-else-if="!contentStatus[index]">
                    <label>
                        <input type="radio" name="contentl" value="true" v-model="contentStatus[index]">
                        <span>True/Done</span>
                    </label>
                </p>
                <p v-if="!contentStatus[index]">
                    <label>
                        <input type="radio" name="contentl" value="false" checked v-model="contentStatus[index]">
                        <span>False/Not Done</span>
                    </label>
                </p>
                <p v-else-if="contentStatus[index]">
                    <label>
                        <input type="radio" name="contentl" value="false" v-model="contentStatus[index]">
                        <span>False/Not Done</span>
                    </label>
                </p>
            </div>        
            <div class="field content">
                <label v-if="!feedback" for="content">List Content:</label>
                <label v-else-if="feedback == 'next'" for="content">{{ feedback }}</label>
                <label v-else for="content" class="red-text">{{ feedback }}</label>
                <input type="text" name="content" v-model="another" placeholder="content">
            </div>
            <div class="field contentStatus">
                <p>
                    <label>
                        <input name="checkStatus" type="radio" value="true" v-model="anotherStatus"  />
                        <span>True/Done</span>
                    </label>
                </p>
                <p>
                    <label>
                        <input name="checkStatus" type="radio" value="false" v-model="anotherStatus" checked />
                        <span>False/Not done</span>
                    </label>
                </p>
            </div>
            <div class="field center-align">
                <button class="btn orange" @click.prevent="addCont">Add Another Content</button>
                <button class="btn orange" >Save List</button>
            </div>
        </form>
    </div>    
</template>
<script>
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
import slugify from 'slugify'
export default {
    name: 'NewList',
    data(){
        return{
            title: null,
            another: null,
            anotherStatus: null,
            content: [],
            contentStatus: [],
            feedback: null,
            slug: null
        }
    },
    methods:{
        addCont(){
            if(this.another == null || this.anotherStatus == null){
                this.feedback = 'Content or Content status should not be empty'
            }
            if(this.another != null && this.anotherStatus != null){
                this.content.push(this.another)
                this.contentStatus.push(this.anotherStatus)
                console.log(this.contentStatus)
                console.log(this.content)
                this.another = null
                this.feedback = 'next'
                this.anotherStatus = null             
            }
            
        },
        AddList(){
            console.log(this.content, this.contentStatus)
            if(this.title != null){
                if(this.another != null && this.anotherStatus != null){
                    this.content.push(this.another)
                    this.contentStatus.push(this.anotherStatus)            
                }
                this.feedback = null
                this.slug = slugify(this.title, {
                    replacement: '-',
                    remove: /[$*_+~.()'"!\-:@]/g,
                    lower: true                    
                })
                var db = firebase.firestore()
                db.collection('toDo').add({
                    title: this.title,
                    content: this.content,
                    contentStatus: this.contentStatus,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Home' })
                }).catch(err => {
                    console.log(err)
                })           
                
            } 
            else{
                this.feedback = 'You must enter a Title'
            }
        }
    },
    
}
</script>
<style>
.NewList{
    margin-top: 60px;
    padding: 20px;
    max-width: 550px;
}
.NewList h2{
    font-size: 20px;
    margin: 20px auto;
}
.NewList .field{
    margin: 20px auto;
}
</style>