/*===================SCRIPT FOR SPO=================
* Make it so that when user clicks Web Part Chrome Title, the web part collapses
*...when user clicks the Web Part Chrome Title when collapsed, it expands
*/

(function () {
    // your page initialization code here
    // the DOM will be available here

    var targets = document.getElementsByClassName('ms-webpart-chrome-title');

    function changeChromeTitles() {

        for (var elem of targets) {

            var link = elem.getElementsByTagName('a')[0];

            link.href = "javascript:"; //disable anchor click

            elem.onclick = function (e) {
                //toggle visibility
                this.nextElementSibling.hidden = !this.nextElementSibling.hidden;
            }
        }

    }
    changeChromeTitles();

    setTimeout(function () {
        changeChromeTitles();
    }, 2000);

})();



