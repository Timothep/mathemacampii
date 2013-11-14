$(document).ready(function () {
	
});

function makeTime(timeString){
  var split = timeString.split(':');
  var time = new Date();
  time.setHours(split[0]);
  time.setMinutes(split[1]);
  return time;
}

function getSlot(meta, day, now){
  //Get the slots for the day
  var daySlots = JSLINQ(meta)
            .Where(function (item) { return item.date === day; });
  
  if(daySlots.items[0] !== null && daySlots.items[0].slots.length === 1)
    return daySlots.items[0].slots[0];
  else{
    //The next slot is the one that is current at "current time + 60 min"
    //e.g. during the first 10 minutes of a slot, we still display the current slot's tracks
    var nextSlot = "";
    var minDiff;
    var nowAsTime = makeTime(now);

    $.each(daySlots.items[0].slots, function(key, slot){
      var slotStart = slot.split('-')[0];
      var slotStartAsTime = makeTime(slotStart);

      var diff = slotStartAsTime - nowAsTime;
      //If the slot is in the future AND closer than the current closest
      if(diff > 0 && (diff < minDiff || minDiff === null))
      {
        nextSlot = slot;
        minDiff = diff;
      }

    });

    if(nextSlot !== "")
      return nextSlot; 
    else{
      //TODO: Something happened...
    }
  }
}

function getDay(meta, today){
  var minDist;
  var currentChoice;
  var todayAsDate = makeDate(today);

  //Loop through all the days of the conference
  $.each(meta, function (key, day){
    //If today is one of the days
    if(day.date === today)
      return day.date;

    var slotsDate = makeDate(day.date);
    if(slotsDate !== null){
      var dist = slotsDate.getTime() - todayAsDate.getTime();
      if(dist >= 0 && (minDist === undefined || dist < minDist)){
        minDist = dist;
        currentChoice = day.date;
      }
    }
  });
  return currentChoice;
}