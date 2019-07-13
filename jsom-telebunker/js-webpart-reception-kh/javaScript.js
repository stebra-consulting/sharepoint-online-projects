(function () {
    // your page initialization code here
    // the DOM will be available here

    /*
    * Hide Script Editor WP's when not editing
    */
    function initFunct() {
        console.log("initFunct();")
        var isEditing = SP.Ribbon.PageState.Handlers.isInEditMode();
        window["isEditing"] = isEditing;
        if (isEditing !== true) {
            document.getElementsByClassName('ms-rte-wpbox')[0].style.display = 'none';
            document.getElementsByClassName('ms-rte-wpbox')[1].style.display = 'none';
        }
    }
    ExecuteOrDelayUntilScriptLoaded(initFunct, "sp.ribbon.js");
    /**/

    /*
    * Make it so that when user clicks Web Part Chrome Title, the web part collapses
    *...when user clicks the Web Part Chrome Title when collapsed, it expands
    */
    var targets = document.getElementsByClassName('ms-webpart-chrome-title');
    function changeChromeTitles() {
        for (var elem of targets) {
            var link = elem.getElementsByTagName('a')[0];
            if (link !== undefined) {
                link.href = "javascript:"; //disable anchor click
            }
            elem.onclick = function (e) {
                this.nextElementSibling.hidden = !this.nextElementSibling.hidden;
            }
        }
    }
    changeChromeTitles();
    setTimeout(function () {
        changeChromeTitles();
    }, 2000);
    /**/
})();
//end closure
