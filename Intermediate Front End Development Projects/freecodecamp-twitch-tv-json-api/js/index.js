var streamers = [
  "digitalotus",
  "brownman",
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas",
  "tribalinstincts",
  "Zimtok5TV",
  "ColinNorthway",
  "VRScout",
  "rich_hard1",
  "the_monotonist",
  "locxion",
  "Emerald_Activities",
  "vrdevschool",
  "steazTV",
  "oBumble",
  "dochollis",
  "omgitsfirefoxx",
  "hyperRPG"
].sort();

var twitchData = [];

/*
  - addNewStreamer button
  - configure sort functions
*/

var reqCount = 0;
function fillData() {
  for (i = 0; i < streamers.length; i++) {
    $.ajax({
      type: "GET",
      url:
        "https://wind-bow.gomix.me/twitch-api/channels/" +
        streamers[i] +
        "?callback=?",
      dataType: "json",
      ajaxI: i,
      success: function(data) {
        var i = this.ajaxI;
        $("#result" + i)
          .find(".card-img-top")
          .attr("src", data.profile_banner);
        $("#result" + i)
          .find(".logo")
          .attr("src", data.logo);
        $("#result" + i)
          .find(".head")
          .html(data.display_name);
        $("#result" + i)
          .find(".card-title")
          .text(data.status);
        $("#result" + i)
          .find(".card-text")
          .html(
            "<br>Total lifetime views: <strong>" + data.views + "</strong>"
          );
        $("#result" + i).attr("href", data.url);
        reqCount++;
        $.ajax({
          type: "GET",
          url:
            "https://wind-bow.gomix.me/twitch-api/streams/" +
            streamers[i] +
            "?callback=?",
          dataType: "json",
          ajaxI: i,
          success: function(data) {
            var i = this.ajaxI;
            console.log(data);
            if (Boolean(data.stream)) {
              $("#result" + i)
                .find(".head")
                .append(
                  "<span> - Playing <strong>" +
                    data.stream.game +
                    "</strong></span>"
                );
              $("#result" + i).addClass("live");
              $("#result" + i).hover(
                function() {
                  $(this).css("box-shadow", "-10px 0px rgb(92,184,92)");
                },
                function() {
                  $(this).css("box-shadow", "none");
                }
              );
              $("#result" + i).focusin(function() {
                $(this).css("box-shadow", "0 0 0 0.3rem rgba(92,184,92,0.5)");
              });
              $("#result" + i)
                .find(".card-text")
                .prepend(
                  "<br>Live viewer count: <strong>" +
                    data.stream.viewers +
                    "</strong>"
                );
            } else {
              $("#result" + i)
                .find(".head")
                .append("<span> - Offline</span>");
              $("#result" + i).hover(
                function() {
                  $(this).css("box-shadow", "-10px 0px rgb(217,83,79)");
                },
                function() {
                  $(this).css("box-shadow", "none");
                }
              );
              $("#result" + i).focusin(function() {
                $(this).css("box-shadow", "0 0 0 0.3rem rgba(217,83,79,0.5)");
              });
            }
            $("#result" + i).focusout(function() {
              $(this).css("box-shadow", "none");
            });
            reqCount++;
          }
        });
      }
    });
    $.ajax({
      type: "GET",
      url:
        "https://wind-bow.gomix.me/twitch-api/users/" +
        streamers[i] +
        "?callback=?",
      dataType: "json",
      ajaxI: i,
      success: function(data) {
        var i = this.ajaxI;
        $("#result" + i)
          .find(".card-subtitle")
          .text(data.bio);
        reqCount++;
      }
    });
  }
}

function fetchData() {
  for (i = 0; i < streamers.length; i++) {
    twitchData.push({});
    $.ajax({
      type: "GET",
      url:
        "https://wind-bow.gomix.me/twitch-api/channels/" +
        streamers[i] +
        "?callback=?",
      dataType: "json",
      ajaxI: i,
      success: function(channels) {
        var i = this.ajaxI;
        twitchData[i].banner = channels.profile_banner;
        twitchData[i].logo = channels.logo;
        twitchData[i].name = channels.display_name;
        twitchData[i].status = channels.status;
        twitchData[i].totalViews = channels.views;
        twitchData[i].url = channels.url;
        reqCount++;
      }
    });
    $.ajax({
      type: "GET",
      url:
        "https://wind-bow.gomix.me/twitch-api/streams/" +
        streamers[i] +
        "?callback=?",
      dataType: "json",
      ajaxI: i,
      success: function(streams) {
        var i = this.ajaxI;
        twitchData[i].isLive = Boolean(streams.stream);
        if (twitchData[i].isLive) {
          twitchData[i].liveColor = "rgb(92, 184, 92)";
          twitchData[i].liveColorFaded = "rgba(92, 184, 92, 0.7)";
          twitchData[i].liveViewers = streams.stream.viewers;
          twitchData[i].game = streams.stream.game;
        } else {
          twitchData[i].liveColor = "rgb(217, 83, 79)";
          twitchData[i].liveColorFaded = "rgba(217, 83, 79, 0.7)";
          twitchData[i].game = "";
        }
        reqCount++;
      }
    });
    $.ajax({
      type: "GET",
      url:
        "https://wind-bow.gomix.me/twitch-api/users/" +
        streamers[i] +
        "?callback=?",
      dataType: "json",
      ajaxI: i,
      success: function(users) {
        var i = this.ajaxI;
        twitchData[i].bio = users.bio;
        reqCount++;
      }
    });
  }
}

function populate() {
  for (i = 0; i < streamers.length; i++) {
    $("#result" + i)
      .find(".card-img-top")
      .attr("src", twitchData[i].banner);
    $("#result" + i)
      .find(".logo")
      .attr("src", twitchData[i].logo);
    $("#result" + i)
      .find(".card-title")
      .text(twitchData[i].status);
    $("#result" + i)
      .find(".card-subtitle")
      .text(twitchData[i].bio);
    $("#result" + i)
      .find(".card-text")
      .html(
        "<br>Total lifetime views: <strong>" +
          twitchData[i].totalViews.toLocaleString() +
          "</strong>"
      );
    $("#result" + i).attr("href", twitchData[i].url);

    if (twitchData[i].isLive) {
      $("#result" + i)
        .find(".card-text")
        .prepend(
          "<br>Live viewer count: <strong>" +
            twitchData[i].liveViewers.toLocaleString() +
            "</strong>"
        );
      $("#result" + i)
        .find(".head")
        .html(twitchData[i].name + '<span> - ' + twitchData[i].game + '</span>');
    } else {
      $("#result" + i)
        .find(".head")
        .html(twitchData[i].name + '<span> - Offline</span>');
    }
  }
}

$(document).ready(function() {
  fetchData();
  if ($(window).height() < $(".navbar").height()) {
    $(".navbar").removeClass("sticky-top");
  }
});

$(document).ajaxComplete(function() {
  if (reqCount == streamers.length * 3) {
    populate();
    for (i = 0; i < streamers.length; i++) {
      $(".loading-icon").addClass("d-none");
      $("#result" + i).toggleClass("d-none");
    }
  }
});

function toggleFilters(buttonId) {
  $("#filters button").removeClass("active");
  $(buttonId).toggleClass("active");
}

$(".card").hover(
  function() {
    var i = $(this)
      .attr("id")
      .substr(6);
    $(this).css("box-shadow", "-10px 0px " + twitchData[i].liveColor);
  },
  function() {
    $(this).css("box-shadow", "none");
  }
);
$(".card").focusin(function() {
  var i = $(this)
    .attr("id")
    .substr(6);
  $(this).css("box-shadow", "0 0 0 0.3rem " + twitchData[i].liveColorFaded);
});
$(".card").focusout(function() {
  $(this).css("box-shadow", "none");
});

$("#filter-all").click(function() {
  toggleFilters("#filter-all");
  for (i = 0; i < streamers.length; i++) {
    $("#result" + i).removeClass("d-none");
  }
});
$("#filter-online").click(function() {
  toggleFilters("#filter-online");
  for (i = 0; i < streamers.length; i++) {
    !twitchData[i].isLive ? 
      $("#result" + i).addClass("d-none") : 
      $("#result" + i).removeClass("d-none");
  }
});
$("#filter-offline").click(function() {
  toggleFilters("#filter-offline");
  for (i = 0; i < streamers.length; i++) {
    twitchData[i].isLive ? 
      $("#result" + i).addClass("d-none") : 
      $("#result" + i).removeClass("d-none");
  }
});
$("#filter-search").keyup(function(e) {
  toggleFilters("#search");
  for (i = 0; i < streamers.length; i++) {
    var title = twitchData[i].name.toLowerCase();
    var game = twitchData[i].game.toLowerCase();
    var input = $(this).val().toLowerCase();
    if (title.search(input)==-1 && game.search(input)==-1) {
      $("#result" + i).addClass("d-none");
    } else {
      $("#result" + i).removeClass("d-none");
    }
  }
});

function toggleSorts(buttonId) {
  $("#sorts button").removeClass("active");
  $(buttonId).toggleClass("active");
}