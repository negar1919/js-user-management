window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  if (!user) {
    window.location.href = "/index.html";
    // return
  }
  const username = document.getElementById("user-name");
  const firstname = document.getElementById("firstname");
  const lastname = document.getElementById("lastname");
  const email = document.getElementById("email");
  const Age = document.getElementById("Age");
  const Gender = document.getElementById("Gender");

  username.textContent = user.firstName + " " + user.lastName;
  firstname.textContent = user.firstName;
  lastname.textContent = user.lastName;
  email.textContent = user.email;
  Age.textContent = user.age;
  Gender.textContent = user.gender;
});

const logoutbtn = document.getElementById("Logout-btn");
logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});
const changepasswordmodal = document.getElementById("change-password-modal");
const closebtn = document.querySelector(".close-btn");
const changepasswordbtn = document.getElementById("change-password-btn");
changepasswordbtn.addEventListener("click", () => {
  changepasswordmodal.style.display = "block";
});
closebtn.addEventListener("click", () => {
  changepasswordmodal.style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target == changepasswordmodal) {
    changepasswordmodal.style.display = "none";
  }
});

const icon = document.querySelector(".icon");
const icon2 = document.querySelector(".icon2");
const icon3 = document.querySelector(".icon3");

icon.addEventListener("click", () => {
  const currentpassword = document.getElementById("current-password");
  const newpassword = document.getElementById("new-password");
  const confirmpassword = document.getElementById("confirm-password");
  const faeye = icon.querySelector(".fa-eye");
  const faeyeslash = icon.querySelector(".fa-eye-slash");
  faeye.classList.toggle("hide");
  faeyeslash.classList.toggle("hide");
  if (currentpassword.type == "password") {
    currentpassword.type = "text";
  } else {
    currentpassword.type = "password";
  }
});
icon2.addEventListener("click", () => {
  const currentpassword = document.getElementById("current-password");
  const newpassword = document.getElementById("new-password");
  const confirmpassword = document.getElementById("confirm-password");
  const faeye = icon2.querySelector(".fa-eye");
  const faeyeslash = icon2.querySelector(".fa-eye-slash");
  faeye.classList.toggle("hide");
  faeyeslash.classList.toggle("hide");
  if (newpassword.type == "password") {
    newpassword.type = "text";
  } else {
    newpassword.type = "password";
  }
});
icon3.addEventListener("click", () => {
  const currentpassword = document.getElementById("current-password");
  const newpassword = document.getElementById("new-password");
  const confirmpassword = document.getElementById("confirm-password");
  const faeye = icon3.querySelector(".fa-eye");
  const faeyeslash = icon3.querySelector(".fa-eye-slash");
  faeye.classList.toggle("hide");
  faeyeslash.classList.toggle("hide");
  if (confirmpassword.type == "password") {
    confirmpassword.type = "text";
  } else {
    confirmpassword.type = "password";
  }
});

const changepasswordform = document.getElementById("change-password-form");
changepasswordform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const currentpassword = document.getElementById("current-password");
  const newpassword = document.getElementById("new-password");
  const confirmpassword = document.getElementById("confirm-password");
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  if (currentpassword.value != user.password) {
    return alert("currentpassword is incorrect");
  }
  if (newpassword.value != confirmpassword.value) {
    return alert("New password and confirm password do not match");
  }

  try {
    user.password = newpassword.value;

    console.log("NEW PASSWORD:", newpassword.value);
    console.log("USER BEFORE PUT:", user);

    const res = await fetch(`http://localhost:5000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
    if (res.ok == true) {
      alert("Password changed successfully.");
      changepasswordmodal.style.display = "none";
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      alert("Failed to change password.");
    }
    const data = await res.json();

    console.log(data);
  } catch (error) {
    // console.log(error);
  }
});



//to do list start

let btn = document.querySelector(".add");
let tasklist = document.querySelector(".tasklist");
let input = document.querySelector(".input");
const user = JSON.parse(localStorage.getItem("user"))
console.log(user);
console.log(user.id);

let tsk;
btn.addEventListener("click", addlist);

async function getTasks() {
  let response = await fetch("http://localhost:3000/todolist");
  let data = await response.json();
  // console.log(data);
  data.forEach(function (task) {
      if (task.userid == user.id) {
    let newtask = task.title;
    let li = creattask(newtask);
    li.dataset.id = task.id;
    if (task.completed) {
  li.classList.add("done");
}
    li.innerHTML += `
  <span class="closebtn">
    <i class="fa-solid fa-trash-can"></i>
  </span>
`;
    tasklist.appendChild(li);
    // console.log(tasklist);
    }
  });
}
getTasks();

function creattask(newtask) {
  let li = document.createElement("li");
  li.innerHTML = newtask;
  //  console.log(li);
  return li;
}
async function addlist() {
  console.log("BUTTON CLICKED");
  if(input.value == ''){
    alert('Please fill in the field.')
    return
  }
  try {
    const inputlist = {
      userid: user.id,
      title: input.value,
    };
    const res = await fetch("http://localhost:3000/todolist", {
      method: "POST",
      body: JSON.stringify(inputlist),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    let li = creattask(data.title);
    tasklist.appendChild(li);
  } catch (error) {
    console.log(error);
  }
}
  tasklist.addEventListener('click' , async (e) =>{
   console.log(e.target.nodeName);
   
    if(e.target.nodeName == 'I'){
      let target = e.target.parentElement.parentElement;
      let id = target.dataset.id
      console.log(target);
      console.log(id);
      const res = await fetch(`http://localhost:5000/todolist/${id}` , {
        method : 'DELETE'
      })
    }
    if (e.target.nodeName === "LI") {
  e.target.classList.toggle("done");
  console.log(e.target.classList.contains("done"));
    let id = e.target.dataset.id
    let completed = e.target.classList.contains("done")
   const com = {
    completed : completed
   }
   const res = await fetch(`http://localhost:5000/todolist/${id}` , {
    method : 'PATCH',
    body : JSON.stringify(com),
    headers: {
      "Content-Type": "application/json"
    }
   }) 
  //  let data = await res.json()
   console.log(res);
   
}
  })

  async function getUsers() {

  const res = await fetch("http://localhost:5000/users");

  const user = await res.json();

  console.log(user);
}
getUsers()
