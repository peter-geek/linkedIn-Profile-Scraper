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
