$(document).ready(function() {

    //get all the nav li, add click event
    $(".nav").find("li").on("click", function() {

        //remove all active class
        $(".nav").find("li").removeClass("active");
        //add active class to clicked li
        $(this).addClass("active");

        //get the correct page according to click
        var page = $(this).attr("id");
        getPartial(page);

      }) //click
      function getPartial(partial) {
        $("#pageContent").hide();

        if (partial == "homePage") { //ajax get home.html

          $.get("partials/homepage.html", function(data) {
            $("#pageContent").html(data);
          })
        } else if (partial == "musicPage") { //ajax get home.html

            $.get("partials/musiclist.html", function(data) {
              $("#pageContent").html(data);

              var url = "jsonDatabase/Music.json";

              $.getJSON(url, function(data) {
                  var html = "<table class='table table-hover table-striped table-bordered'>" +
                    "<tr><th>Artist</th><th>Song</th><th>Genre</th><th>Album Cover</th><th>Comment</th><th>Rating</th><th>Address</th><th>Email</th></tr>";

                  $.each(data, function(index, item) {

                    html += "<tr>" +
                      "<td>" + item.artist + "</td>" +
                      "<td>" + item.song + "</td>" +
                      "<td class='cen'>" + item.genre + "</td>" +
                      '<td><img class="MusicImage" src="../../images/' + item.album + '"/></td>' +
                      "<td><audio controls='controls' src='musicfiles/"+ item.song +".m4a'></audio></td>" +

                      "<td class='cen'>" + item.rating + "</td>" +
                      "<td><label class=‘checkbox-inline’><input type=‘checkbox’ name=‘Album’ value=‘MyWorld’ checked class=‘rChecked’>My World</label></td>" +
                      "<td>" + item.email + "</td>" +
                      "</tr>";
                  })

                  html += "</table>";
                  $("#data").append(html);
                  //alert(data);
                  //console.dir(data);

                }) //getJSON





            })
          } else if (partial == "orderPage") { //ajax get home.html

              $.get("partials/orderpage.html", function(data) {
                $("#pageContent").html(data);
              })
            }
        $("#pageContent").fadeIn();
      }

  getPartial("homePage");


  }) //ready
