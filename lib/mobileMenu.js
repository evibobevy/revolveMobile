
$(document).ready(function(){
    $("#show").click(function(){
        $("ul").show();
    });
    $("#hide").click(function(){
        $("ul").hide();
        $(".mobileMenu").hide();
        $("#nav").show();
    });
    
});

var vid = document.getElementById("myVideo");

function enableControls() { 
    vid.controls = true;
    vid.load();
} 
