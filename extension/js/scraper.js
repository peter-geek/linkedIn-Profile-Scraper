var links = [];
var lastLink = 0;
function start(){
    window.setTimeout(function (){
        var results = document.getElementsByClassName('search-result search-result__occluded-item ember-view');
        if(lastLink >= results.length-1){
            lastLink = -1;
            console.log("Next");
            gotoNext();
        }
        else{
            lastLink++;
            console.log(lastLink);
            if(results[lastLink]){
                var a = results[lastLink].getElementsByTagName('a')[0];
                var initialLink = window.location.href;
                if(a){
                    a.click();
                    var counter = 0;
                    var tm = setInterval(function (){
                        if(window.location.href != initialLink && counter >= 6){
                            console.log("Found");
                            clearInterval(tm);
                            // alert("Loaded");
                            extract();
                        }
                        else counter++;
                        // else if(counter >= 6) {
                        //     history.go(-1);
                        //     clearInterval(tm);
                        //     start();
                        // }
                        console.log("Looping " + counter);
                    },1000);
                }
                else{
                    lastLink--;
                    start();
                }
            }
        }
    }, 1000);
}
function getInfoLink(lf) {
    var a = lf.getElementsByTagName('a');
    for(var i = 0; a.length; i++){
        if(a[i].innerText.match('info')) return a[i];
    }
}
function extract() {
    var tm2 = setInterval(function (){
        if(document.getElementsByClassName('profile-detail').length > 0){
            clearInterval(tm2);
            var userData = [];
            // get the data
            var lf = document.getElementsByClassName('display-flex mt2')[0].getElementsByClassName('flex-1 mr5')[0];
            var info_link = getInfoLink(lf);
            var href1 = window.location.search;
            info_link.click();
            var tm3 = setInterval(function (){
                if(document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default').length){
                    console.log("Getting contact info");
                    //  && document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default').length
                    // ----------------------------------------------------
                    //  making sure the contact info popup has shown
                    // ----------------------------------------------------
                    clearInterval(tm3);
                    var model = document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default')[0].getElementsByClassName('artdeco-modal__content ember-view')[0];
                    var elements = model.getElementsByTagName('section');
                    userData.contact_info = [];
                    // after contact info popup has loaded
                    for(var i = 1; i < elements.length; i++){
                        var a = elements[i].children[1].innerText;
                        var b = elements[i].children[2].innerText;
                        userData.contact_info.push([a,b]);
                    }
                    // -----------------------------------------------------
                    // After extracting any available personal info, proceed
                    // to get the work experience
                    // -----------------------------------------------------
                    history.go(-1);
                    workExperience(userData); // <<---- this right here
                }
                window.setTimeout(function (){
                    // -----------------------------------------------------
                    // clear the timer and go back in case the popup window didn't load
                    // This should happen in 6 seconds
                    // -----------------------------------------------------
                    if(tm3) clearInterval(tm3);
                    // else{
                    // well, nothing happened at all.
                    // perhaps, LinkedIn is appologizing saying they're trying to fixe it.
                    // :)
                    // it's time to go back and
                    // history.go(-1);
                    start();
                    //     console.log("Nothing worked. revert!!");
                    // }
                }, 6000);
            }, 1000);

        }
    },1000);
}
function workExperience(userData){
    console.log("getting work experience.");
    var lf = document.getElementsByClassName('display-flex mt2')[0].getElementsByClassName('flex-1 mr5')[0];
    var sc = document.getElementById('oc-background-section').getElementsByClassName('pv-profile-section-pager ember-view');
    var tmpArray = [];
    for(var x = 0; x < sc.length; x++){
        tmpArray[x] = {};
        // tmpArray[x].background = [];
        var header = sc[x].getElementsByTagName('header')[0].innerText;
        tmpArray[x].header = header;
        // console.log(tmpArray);
        // break;
        // about the user
        tmpArray[1] = {};
        tmpArray[1].about = document.getElementsByClassName('artdeco-container-card pv-profile-section pv-about-section ember-view')[0].children[1].innerText;
        if(document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0].src){
            tmpArray[1].profilePic = document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0].src;
        }
        else tmpArray[1].profilePic = '';
        tmpArray[1].username = lf.getElementsByTagName('ul')[0].children[0].innerText;
        tmpArray[1].intro = lf.children[1].innerText;
        tmpArray[1].country = lf.children[2].children[0].innerText;
        var li = sc[x].getElementsByTagName('ul')[0].children;
        if(header.toLowerCase().replace(/[^a-z]/gi,'') == 'experience') {
            for(var i = 0; i < li.length; i++){
                tmpArray[x][i] = {};
                // company details
                var a = li[i].getElementsByTagName('a')[0];
                var company_logo = 'null';
                var src = a.getElementsByTagName('img')[0].src;
                if(src.match('https')) company_logo = src;
                // ---------------------------------------
                var div2 = a.children[1];
                var role = div2.children[0].innerText;
                var company = div2.children[2].innerText;
                var dates = div2.children[3].children[0].children[1].innerText.split('–');
                var started = dates[0];
                var until = dates[1];
                var duration = div2.children[3].children[1].children[1].innerText;
                var work_location = '';
                if(div2.children[4]) work_location = div2.children[4].children[1].innerText;
                var companyLink = 'null';
                if(!a.href.match('keywords')) companyLink = a.href;
                var extraInfo = '';
                if(li[i].getElementsByClassName('pv-entity__extra-details')[0]) extraInfo = li[i].getElementsByClassName('pv-entity__extra-details')[0].innerText;

                // push that commit :)
                tmpArray[x][i].company = company;
                tmpArray[x][i].company_logo = company_logo;
                tmpArray[x][i].role = role;
                tmpArray[x][i].started = started;
                tmpArray[x][i].until = until;
                tmpArray[x][i].duration = duration;
                tmpArray[x][i].work_location = work_location;
                tmpArray[x][i].companyLink = companyLink;
                tmpArray[x][i].extraInfo = extraInfo;
                // console.log(JSON.stringify(tmpArray));
            }
        }
        // userData.push(tmpArray);
        userData.push(tmpArray);
        console.log(userData);
        history.go(-1);
        break;
    }
}
function gotoNext(){
    var initialLink = window.location.search;
    if(document.getElementsByClassName('artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view').length && !document.getElementsByClassName('artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view')[0].disabled){
        var nextButton = document.getElementsByClassName('artdeco-pagination__button artdeco-pagination__button--next artdeco-button artdeco-button--muted artdeco-button--icon-right artdeco-button--1 artdeco-button--tertiary ember-view')[0];
        nextButton.click();
        var counter = 0;
        var timer = setInterval(function (){
            if(window.location.search != initialLink){
                clearInterval(timer);
                start();
            }
            else counter++;
        }, 1000);
    }
    else {
        // alert("All done!");
    }
}
function addElement(txt) {
    var p = document.createElement('p');
    p.innerHTML = txt;
    p.style.color = 'rgb(2, 212, 193)';
    console.log(p);
    document.getElementById('ldr__2').insertBefore(p,document.getElementById('ldr__2').firstChild);
}


var span = document.createElement('span');
var txt = '<div style="position: fixed;background: rgba(0,0,0,0.35);width: 100%;height: 100%;z-index: 600;top: 0px;left: 0px;" id="scLdr"><div style="margin: 20px auto;max-width: 950px;color: #fff;" id="ldr__2"><div></div></div></div>';
span.innerHTML = txt;
document.body.appendChild(span);

start();
