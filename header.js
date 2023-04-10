// login

async function login() {
  const username = document.querySelector(".login-username").value;
  const password = document.querySelector(".login-password").value;

  let apis = await fetch("https://tarmeezacademy.com/api/v1/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  })
    .then((apis) => {
      //  set attribute
      if (apis.status == 200) {
        // close model
        let btnLogin = document.querySelector(".btnLogin");
        // click
        btnLogin.click();

        appendAlert("Nice, Login  Successfully !", "success");
      }

      return apis.json();
    })
    .then((data) => {
      let responseaddTObody = document.querySelector(".response");
      responseaddTObody.innerHTML = data.message;
      if (data.token) {
        responseaddTObody.innerHTML = "ok";
        // save token localStorage
        localStorage.setItem("token", `${data.token}`);
        // save user localStorage
        let userTOtraing = JSON.stringify(data.user);
        localStorage.setItem("user", userTOtraing);
        // call ui
        ui();
      }
      return data;
    })
    .catch((data) => {
      console.log(data);
    });
}

// login \\

// Register
async function Register() {
  const name = document.querySelector(".register-neme").value;
  const username = document.querySelector(".register-username").value;
  const password = document.querySelector(".register-password").value;
  const image = document.querySelector("#register-image").files[0];

  let formData = new FormData();
  formData.append("name", name);
  formData.append("username", username);
  formData.append("password", password);
  formData.append("image", image);
  try {
    const response = await fetch("https://tarmeezacademy.com/api/v1/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    if (!response.ok) {
      throw await response.json();
    } else {
      const data = await response.json();
      console.log(data);
      // handle success
      localStorage.setItem("token", data.token);
      // save user localStorage
      let userTOtraing = JSON.stringify(data.user);
      localStorage.setItem("user", userTOtraing);
      ui();

      appendAlert("Nice, Register  Successfully !", "success");
      // close model
      let btnRegister = document.querySelector(".btnRegister");
      // click
      btnRegister.click();
    }
  } catch (error) {
    // handle error
    const message = error.message || "An error occurred";

    let responsediv = document.getElementsByClassName("responsediv");

    responsediv[0].innerHTML = message;
  }
}

// Register \\

// Logout

function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // call ui
  ui();
  //  alert
  appendAlert("Nice, Logout  Successfully !", "success");
}
// Logout \\

// ui
// SET img Profile nav bar
function SETimgProfile() {
  let userLOCAL = JSON.parse(localStorage.getItem("user"));

  document.querySelector(".imgProfile").src = `${userLOCAL.profile_image}`;
}

function ui() {
  // btn edit post view or no in home page

  // btn edit post view or no in home page \\

  const uiLogin = document.querySelector(".uiLogin");
  if (localStorage.getItem("token")) {
    uiLogin.innerHTML = `
  
      <li class="nav-item"> 
       <a href="./profile.html"><img class="imgProfile" src="" alt="" srcset=""></a>
      <li class="nav-item" >
  
                <a href="#"><button onclick="Logout();clickADDcommentHEADER()" type="button" class="btn btn-danger LogoutBtn" 
                    data-bs-target="#exampleModal" >
                    logout
                  </button></a>
              </li>
              
              <li class="nav-item" style="display:none;">
                <a href=""><button type="button" class="btn btn-primary ms-1">
                    Register
                  </button></a>
              </li>
      `;

    // display btn create post
    if (document.querySelector("#addPost") != null) {
      document.querySelector("#addPost").style.display = "block";
    }

    SETimgProfile();
  } else {
    uiLogin.innerHTML = `
      <ul class="navbar-nav w-100 d-flex justify-content-end uiLogin flex-row">
              <li class="nav-item">
              <button type="button" class="btn btn-dark" data-bs-toggle="modal"
                    data-bs-target="#exampleModal">
                    Login
                  </button>
              </li>
              <li class="nav-item">
                <button type="button" class="btn btn-dark btnlogins" data-bs-toggle="modal"
                    data-bs-target="#registerModal">
                    Register
                  </button>
              </li>
            </ul>
      `;

    // display btn create post
    if (document.querySelector("#addPost") != null) {
      document.querySelector("#addPost").style.display = "none";
    }
  }
}
window.addEventListener("DOMContentLoaded", ui);

// ui \\

function clickADDcommentHEADER() {
  if (clickADDcomment() != null) {
    clickADDcomment();
  }
}
