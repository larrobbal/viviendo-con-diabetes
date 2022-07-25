(function ($) {   
    $(window).on('resize',function () {
        var $window = $(window);
        if($window.width()>=640 && !($('#mobile-menu').hasClass('hidden')))
            $('#mobile-menu').addClass('hidden');
        if($window.width()<640 && !($('#contactInfo').hasClass('hidden')))
            $('#contactInfo').addClass('hidden');
    });
})(jQuery);
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");
btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});