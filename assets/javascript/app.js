
var topics = ["sleep", "cookies", "chips", "piano", "batman", "baseball", "family guy"];

var selectedTopic = "";

var gifCount = 10;

function createButtons() {
    $("#buttonsDisplay").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");

        newButton.addClass("topicBtn");
        newButton.attr("data-topic", topics[i]);
        newButton.text(topics[i]);

        if (topics[i] === selectedTopic) {
            newButton.addClass("selectedBtn");
        };

        $("#buttonsDisplay").append(newButton);
    };
};

createButtons();

$("#addTopic").on("click", function(event) {
    event.preventDefault();

    var newTopic = $("#topicInput").val().trim();

    if (newTopic === "") {
        alert("You didn't enter anything!");
    } 
    else if (topics.indexOf(newTopic) > -1) {
        alert("There's already a button for that!");            
    }
    else {
        topics.push(newTopic);
        createButtons();
    };

    $("#topicInput").val("");
});


$(document).on("click", ".topicBtn", function() {

    // check whether the clicked topic button is the one that is "active" (already selected); if so, increase the count of gifs queried; if not, set count back to 10 and reassign "selectedBtn" class;
    if ($(this).hasClass("selectedBtn")) {
        gifCount += 10;
    }
    else {
        // remove class "selectedBtn" from all topicBtn, then add it for clicked button; this is for styling
        $(".topicBtn").removeClass("selectedBtn");
        $(this).addClass("selectedBtn");

        gifCount = 10;
    }

    selectedTopic = $(this).attr("data-topic");

    var topicQuery = $(this).attr("data-topic");
    
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=2lKKnsGw13j9zQitzT9PJN5z7OhC8aEF&q=" + topicQuery + "&limit=" + gifCount;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        $("#gifsDisplay").empty();
        
        var results = response.data;
        // console.log(results);
        for (i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var gifRating = $("<p>").text("Rating: " + results[i].rating.toUpperCase());

            var gifTitle = $("<p>").text(results[i].title);
            

            // make img and set attributes
            var gifImg = $("<img>");
                gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);   

                gifImg.attr("src", gifImg.attr("data-still"));                
                gifImg.attr("data-state", "still");

                gifImg.addClass("gif");

            // // make download link; not working...
            // var downloadLink = $("<a>").text("Download gif");
            //     downloadLink.attr("href", results[i].images.fixed_height.url);
            //     downloadLink.attr("download", results[i].title);

            
            gifDiv.append(gifTitle, gifImg, gifRating);
            gifDiv.addClass("gifDiv");

            $("#gifsDisplay").prepend(gifDiv);            
        };
    });
});


$(document).on("click", ".gif", function() {
    if ($(this).attr("data-state") === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if ($(this).attr("data-state") === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
    else {
        alert("Something's wrong");
    };
});