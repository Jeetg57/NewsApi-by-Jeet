var results;
var url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=bb22f36ba61e4495a6423407d1233e3d`;
getObjects();
$("#validatorBtn").click(function() {
  var e = document.getElementById("sourceSelect");
  results = e.options[e.selectedIndex].value;
  $("#article").empty();
  if (results === "None") {
    url = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=bb22f36ba61e4495a6423407d1233e3d`;
    getObjects();
  } else {
    url = `https://newsapi.org/v2/top-headlines?sources=${results}&pageSize=100&apiKey=bb22f36ba61e4495a6423407d1233e3d`;
    getObjects();
  }
  console.log(results);
});
getSources();

function getObjects() {
  $.get(url, function(data) {
    var myData = data;
    console.log(myData);

    for (var i = 0; i <= myData.totalResults; i++) {
      if (
        myData.articles[i].title &&
        myData.articles[i].author &&
        myData.articles[i].urlToImage &&
        myData.articles[i].description !== null
      ) {
        var displayArticle = `
    <h3>${myData.articles[i].title}</h3>
      <figure class="figure">
        <img class="articleImage" src = "${myData.articles[i].urlToImage}">
        <figcaption class="figure-caption">${
          myData.articles[i].description
        }</figcaption>
      </figure>
    
    <p><strong>By: </strong>${myData.articles[i].author}</p> 
    <p><strong>Source: </strong>${myData.articles[i].source.name}</p>
    <p class="content">${myData.articles[i].content}</p>
    <p><strong>Published at: </strong>  ${moment(
      myData.articles[i].publishedAt
    ).format("MMMM Do YYYY : LT")}</p>
    <a href = "${myData.articles[i].url}" class="btn btn-primary">Learn more</a>
    <hr>
  `;
        $("#article").append(displayArticle);
      }
    }
  });
}

function getSources() {
  var url =
    "https://newsapi.org/v2/sources?apiKey=bb22f36ba61e4495a6423407d1233e3d";
  $.get(url, function(data) {
    console.log(data);
    for (var i = 0; i < data.sources.length; i++) {
      $("#sourceSelect").append(
        `<option value="${data.sources[i].id}">${data.sources[i].name}</option>`
      );
    }
  });
}
