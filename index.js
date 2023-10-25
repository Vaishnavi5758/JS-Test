


//const baseURL = e71cb1bfabef45eda4aaab1457157299;
const myForm = document.querySelector('#myForm');
const ToDo = document.querySelector('#ToDo');
const description = document.querySelector('#description');
const usersList = document.querySelector('#data');
myForm.addEventListener("submit",onsubmit);
const doneList = document.querySelector('#doneList');



function onsubmit(e){

    e.preventDefault();
    var user = {
     
      ToDo: ToDo.value ,
      description: description.value, 
      done: false  
    };
     
    console.log(user);
    
      axios.post("https://crudcrud.com/api/6dedd236b8774f8d9b8708cc4561b514/myData",user)
      .then((response)=>{
          showNewUserOnScreen(response.data);
          console.log(response)
      })
      .catch((error)=>{
          console.log(error)
      })
 
  // Clear fields
  ToDo.value = '';
  description.value = '';
    }

function showAllUserOnScreen(){
window.addEventListener("DOMContentLoaded",()=>{
   
    axios.get("https://crudcrud.com/api/6dedd236b8774f8d9b8708cc4561b514/myData")
    .then((response)=>{

        for(var i=0;i<response.data.length;i++){
        showNewUserOnScreen(response.data[i]);
        }
      //  console.log(response)
    })
    .catch((error)=>{
        console.log(error)
    })
  })
}


 function showNewUserOnScreen(user){
  const uniqueId=  user._id;
  console.log(uniqueId);
    const li= document.createElement('li');
    console.log(user);
   
    li.appendChild(document.createTextNode(`${user.ToDo} - ${user.description} ` ));
     //li.id= `${user.userId}`;
    
    li.setAttribute("data-id",uniqueId);
    
  if (!user.done) {
    const doneButton = createdoneButton(uniqueId, user);
    const deleteButton = createDeleteButton(uniqueId);
    const span = document.createElement('span');
    span.appendChild(doneButton);
    span.appendChild(deleteButton);
    li.appendChild(span);
  }


     
     if (user.done) {
      doneList.appendChild(li);
    } else {
      usersList.appendChild(li);
    }
 }

 


function createDeleteButton(uniqueId) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';
    deleteButton.type="delete-btn";
   //The anonymous function is passed as the event listener. When the delete button is clicked
    deleteButton.addEventListener('click', () => deleteItemFromServer(uniqueId));
   
    return deleteButton;
  
}


function createdoneButton(uniqueId,user) {
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'done-btn';
   
   doneButton.addEventListener('click', () => markItemAsDoneOnServer(uniqueId,user));

    return doneButton;
}



// Function to delete an item from the server
function deleteItemFromServer(userId) {
 
  if(confirm('Are you sure?')){
 axios.delete(`https://crudcrud.com/api/6dedd236b8774f8d9b8708cc4561b514/myData/${userId}`)
.then((response)=>{
  
  removeUserFromScreen(userId);
  console.log("item deleted successfully from server");
})
.catch((err)=>{
  console.log(err)
})
}
}  
function removeUserFromScreen(userId){
  const parentNode = document.getElementById(data);
  const childNodeToBeDeleted = document.getElementById(userId);
if(childNodeToBeDeleted){
  parentNode.removeChild(childNodeToBeDeleted);
 // showAllUserOnScreen();
}
console.log("item deleted successfully from screen");
}
    
    

function markItemAsDoneOnServer(userId,user) {
  
  const updatedData = {
    ToDo : user.ToDo,
    description: user.description,
    done: true
  };

  // Send the updated data to the server using the PUT request
  axios
    .put(`https://crudcrud.com/api/6dedd236b8774f8d9b8708cc4561b514/myData/${userId}`, updatedData)
    .then((response) => {
      
      onDone(userId);
    })
    .catch((error) => {
      console.log(error);
    });
}


  function onDone(userId){
 // Find the item by userId
const itemToMove = usersList.querySelector(`[data-id="${userId}"]`);
console.log(itemToMove);
if (itemToMove) {
 
  usersList.removeChild(itemToMove);
  doneList.appendChild(itemToMove);
  
 
}
 }
 showAllUserOnScreen();