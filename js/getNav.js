alert(0);
$.get("http://LyeAmanda955.github.io/Partials/nav.html",
function(data) {
$(document).ready(function() {alert(1)
//check if this document has .container
var container = $(".container");
//if so add nav.html contents to the top
if (container) {
container.prepend(data)
//container.fadeIn();

}
});
});
