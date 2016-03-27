$(document).ready(function() {

    $("#getMusic").on("click", function() {

        var url = "http://LyeAmanda955.github.io/otherProjects/ajaxExamples/jsonDatabase/Music.json";

        $.getJSON(url, function(data) {
            var html = "<table class='table table-hover table-striped'>" +
              "<tr><th>artist</th><th>song</th><th>genre</th><th>gender</th><th>comment</th><th>rating</th><th>address</th><th>email</th></tr>";

            $.each(data, function(index, item) {

              html += "<tr>" +
                "<td>" + item.artist + "</td>" +
                "<td>" + item.song + "</td>" +
                "<td>" + item.genre + "</td>" +
                '<td><img class="MusicImage" src="../../images/' + item.album + '"/></td>' +
                "<td>" + item.comment + "</td>" +
                "<td>" + item.rating + "</td>" +
                "<td>" + item.address + "</td>" +
                "<td>" + item.email + "</td>" +
                "</tr>";
            })

            html += "</table>";
            $("#data").append(html);
            //alert(data);
            //console.dir(data);

          }) //getJSON

      }) //click

  }) //ready







/*
$("#getMusic").click(function() {
  //will not work locally with Chrome (use Safari, FF)
  $.getJSON("jsonDatabase/Music.json", function(data) {
    var table = "<table class='table table-striped table-hover'>" +
      "<tr><th>Name</th><th>Company</th><th>Email</th><th>Phone</th><th>Balance</th></tr>";
    $.each(data, function(index, item) {
      table += "<tr>"+
      "<td>" + item.name + "</td>" +
        "<td>" + item.company + "</td>" +
        "<td>" + item.email + "</td>" +
        "<td>" + item.phone + "</td>" +
        "<td>" + item.balance + "</td>"+
        "</tr>";
    });
    table += "</table>";
    $("#data").append(table);
  });//getJSON
});//click
//to look at a JSON file clearly copy teh contents of Music.json into http://www.jsoneditoronline.org/
*/
