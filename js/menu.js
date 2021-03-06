// ---------------------
// declare variables
// ---------------------


// list of block's names that will be animated (array)
var boxNamesList = ['salads', 'main-courses', 'desserts'];

// a string variable for concatenation all names into one jQuery selector
var boxImgStr = '';

for (var i = 0; i < boxNamesList.length - 1; i++) {
    boxImgStr += "#" + boxNamesList[i] + "-img, ";
}
boxImgStr += "#" + boxNamesList[boxNamesList.length - 1] + "-img";


// array that includes all image boxes
var $boxTarget = $(boxImgStr);

// variable for id of clicked box, box and copy jQuery-object
var boxClicked;
var $box;
var $copy;

// array that includes all close controls elements
var $cross = $(".controls-close");



// ---------------------
// jQuery document event handler
// ---------------------

$(document).ready(function () {

    // event - click on image boxes
    $boxTarget.click(function () {
        boxClicked = this.id;
        $box = $("#" + boxClicked);
        $copy = $("#" + boxClicked.replace('-img', '-copy'));
        animateLayoutToState('clicked');
    });


    // event - click on close control
    $cross.click(function () {
        animateLayoutToState('origin');
    } );

    // event - any click in document
    $(document).click(function (e) {

        // consider only click...
        if (e.target != $box[0] && !$box.has(e.target).length &&        //... out of image box
            e.target != $copy[0] && !$copy.has(e.target).length) {      //... out of copy box
                animateLayoutToState('origin');
        }
    });
});


// ---------------------
// functions
// ---------------------

// function for add/remove classes to animated elements
function animateLayoutToState (state) {

    //hiding menu list
    if (state == 'origin') {
        // hide copy box
        $copy.addClass("hide");

        setTimeout(function () {
            $copy.removeClass("bring-to-front-2");

            // remove classes from clicked image
            $box.removeClass("img-extend");
            $box.toggleClass("pointer");
            $box.toggleClass("bring-to-front-1");

            for (var i = 0; i < boxNamesList.length; i++) {
                // show all hidden image boxes
                if (boxNamesList[i] + '-img' !== boxClicked) {
                    $('#' + boxNamesList[i] + '-img').removeClass("hide");
                }
            }

            // show h1 heading
            $('#' + boxClicked + ' > h1').removeClass("hide");
        }, 500);

    //showing menu list
    } else if (state == 'clicked') {
        for (var i = 0; i < boxNamesList.length; i++) {
            // hide all image boxes except the one what was clicked
            if (boxNamesList[i] + '-img' !== boxClicked) {
                $('#' + boxNamesList[i] + '-img').addClass("hide");
            }
        }

        // hide h1
        $('#' + boxClicked + ' > h1').addClass("hide");

        // show the copy box
        $copy.addClass("bring-to-front-2");
        setTimeout(function () {
            $copy.removeClass("hide");
        }, 500);

        // add classes to the clicked image
        $box.addClass("img-extend");
        $box.toggleClass("pointer");
        $box.toggleClass("bring-to-front-1");
    }

}
