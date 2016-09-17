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
	  var n = getStreamers(streamers[i])
	  console.log(n)
    }
}
