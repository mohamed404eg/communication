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
      console.log(response.data.comments_count);

      // add to div posts
      let postclass = document.getElementsByClassName("post");
      let post = response.data;

      //  comments
      let commentsArray = response.data.comments;
      let HTMLcomments = ``;
      console.log(commentsArray);
      for (comment of commentsArray) {
        HTMLcomments += `
            <div class="comment">
            <img src="${comment.author.profile_image}" alt=""  class="imgProfile">
            <b>@${comment.author.username}</b>
            <p>${comment.body}</p>
    
        </div>
            `;

      }
      console.log(HTMLcomments);

      //  comments \\

      let postadd = `
               <div class="post mt-4" >
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
                        
                           </div>
                           <div class="card-footer text-body-secondary">
                        ${post.created_at}
                       </div>
                       <div id="comments"></div>
                       
                     </div>
               </div>
  
       `;

      postclass[0].innerHTML += postadd;

      document.getElementById("comments").innerHTML = HTMLcomments;
    });
}

window.addEventListener("DOMContentLoaded", getPosts(postId));
// get post one load page \\
