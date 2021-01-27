$(document).ready(function () {
    $('html').addClass('js-enabled');
    setup_dense();
    $(".js-preloader").fadeOut(800, function () {
        $(".js-main-container").fadeIn(800);
        setup_scrollreveal();
        setup_progress_bar_animation();
    });
});

function setup_progress_bar_animation() {
    let $animation_elements = $("[class*='a-']");
    let $window = $(window);

    $window.on('scroll resize', function () {
        let window_height = $window.height();
        let window_top_position = $window.scrollTop();
        let window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            let $element = $(this);
            let element_height = $element.outerHeight();
            let element_top_position = $element.offset().top;
            let element_bottom_position = (element_top_position + element_height);

            // Check to see if this current container is within viewport
            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('in-view');

                // Animate progress bar
                if ($element.hasClass('a-progress-bar')) {
                    $element.css('width', $element.attr('data-percent') + '%');
                }

            }
        });
    });

    $window.trigger('scroll');
}


function setup_dense() {
    if ($.isFunction($.fn.dense)) {
        $('img').dense({
            'glue': '@'
        });
    }
}

function setup_scrollreveal() {
    if (typeof ScrollReveal !== 'undefined' && $.isFunction(ScrollReveal)) {

        window.sr = ScrollReveal();

        let default_config = {
            duration: 500,
            delay: 0,
            easing: 'ease',
            scale: 1,
            mobile: false
        };
        let header_config = $.extend(false, default_config, {
            duration: 1200,
            delay: 700
        });
        let footer_config = $.extend(false, default_config, {
            duration: 1500,
            distance: 0,
            viewOffset: {top: 0, right: 0, bottom: 100, left: 0}
        });

        var default_delay = 175;

        sr.reveal('.a-header', header_config, default_delay);
        sr.reveal('.a-footer', footer_config, default_delay);

    }

}