/*
- Add toggler between serif and sans-serif fonts
- Add animation for launching searchbar
- Add responsiveness to mobile, tablet, etc.
- Add modal popouts of first entry inc. pic
- Add first sentence fetcher
- Add error catching for null searchData (no results)
*/

var search;
var searchData;

function fetchData() {
  var apiRequest = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&generator=search&utf8=1&exsentences=1&exintro=1&explaintext=1&gsrsearch="+search+"&gsrlimit=20&callback=?";
  //The following apiRequest accesses images as well
  //var apiRequest = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&generator=search&utf8=1&exsentences=1&exintro=1&explaintext=1&piprop=original&pilimit=9&pilicense=any&gsrsearch="+search+"&gsrlimit=20&gsroffset=0&callback=?"
  $.ajax({
    type: "GET",
    url: apiRequest,
    dataType: "json",
    success: function(data) {
      searchData = Object.values(data.query.pages);
      for (i=0; i<searchData.length; i++) {
        searchData[i].url = "https://en.wikipedia.org/wiki/" + searchData[i].title;
        delete searchData[i].index;
        delete searchData[i].ns;
        delete searchData[i].pageid;
        $("#result" + (i+1) + " .sub").text(searchData[i].title);
        $("#result" + (i+1) + " .desc").text(searchData[i].extract);
        $("#result" + (i+1)).attr("href", searchData[i].url);
        $("#result" + (i+1)).removeClass('inv');
      }  
    }
  });
}


$("form").submit(function(e) {
  e.preventDefault();
  search = ($("#searchBar").val());
  fetchData();
  $('#info').removeClass('location');
});

$(".col-md").hover(function() {
  $("body").css("background",'rgb('+(Math.floor(Math.random()*155)+100)+','+(Math.floor(Math.random()*155)+100)+','+(Math.floor(Math.random()*155)+100)+')');
}, function() {
  $("body").css("background",'#9FCFCF');
})

$(document).ready(function() {
  console.clear();
});