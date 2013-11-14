$(document).ready(function () {
	var unsortedSpeakers = getSpeakers();
    var speakers = JSLINQ(unsortedSpeakers)
            .OrderBy(function (speaker) { return speaker.name; });
    
    var li = createSpeakerLiElement(speakers, 'SpeakerPopupDetails', 'SpeakerLink');
    
    $("#SpeakersList").html(li);

    $(".topcoat-list__item").click(function (sender) {
        var id = sender.currentTarget.getAttribute('id');
        //window.location.replace("speakerdetails.html?id=" + id);
        localStorage.setItem("speakerId", id); //HACK: because the previous statement does not seem to work with WP8
        window.location = "speakerdetails.html";
    });
});

function createSpeakerLiElement(speakers, linkId, linkClass){
  var newLi = "";
  $.each(speakers.items, function (index, speaker) {
    
    //var speakerPhotoLink = "http://www.herbstcampus.de/hc13/program/photos/" + speaker.id + ".jpg";
    var speakerPhotoLink = "../img/icons/speaker_s.png";
    
    newLi += "<li class='topcoat-list__item' id=\"" + speaker.id + "\">"
      + "<div>"
        + "<img src=\"" + speakerPhotoLink + "\" class=\"ui-li-thumb\">"
      + "</div>"
      + "<div>"
        + "<span>" + speaker.name + "</span></br>"
        + "<span>" + speaker.companyname + "</span>"
      + "</div>"
      + "</li>";
    });
  return newLi;
}

function formatSpeakerName(speaker){
  var speakerNameParts = speaker.name.split(' ');
    var speakerName = "";
    $.each(speakerNameParts, function(key, snp) {
      speakerName = snp + "_" + speakerName;
    });
    speakerName = speakerName.substring(0, speakerName.length - 1);
    return speakerName;
}