<template>
    <div class="new-note container">
        <h2 class="center-align"> Add A New Note</h2>
        <form @submit.prevent="AddNote">
            <div class="field title">
                <label for="title">Note Title:</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field content">
                <label for="content">Content:</label>
                <input type="text" name="content" v-model="content">
            </div>
            <div class="field center-align">
                <button class="btn orange">Add Note</button>
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
    name: 'NewNote',
    data(){
        return {
            title: null,
            content: null
        }
    },
    methods: {
        AddNote(){
            this.slug = slugify(this.title, {
                replacement: '-',
                remove: /[$*_+~.()'"!\-:@]/g,
                lower: true 
            })
            var db = firebase.firestore()
            db.collection('notes').add({
                    title: this.title,
                    content: this.content,
                    slug: this.slug
                }).then(() => {
                    this.$router.push({ name: 'Home' })
                }).catch(err => {
                    console.log(err)
                })     
        }
    }
}
</script>
<style >
.new-note{
    margin-top: 60px;
    padding: 20px;
    max-width: 550px;
}
.new-note h2{
    font-size: 20px;
    margin: 20px auto;
}
.new-note .field{
    margin: 20px auto;
}
</style>