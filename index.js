import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {databaseURL: "https://shout-out-9d6fa-default-rtdb.asia-southeast1.firebasedatabase.app/"}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoutoutsInDB = ref(database, "shoutouts")
const shoutoutInputEl = document.querySelector("#main-input-field")
const inputBtnEl = document.querySelector("#main-input-btn")
const shoutoutsDisplay = document.querySelector("#shoutouts-list")
// const senderNameEl = document.querySelector("#sender-name")
// const receivernameEl = document.querySelector("#receiver-name")

inputBtnEl.addEventListener ("click", function(){
    let userInputValue = shoutoutInputEl.value
     
    push(shoutoutsInDB, userInputValue) 
    
    clearInputField()
})

onValue(shoutoutsInDB, function(snapshot){
    if (snapshot.exists()){
        let shoutoutsArray = Object.entries(snapshot.val())

        clearShoutoutList()

        for (let i = 0; i < shoutoutsArray.length; i++){
            let currentShout = shoutoutsArray[i]

            addRemoveShoutoutToList(currentShout)
        }
    } else {
        shoutoutsDisplay.innerHTML = "Nothing to display"
    }

})

function addRemoveShoutoutToList(input){

    let shoutVal = input[1]
    let shoutID = input[0]

    let newShout = document.createElement("li")
    
    newShout.innerHTML = shoutVal
    
    shoutoutsDisplay.append(newShout)

    newShout.addEventListener("dblclick", function(){
        let shoutToRemove = ref(database, `shoutouts/${shoutID}`)
        remove(shoutToRemove)
    })
    
}

function clearInputField(){
    shoutoutInputEl.value = ""
    // senderNameEl.value = ""
    // receivernameEl.value = ""
}

function clearShoutoutList(){
    shoutoutsDisplay.innerHTML = ""
}