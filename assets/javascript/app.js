//api key: 
//2lKKnsGw13j9zQitzT9PJN5z7OhC8aEF


var topics = ["starfox", "batman", "bed", "cat"];



function createButtons() {
    $("#buttonsDisplay").empty();

    for (var i = 0; i < topics.length; i++) {
        var newButton = $("<button>");

        newButton.addClass("topicBtn");
        newButton.attr("data-topic", topics[i]);
        newButton.text(topics[i]);

        $("#buttonsDisplay").append(newButton);
    };
};


function generateGifs() {
    var topicQuery = $(this).attr("data-topic");
    
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=2lKKnsGw13j9zQitzT9PJN5z7OhC8aEF&q=" + topicQuery + "&limit=10";

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        $("#gifsDisplay").empty();
        
        var results = response.data;

        for (i = 0; i < results.length; i++) {
            var gifDiv = $("<div>");

            var gifRating = $("<p>").text("Rating: " + results[i].rating);

            // make img and set attributes
            var gifImg = $("<img>");
                gifImg.attr("data-still", results[i].images.fixed_height_still.url);
                gifImg.attr("data-animate", results[i].images.fixed_height.url);   

                gifImg.attr("src", gifImg.attr("data-still"));                
                gifImg.attr("data-state", "still");

            gifDiv.append(gifRating, gifImg);
            gifDiv.addClass("gifDiv");

            $("#gifsDisplay").append(gifDiv);            
        };
    });
};


$(document).on("click", ".topicBtn", generateGifs)


