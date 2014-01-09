var $SpeakerSelector = $("#SpeakersList");

$(document).on('pageshow', '#speakers', function () {
	var unsortedSpeakers = getSpeakers();
    var speakers = JSLINQ(unsortedSpeakers)
            .OrderBy(function (speaker) { return speaker.name; });
    
    var div = createSpeakerDivElement(speakers);    
    $SpeakerSelector.html(div);
    $SpeakerSelector.collapsibleset();
    
    


    deactivateCollapsibleIcons($SpeakerSelector);
});

function createSpeakerDivElement(speakers) {
    var newDiv = "";
    $.each(speakers.items, function (index, speaker) {
        var speakerPhotoLink = "../img/speakers/07.jpg";
        newDiv += "<div id=\"" + speaker.id + "\" data-role=\"collapsible\" data-iconpos=\"right\" >"
                + "<h3>"
                    + "<div class=\"speaker-photo-wrapper\">"
                        + "<img src=\"" + speakerPhotoLink + "\" width=\"38\" height=\"50\">"
                    + "</div>"
                    + "<div class=\"collapsible-heading\">" + speaker.name + "</div>"
                + "</h3>"
                + "<p>" + speaker.content + "</p>"
            + "</div>";
    });
    return newDiv;
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