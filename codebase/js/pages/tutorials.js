$(document).ready(function () {
	var unsortedTutorials = getTutorials();
    var tutorials = JSLINQ(unsortedTutorials)
            .OrderBy(function (item) { return item.title; });
    
    var li = createSessionLiElement(tutorials, 'TutorialPopupDetails', 'TutorialLink');
    
    $("#TutorialsList").html(li);
    
    $(".topcoat-list__item").click(function (sender) {
        var id = sender.currentTarget.getAttribute('id');
        //window.location.replace("sessiondetails.html?id=" + id + "&redirect=tutorials");
        localStorage.setItem("sessionId", id); //HACK: because the previous statement does not seem to work with WP8
        window.location = "sessiondetails.html";
    });
});