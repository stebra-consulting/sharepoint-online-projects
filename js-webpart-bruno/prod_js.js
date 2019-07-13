//global vars
var newsFeedId = 'WebPartWPQ2';//'MSOZoneCell_WebPartWPQ2';
var linksId = 'WebPartWPQ3'
//-- LINKS
//hide confusing header
var linksHeaders = document.getElementsByClassName('ms-viewheadertr');
for (i = 0; i < linksHeaders.length; i++) {
    linksHeaders[i].innerHTML = '';
    linksHeaders[i].style.height = '50px'
}

//Disable mailadresses formatting(click and style)
var linksWebpart = document.getElementById(linksId); //goto
var aTags = linksWebpart.getElementsByTagName('a');

for (i = 0; i < aTags.length; i++) {
    if (aTags[i].innerHTML.indexOf('@') !== -1) {
        aTags[i].href = "javascript:"; //disable anchor click
        aTags[i].style.textDecoration = 'none';
        aTags[i].style.color = 'black';
        aTags[i].style.cursor = 'default';
    }
}

//make chrometitles marign-bottom
setTimeout(function () {
    var targets = document.getElementsByClassName('ms-webpart-chrome-title');
    for (i = 0; i < targets.length; i++) {
        var link = targets[i].getElementsByTagName('a')[0];
        link.style.marginBottom = '30px';
        /* OBSOLETE
        link.href = "javascript:";
        link.style.color = 'black';
        link.style.cursor = 'default';
        link.style.textDecoration = 'none';
        */
    }
}, 1500);


//Markup dividers as more distinct
var dividers = document.getElementById(newsFeedId).getElementsByClassName('ms-newsletterline'); //goto
for (i = 0; i < dividers.length; i++) {
    var divider = dividers[i];
    divider.style.height = '10px';
    divider.style.marginTop = '30px';
    divider.style.backgroundColor = '#e1e1e1';

    var preElem = divider.parentElement.previousElementSibling;
    preElem.style.height = "50px";

}


//click to expand-feature
var posts = document.getElementById(newsFeedId).getElementsByClassName('ms-rtestate-field'); //goto
for (i = 0; i < posts.length; i++) {
    var post = posts[i];
    post.classList.add('collapsed');
    post.onclick = function (e) {
        //toggle expand/collapse
        this.classList.toggle('collapsed');
        console.log("toggled class");
    }

}

//add empty image if missing image
var entries = document.getElementById(newsFeedId).getElementsByClassName('ms-rtestate-field');
for (i = 0; i < entries.length; i++) {
    var post = posts[i];
    if (post.getElementsByTagName('img').length === 0) {
        var div = post.getElementsByTagName('div')[0];
        var postContentElem = div.children[0];
        var p = document.createElement('p');
        p.innerHTML = '<img alt="missing_img_template.jpg" src="/PublishingImages/Lists/Meddelanden/NewForm/missing_img_template.JPG" style="margin:5px;width:250px;">';
        postContentElem.insertBefore(p, postContentElem.childNodes[0]); //since prepend does not work in IE11
    }
}