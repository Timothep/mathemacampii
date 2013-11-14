$(document).ready(function () {
	var unsortedSessions = getUpcomingTalks();
    var sessions = JSLINQ(unsortedSessions)
            .OrderBy(function (item) { return item.title; });

    var li = createSessionLiElement(sessions, 'UpcomingPopupDetails', 'UpcomingLink');
    
    $("#UpcomingsList").html(li);
});

//Create the popups with one upcoming talk details
  $('div.UpcomingsContent').on('click', '.UpcomingLink', function (e) {
    var data = getUpcomingTalks();
    var refid = e.currentTarget.getAttribute('refid');
    var session = JSLINQ(data)
            .Where(function (item) { return item.id === refid; });
    var result = "<div class=\"rectangle " + getColor(session.items[0].timeslot.track) + "\">" + session.items[0].timeslot.track + "</div>"
          + "<br/>"
          + "<h4>" + session.items[0].title + "</h4>"
          + "<p>" + session.items[0].subtitle + "</p>"
          + session.items[0].referent.name
          + "<p>" + session.items[0].abstract + "</p>";
    $("#UpcomingPopupContent").html(result);
  }); 