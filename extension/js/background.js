var contextMenus = {};
contextMenus.createScraper = chrome.contextMenus.create(
    {
        "title": "Start LinkedIn scraper"
    },
    function (){
        if(chrome.runtime.lastError){
            console.error(chrome.runtime.lastError.message);
        }
    }
);

chrome.contextMenus.onClicked.addListener(contextMenuhandler);

function contextMenuhandler(info, tab){
    if(info.menuItemId === contextMenus.createScraper){
        // console.log("Menu clicked!");
        chrome.tabs.executeScript({
            file: "js/scraper.js"
        });
    }
}
