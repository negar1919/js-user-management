window.addEventListener("load", async () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (window.location.href = "/index.html");
  }
  if (user.role == "user") {
    return (window.location.href = "/index.html");
  }

  //دریافت اظلاعات برای جدول
  const res = await fetch("http://localhost:5000/users");
  const users = await res.json();
  console.log(users);

  const userstablebody = document.querySelector("tbody");
  users.forEach(function (item) {
    userstablebody.innerHTML += `
    
          <tr>
            <td>${item.firstName}</td>
            <td>${item.lastName}</td>
            <td>${item.email}</td>
            <td>${item.role}</td>
            <td>
              <button class="edit-btn" onclick = edituser(${item.id}) data-id="${user.id}">
                <i class="fas fa-edit"></i>Edit
              </button>
              <button class="delet-btn" onclick="deletuser(${item.id})">
                <i class="fas fa-trash-alt"></i>Delete
              </button>
            </td>
    `;
  });
});

const logoutbtn = document.getElementById("Logout-btn");
console.log("hi");

logoutbtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/index.html";
});

async function deletuser(userid) {
  // console.log(userid);
  const reult = confirm("Are you sure you want to delete the user?");
  if (reult == true) {
    try {
      const res = await fetch(`http://localhost:5000/users/${userid}`, {
        method: "DELETE",
      });
      if (res.ok == true) {
        alert("User successfully deleted.");
      } else {
        alert("failed to deleted user.");
      }
    } catch (error) {
      alert("There is an error, try again.");
    }
  }
}
const icon = document.querySelector(".icon");

icon.addEventListener("click", () => {
  const editpassword = document.getElementById("edit-password");
  const faeye = icon.querySelector(".fa-eye");
  const faeyeslash = icon.querySelector(".fa-eye-slash");
  faeye.classList.toggle("hide");
  faeyeslash.classList.toggle("hide");
  if (editpassword.type == "password") {
    editpassword.type = "text";
  } else {
    editpassword.type = "password";
  }
});

const closebtn = document.querySelector(".close-btn");
const editbtn = document.querySelector(".edit-btn");
const modalcontent = document.querySelector(".modal-content");
const editusermodal = document.getElementById("edit-user-modal");

closebtn.addEventListener("click", () => {
  editusermodal.style.display = "none";
});

async function edituser(usetid) {
  editusermodal.style.display = "block";
  const res = await fetch(`http://localhost:5000/users/${usetid}`);
  const user = await res.json();
  console.log(res);
  console.log(user);
  const editfirstname = (document.getElementById("edit-firstname").value =
    user.firstName);
  const editlastname = (document.getElementById("edit-lastname").value =
    user.lastName);
  const editage = (document.getElementById("edit-age").value = user.age);
  const editemail = (document.getElementById("edit-email").value = user.email);
  const editpassword = (document.getElementById("edit-password").value = user.password);
  const editrole = (document.getElementById("edit-role").value = user.role);
  const edituserbtn = document.querySelector(".edit-user-btn");
  edituserbtn.onclick = async function (e) {
    e.preventDefault();
    const edituserinfo = {
      firstName: document.getElementById("edit-firstname").value,
      lastName: document.getElementById("edit-lastname").value,
      age: document.getElementById("edit-age").value,
      email: document.getElementById("edit-email").value,
      password: document.getElementById("edit-password").value,
      role: document.getElementById("edit-role").value,
    };
    console.log(edituserinfo);
    try {
      const res = await fetch(`http://localhost:5000/users/${usetid}`, {
        method: "PUT",
        body: JSON.stringify(edituserinfo),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok == true) {
        alert("Edit completed successfully.");
      } else {
        alert("Edit was not successful.");
      }
    } catch (error) {
        console.log(error);
        
      alert("Error, try again");
    }
  };
}
window.addEventListener("click", (e) => {
  if (e.target == editusermodal) {
    editusermodal.style.display = "none";
  }
});
