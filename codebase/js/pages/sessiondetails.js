$(document).ready(function() {
    var id = $.urlParam('id');

    if (id === null) { id = localStorage.getItem("sessionId"); } //HACK due to WP8 not correctly handling the redirection

    if (id !== null) {
        var talk = getSession(id);
        var content = ""
            + talk.timeslot.track + talk.timeslot.id + " - " + talk.timeslot.slot
            + "</br>" + talk.referent.name
            + "</br>" + talk.title
            + "</br>" + talk.subtitle
            + "</br>" + talk.abstract;
        $("#Content").html(content);
    }

    if ($.urlParam('redirect') !== null)
        $('#BackLink').attr("href", "tutorials.html");
});

