$(document).ready(function () {
    var unsortedSessions = getTalks();
    var sessions = JSLINQ(unsortedSessions)
        .OrderBy(function (item) { return item.title; });

    var li = createSessionLiElement(sessions, 'SessionDetails', 'SessionLink');

    $("#SessionsList").html(li);

    $(".topcoat-list__item").click(function (sender) {
        var id = sender.currentTarget.getAttribute('id');
        //window.location = "sessiondetails.html?id=" + id;
        localStorage.setItem("sessionId", id); //HACK: because the previous statement does not seem to work with WP8
        window.location = "sessiondetails.html";
    });
});