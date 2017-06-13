$(document).ready(function() {
    initScrollTo();
});

function initScrollTo() {
    $('.js-scrollTo').on('click', function() {
        var page = $(this).attr('href'); // Target page
        var speed = 750;
        $('html, body').animate({
            scrollTop: $(page).offset().top
        }, speed);
        return false;
    });
}