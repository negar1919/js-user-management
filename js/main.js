

const loginform = document.getElementById("login-form");
// const notrue = document.querySelector(".notrue");
// const loginemail = document.getElementById("login-email");

loginform.addEventListener("submit", async (e) => {
  e.preventDefault(); //جلوگیری از ارسال فرم به صورت پیش فرض
  //   notrue.innerHTML = ' '

  //  let isvalid = true 
  //   const pattern =
  //   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  //  if( pattern.test(loginemail.value) == false){
  //    notrue.innerHTML = 'The email is not valid'
  //     isvalid = false
  //     return
  //  }
  const emailinput = document.getElementById("login-email").value;
  const passwordinput = document.getElementById("login-password").value;
  console.log(emailinput, passwordinput);
  try {
    const res = await fetch(`http://localhost:5000/users?email=${emailinput}`);
    const users = await res.json();
    console.log(users);
    if (users.length > 0) {
      const user = users[0];
      if (user.password == passwordinput)  {
        alert("ok");
        localStorage.setItem("user", JSON.stringify(user));
        if(user.role == 'user'){
          window.location.href = '/profile.html'
        }else{
          window.location.href = '/admin.html'
        }
        // window.location.href = "/profile.html";
      } else {
        alert("not ok");
      }
    } else {
      alert("user not found");
    }
  } catch (error) {
    alert("server error try Again");
  }
});

window.addEventListener("load", () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user.role == 'user') {
     return window.location.href = "/profile.html";
  }
  if(user.role == 'admin'){
     return window.location.href = "/admin.html";

  }
});
const icon = document.querySelector(".icon");

const loginpassword = document.getElementById("login-password");

 
icon.addEventListener("click", () => {
  const faeye = icon.querySelector(".fa-eye");
  const faeyeslash = icon.querySelector(".fa-eye-slash");
  faeye.classList.toggle("hide");
  faeyeslash.classList.toggle("hide");
  if (loginpassword.type == "password") {
    loginpassword.type = "text";
  } else {
    loginpassword.type = "password";
  }
});

