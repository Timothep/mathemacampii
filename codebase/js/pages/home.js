var baseBackendURL = "http://mathemacampiibackend.azurewebsites.net";
var dateTestString = "DateTest";
var timeTestString = "TimeTest";
var jsonMetaString = "hcJsonMeta";
var jsonTalksString = "hcJsonTalks";
var jsonSpeakerString = "hcJsonSpeakers";
var jsonTimestampString = "hcJsonDataUpdateTimeStamp";

//$(function() {
//    FastClick.attach(document.body);
//});

$(document).ready(function () {
  initializeJSON();

  //Check if the JSON Payload is present in the store, if not pull it!
  pullDataIfAbsent();

  $("#UpdateButton").bind('touchstart', function () {
    updateJSON();
  });

 $("#SaveDateTime").bind('touchstart', function () {
    updateDateTime();
  });

  $("#newsNavButton").bind('touchstart', function () {
    $("#navigationPopupContent").html("Not implemented: News stuff!");
  });

  $("#twitterNavButton").bind('touchstart', function () {
    !function (d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https'; if (!d.getElementById(id)) {
        js = d.createElement(s); js.id = id; js.src = p + "://platform.twitter.com/widgets.js"; fjs.parentNode.insertBefore(js, fjs);
    } }(document, "script", "twitter-wjs");
  });

  $('a#ShowOptionsButton').bind('touchstart',function () {
    $('#TestToday').val(localStorage.getItem(dateTestString));
    $('#TestNow').val(localStorage.getItem(timeTestString));
  });

  //Bind to the talk's popup's event handler to close upon tap on the popup itself
  $( function (){
    $("#SessionPopupDetails").bind( "tap", function (){ $(this).popup('close'); });
    $("#UpcomingPopupDetails").bind( "tap", function (){ $(this).popup('close'); });
    $("#SpeakerPopupDetails").bind( "tap", function (){ $(this).popup('close'); });
    $("#TutorialPopupDetails").bind( "tap", function (){ $(this).popup('close'); });
  });
});

//Upon showing the options page
//Refresh the date when the last refresh was made
$(document).on('pagebeforeshow', '#Options', function () {
    refreshDate();
  });

//Returns the upcoming talks
function getUpcomingTalks(){
  var today = localStorage.getItem(dateTestString); //"2013-09-02";
  var now = localStorage.getItem(timeTestString);

  var meta = getMetaInfo();
  var upcoming = getUpcomingDayAndSlot(meta, today, now);  

  var unsortedSessions = getAllSessions();
  return JSLINQ(unsortedSessions).Where(function (item) { return item.timeslot.id === upcoming.day && item.timeslot.slot === upcoming.slot ; }).items;
}

function getUpcomingDayAndSlot(meta, today, now){
  var day = getDay(meta.day, today);
  var slot = getSlot(meta.day, day, now);
  return { "day": day, "slot": slot};
}

function makeDate(dateString){
  var split = dateString.split('-');
  var date = new Date(split[0], (split[1] - 1), split[2]);
  return date;
}

//Returns a color for a track's name
function getColor(track){
  if(track === "DOTNET")
    return "blue";
  else if (track === "TEST")
    return "green";
  else if (track === "JAVA")
    return "red";
  else if (track === "WEB")
    return "orange";
  else if (track === "tutorial")
    return "grey";
  else
    return "black";
}

function getTrackIcon(track){
  if(track === "DOTNET")
    return "DotNet.png";
  else if (track === "TEST")
    return "Test.png";
  else if (track === "JAVA")
    return "Java.png";
  else if (track === "WEB")
    return "Html5.png";
  else if (track === "TUTORIAL")
    return "Tutorial.png";
  else
    return "Keynote.png";
}

//Get the last refresh date from the LocalStorage and display it on the Option Page
function refreshDate(){
  var html = "Last update on: " + getLastUpdate();
  $("#LastUpdateParagraph").html(html);
}

//Get the current datetime in a human readable format
function getDateTimeNow(){
  var currentdate = new Date();
  return currentdate.getFullYear() + "/"
    + (currentdate.getMonth()+1) + "/"
    + currentdate.getDate() + "@"
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
}



//Get the last update from the local storage
function getLastUpdate(){
  return localStorage.getItem(jsonTimestampString);
}

function initialized(){
  if(localStorage.getItem(jsonTalksString) === null 
    || localStorage.getItem(jsonSpeakerString) === null
    || localStorage.getItem(jsonMetaString) === null
    || localStorage.getItem(dateTestString) === null
    || localStorage.getItem(timeTestString) === null)
    return false;
  return true;
}

function initializeJSON(){
  if(!initialized())
  {
    localStorage.setItem(jsonMetaString, JSON.stringify(constMeta));
    localStorage.setItem(jsonTalksString, JSON.stringify(constTalks));
    localStorage.setItem(jsonSpeakerString, JSON.stringify(constSpeakers));
    localStorage.setItem(jsonTimestampString, "Never");
    localStorage.setItem(dateTestString, "2013-09-05");
    localStorage.setItem(timeTestString, "10:25");
  }
}

//Call the NancyWebservice to get the JSON data and store it in local storage
function updateJSON(){
  $.ajax({
    type: 'GET',
    url: baseBackendURL + '/talks',
    async: false,
    dataType: 'jsonp',
    success: function (jsonExtract) {
      saveJson(jsonExtract, jsonTalksString);
    }
  });
  $.ajax({
    type: 'GET',
    url: baseBackendURL + '/speakers',
    async: false,
    dataType: 'jsonp',
    success: function (jsonExtract) {
      saveJson(jsonExtract, jsonSpeakerString);
    }
  });
  $.ajax({
    type: 'GET',
    url: baseBackendURL + '/meta',
    async: false,
    dataType: 'jsonp',
    success: function (jsonExtract) {
      saveJson(jsonExtract, jsonMetaString);
    }
  });
}

function saveJson(jsonExtract, tag){
  localStorage.setItem(tag, ""); //Reset
  localStorage.setItem(tag, JSON.stringify(jsonExtract));
  localStorage.setItem(jsonTimestampString, ""); //Reset
  localStorage.setItem(jsonTimestampString, getDateTimeNow());
  refreshDate();
}

function updateDateTime(){
  localStorage.setItem('DateTest', $('input#TestToday').val());
  localStorage.setItem('TimeTest', $('input#TestNow').val());
}

//If the JSON is not found in local storage, pull it
function pullDataIfAbsent(){
  if(getLastUpdate() === null)
    updateJSON();
}





$.urlParam = function(name){
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if(results !== null)
      return results[1] || 0;
    return null;
};

function createSessionLiElement(sessions, linkId, linkClass){
  var newLi = "";
  $.each(sessions.items, function (index, session) {
      newLi += "<li class='topcoat-list__item' id=\"" + session.id + "\">"
        + "<span>" + session.title + "</span></br>"
        + "<span>" + session.subtitle + "</span>"
        + "</li>";
    });
  return newLi;
}