
function getAllSessions(){
  var savedJson = localStorage.getItem(jsonTalksString);
  var sessions = JSON.parse(savedJson).sessions.session;
  return sessions;
}

function getTalks(){
  var savedJson = localStorage.getItem(jsonTalksString);
  var parsedSessions = JSON.parse(savedJson).sessions.session;
  var savedTalks = JSLINQ(parsedSessions)
        .Where(function (item) { return item.timeslot.track !== 'TUTORIAL'; });
  return savedTalks.items;
}

function getTutorials(){
  var savedTalks = localStorage.getItem(jsonTalksString);
  var parsedTalks = JSON.parse(savedTalks).sessions.session;
  var savedTutorials = JSLINQ(parsedTalks)
        .Where(function (item) { return item.timeslot.track === 'TUTORIAL'; });
  return savedTutorials.items;
}

function getSpeakers(){
  var savedSpeakers = localStorage.getItem(jsonSpeakerString);
  var speakers = JSON.parse(savedSpeakers).referents.referent;
  return speakers;
}

function getMetaInfo(){
  var savedMeta = localStorage.getItem(jsonMetaString);
  var meta = JSON.parse(savedMeta).days;
  return meta;
}

function getSession(id){
  var sessions = getAllSessions();
  var session = JSLINQ(sessions)
        .Where(function (item) { return item.id === id; });
  return session.items[0];
}

function getSpeaker(id){
  var speakers = getSpeakers();
  var speaker = JSLINQ(speakers)
        .Where(function (item) { return item.id === id; });
  return speaker.items[0];
}