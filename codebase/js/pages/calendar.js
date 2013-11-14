$(document).ready(function () {
	var unsortedSessions = getAllSessions();
	var meta = getMetaInfo();   
	var div = buildCalendarList(unsortedSessions, meta);

	$("#Container").html(div);
});

function buildCalendarList(unsortedSessions, meta){
  var li = "";    
  
  $.each(meta.day, function (key, day) {
    var dailySessions = getDailySessionsSortedPerSlot(unsortedSessions, day.date);
    li += createDayHeader(day);

    $.each(day.slots, function (key, slot) {
      var sessionsPerSlot = getSessionsPerSlot(dailySessions.items, day, slot);
      li += createSlotHeader(slot);
      li += createEnglobingUl();
      li += createSessionLiElement(sessionsPerSlot,'CalendarPopupDetails', 'CalendarLink');
      li += closeEnglobingUl();
    }); 
  });

  return li;
}

function getDailySessionsSortedPerSlot(unsortedSessions, date){
  return JSLINQ(unsortedSessions)
    .Where(function (item){ return item.timeslot.id === date; })
    .OrderBy(function (item) { return item.timeslot.slot; });
}

function getSessionsPerSlot(dailySessions, day, slot){
  return JSLINQ(dailySessions)
    .Where(function (item){ return item.timeslot.slot === slot; })
    .OrderBy(function (item) { return item.timeslot.slot; });
}

function createDayHeader(day){
  return "<h3 class=\"topcoat-list__header\">" + day.date + "</h3>";
}

function createSlotHeader(slot){
  return "<h4 class=\"topcoat-list__header slot-header\">" + slot + "</h4>";
}

function createEnglobingUl(){
	return "<ul class=\"topcoat-list__container\">";
}

function closeEnglobingUl(){
	return "</ul>";
}