var allInfo = [
  [
    "Are you a loan, because you're gaining my interest.",
    "Are you Little Caesars? Because you're hot and I'm ready.",
    "Have you heard about Pluto? That's messed up, right?",
    "The titanic is my favourite icebreaker.",
    "Are you a beaver? Because dam.",
    
    "Do you have an ugly boyfriend.\n No? Want one?",
    "If you were a tree, you'd be a good tree.",
    "So I was backpacking across Western Europe...",
    "I have a dog and she licks faces, c'mere.",
    "Girl I put the STD in stud, all I need is U.",
    
    "What's your highest CP pokemon?",
    "I'm challenger in League of Legends.",
    "Slow night tonight, I guess you'll do.",
    "Good things come in small, unattractive packages.",
    "Are you stairs, because you take my breath away.",
    
    "I see you got teeth, I like that in a girl.",
    "I'm trash, you should take me out.",
    "On a scale of 1-10, you're a 9 and I'm the one you need.",
    "Are you french? Because maDAMN.",
    "If you were a fruit, you'd be a FINEapple.",
    
    "My love for you burns with the intensity of a thousand white suns.",
    "I don't like sand. It's coarse and rough and irritating and it gets everywhere.",
    "Hey, this is going to sound really cheesy, but... \n Mozzarella.",
    "Help, I've fallen for you and I can't get up.",
    "Lower your expectations and let's begin."  
  ], //Quotes
  [
    "Chris Rock",
    "Amy Schumer",
    "That Arrogant Little Shit",
    "The Real Spiderman",
    "The Ghost of Christmas Past",
    
    "Your Lab Partner",
    "Danny Phantom",
    "That One Guy from that One Class",
    "A Mistake Waiting to Happen",
    "The Fake Spiderman",
    
    "Michael Scott",
    "A Lonely Tree",
    "The Guy on the Bus",
    "Your Future Husband",
    "Real-life Waifu",
    
    "Your Pal for Grade 6",
    "Drake Bell",
    "Barrack Obama",
    "Tesla Edison",
    "Stevie Wonder",
    
    "Waddles the Pig",
    "Christian Bale of Hay",
    "Santa Claus",
    "Clifford the Big Red Dog",
    "Ashley Madison",
  ], //Users
  [
    "Candyland",
    "Gotham City",
    "My Mom's House",
    "The Local Elementary School",
    "Kinda far but not too far",
    
    "Hell's Kitchen",
    "In the Dining Room with the Candlestick",
    "Under the 401",
    "Walmart (Entertainment Section)",
    "The Nearest Hospital",
    
    "Starbucks",
    "A&W - Home of A&W Root Beer",
    "The American Idol Waiting Room",
    "Atop Mount Everest",
    "Boulevard of Broken Dreams",
    
    "Bikini Bottom",
    "At the Nickelback concert",
    "Heaven",
    "Find me on SnapMaps",
    "Sensei's Dojo",
    
    "Chuck E. Cheese",
    "A Hipster Cafe",
    "Washington, M.C.",
    "Home with the Kiddos",
    "In the Men's Room"
  ], //Locations
  [
    "https://goo.gl/x3BTM3", //Blue, white, orange
    "https://goo.gl/JoRhdg", //Night sky
    "https://goo.gl/2cXHUa", //Red
    "https://goo.gl/h1N5wt", //Sunset, blue sky
    "https://goo.gl/w8GqHK", //Rainbow mist
    
    "https://goo.gl/T6cWSU", //Blue, white gradient 
    "https://goo.gl/LeknHd", //Pastel, rainbow
    "https://goo.gl/QfGjLQ", //Rainbow streaks
    "https://goo.gl/bocZzA", //Green
    "https://goo.gl/FsY52N", //Blue, green
    
    "https://goo.gl/u7Uu1Y", //Red, blue, stars
    "https://goo.gl/ymfW9J", //Dark red
    "https://goo.gl/W1Vnaq", //Yellow, blue
    "https://goo.gl/WhKKdf", //Yellow lens flare
    "https://goo.gl/i8ZpQj", //Sidewalks
    
    "https://goo.gl/yEznPq", //Traffic jam
    "https://goo.gl/9hJmJY", //City
    "https://goo.gl/6R3mmJ", //River
    "https://goo.gl/9Ac2ww", //Dark
    "https://goo.gl/kBLsos", //Neon lights
    
    "https://goo.gl/GNfMoJ", //Pink streaks
    "https://goo.gl/SyRyrG", //Space
    "https://goo.gl/ia3ziR", //Highway
    "https://goo.gl/vPhA1z", //Night sky
    "https://goo.gl/TDkn6M" //Rainy window
  ] //Backgrounds
];
var saveInfo = function(quote, user, location, bg) {
  this.quote = quote;
  this.user = user;
  this.location = location;
  this.bg = bg;
};
var liked = [];
var deleted = [];

function genRand(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function newQuote() {
  if (allInfo[0].length>0) {
    var randInt = Math.ceil(Math.random()*100);
    $("#quote").text(genRand(allInfo[0]));
    $("#user").html(genRand(allInfo[1]) + "<span>, " + randInt + "</span>");
    $("#location").text(genRand(allInfo[2]));
    $(".content").css("background-image","url(" + genRand(allInfo[3]) + ")");
  } else {
    $("#quote").text("I'm all outta suggestions");
    $("#user").text("Nothing's good enough for ya huh?");
    $("#location").text("Find your own Date, nerd");
    $(".content").css("background-image",'url("https://goo.gl/JALR4x")');  
  }
}

$(".refresh").on("click", function(){
  newQuote();
});
$(".dislike").on("click", function() {
  if (allInfo[0].length > 0) {
    var index = allInfo[0].indexOf($("#quote").text());
    deleted.push(allInfo[0].splice(index,1)[0]);
    newQuote();
  }
});
$(".like").on("click", function() {
  liked.push( 
    new saveInfo(
      $("#quote").text(),
      $("#user").html(),
      $("#location").text(),
      $(".content").css("background-image")
    ) 
  );
});
$(".tweet").on("click", function() {
  var tweetText = 
  $("#quote").text().replace(/\s/g,function() {return "%20";});
  window.open("https://twitter.com/intent/tweet?hashtags=tinDirectory&text=" + '"' + 
              $("#quote").text() + '"' +
              " - " + 
              $("#user").text() + 
              " - " +
              $("#location").text());
});

$(".like-list").on("click", function() {
  if (liked.length>0) {
    $(this).toggleClass("fa-heart fa-times fa-fw makeWhite")
    $(".overlay").toggleClass("disp-toggle");
    var i = $("#selector").val()-1;
    $("#selector").attr("max", liked.length);
    $("#liked-quote").text(liked[i].quote);
    $("#liked-user").html(liked[i].user);
    $("#liked-location").html(liked[i].location);
    $(".liked-content").css("background-image", liked[i].bg);  
  }
});

$("#selector").change(function() {
  var i = $(this).val()-1;
  $("#liked-quote").text(liked[i].quote);
  $("#liked-user").html(liked[i].user);
  $("#liked-location").html(liked[i].location);
  $(".liked-content").css("background-image", liked[i].bg);  
});

$(document).ready( function() {
  newQuote();
})