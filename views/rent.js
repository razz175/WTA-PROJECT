$(document).ready(function() {
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll > 300) {
            $(".colour").css("background-color", "blue");
        } else {
            $(".colour").css("background-color", "transparent");
        }
    })
})

var height = $('header').height;
$(window).scroll(function() {
    if ($(this).scrollTop() > height) {
        $('.searchBar').addClass('fixed');
    } else {
        $('.searchBar').removeClass('fixed');
    }
})