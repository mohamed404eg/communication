// infinity get scroll
let currentPage = 1;
let lastPage = 1;

// get post one load page
function getPosts(currentPage) {
  fetch(`https://tarmeezacademy.com/api/v1/posts?limit=5&page=${currentPage}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      lastPage = response.meta.last_page;
      // add to div posts
      let posts = document.getElementsByClassName("posts");
      // for of posts
      for (post of response.data) {
        let postadd = `
            <div class="post mt-4" onclick='clickedPost(${post.id})'>
                <div class="card text-center">
                    <div class="card-header">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                          <span>${post.author.username}</span>
                          </div>
                    <div class="card-body">
                        <img class="w-50" src="${post.image}" alt="">
                      <h5 class="card-title mt-3">Special title treatment</h5>
                      <p class="card-text">${post.body}</p>
                      <a href="#" class="btn btn-secondary"> <span>(${post.comments_count})</span> Comments <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
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
async function creatPostModal() {
  let text = document.querySelector("#posTtext").value;
  let title = document.querySelector("#post-title").value;
  let token = localStorage.getItem("token");
  let post_file = document.querySelector("#post-file").files[0];

  const formData = new FormData();
  formData.append("body", text);
  formData.append("title", title);
  formData.append("image", post_file);
  try {
    const response = await fetch("https://tarmeezacademy.com/api/v1/posts", {
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
      let btnRegister = document.querySelector(".btnPostClose");
      // click
      btnRegister.click();
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
