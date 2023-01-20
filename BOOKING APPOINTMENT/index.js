//DEMO PROJECT FOR INTERVIEW
//comments for my understanding


let Form = document.querySelector('form'); // The "querySelector" method is used to select the first element.
let NameInput = Form.querySelector('#name').nextElementSibling;  //The "nextElementSibling" property is used to access the next sibling element of a given element.
let EmailInput = Form.querySelector('#email').nextElementSibling; //SAA
let PhoneInput = Form.querySelector('#phone').nextElementSibling; //SAA
let DateInput = Form.querySelector('[type="date"]');  // date syntax
let TimeInput = Form.querySelector('[type="time"]');  //time syntax
let apiEndPoint = 'https://crudcrud.com/api/3c9b1d8bf0bc475a9e05553bde645394';  //crud api used
let post_json = {}  // empty JavaScript object.
let isEditing = false;  //editing mode false initialized
let editId = ''; //empty string
let gotDetails = {}; //SAA

Form.addEventListener('submit',(e)=>{ //callback function type submit
    e.preventDefault();  // it stops the form from being submitted and the page from being reloaded.
    post_json.name = NameInput.value; //This code is adding a new property "name" to the "post_json" object and assigning it the value of the "value" property of the "NameInput" element.
    post_json.email = EmailInput.value;//SAA
    post_json.phone = PhoneInput.value;//SAA
    post_json.date = DateInput.value;//SAA
    post_json.time = TimeInput.value;//SAA
    NameInput.value =""; // value initlaized to an empty string
    EmailInput.value="";//SAA
    PhoneInput.value="";//SAA
    DateInput.value="";//SAA
    TimeInput.value="";//SAA
    if (isEditing){ //checking condition for editing
        isEditing=false;
        update() //async functions
    }
    else{
        post() //async functions
    }
})
async function update(){ //This function is intended to update a resource on the server with the provided id, and then retrieves the updated data again.
    await axios.put(`${apiEndPoint}/registeruser/${editId}`,post_json); //post get the data from endpoint
    getData(); //fet data from endpoint
}
async function post(){  //to post the data to endpoint
    await axios.post(`${apiEndPoint}/registeruser`,post_json);  //POST request to an endpoint
    getData(); //async function
}
async function getData(){
    let data_1 = await axios.get(`${apiEndPoint}/registeruser`); //gets the data
    let userDetails = document.getElementById('Users');  //to get the users id
    userDetails.innerHTML=''; //empty string // The "innerHTML" property sets or gets the HTML content within an element.
    let ul = document.createElement('ul');  //The "createElement" method creates a new element with the specified tag name
    ul.style = "list-style-type:none"
    ul.setAttribute('id','userdetails-ul'); //The "setAttribute" method is used to set or add an attribute
    userDetails.appendChild(ul) //The "appendChild" method is used to add a child node to the end of the list of children of a specified parent node.
    if (data_1.data.length === 0){ //data in end point
        ul.innerHTML =" No registered users"
        return
    }
    let text = document.createTextNode("User Details"); //The "createTextNode" method creates a new text node with the specified string.
    ul.appendChild(text);
    data_1.data.forEach(user => { //for each method used to iterate over all the data
        let li = document.createElement('li');//The "createElement" method creates a new element with the specified tag name
        let delBtn = document.createElement('button');//The "createElement" method creates a new element with the specified tag name
        let editBtn = document.createElement('button');//The "createElement" method creates a new element with the specified tag name
        delBtn.innerText='delete'; //to delete data
        editBtn.innerText ='edit';
        li.setAttribute('id',`${user._id}`);
        delBtn.style = 'color:white;background-color:red;margin-left:10px;' //delete buttton style
        editBtn.style = 'color:white;background-color:yellow;margin-left:10px;'  //edit button style
        li.innerHTML = `Name : ${user.name} , Email : ${user.email} , Phone : ${user.phone} , Date : ${user.date} , Time : ${user.time}` //output
        li.appendChild(delBtn)
        li.appendChild(editBtn)
        ul.append(li)
    })
}
getData();

async function updateDetails(isEdit){ // to update the form
    let data = await axios.get(`${apiEndPoint}/registeruser/${isEdit}`);  //get data from endpoint
    let element = document.getElementById(`${isEdit}`);
    element.parentNode.removeChild(element); //remove element from parentnode
    NameInput.value = data.data.name; //storing data
    EmailInput.value = data.data.email;//storing data
    PhoneInput.value = data.data.phone;//storing data
    DateInput.value = data.data.date;//storing data
    TimeInput.value = data.data.time;//storing data
}

document.addEventListener('click',(e)=>{ // for the click


    if (e.target.innerText == 'delete'){ // delete button
            axios.delete(`${apiEndPoint}/registeruser/${e.target.parentNode.id}`);
    
    let element = document.getElementById(`${e.target.parentNode.id}`);
    element.parentNode.removeChild(element);
    }

    if (e.target.innerText == 'edit'){   // edit button
        let isEdit = `${e.target.parentNode.id}`
        isEditing = true; // because we r in edit mode so true
        editId = `${e.target.parentNode.id}`
        updateDetails(isEdit);
    }
});