// var wr = [];
// console.log("getting work experience.");
var lf = document.getElementsByClassName('display-flex mt2')[0].getElementsByClassName('flex-1 mr5')[0];
var sc = document.getElementById('oc-background-section').getElementsByClassName('pv-profile-section-pager ember-view');
console.log(sc);
var tmpArray = [];
for(var x = 0; x < sc.length; x++){
    tmpArray[x] = [];
    tmpArray[x].info = [];
    // tmpArray[0].background = [];
    var header = sc[x].getElementsByTagName('header')[0].innerText;
    tmpArray[x].header = header;
    // console.log(tmpArray);
    // break;
    // about the user
    tmpArray.me = {};
    tmpArray.me.about = '';
    if(document.getElementsByClassName('artdeco-container-card pv-profile-section pv-about-section ember-view')[0].children[1]){
        tmpArray.me.about = document.getElementsByClassName('artdeco-container-card pv-profile-section pv-about-section ember-view')[0].children[1].innerText;
    }
    if(document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0]){
        tmpArray.me.profilePic = document.getElementsByClassName('pv-top-card__photo presence-entity__image EntityPhoto-circle-9 lazy-image loaded ember-view')[0].src;
    }
    else tmpArray.me.profilePic = '';
    tmpArray.me.username = lf.getElementsByTagName('ul')[0].children[0].innerText;
    tmpArray.me.intro = lf.children[1].innerText;
    tmpArray.me.country = lf.children[2].children[0].innerText;
    var li = sc[0].getElementsByTagName('ul')[0].children;
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
                tmpArray[x].info[i] = {};
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
                tmpArray[x].info[i].company = company;
                tmpArray[x].info[i].company_logo = company_logo;
                tmpArray[x].info[i].companyLink = companyLink;
                tmpArray[x].info[i].role = role;
                tmpArray[x].info[i].started = started;
                tmpArray[x].info[i].until = until;
                tmpArray[x].info[i].duration = duration;
                tmpArray[x].info[i].work_location = work_location;
                tmpArray[x].info[i].extraInfo = extraInfo;
                // console.log(JSON.stringify(tmpArray));
            }
            else if(li[i].children[0] && li[i].children[0].children[1]){
                var li2 = li[i].children[0].children[1].getElementsByTagName('li');
                // var a = li[i].children[0].children[0].children[0];
                // var companyLink = 'null';
                // if(!a.href.match('keywords')) companyLink = a.href;
                //
                // var company_logo = ;

                for(var j = 0; j < li2.length; j++){
                    tmp2[j] = {};
                    tmp2[j].info = [];
                    // var index = i+j+2;
                    console.log(j);
                    tmp2[j].info[j] = {};
                    // console.log(j);
                    tmp2[j].info[j].company_logo = company_logo;
                    tmp2[j].info[j].companyLink = companyLink;
                    //
                    // var role = div2.children[0].innerText;
                    // var company = div2.children[2].innerText;
                    // var dates = div2.children[3].children[0].children[1].innerText.split('–');
                    // console.log(tmp2);
                }
            }
        }
        if(tmp2.length) {
            for(var w = 0; w < tmp2.length; w++){
                tmpArray[x].info[i+w] = {};
                tmpArray[x].info[i+w] = tmp2[w].info[w];
                // console.log(tmp2[w].info[w]);
            }
        }
    }
    else if(header.toLowerCase().replace(/[^a-z]/gi,'').match('education')){

        var li_array = sc[x].getElementsByTagName('ul')[0].children;
        for (var i = 0; i < li_array.length; i++) {
            tmpArray[x].info = [];
            tmpArray[x].info[i] = {};
            var li = li_array[i];
            var a = li.getElementsByTagName('a')[0];
            var d2 = a.children[1];
            var src = li.children[0].getElementsByTagName('img')[0].src;
            var schoolLogo = (src.match('https')) ? src : 'null';
            var schoolLink = a.href;
            var schoolName = d2.children[0].children[0].innerText;
            var stitle = course(d2.children[0]);
            var time = d2.children[1].getElementsByTagName('span')[1].innerText.split('–');
            var from = time[0].replace(' ','');
            var till = (time[1]) ? time[1].replace(' ','') : '';

            tmpArray[x].info[i].school_logo = schoolLogo;
            tmpArray[x].info[i].school_link = schoolLink;
            tmpArray[x].info[i].school_name = schoolName;
            tmpArray[x].info[i].stitle      = stitle;
            tmpArray[x].info[i].from        = from;
            tmpArray[x].info[i].till        = till;
        }
        console.log(tmpArray);
    }
    else if(header.toLowerCase().replace(/[^a-z]/gi,'').match('certificat')){
        // console.log(sc[x]);
        var li_array = sc[x].children[0].children[1].getElementsByTagName('li');
        tmpArray[x].info = [];
        for (var i = 0; i < li_array.length; i++) {
            tmpArray[x].info[i] = {};
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
            tmpArray[x].info[i].certLink    = certLink;
            tmpArray[x].info[i].certLogo    = certLogo;
            tmpArray[x].info[i].cert        = ct;
            tmpArray[x].info[i].sch         = sch;
            tmpArray[x].info[i].issue       = issue;
        }
    }
    // break;
}
// console.log(tmpArray);
// userData.push(tmpArray);
function skills(){
    var tmpArray = [];
    tmpArray.skills = {};
    tmpArray.skills.top = [];
    tmpArray.skills.other = [];
    var sk = document.getElementsByClassName('pv-profile-section pv-skill-categories-section artdeco-container-card ember-view')[0];
    if(sk){
        console.log("here");
        var top = document.getElementsByClassName('pv-skill-categories-section__top-skills pv-profile-section__section-info section-info pb1')[0];
        var children = top.children;
        if(children.length){ // for top skills listed
            console.log("top skills");
            for(var i = 0; i < children.length; i++){
                tmpArray.skills.top.push(children[i].getElementsByTagName('p')[0].innerText);
            }
        }
        var other = document.getElementById('skill-categories-expanded');
        if(other){ // for other skills
            console.log("other");
            for(var x = 0; x < other.children.length; x++){
                var d = other.children[x];
                tmpArray.skills.other[x] = {};
                tmpArray.skills.other[x].skill = d.children[0].innerText;
                tmpArray.skills.other[x].list = [];
                var li = d.getElementsByTagName('li');
                for(var j = 0; j < li.length; j++){
                    var hd = li[j].getElementsByClassName('pv-skill-category-entity__name-text')[0].innerText;
                    tmpArray.skills.other[x].list.push(hd);
                }
            }
        }
    }
    return tmpArray;
}
// console.log(skills());
function course(dom){
    var rt = '';
    var p = dom.getElementsByTagName('p');
    for(var i = 0; i < p.length; i++){
        rt += p[i].children[1].innerText;
        rt += (i == 0) ? ' ' : ',';
    }
    return rt;
}
