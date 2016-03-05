$(document).ready(function() {

    var circleOrEx = "o"; // initalizes variable to start at as an O
    var lettercolour = "red"
    var isGameInProgress = true; // Intializes variable to true.
    var winningCombos = { // depending on where you click the certain values on the grid have to be selected
        0: [ //0 is key
            [1, 2], //this multiDimensional Array is values
            [3, 6],
            [4, 8]
        ],
        1: [
            [0, 2],
            [4, 7]
        ],
        2: [
            [0, 1],
            [5, 8],
            [4, 6]
        ],
        3: [
            [0, 6],
            [4, 5]
        ],
        4: [
            [1, 8],
            [2, 6],
            [1, 7],
            [3, 5]
        ],
        5: [
            [2, 8],
            [3, 4]
        ],
        6: [
            [0, 3],
            [2, 4],
            [7, 8]
        ],
        7: [
            [1, 4],
            [6, 8]
        ],
        8: [
            [0, 4],
            [2, 5],
            [6, 7]
        ]
    };

    // this add's an on click event to every div inside of board id/div
    $("#board").find("div").on("click", function() {

        if (isGameInProgress && $(this).hasClass("empty")) { /// if isGameInProgress =true AND this div is empty
            $(this).removeClass("empty").append("<span class='" + circleOrEx + " " + lettercolour +
                "'>" + circleOrEx + "</span");
            //
            checkIfWon($(this).index(), circleOrEx); //call the checkIfWon function and pass both the position of the click
            // and the current value if circleOrEx

            if (circleOrEx === "o") {
                circleOrEx = "x";
                lettercolour = "green";
            } else {
                circleOrEx = "o";
                lettercolour = "red"
            }
        }

    });

    // it is a button that resets the game
    $("#newGame").on("click", function() {

        var boardSquares = $("#board").find("div"); //this  finds all the div's inside of the board id
        var firstEmptyMemorySquare = $(".container").find(".nine").filter(function() { // the filter function searches
            // through "nine" elements for an empty box (to place the existing game)
            return $.trim($(this).text()) === "" && $(this).children().length === 0;
        }).not("#board").first();


        if (firstEmptyMemorySquare.length == 1) { //if it found an empty memory box then copy the game into the box
            firstEmptyMemorySquare.html($("#board").html());
        } else {
            //if all the boxes are full then empty all the boxes and then put the game in the first box
            $(".container").find(".nine").not("#board").empty();
            $(".container").find(".nine").first().html($("#board").html());
        }

        // for each of the divs on the gameboard make them empty/clear the board
        boardSquares.each(function() {
            $(this).addClass("empty").empty();
        })
        isGameInProgress = true;
    })

    //the paramter contains the number of the div that was clicked, based on the number the game is won if
    // the other boxes in its rows/column contain the same letter. get the numbers for those other boxes
    function checkIfWon(chosenSquare) {

        var mulitArr = winningCombos[chosenSquare];
        var playerWon;

        for (var i = 0; i < mulitArr.length; i++) { //loop through each of the arrays of answers
            playerWon = true;
            for (var j = 0; j < mulitArr[i].length; j++) {
                if (!$("#board").find("div").eq(mulitArr[i][j]).find("span").hasClass(circleOrEx)) {
                    /*this checks if the div element number
                                                                                 is NOT equal to the current letter, if so, then not a win */
                    playerWon = false;
                }
            }

            if (playerWon) { // if the letters match for any of the array of answrs, then playerWon will = true

                for (var j = 0; j < mulitArr[i].length; j++) {
                    $("#board").find("div").eq(mulitArr[i][j]).find("." + circleOrEx).addClass("green"); // colour all the winning letters green
                }
                $("#board").find("div").eq(chosenSquare).find("." + circleOrEx).addClass("green");
                alert("Winner is " + circleOrEx.toUpperCase() + "!");
                isGameInProgress = false;
                return false; //this exits the loop
            }
        }


    }
})
