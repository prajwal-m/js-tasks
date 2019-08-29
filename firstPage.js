function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

var dataArray = new Array();

function moveLocation(id, voteElement) {
  console.log("moved");
  console.log(id);
  var votes = voteElement.innerHTML;
  console.log(typeof votes);
  var queryString = "?value=" + id;
  var newQuerystring = "?value1=" + id + "&value2=" + Number(votes);
  window.location.href = "postPage.html" + newQuerystring;
  console.log(voteElement);
  console.log(voteElement.innerHTML);
  console.log("moved to content");
}

function createDomElements(dataObject) {
  var container = document.getElementById("input-container");
  console.log("inside create dom method");
  console.log(container);
  var newDiv = document.createElement("div");
  newDiv.className = "childDiv";
  newDiv.id =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  container.appendChild(newDiv);
  newDiv.addEventListener("click", function() {
    console.log("clicked");
    console.log(this.id);
    moveLocation(this.id, voteCount);
  });

  localStorage.setItem(newDiv.id, JSON.stringify(dataObject));

  var titleElement = document.createElement("p");
  titleElement.innerHTML = dataObject.titleData + " ";
  titleElement.className = "title-element";
  newDiv.appendChild(titleElement);

  var authorElement = document.createElement("p");
  authorElement.innerHTML = " -Posted by  " + dataObject.authorData;
  authorElement.className = "author-element";
  titleElement.appendChild(authorElement);

  var imgElement = document.createElement("img");
  imgElement.src = dataObject.imgURLData;
  imgElement.className = "image-element";
  //   newDiv.appendChild(imgElement)

  var str = dataObject.imgURLData;
  console.log("regex test");
  console.log(str);
  var regex = RegExp("(https?://.*.(?:png|jpg))");
  var globalRegex = RegExp("(https?://.*.(?:png|jpg))", "g");

  console.log(regex.test(str));

  dataObject.imgURLData != ""
    ? (newDiv.appendChild(imgElement), (newDiv.style.marginLeft = "150px"))
    : ((imgElement.style.display = "none"),
      (newDiv.style.height = "250px"),
      (newDiv.style.marginLeft = "150px"));

  var contentElement = document.createElement("p");
  contentElement.innerHTML = dataObject.contentData;
  contentElement.className = "content-element";
  newDiv.appendChild(contentElement);

  var iconDiv = document.createElement("div");
  iconDiv.className = "icon-div";
  newDiv.appendChild(iconDiv);

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
  voteCount.innerHTML = "";
  iconDiv.appendChild(voteCount);

  var downvoteIcon = document.createElement("i");
  downvoteIcon.className = "fa fa-arrow-down";
  iconDiv.appendChild(downvoteIcon);

  var count = 0;
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
}

// handling form submit

function handleSubmit() {
  var title = document.getElementById("form-title").value;
  var author = document.getElementById("form-author").value;
  var content = document.getElementById("form-content").value;
  var imgURL = document.getElementById("form-image").value;
  var container = document.getElementById("input-container");
  var dataObject = {
    titleData: title,
    authorData: author,
    contentData: content,
    imgURLData: imgURL
  };

  dataArray.push(dataObject);
  console.log(dataArray);

  console.log(title);
  console.log(author);
  console.log(content);
  console.log(imgURL);
  closeForm();

  createDomElements(dataObject);
}

var staticData = {
  titleData: "Animals",
  authorData: "Martin Garrix",
  contentData:
    "Martijn Gerard Garritsen, professionally known as Martin Garrix, is a Dutch DJ and record producer from Amstelveen. His most known singles are . He was ranked number one on DJ Mag's Top 100 DJs list for three consecutive years",
  imgURLData:
    "https://yt3.ggpht.com/a/AGF-l78q93xLts3A_ZL0ZetQ4JpMdeOxq624ENl3tg=s900-c-k-c0xffffffff-no-rj-mo"
};

createDomElements(staticData);

function changeView() {
  var viewDiv = document.querySelectorAll(".childDiv");
  console.log(viewDiv);
  for (var i = 0; i < viewDiv.length; i++) {
    viewDiv[i].style.width = "45%";
    viewDiv[i].margin = "20px 10px";
  }
}
