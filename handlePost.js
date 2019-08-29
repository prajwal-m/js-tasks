var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
console.log(queryString);
var queries = queryString.split("=");
console.log(queries[1]);
var postId = queries[1];
console.log(localStorage.getItem(postId));
var postData = JSON.parse(localStorage.getItem(postId));
console.log(typeof postData);
console.log(postData.titleData);

var inputContainer = document.getElementById("input-data");

function displayData(postData) {
  var titleDiv = document.createElement("div");
  titleDiv.className = "title-div";
  inputContainer.appendChild(titleDiv);

  var titlePara = document.createElement("p");
  titlePara.innerHTML = postData.titleData + " -   ";
  titlePara.className = "title-para";
  titleDiv.appendChild(titlePara);

  var authorPara = document.createElement("p");
  authorPara.className = "author-para";
  authorPara.innerHTML = " Posted by " + postData.authorData;
  titleDiv.appendChild(authorPara);

  var headerBreak = document.createElement("hr");
  inputContainer.appendChild(headerBreak);

  var imgData = document.createElement("img");
  imgData.className = "image-data";
  imgData.src = postData.imgURLData;
  imgData.alt = "post";
  inputContainer.appendChild(imgData);

  var headerBreak1 = document.createElement("hr");
  inputContainer.appendChild(headerBreak1);

  var contentPara = document.createElement("p");
  contentPara.className = "content-para";
  contentPara.innerHTML = postData.contentData;
  inputContainer.appendChild(contentPara);
}

// data display function call

displayData(postData);

// comment form toggle function

function toggleComment() {
  var commentForm = document.getElementById("comment-form");
  var toggleButton = document.getElementById("comment-toggle");
  commentForm.style.display = "block";
  toggleButton.style.display = "none";
}

var commentArray = new Array();

var replyArray = new Array();
var container = document.getElementById("comment-thread");

function createCommentDom() {}

function submitComment() {
  var dataObj = {};
  var comment = document.getElementById("comment").value;

  var commentPara = document.createElement("span");
  commentPara.className = "comment-para";
  commentPara.innerHTML = comment;
  commentPara.id =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  container.appendChild(commentPara);
  dataObj.id = commentPara.id;

  dataObj.comment = comment;
  dataObj.parentId = "";
  commentArray.push(dataObj);
  console.log(commentArray);

  var replyIcon = document.createElement("i");
  replyIcon.className = "fa fa-chevron-circle-right";
  replyIcon.id = dataObj.id;
  commentPara.appendChild(replyIcon);

  replyIcon.addEventListener("click", function() {
    console.log(this.id);
    var replyToComment = prompt("Enter your reply");
    var replyObj = {};
    replyObj.id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    replyObj.comment = replyToComment;
    replyObj.parentId = this.id;

    commentArray.push(replyObj);
    replyArray.push(replyObj);
    console.log(commentArray);
    console.log(replyArray);

    commentReply(replyObj);
  });
}

function commentReply(replyObj) {
  console.log(replyObj);

  var parentContainer = document.getElementById(replyObj.parentId);
  console.log(parentContainer);
  var replyComment = document.createElement("p");
  replyComment.className = "comment-reply";
  replyComment.id = replyObj.id;
  replyComment.innerHTML = replyObj.comment;
  parentContainer.appendChild(replyComment);

  var replyIcon = document.createElement("i");
  replyIcon.className = "fa fa-chevron-circle-right";
  replyIcon.id = replyObj.id;
  replyComment.appendChild(replyIcon);

  console.log(commentArray);
  console.log(replyArray);

  replyIcon.addEventListener("click", function() {
    console.log(this.id);
    var replyToCmt = prompt("Enter your reply");
    var replyObject = {};
    replyObject.id =
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15);
    replyObject.comment = replyToCmt;
    replyObject.parentId = this.id;

    commentArray.push(replyObject);
    replyArray.push(replyObject);
    console.log(commentArray);
    console.log(replyArray);

    commentReply(replyObject);
  });
}
