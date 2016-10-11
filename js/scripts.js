//List of streamers
var streamers = [{
    name: "reckful"
  },
  {
    name: "freecodecamp"
  },
  {
    name : "pokiman"
  },
  {
    name : "noobs2ninjas"

  },
  {
    name : "brunofin"
  },
  {
    name : "comster404"
  }];

function getStreamers(stream){
  /*
    args - streamers - an object of twitch streamers
    retrieves data about each twitch streamer
    return - returns jason data
  */
  var data = $.parseJSON($.ajax({
    url:"https://api.twitch.tv/kraken/streams/"+stream.name,
    type: "Get",
    headers: {
      "Client-ID": "gljkkzqeuggc7c0zxppf6dlmpfectnr"
    },
      async: false
    }).responseText);
  return data;
}

function getData(){
  /*
     Gets data from twitch api and saves it to streamers
  */
  var data = "";
  for(var i in streamers){
    data = getStreamers(streamers[i]);
    if(data.error){
      streamers[i].stream = data.error;
    }
    else{
      if(data.stream === null){
        streamers[i].stream = null;
      }
      else{
        streamers[i].stream = "active";
        streamers[i].game = data.stream.game;
        streamers[i].details = data.stream.channel.status;
        streamers[i].logo = data.stream.channel.logo;
        streamers[i].url = data.stream.channel.url;
      }
    }
  }  
  loadDisplay(streamers);
}

function streamerSearch(){
  /*
    Used to search for a streamer in the list.
  */
  var lst = [];
  var word = document.getElementById("search").value;
  for(var i in streamers){
    if(streamers[i].name.indexOf(word) >= 0)
      lst.push(streamers[i]);
  }
  loadDisplay(lst);
}

function allStreamers(){
  /*
    Used to pass all streamers to the loadDisplay function
  */
  loadDisplay(streamers);
}

function offline(){
  /*
    Used to pass only streamers who are offline to loadDisplay()
  */
  var lst = [];
  for(var i in streamers){
    if(streamers[i].stream === null){
      lst.push(streamers[i]);
    }
  }
  loadDisplay(lst);
}

function online(){
  /*
    passes only onlie streamers to loadDisplay function
  */
  var lst = [];
  for(var i in streamers){
    if(streamers[i].stream == "active"){
      lst.push(streamers[i]);
    }
  }
  loadDisplay(lst);
}

function loadDisplay(streamers){
  /*
    args - streamers - object containing the streamers to be displayed
    Need to append streamers to the page
  */
  var height = 50;
  var width = 50;
  var boot ="col-xs-4 col-xs-offset-4 col-sm-4 col-sm-offset-4 col-md-4 col-md-offset-5 col-lg-4 col-lg-offset-5";
  $streamers = $("#streamers");
  $streamers.empty();
  for(var i in streamers){
    var streamersHtml = 0;
    if(streamers[i].stream === null){
      streamersHtml = "<div class='row'><li class='"+boot+"'><a href='https://www.twitch.tv/"+
      streamers[i].name+"'><img src='#' height="+height+" width="+
      width+ "alt='"+streamers[i].name+"' title='"+
      streamers[i].name+"'></a><p>"+streamers[i].name+
      " status: <span class='offline'>offline</span></p></li></div>";
    }
    else if(streamers[i].stream == "active"){
      streamersHtml = "<div class='row'><li class='"+boot+"'><a href='"+streamers[i].url+"'><img src='"+
      streamers[i].logo+"' height="+height+"width="+width+"alt='"+
      streamers[i].name+"' title='"+streamers[i].name+"'></a><p>"+
      streamers[i].name+" status: <span class='active'>"+
      streamers[i].stream+"</span></p><p>game: "+streamers[i].game+
      " details: "+streamers[i].details+"</p></li></div>";
    }
    else{
      streamersHtml = "<div class='row'><li class='"+boot+"'><p>"+streamers[i].name+"</p>"+
      "<p>"+streamers[i].stream+"</p>";
    }
    $streamers.append(streamersHtml);
  }
}