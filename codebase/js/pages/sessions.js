var $SessionsSelector = $("#TalksList");

//$(document).ready(function () {
$(document).on( 'pageshow', '#talks', function(){
    var unsortedSessions = getTalks();
    var sessions = JSLINQ(unsortedSessions)
        .OrderBy(function (item) { return item.timeslot.track; });

    //Build an empty list
    $SessionsSelector.append("");
    $SessionsSelector.trigger('create');

    //Create the whole content
    var div = createSessionDivElement(sessions);

    //Variante 1: direct Load (slow on device)
    //$SessionsSelector.html(div);
    //$SessionsSelector.trigger('create');

    //Variante 2: incremental load (fast on device)
    loadCollectionSet(div, $SessionsSelector);
    
    //Programatically remove the + icons
    deactivateCollapsibleIcons(selector);
});

function loadCollectionSet(divContent, selector) {
    var srcLength = 5000;
    var startSrc = 0;
    var subString = "";

    //At intervals, take a bunch of the divContent and load it
    var inter = self.setInterval(function () {

        //If end of the content
        if (divContent.length <= (startSrc + srcLength)) {
            //Get the last chunk
            subString = divContent.substr(startSrc);
            
            //Load the last chunk
            $SessionsSelector.append(subString);
            $SessionsSelector.trigger("create");
            
            //Stop the loop
            clearInterval(inter);
        } else {
            //Take a batch
            subString = divContent.substr((startSrc), srcLength);
            //Cut it after an item; they all start with '<div class="mc-col-el-start...'
            var index = subString.lastIndexOf("mc-col-el-start");
            var subStr = subString.substr(0, index - 12);

            //Increment the pointer position
            startSrc += index - 12;
            
            //Load the chunk
            $SessionsSelector.append(subStr);
            $SessionsSelector.trigger("create");
        }

    }, 0);
};