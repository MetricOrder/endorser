import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://shout-out-9d6fa-default-rtdb.asia-southeast1.firebasedatabase.app/"}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoutoutsInDB = ref(database, "shoutouts")
const shoutoutInputEl = document.querySelector("#main-input-field")
const inputBtnEl = document.querySelector("#main-input-btn")
const shoutoutsDisplay = document.querySelector("#shoutouts-list")
const deleteBtn = document.querySelector("#test-btn")

inputBtnEl.addEventListener ("click", function(){
    let userInputValue = shoutoutInputEl.value

    push(shoutoutsInDB, userInputValue) 
    
    clearInputField()
})

onValue(shoutoutsInDB, function(snapshot){
    let shoutouts = Object.values(snapshot.val())

    appendShoutoutList(shoutouts)

})

function appendShoutoutList(input){
    shoutoutsDisplay.innerHTML = input

}

function clearInputField(){
    shoutoutInputEl.value = ""
}

deleteBtn.addEventListener ("click", function(){
    clearShoutoutList()
})


function clearShoutoutList(){
    shoutoutsDisplay.innerHTML = ""
}