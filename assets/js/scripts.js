(function ($) 
{
    "use strict";   
    $(window).on('resize',function () 
    {
        var $window = $(window);
        if($window.width()>=640 && !($('#mobile-menu').hasClass('hidden')))
            $('#mobile-menu').addClass('hidden');
        if($window.width()<640 && !($('#contactInfo').hasClass('hidden')))
            $('#contactInfo').addClass('hidden');
    });
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) 
    {
    // On-page links
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) 
        {
            // Figure out element to scroll to
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            // Does a scroll target exist?
            if (target.length) 
            {
                // Only prevent default if animation is actually gonna happen
                event.preventDefault();
                $('html, body').animate({scrollTop: target.offset().top}, 500, function(){
                    // Callback after animation
                    // Must change focus!
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) 
                    { // Checking if the target was focused
                        return false;
                    } 
                    else 
                    {
                        $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                        $target.focus(); // Set focus again
                    };
                });
            }
        }
    });
}
)(jQuery);
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});