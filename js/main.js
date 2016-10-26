$(document)
    .ready(function() {
        toggle_nav_container();
        gotoByScroll();
    });

var toggle_nav_container = function() {

    var $toggleButton = $("#toggle_m_nav");
    var $navContainer = $("#m_nav_container");
    var $menuButtonBars = $(".m_nav_ham");
    var $wrapper = $("#wrapper");
    var $navItem = $(".m_nav_item a");

    var show = function() {
        $wrapper.removeClass("closed_wrapper");
        $wrapper.addClass("open_wrapper");
        $navContainer.slideDown(200).addClass("container_open").css("z-index", "2");
        $menuButtonBars.removeClass("button_closed");
        $menuButtonBars.addClass("button_open");
        $("#m_ham_1").addClass("m_nav_ham_1_open");
        $("#m_ham_2").addClass("m_nav_ham_2_open");
        $("#m_ham_3").addClass("m_nav_ham_3_open");
    };
    var hide = function() {
        $navContainer.css("z-index", "0").removeClass("container_open").slideUp(200);
        $menuButtonBars.removeClass("button_open");
        $menuButtonBars.addClass("button_closed");
        $wrapper.removeClass("open_wrapper");
        $wrapper.addClass("closed_wrapper");
        $("#m_ham_1").removeClass("m_nav_ham_1_open");
        $("#m_ham_2").removeClass("m_nav_ham_2_open");
        $("#m_ham_3").removeClass("m_nav_ham_3_open");
    };
    $navItem.on("click", function() { hide(); });

    // toggle the container on click of button (can be remapped to $menuButton)
    $toggleButton.on("click",
        function() {
            if ($navContainer.is(":hidden")) {
                show();
            } else {
                hide();
            }
        });
};


// Function that takes the href value of links in the navbar and then scrolls 
// the div on the page whose ID matches said value. This only works if you use 
// a consistent naming scheme for the navbar anchors and div IDs
var gotoByScroll = function() {
    $(".m_nav_item a")
        .on("click",
            function(e) {
                e.preventDefault();
                $("html, body")
                    .animate({scrollTop: $($(this).attr("href")).offset().top + 1}, "slow");
            });
};