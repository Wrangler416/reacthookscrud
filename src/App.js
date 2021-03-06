import React, {useState, useEffect} from "react"
import axios from "axios"
import "./styles.css"

function App() {

  const root = document.getElementById("root")
  
  const [tweet, setTweet] = useState("")
  const [name, setName] = useState("")
  const [edit, setEdit] = useState("")

  const handleTweetChange = (e) => setTweet(e.target.value)
  const handleNameChange = (e) => setName(e.target.value)

// PUT method to edit your tweet

function sendEdit(id, value, h1) {
  setEdit(value)

  axios.put("https://api.vschool.io/karatemple2/todo/" + id, {description: value})
  .then(response => { 
    sendTweet(response.data)
    h1.remove()

  })
  .catch(error => console.log(error))
}

//Call function responsible for GET method
useEffect(function() {
  getData()
}, [])

//GET method 
function getData() {
axios.get("https://api.vschool.io/karatemple2/todo")

.then(response => createTweets(response.data))
.catch(error => console.log(error))
}


// Create new tweets 
function createTweets(data) {

  for(let i = 0; i < data.length; i++) {
        sendTweet(data[i])
  }
}

// POST AND DELETE METHODS 
function sendTweet(tweet) {

    const h1 = document.createElement("h1")
    h1.textContent = tweet.title + " , " + tweet.description
    root.appendChild(h1)
  
    const deleteBtn = document.createElement("BUTTON")
    deleteBtn.textContent = "delete post"
    deleteBtn.setAttribute("id", "done")
    h1.appendChild(deleteBtn)

    deleteBtn.onclick = function() {

      console.log("delete")
      axios.delete("https://api.vschool.io/karatemple2/todo/" + tweet._id)
        .then(response => { 
          h1.style.display = "none"
        })
        .catch(error => console.log(error))
    }
     
  
    const editBtn = document.createElement("BUTTON")
    editBtn.textContent = "edit your post"
    h1.appendChild(editBtn)
    editBtn.onclick = function openEdit() {

      const editInput = document.createElement("input")
      editInput.type= "text"
      h1.appendChild(editInput)
      
      const submitEdit = document.createElement("button")
      submitEdit.textContent = "submit your edit"
      h1.appendChild(submitEdit)
      submitEdit.onclick=() => sendEdit(tweet._id, editInput.value, h1) 
    
    
    }

    }
  

  return (

    <div>
        <form className="form">
            <input 
              className="input"
              type="text"
              name="tweet"
              value={tweet}
              placeholder="Type your tweet here"
              onChange={handleTweetChange}
            >
            </input>

            <input 
              className="name"
              type="text"
              name="name"
              value={name}
              placeholder="Add your name here"
              onChange={handleNameChange}
            >
            </input>

        </form>
        <button className="post" onClick={() => {
          console.log("posted")
          axios.post("https://api.vschool.io/karatemple2/todo", {description: tweet, title: name })

              .then(response => sendTweet(response.data))
              .catch(error => console.log(error))
              
              } } >Post your tweet!</button>
        

    </div>
  )
  }
export default App

