<template>
    <div>
        <h2 class="center-align">Notes</h2>
        <div class="Home container">
            <div class="card hoverable" v-for="note in notes" :key="note.id">
                <i class="material-icons delete" @click="deleteNote(note.id)">delete</i>
                <div class="card-title"><h2>{{note.title}}</h2></div>
                <div class="card-content">{{note.content}}</div>
                <br>
            </div>
        </div>
        <h2 class="center-align">Checklist</h2>
        <div class="Home container">
            <div class="card hoverable" v-for="todo in todos" :key="todo.id">
                <i class="material-icons delete" @click="deleteTodo(todo.id)">delete</i>
                <div class="card-title">{{todo.title}}</div>
                <div class="card-content">
                    <ul class="todolist">
                        <li v-for="(cont,index) in todo.content" :key="index">
                            <span v-if="todo.contentStatus[index] == 'true'" ><i class="material-icons checkbox">check_box</i></span>
                            <span v-if="todo.contentStatus[index] == 'false'"><i class="material-icons checkbox">check_box_outline_blank</i></span>   
                            <span class="checkcont">{{cont}}</span>
                        </li>
                    </ul>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>
<script>
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp({
            apiKey: "AIzaSyCJaOEOVl_b2ttCNbrPxEJR31XSvdtDtAQ",
            authDomain: "fir-project-d5b71.firebaseapp.com",
            databaseURL: "https://fir-project-d5b71.firebaseio.com",
            projectId: "fir-project-d5b71",
            storageBucket: "fir-project-d5b71.appspot.com",
            messagingSenderId: "592336125625",
            appId: "1:592336125625:web:a63f7940e3b93cbc5de568",
            measurementId: "G-16NYB9RCK2"
        });
export default {
    name:'Home',
    methods:{
        deleteNote(id){
            var db1 = firebase.firestore()
            db1.collection('notes').doc(id).delete().then(() =>{
                this.notes = this.notes.filter(note => {
                    return note.id != id
                })
            })         
            
        },
        deleteTodo(id){
            var db2 = firebase.firestore()
            db2.collection('toDo').doc(id).delete().then(() => {
                this.todos = this.todos.filter(todo => {
                    return todo.id != id
                })
            })
        }
    },
    data(){
        return{
            notes: [],
            todos: [],
            flag1: false
        }
    },
    created(){
        var db1 = firebase.firestore()
        db1.collection('notes').get().then(Snapshot => {
            Snapshot.forEach(doc => {
                console.log(doc.id);
                let note = doc.data()
                note.id = doc.id
                this.notes.push(note)
            });
        });
        var db2 = firebase.firestore()
        db2.collection('toDo').get().then(Snapshot => {
            Snapshot.forEach(doc => {
                console.log(doc.id);
                let todo = doc.data()
                todo.id = doc.id
                this.todos.push(todo)
            });
        });
    },
    mounted(){
    },
    

}
</script>
<style scoped>
.Home{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px;
    padding-top: 45px;
}
.card-title{
    text-align: center;
    font-size: 1.8em;
    margin-top: 0px;
}
.card-content{
    margin: 30px auto;
    text-align: center;
}
.delete{
    position: absolute;
    top: 4px;
    right: 4px;
    color: rgba(133, 132, 132, 0.801);
    cursor: pointer;
}
.delete:hover{
    color: rgba(133, 132, 132, 0.966);
}
.checkbox{
    position: absolute;
    left: 40px;
    color: rgba(133, 132, 132, 0.801);
}
.checkbox:hover{
    color: rgba(133, 132, 132, 0.966);
}
.checkcont{
    align-self: start;

}
</style>