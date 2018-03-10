var topics = ["ziti", "garlic bread", "pizza", "lasagna", "spaghetti", "vino", "manicotti", "antipasto"]


function getGiphy() {
    
    var italianFood = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + italianFood + "&api_key=9RDMUMG8vYwJr8UEtZdfBjUCXKhC2kWY&limit=10"

    $.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {

    console.log(response);
    console.log(response.data.length);

    for (i = 0; i<response.data.length; i++) {

    //create div to hold GIPHs
    var giphyDiv = $("<div class='giphy'>");

    //store the rating
    var rating = response.data[i].rating;
    console.log(rating);

    //create an element to store rating
    var pOne = $("<p>").text("Rating: " + rating)

    //display rating
    giphyDiv.append(pOne);

    //store the img url
    var animURL = response.data[i].images.fixed_height.url;
    console.log(animURL);
    var statURL = response.data[i].images.fixed_height_still.url;
    console.log(statURL);

    //create an element to store gif
    var gifIMG = $("<img class=grandma>");
    gifIMG.attr("src", statURL);
    gifIMG.attr({"data-animate" : animURL});
    gifIMG.attr({"data-state" : "still"});
    gifIMG.attr({"data-still" : statURL});

    //append image to div
    giphyDiv.append(gifIMG);

    //putting giphs into HTML
    $("#photos").prepend(giphyDiv);

    }

    $(".grandma").on("click", function () {
        console.log("You clicked me!");
        var state = $(this).attr("data-state");
        console.log(this);

        var animateSrc = $(this).attr("data-animate");
        var stillSrc = $(this).attr("data-still");
    
        if (state === "still") {
            $(this).attr("data-still");
            $(this).attr("src", animateSrc);
            console.log("changing to animatE");
            $(this).attr("data-state", "animate");
        }
        else {
            $(this).attr("data-animate");
            $(this).attr("src", stillSrc);
            $(this).attr("data-state", "still");
        }
    })
    
});


}
//function for making buttons from our array of strings
function makeButtons() {
    $("#buttons").empty();

    for (var i = 0; i < topics.length; i++) {
        var a = $('<button>');
            a.addClass("image-button");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#buttons").append(a);
    }
}

//click handler function when giphy button clicked
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var italianFood = $("#user-input").val().trim();
    topics.push(italianFood)
    makeButtons();
});



$(document).on("click", ".image-button", getGiphy);


makeButtons();