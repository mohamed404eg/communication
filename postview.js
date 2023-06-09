// Get id post query an url
let idPost = new URLSearchParams(window.location.search);
let postId = idPost.get("postId");

// get post one load page
function getPosts(postId) {
  fetch(`https://tarmeezacademy.com/api/v1/posts/${postId}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      loader(false)
      // add to div posts
      let postclass = document.getElementsByClassName("post");
      let post = response.data;

      //  comments
      let commentsArray = response.data.comments;
      let HTMLcomments = ``;
      for (comment of commentsArray) {
        HTMLcomments += `
            <div class="comment">
            <div  class="">
            <img src="${comment.author.profile_image}" alt=""  class="imgProfile float-start">
            <b class="float-start">@${comment.author.username}</b>
            </div>
            
            <p  class="float-start">${comment.body}</p>
    
        </div>
            `;
      }

      //  comments \\
      let postadd = `
               <div class=" mt-4" >
                   <div class="card text-center">
                       <div class="card-header">
                          <img src='${post.author.profile_image}' class='imgProfile'>
                             <span>${post.author.username}</span>
                             </div>
                       <div class="card-body">
                           <img class="w-50 " src="${post.image}" alt="">
                         <h5 class="card-title mt-3">${post.title} </h5>
                         <p class="card-text">${post.body}</p>
                           </div>
                           <div class="">
                        ${post.created_at}
                       </div>

                       <div class="btn btn-secondary mt-3  rounded-0" onclick="clickADDcomment(true)"> <span>(${post.comments_count})</span> Comments <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                       <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                       <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                       </svg></div>
                       <div id="inputComment">
                       
    <div class="input-group pt-1">
    <input id="commentValue" type="text" class="form-control rounded-0"" placeholder="type comment her" aria-label="Recipient's username" aria-describedby="button-addon2">
    <button class="btn btn-secondary rounded-0" type="button" id="CommentBtn" onclick="sendComment(${postId})">Comment</button>
  </div>
                       </div>
                       <div id="comments"> </div>
                       
                     </div>
               </div>
  
       `;

      postclass[0].innerHTML += postadd;

      document.getElementById("comments").innerHTML = HTMLcomments;
    });


}

window.addEventListener("DOMContentLoaded", getPosts(postId));
// get post one load page \\

// click ADD comment
// check  click botton logout or no 
let clickADDcommentBtnlogOut = false;
function clickADDcomment(s) {
  if (localStorage.getItem("token") == null) {
      console.log("ok none")
      document.getElementById("inputComment").style.display = "none";
      clickADDcommentBtnlogOut = s;
      if (clickADDcommentBtnlogOut) {
          appendAlert(` login or Register !`, "info");
        }

  } else {
    document.getElementById("inputComment").style.cssText ="display: block;transform: translateY(0); ";
  }
}


async function sendComment(postId) {
  let token = localStorage.getItem("token");
  let commentValue = document.getElementById("commentValue").value;
  let formData = new FormData();
  formData.append("body", commentValue);
  const response = await fetch(
    `https://tarmeezacademy.com/api/v1/posts/${postId}/comments`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: formData,
      }
    
  ).then(async (response) => {
      let data = await response.json();
       if (!response.ok) {
        throw(data)
  } else {
    const data =  response.json();
    // handle success
    appendAlert("Nice, has been created Comment Successfully !", "success");
    //   get comment
    let post = document.getElementsByClassName("post");
    post[0].innerHTML = "";
    getPosts(postId);
  }
  }).catch((error) => {
    console.log(error);
    appendAlert(`${error.message} !`, "info");
  });
 
}
// click ADD comment \\


