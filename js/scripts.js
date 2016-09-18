var streamers = [{
	name: "reckful",
	active: ""
    },{
    	name:"freecodecamp"
    },{
    	name : "pokiman"
    },{
    	name :  "noobs2ninjas"
    } ]

var newStream= [{}]
function getStreamers(stream){
	$streamers = $("#streamers")
	//var n = ['reckful', 'freecodecamp', 'pokiman', 'noobs2ninjas']
	
    //for(i in streamers){
      var data = $.parseJSON($.ajax({
	    url:'https://api.twitch.tv/kraken/streams/'+stream.name,
        type: 'Get',
        headers: {
    	  'Client-ID': 'gljkkzqeuggc7c0zxppf6dlmpfectnr'
        },
        async: false
	   // success: function(data){
	    //	var htmlList = "<ul><p>"+data.stream+"</p></ul>";
	    //    $streamers.append(htmlList);
	    //	console.log(data);
	   // }
      }).responseText);
      return data
}
function i(){
	for(i in streamers){
	  var data = getStreamers(streamers[i])
      if(data.stream == null){
      	streamers[i].stream = null;
      }else{
      	streamers[i].stream = "active";
      	streamers[i].game = data.stream.game;
      	streamers[i].details = data.stream.channel.status;
      	streamers[i].logo = data.stream.channel.logo;
      	streamers[i].url = data.stream.channel.url;
      }
      console.log(streamers[0].url)
    }
    loadAll()
}
function loadAll(){
	var height = 20;
	var width = 20;
	$streamers = $("#streamers");
	for(i in streamers){
		var streamersHtml = 0;
		if(streamers[i].stream == null){
			 streamersHtml = "<li><a href='https://www.twitch.tv/"+
			 streamers[i].name+"'><img src='#' height="+height+" width="+
			 width+ "alt='"+streamers[i].name+"' title='"+
			 streamers[i].name+"'></a><p>"+streamers[i].name+
			 " status: <span class='offline'>offline</span></p></li>";
	   }else{
	   	streamersHtml = "<li><a href='"+streamers[i].url+"'><img src='"+
	   	streamers[i].logo+"' height="+height+"width="+width+"alt='"+
	   	streamers[i].name+"' title='"+streamers[i].name+"'></a><p>"
	   	+streamers[i].name+" status: <span class='active'>"+
	   	     streamers[i].stream+"</span></p><p>game: "+streamers[i].game+
	   	     " details: "+streamers[i].details+"</p></li>"
	   }
       $streamers.append(streamersHtml)
	}
}