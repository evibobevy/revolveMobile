
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
function detectAndroidFirefox () {
   var agent = navigator.userAgent.toLowerCase();
   if(agent.indexOf('firefox') >= 0){
     if(agent.indexOf("android") >= 0){
       return true;    
     } else{
       return false;
     }
   } else{
     return false;
   }
}
