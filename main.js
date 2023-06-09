// global
let usrlocal = JSON.parse(localStorage.getItem("user"));
// global \\

// infinity get scroll
let currentPage = 1;
let lastPage = 1;
let urluser = "";

// get post one load page
function getPosts(currentPage) {
  fetch(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${currentPage}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      loader(false)
      lastPage = response.meta.last_page;
      // add to div posts
      let posts = document.getElementsByClassName("posts");

      let PostEditHTML = ``

      // for of posts
      for (post of response.data) {
        // innerHTML EditPost
        if (usrlocal != null) {
          if (post.author.id == usrlocal.id) {
            PostEditHTML = `

          <div class="PostEdit btn btn-secondary float-end" data-bs-toggle="modal" data-bs-target="#CreatePost" onclick="EditPost('${encodeURIComponent(
              JSON.stringify(post)
            )}',true)"> Edit Post <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></div>

          <div class="PostEdit btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#deletPost" onclick="deletePost('${encodeURIComponent(
              JSON.stringify(post)
            )}',true)"> Delete <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
          </svg></div>

          `
          } else {
            PostEditHTML =""
          }
        }
        // innerHTML EditPost\\
        let postadd = `
            <div class="post mt-4" >
                <div class="card text-center ">
                    <div class="card-header align-items-center d-flex justify-content-between" >
                    <div onclick='clickedUser(${post.author.id})'><img class="imgProfile" src="${post.author.profile_image}">
                          <span>${post.author.username}</span>
                    </div>
                        
                                    ${PostEditHTML}
                          </div>
                    <div class="card-body" onclick='clickedPost(${post.id})'>
                        <img class="w-50" src="${post.image}" alt="">
                      <h5 class="card-title mt-3">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <a href="#" class="btn btn-secondary"> <span>(${
                        post.comments_count
                      })</span> Comments <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg></a>

                      
                       
                        </div>
                    
                        <div class="card-footer text-body-secondary">
                     ${post.created_at}
                    </div>
                    
                  </div>
            </div>

    `;
        posts[0].innerHTML += postadd;
        btneditpost()
      }
    });
}

window.addEventListener("DOMContentLoaded", getPosts);
// get post one load page \\

// get post auto
let once = false;
window.addEventListener("scroll", () => {
  let postDiv = document.querySelector("footer");
  let offsetTop = postDiv.offsetTop - 900;
  // cheak width befor call autoPost
  if (window.screen.width > 1124) {
    offsetTop = postDiv.offsetTop - 1400;
  }
  // cheak Condition
  if (offsetTop <= window.scrollY && !once) {
    if (currentPage < lastPage) {
      // infinity get scroll
      getPosts(currentPage++);
    }
    console.log(currentPage, lastPage);
    once = true;
    console.log("ok");

    // stop get tow second
    setTimeout(() => {
      once = false;
    }, 2000);
  }
});
// get post auto \\

// creat Post
async function creatPostModal(edit,postId) {
  let text = document.querySelector("#posTtext").value;
  let title = document.querySelector("#post-title").value;
  let token = localStorage.getItem("token");
  let post_file = document.querySelector("#post-file").files[0];


  const formData = new FormData();
  formData.append("body", text);
  formData.append("title", title);
  formData.append("image", post_file);

  let url = 'https://tarmeezacademy.com/api/v1/posts'
  if (edit == true) {
    formData.append("_method", "put")
    url = `https://tarmeezacademy.com/api/v1/posts/${postId}`
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      throw await response.json();
    } else {
      const data = await response.json();
      // handle success
      console.log(data);
      appendAlert("Nice, has been created post Successfully !", "success");
      // close model
      var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('CreatePost'));
      myModal.hide();
      // get nwe post
      // clear post befor get
      let posts = document.getElementsByClassName("posts");
      posts[0].innerHTML = "";
      getPosts();
     
    }
  } catch (error) {
    // handle error
    console.log(error);
    const message = error.message || "An error occurred";
    let responseCreatPost =
      document.getElementsByClassName("responseCreatPost");

    responseCreatPost[0].innerHTML = message;
  }
}

// creat Post \\

// clicked post
function clickedPost(postId) {
  window.location = `./postview.html?postId=${postId}`;
}
// clicked post \\

// clicked user profile
function clickedUser(postId) {
  window.location = `./profile.html?userId=${postId}`;
}
//  clicked user profile \\

// Edit Post

function EditPost(informationPost, isCreate) {
  console.log(isCreate)
  if (isCreate) {
    
  
    post = JSON.parse(decodeURIComponent(informationPost));
    console.log(post);

    document.getElementById("post-modal-title").innerHTML = "Edit Post";
    document.getElementById("post-title").value = post.title;
    document.getElementById("posTtext").value = post.body;
    document.getElementById("post-modal-btn").innerHTML = "Edit";
    document.getElementById("post-modal-btn").setAttribute("onclick", `creatPostModal(true,${post.id})`)

  } else {
    document.getElementById("post-modal-title").innerHTML = "New Post";
    document.getElementById("post-title").value = "";
    document.getElementById("posTtext").value ="";
    document.getElementById("post-modal-btn").innerHTML = "Create";
    
  }

}


// btn edit post view or no
function btneditpost() {
  if (localStorage.getItem("token") == null) {
    let PostEdit = document.getElementsByClassName("PostEdit");
    for (let i = 0; i < PostEdit.length; i++) {
      PostEdit[i].style.display = "none"; // تعيين خاصية العرض للعنصر الحالي للقيمة "none"
    }
  } else {
    let PostEdit = document.getElementsByClassName("PostEdit");
    for (let i = 0; i < PostEdit.length; i++) {
      PostEdit[i].style.display = "block"; // تعيين خاصية العرض للعنصر الحالي للقيمة "none"
    }
  }
}


// btn delete post view or no 

let urlDELETPOST = ""


function deletePost(informationPost) {
 
    
    
    post = JSON.parse(decodeURIComponent(informationPost));
    console.log(post);
 
    
  let postId = post.id;
  
  urlDELETPOST = `https://tarmeezacademy.com/api/v1/posts/${postId}`
}

// confirm delete Post
async function ConfirmDeletePost() {
 
    console.log(urlDELETPOST)
    let token = localStorage.getItem("token");
  
    try {
      const response = await fetch(urlDELETPOST, {
        method: "delete",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw await response.json();
      } else {
        const data = await response.json();
        // handle success
        console.log(data);
        appendAlert("Nice, has been Delete post Successfully !", "success");
        // close model
        var myModal = bootstrap.Modal.getOrCreateInstance(document.getElementById('deletPost'));
        myModal.hide();
        // get nwe post
        // clear post befor get
        let posts = document.getElementsByClassName("posts");
        posts[0].innerHTML = "";
        getPosts();
       
      }
    } catch (error) {
      // handle error
      console.log(error);
      const message = error.message || "An error occurred";
      appendAlert(`${message} !`, "success");
    }
  
  
}

// btn delete post view or no \\