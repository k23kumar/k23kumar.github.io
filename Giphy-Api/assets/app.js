var queryURL = "https://api.giphy.com/v1/gifs/search";

var my_api_key = "dc6zaTOxFJmzC";


var officeCharacters = ["Michael Scott", "Dwight Shrute", "Jim Halpert", "Pam Beasly", "Andy Bernard", "Stanley Hudson", "Angela Martin", "Phyllis Vance", "Oscar Martinez"];
//"Kevin Malone", "Toby Henderson", "Erin Hannon", "Ryan Howard", "Holly Flax", "Creed Branton", "Kelly Kapoor", "Robert California", "Roy Anderson", "Meredith Palmer", "Gabe Lewis", "Darryl Philbin", "Pete Miller", "Clark Green"];

function renderButtons() {
    $("#buttons").empty();
     // for each string in array, create a button and append to #buttons//
    // set button text and button attribute data-name to the string //
    for (var i = 0; i<officeCharacters.length; i++) {
        var a = $("<button>");
        a.attr("data-name", officeCharacters[i]);
        a.text(officeCharacters[i]);  
        a.addClass("character-button");  
        $("#buttons").append(a);
    }

}
$(document).ready( function() {
    renderButtons();

    //make a character button click event//
    //when clicked on find ten #gifs and append to div id 'gifs'//

    $(document).on('click', '.character-button', function() {
        $('#gifs').empty();  
        var name =  $(this).attr("data-name");
        $.ajax({
        url: queryURL,
        method: "GET", 
        data: {
            api_key: my_api_key,
            q: name,
            limit: 10
        }
      }).then(function(response) {
          console.log(response);
        const results = response.data;
        for (const result of results) {
            var div = $("<div>").addClass('gif-div');
            div.appendTo("#gifs");
            var image = $("<img>");
            image.appendTo(div);
            image.addClass('gif-image');
            image.attr({
                'src': result.images.fixed_height_still.url,
                "data-state": "still", 
                "data-still": result.images.fixed_height_still.url,
                "data-animate": result.images.fixed_height.url
            });
            $("<p>").text('Rating: ' + result.rating).appendTo(div);
            $("<h5>").text(result.title).prependTo(div);

        } 
      });
    });

    $(document).on('click', '.gif-image', function() {
        var image = $(this);
        //if data state attribute is equal to still change source to animate and change state to animate//

        //if data state is animate, change source to data still and change state to data still//

        if (image.attr("data-state") === "still") {
            const animate = image.attr("data-animate");
            image.attr('src', animate);
            image.attr('data-state', 'animate');
        }

       
        else if (image.attr("data-state") === "animate") {
            const still = image.attr("data-still");
            image.attr('src', still);
            image.attr('data-state', 'still');
        }
    });

    //create buttons for searched characters//
    $(document).on('click', '#addGif', function(event) {
        event.preventDefault();
        var input = $('#search-input').val().trim();
        officeCharacters.push(input);
        renderButtons();
        $('#search-input').val("")
    })
  









}); 



