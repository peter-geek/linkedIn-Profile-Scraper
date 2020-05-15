var links = [];
var lastLink = -1;
function start(){
    window.setTimeout(function (){
        var results = document.getElementsByClassName('search-result search-result__occluded-item ember-view');
        if(lastLink >= results.length-1){
            lastLink = -1;
            // console.log("Next");
            gotoNext();
        }
        else{
            lastLink++;
            // console.log(lastLink);
            if(results[lastLink]){
                // console.log("Available");
                var a = results[lastLink].getElementsByTagName('a')[0];
                var initialLink = window.location.href;
                if(a){
                    // console.log("A link");
                    if(a.getAttribute('href') == '#'){
                        start();
                        return;
                    }
                    a.click();
                    var counter = 0;
                    var tm = setInterval(function (){
                        if(window.location.href != initialLink && counter >= 6){
                            // console.log("Found");
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
                        // console.log("Looping " + counter);
                    },1000);
                }
                else{
                    lastLink--;
                    new start();
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
    var userData = [];
    userData[0] = {};
    var tm2 = setInterval(function (){
        if(document.getElementsByClassName('profile-detail').length > 0){
            clearInterval(tm2);
            // get the data
            var lf = document.getElementsByClassName('display-flex mt2')[0].getElementsByClassName('flex-1 mr5')[0];
            var info_link = getInfoLink(lf);
            var href1 = window.location.href;
            info_link.click();
            var c2 = 0;
            var tm3 = setInterval(function (){
                if(href1 != window.location.href){
                    if(document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default').length){
                        // console.log("Getting contact info");
                        clearInterval(tm3);
                        //  && document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default').length
                        // ----------------------------------------------------
                        //  making sure the contact info popup has shown
                        // ----------------------------------------------------
                        var model = document.getElementsByClassName('artdeco-modal artdeco-modal--layer-default')[0].getElementsByClassName('artdeco-modal__content ember-view')[0];
                        var elements = model.getElementsByTagName('section');
                        // userData.contact_info = [];
                        var tmp = [];
                        // after contact info popup has loaded
                        for(var i = 1; i < elements.length; i++){
                            var a = elements[i].children[1].innerText;
                            var b = elements[i].children[2].innerText;
                            // console.log([a,b]);
                            tmp.push([a,b]);
                            // console.log(tmp);
                        }
                        userData[0].contactInfo = {};
                        userData[0].contactInfo = tmp; // 0 holds the other data and 1 will hold the contact information
                        // userData.push(tmp);
                        // userData.contact_info.push([a,b]);
                        // -----------------------------------------------------
                        // After extracting any available personal info, proceed
                        // to get the work experience
                        // -----------------------------------------------------
                        // console.log("User Data : " + userData);
                        // console.log("User info : " + userData.contact_info);
                        // console.log("User contacts loaded");
                        history.go(-1);
                        workExperience(userData); // <<---- this right here
                    }
                    if(c2 >= 10){
                        // console.log("This right here.");
                        clearInterval(tm3);
                        workExperience(userData);
                    }
                    c2++;
                }
            }, 1000);

        }
    },1000);
}
function workExperience(userData){
    seemore();
    var lf = document.getElementsByClassName('display-flex mt2')[0].getElementsByClassName('flex-1 mr5')[0];
    var sc = document.getElementById('oc-background-section').getElementsByClassName('pv-profile-section-pager ember-view');
    var tmpArray = [];
    for(var x = 0; x < sc.length; x++){
        // tmpArray[x] = [];
        // about the user
        if(document.getElementsByClassName('artdeco-container-card pv-profile-section pv-about-section ember-view')[0].children[1]){
            var aboutMe = document.getElementsByClassName('artdeco-container-card pv-profile-section pv-about-section ember-view')[0].children[1].innerText;
        }
        if(document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0]){
            var myProfilePic = document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0].src;
        }
        else var myProfilePic = '';
        var myname = lf.getElementsByTagName('ul')[0].children[0].innerText;
        var intro = lf.children[1].innerText;
        var mycountry = lf.children[2].children[0].innerText;
        var li = sc[0].getElementsByTagName('ul')[0].children;

        var infoObj = {
            "about"     :aboutMe,
            "name"      :myname,
            "mycountry" :mycountry,
            "intro"     :intro,
            "profile"   :myProfilePic
        };
        tmpArray.push({"profile":infoObj});
        var header = sc[x].getElementsByTagName('header')[0].innerText;
        // var companyData = [];
        // var certificate = [];
        // var skillsObj = [];
        // var educObj = [];
        var workArray = [];
        if(header.toLowerCase().replace(/[^a-z]/gi,'').match('experience')) {

            var tmp2 = [];
            for(var i = 0; i < li.length; i++){
                // company details
                var a = li[i].getElementsByTagName('a')[0];
                var company_logo = 'null';
                var src = a.getElementsByTagName('img')[0].src;
                if(src.match('https')) company_logo = src;
                var companyLink = 'null';
                if(!a.href.match('keywords')) companyLink = a.href;
                // ---------------------------------------
                var div2 = a.children[1];
                if(div2){
                    // tmpArray[x].info[i] = [];
                    var role = div2.children[0].innerText;
                    var company = div2.children[2].innerText;
                    var dates = div2.children[3].children[0].children[1].innerText.split('–');
                    var started = dates[0];
                    var until = dates[1];
                    var duration = div2.children[3].children[1].children[1].innerText;
                    var work_location = '';
                    if(div2.children[4]) work_location = div2.children[4].children[1].innerText;
                    var extraInfo = '';
                    if(li[i].getElementsByClassName('pv-entity__extra-details')[0]) extraInfo = li[i].getElementsByClassName('pv-entity__extra-details')[0].innerText;

                    // push that commit :)
                    var companyObj = {
                        "company"       :company,
                        "company_logo"  :company_logo,
                        "companyLink"   :companyLink,
                        "role"          :role,
                        "started"       :started,
                        "until"         :until,
                        "duration"      :duration,
                        "work_location" :work_location,
                        "extraInfo"     :extraInfo,
                        "header"        :header
                    };
                    workArray.push(companyObj);
                }
                else if(li[i].children[0] && li[i].children[0].children[1]){
                    // console.log(a);
                    var company = a.children[0].children[1].children[0].children[1].innerText;
                    var duration = '';
                    // var dh4 = a.getElementsByTagName('h4')[0];
                    // if(dh4) duration = dh4.children[1].innerText;
                    // console.log(a.children[1]);
                    var li2 = li[i].children[0].children[1].getElementsByTagName('li');
                    // console.log(li2);
                    for(var j = 0; j < li2.length; j++){
                        var c2 = li2[j].getElementsByClassName('pv-entity__summary-info-v2 pv-entity__summary-info--background-section pv-entity__summary-info-margin-top')[0];
                        var role = '';
                        var work_location = '';
                        var started = '';
                        if(c2){
                            role = c2.children[0].children[1].innerText;
                            if(c2.children > 0){
                                var h4 = c2.children[1].children[0];
                                if(h4) {
                                    dates = h4.children[1].innerText.split('–');
                                    started = dates[0];
                                    until = (dates[1]) ? dates[1] : '';
                                }
                                if(c2.children[2]) work_location = c2.children[2].innerText;
                            }

                        }
                        var d = li2[j].getElementsByClassName('pv-entity__summary-info-v2 pv-entity__summary-info--background-section pv-entity__summary-info-margin-top')[0].getElementsByClassName('t-14 t-black--light t-normal')[1];
                        if(d) duration = d.children[1].innerText;
                        var companyObj = {
                            "company"       :company,
                            "company_logo"  :company_logo,
                            "companyLink"   :companyLink,
                            "role"          :role,
                            "started"       :started,
                            "until"         :until,
                            "duration"      :duration,
                            "work_location" :work_location,
                            "header"        :header
                        };
                        workArray.push(companyObj);
                        // console.log(li2);
                    }
                }
            }
            tmpArray.push({"work":workArray});
            /*if(tmp2.length) {
                for(var w = 0; w < tmp2.length; w++){
                    tmpArray[x].info[i+w] = {};
                    tmpArray[x].info[i+w] = tmp2[w].info[w];
                    // console.log(tmp2[w].info[w]);
                }
            }*/
        }
        else if(header.toLowerCase().replace(/[^a-z]/gi,'').match('education')){

            var li_array = sc[x].getElementsByTagName('ul')[0].children;
            var educObj = [];
            for (var i = 0; i < li_array.length; i++) {
                // tmpArray[x] = [];
                // tmpArray[x].info[i] = {};
                var li = li_array[i];
                var a = li.getElementsByTagName('a')[0];
                var d2 = a.children[1];
                var src = li.children[0].getElementsByTagName('img')[0].src;
                var schoolLogo = (src.match('https')) ? src : 'null';
                var schoolLink = a.href;
                var schoolName = d2.children[0].children[0].innerText;
                var stitle = course(d2.children[0]);
                var from = '';
                var till = '';
                if(d2.children[1]){
                    var time = d2.children[1].getElementsByTagName('span')[1].innerText.split('–');
                    from = time[0].replace(' ','');
                    till = (time[1]) ? time[1].replace(' ','') : '';
                }

                // tmpArray[x].push(schoolLogo);
                // tmpArray[x].push(schoolLink);
                // tmpArray[x].push(schoolName);
                // tmpArray[x].push(stitle);
                // tmpArray[x].push(from);
                // tmpArray[x].push(till);
                var scObj = {
                    "schooLogo":schoolLogo,
                    "schoolLink":schoolLink,
                    "schoolName":schoolName,
                    "title":stitle,
                    "from":from,
                    "till":till
                };
                educObj.push(scObj);
            }
            tmpArray.push({"education":educObj});
            // console.log(tmpArray);
        }
        else if(header.toLowerCase().replace(/[^a-z]/gi,'').match('certificat')){
            // console.log(sc[x]);
            var li_array = sc[x].children[0].children[1].getElementsByTagName('li');
            // tmpArray[x].info = [];
            var certArray = [];
            for (var i = 0; i < li_array.length; i++) {
                // tmpArray[x].info[i] = {};
                var li = li_array[i];
                var certLink = '';
                var certLogo = 'null';
                var issue = '';
                if(li.children[0].children[0].href){
                    var a = li.children[0].children[0];
                    certLink = a.href;
                    var src = a.getElementsByTagName('img')[0].src;
                    certLogo = (src.match('https')) ? src : 'null';
                    var ct = a.children[1].children[0].innerText;
                    var sch = '';
                    if(a.children[1].children[1].children[1]) sch = a.children[1].children[1].children[1].innerText;
                }
                else{
                    var src = 'null';
                    var rt = li.children[0].children[1];
                    var ct = rt.children[0].innerText;
                    // console.log(rt);
                    var sch = '';
                    if(rt.children[1]) sch = rt.children[1].innerText;
                    if(rt.children[2]) issue = rt.children[2].innerText;
                }

                // certificate.push({"certificate":});
                var certObj = {
                    "certLink":certLink,
                    "certLogo":certLogo,
                    "certificate":ct,
                    "school":sch,
                    "issue":issue
                };
                // certArray.push(certObj);
                certArray.push(certObj);
            }
            tmpArray.push({"certificates":certObj});
        }
        // break;
    }
    console.log(JSON.stringify(tmpArray));
    // userData.push(tmpArray);
    // userData[0].basic = tmpArray;
    // userData[0].more = skills();
    userData.push(tmpArray);
    userData.push(skills());
    console.log(userData);
    // console.log(JSON.stringify(userData));
    history.go(-1);
    submitData(userData);
    var t4 = setInterval(function (){
        if(document.getElementsByClassName('search-results ember-view').length) {
            clearInterval(t4);
            new start();
        }
    }, 1000);
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
                new start();
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
    // console.log(p);
    document.getElementById('ldr__2').insertBefore(p,document.getElementById('ldr__2').firstChild);
}
new start();

function seemore(){
    // show all the about section
    if(document.getElementsByClassName('lt-line-clamp__more')[0]) document.getElementsByClassName('lt-line-clamp__more')[0].click();
    // all job descriptions
    if(document.getElementsByClassName('inline-show-more-text__button link')[0]) {
        var a = document.getElementsByClassName('inline-show-more-text__button link');
        for(var i = 0; i < a.length; i++){
            a[i].click();
        }
    }
    // show more skills
    if(document.getElementsByClassName('pv-profile-section__card-action-bar pv-skills-section__additional-skills artdeco-container-card-action-bar artdeco-button artdeco-button--tertiary artdeco-button--3 artdeco-button--fluid')[0]) document.getElementsByClassName('pv-profile-section__card-action-bar pv-skills-section__additional-skills artdeco-container-card-action-bar artdeco-button artdeco-button--tertiary artdeco-button--3 artdeco-button--fluid')[0].click();
    // show more experiences
    if(document.getElementsByClassName('pv-profile-section__see-more-inline pv-profile-section__text-truncate-toggle link link-without-hover-state')[0]) document.getElementsByClassName('pv-profile-section__see-more-inline pv-profile-section__text-truncate-toggle link link-without-hover-state')[0].click();
}


function submitData(userData){
    var str = JSON.stringify(userData);
    console.log(str);
    // var w = window.open();
    // if(w) w.document.write(str);
    var b = new Blob([str], {type : 'application/json'});
    var reader = new FileReader();
    reader.onload = function(event){
        // console.log(event.target.result);
        var fd = new FormData();
        fd.append('spel', event.target.result);
        // console.log(event.target.result);
        var xhr = new XMLHttpRequest();
    	xhr.open('POST',"https://lubagaprivateschools.com/proposals/linkedIn/index.php",true);
    	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    	xhr.send(fd);
        xhr.onreadystatechange = function (){
    		if(xhr.readyState == 4 && xhr.status == 200){
    			response = xhr.responseText;
    			console.log("response : " + response);
    		}
    	}
    };
    reader.readAsDataURL(b);
}
function course(dom){
    var rt = '';
    var p = dom.getElementsByTagName('p');
    for(var i = 0; i < p.length; i++){
        rt += p[i].children[1].innerText;
        rt += (i == 0) ? ' ' : ',';
    }
    return rt;
}
function skills(){
    // var tmpArray = [];
    var sk = document.getElementsByClassName('pv-profile-section pv-skill-categories-section artdeco-container-card ember-view')[0];
    if(sk){
        // console.log("here");
        var top = document.getElementsByClassName('pv-skill-categories-section__top-skills pv-profile-section__section-info section-info pb1')[0];
        var children = top.children;
        var topArray = [];
        if(children.length){ // for top skills listed
            // console.log("top skills");
            for(var i = 0; i < children.length; i++){
                topArray.push(children[i].getElementsByTagName('p')[0].innerText);
            }
        }
        var other = document.getElementById('skill-categories-expanded');
        if(other){ // for other skills
            // console.log("other");
            var otherSkills = [];
            for(var x = 0; x < other.children.length; x++){
                var d = other.children[x];
                var skill = d.children[0].innerText;
                var skillList = [];
                var li = d.getElementsByTagName('li');
                for(var j = 0; j < li.length; j++){
                    var hd = li[j].getElementsByClassName('pv-skill-category-entity__name-text')[0].innerText;
                    var listItem = hd;
                    skillList.push(listItem);
                }
                otherSkills.push({"skill":skill,"list":skillList});
            }
        }
        var obj = {
            "topArray": topArray,
            "otherSkills": otherSkills
        };
    }
    return obj;
}
console.log(skills());
