$(document).ready(function () {
    var id = $.urlParam('id');
    
    if (id === null) { id = localStorage.getItem("speakerId"); } //HACK due to WP8 not correctly handling the redirection

	if (id !== null){
		var speaker = getSpeaker(id);
	    var content = ""
	        //TODO: show picture "http://www.herbstcampus.de/hc13/program/photos/64_Anger_Ramon.jpg"
	        + speaker.name
	        + "</br>" + speaker.companyname
	        + "</br>" + speaker.content;
		//TODO: list talks
		$("#Content").html(content);
	}
});