const registerform = document.getElementById("register-form");

registerform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("Gender").value;
  const newuser = {
    firstName: firstname,
    lastName: lastname,
    email: email,
    password: password,
    age: age,
    gender: gender,
    role : "user"
  };
  console.log(newuser);

  try {
    const res = await fetch("http://localhost:5000/users", {
      method: "POST",
      body: JSON.stringify(newuser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if(res.ok == true){
        alert('Registration was successful.')
        window.location.href = '/index.html'
    }else{
        alert('There was an error, try again later.')
    }
    
  } catch (error) {
    alert('There was an error, try again later.')
  }
});
window.addEventListener("load", () => {
  const user = localStorage.getItem("user");
  if (user) {
    window.location.href = "/profile.html";
  }
});