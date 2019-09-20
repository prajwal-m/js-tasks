var queryString = decodeURIComponent(window.location.search);
queryString = queryString.substring(1);
var queries = queryString.split("&");
for (var i = 0; i < queries.length; i++) {
  console.log(queries[i]);
}

var idData = queries[0].split("=");
console.log(idData);
console.log(idData[1]);

var postId = idData[1];

var voteData = queries[1].split("=");
console.log(voteData);
console.log(voteData[1]);

var voteCounter = voteData[1];

// var queryString = decodeURIComponent(window.location.search);
// queryString = queryString.substring(1);
// console.log(queryString);
// var queries = queryString.split("=");
// console.log(queries[1]);
// var postId = queries[1];
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

  postData.imgURLData === ""
    ? (imgData.style.display = "none")
    : (imgData.style.display = "block");

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

var commentArray = [];

var replyArray = [];
var container = document.getElementById("comment-thread");

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

    // var addComments = JSON.parse(localStorage.getItem(postId));
    // console.log("data from storage");
    // console.log(addComments);

    // addComments.CommentList = commentArray;
    // console.log(addComments);
    // localStorage.setItem(postId, JSON.stringify(addComments));

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

var newCommentArray = [];

// var newObj = JSON.parse(localStorage.getItem(postId));
// console.log(newObj);
// console.log(commentArray);

var iconContainer = document.getElementById("icon-list");

var iconDiv = document.createElement("div");
iconDiv.className = "icon-div";
iconContainer.appendChild(iconDiv);

var commentIcon = document.createElement("i");
commentIcon.className = "fa fa-comments";
iconDiv.appendChild(commentIcon);

var shareIcon = document.createElement("i");
shareIcon.className = "fa fa-share";
iconDiv.appendChild(shareIcon);

var upvoteIcon = document.createElement("i");
upvoteIcon.className = "fa fa-arrow-up";
iconDiv.appendChild(upvoteIcon);

var voteCount = document.createElement("p");
voteCount.className = "vote-count";
voteCount.id =
  Math.random()
    .toString(36)
    .substring(2, 15) +
  Math.random()
    .toString(36)
    .substring(2, 15);
voteCount.innerHTML = voteCounter;
iconDiv.appendChild(voteCount);

var downvoteIcon = document.createElement("i");
downvoteIcon.className = "fa fa-arrow-down";
iconDiv.appendChild(downvoteIcon);

var count = voteCounter;
upvoteIcon.addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  var incrCount = document.getElementById(voteCount.id);
  incrCount.innerHTML = ++count;
});

downvoteIcon.addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  var decrCount = document.getElementById(voteCount.id);
  count > 0 ? (decrCount.innerHTML = --count) : (decrCount.innerHTML = "");
});

var commentData = {
  id: "g6723yzv0mce9r7sghl298",
  comment: "qwertyuiop",
  parentId: ""
};

function staticDisplay(commentData) {
  var newDataObj = {};
  var commentPara = document.createElement("span");
  commentPara.className = "comment-para";
  commentPara.innerHTML = commentData.comment;
  commentPara.id = commentData.id;
  container.appendChild(commentPara);
  newDataObj.id = commentPara.id;

  newDataObj.comment = commentData.comment;
  newDataObj.parentId = commentData.parentId;
  commentArray.push(newDataObj);
  console.log(commentArray);

  var replyIcon = document.createElement("i");
  replyIcon.className = "fa fa-chevron-circle-right";
  replyIcon.id = commentPara.id;
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

staticDisplay(commentData);
