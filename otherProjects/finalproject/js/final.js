$(document).ready(function() {
    var listofsongs = "onetime;"
    var listofalbums = ""
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
              var html = "<div class='container'><table class='table table-hover table-striped table-bordered'>" +
                "<tr><th>Artist</th><th>Song</th><th>Genre</th><th>Album Cover</th><th>Comment</th><th>Rating</th><th>Buy Song</th><th>Buy Album</th></tr>";

              $.each(data, function(index, item) {
                var n = listofsongs.indexOf(item.song);
                var scheck = " "
                if (n != -1) {
                  scheck = " checked"
                };
                var n = listofalbums.indexOf(item.song);
                var acheck = " "
                if (n != -1) {
                  acheck = " checked"
                };
                html += "<tr>" +
                  "<td>" + item.artist + "</td>" +
                  "<td>" + item.song + "</td>" +
                  "<td class='cen'>" + item.genre + "</td>" +
                  '<td><img class="MusicImage" src="../../images/' + item.album + '"/></td>' +
                  "<td><audio controls='controls' src='musicfiles/" + item.song + ".m4a'></audio></td>" +

                  "<td class='cen'>" + item.rating + "</td>" +
                  "<td><label class=checkbox-inline><input type=checkbox name=song value=" + item.song + scheck + " class=rChecked>" + item.song + "</label></td>" +
                  "<td><label class=checkbox-inline><input type=checkbox name=album value=" + item.song + acheck + "  class=rChecked>" + item.song + "</label></td>" +

                  "</tr>";
              })

              html += "</table></div>";
              $("#data").append(html);
              $(".rChecked").on("change", function() {
                var val = $(this).val();
                //  $("#log").append("<br>checked " + val);
                getchecked();

              });
              //alert(data);
              //console.dir(data);

            }) //getJSON





        })
      } else if (partial == "orderPage") { //ajax get home.html

        $.get("partials/orderpage.html", function(data) {

          $("#pageContent").html(data);
          $('#DeliveryDate').datepicker({});
          var songs = listofsongs.split(";");
          var html = "<div class='input-group'><span class='purch'>Song Purchases</span></div>"


          for (var i = 0; i < songs.length - 1; i++) {

            html = html + "<div class='input-group'><label class=checkbox-inline><input type=checkbox name=song value=" + songs[i] + " checked class=rChecked>" + songs[i] + " @ $1.29 </label></div>"
          }

          var html = html + "<br><br><div class='input-group'><span class='purch'>Album Purchases</span></div>"

          var albums = listofalbums.split(";");
          for (var i = 0; i < albums.length - 1; i++) {

            html = html + "<div class='input-group'><label class=checkbox-inline><input type=checkbox name=song value=" + albums[i] + " checked class=rChecked>" + albums[i] + " @ $13.99 </label></div>"
          }
          $("#data").append(html + "<br>");

          $("#ordername,#orderaddr,#orderphone,#orderemail,#name,#CardType,#cardNumber,#securityCode,#expirymonth,#expiryYear,#address1,#zip,#state,#country").on("focus", function() {
              $("#log").append("<br>input focus " + this.id + "=" + this.value);
              $(this).css("background-color", "#F7F8E0");
            })
            .on("blur", function() {
              $("#log").append("<br>input blur");
              $(this).css("background-color", "#FFF");
            });




          //user clicks the button
          $("#SubmitButton").on("click", function() {
              $("#log").html("User Clicked Submit... Log reset");

              var userOrder = {};
              //get all empty inputs and select
              //add error class to div container
              $("input, select").filter(function() {
                return !this.value;
              }).closest("div").addClass("has-error");

              //remove error class for non empty ones
              $("input, select").filter(function() {
                return this.value; //removed !
              }).closest("div").removeClass("has-error");

              var errors = $(".has-error");

              if (errors.length < 1) {
                var es = ""
                var input = $('#expiryYear').val();
                var test = ",2016,2017,2018,2019,2020,2021,".indexOf("," + input + ",")

                if (test == -1) {
                  es = es + " Expiry Year must be 2016 to 2021<br>"
                }
                $("#EditIssues").html(es);
                $("#EditIssues").css("color", "red");

                var input = $('#country').val();

                input = input.toUpperCase()

                var test = ",CANADA,USA,".indexOf("," + input + ",")

                if (test == -1) {
                  es = es + " Country Must be Canada or USA<br>"
                }

                if (listofsongs.length + listofalbums.length == 0) {
                  es = es + " You must choose at least on song or album<br>"
                }

                $("#EditIssues").html(es);
                $("#EditIssues").css("color", "red");



                if (es.length == 0) {
                  //  alert("no errors");
                  sendConfirmation();
                }
              }

            }) //click
        })

      }

      $("#pageContent").fadeIn();
      //change the backgrund color on focus, blue




    }

    function getchecked() {
      listofsongs = ""
      listofalbums = ""
      $("[name='song']:checked").each(function() {
        listofsongs = listofsongs + $(this).val() + ";";
      });
      $("[name='album']:checked").each(function() {
        listofalbums = listofalbums + $(this).val() + ";";
      });
      //   alert(listofsongs)
      //  alert(listofalbums)

    }

    function sendConfirmation() {
      //make an object to record data for database;
      var order = {};
      //get all teh jquery objects
      var formData = $("input, select");
      //for each jquery object
      formData.each(function() {
        var id = $(this).attr("id"); //get the id of the element
        order[id] = $(this).val(); //set the field and the value
      })

      alert("Sending to database " + JSON.stringify(order));
      $("#successMsg").html("Order Received!<br/><br/>" +
        listofsongs + listofalbums + " will be delivered on " + order.DeliveryDate);
      $("#successMsg").css("color", "blue");
    } //sendConfirmation
    getPartial("homePage");


  }) //ready
