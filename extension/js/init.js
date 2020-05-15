var o = document.getElementsByClassName('linkedInScrapper_windowOverlay');
if(o[0]) document.body.removeChild(o[0]);
var span = document.createElement('span');
span.className = "linkedInScrapper_windowOverlay";
var txt = '<div style="position: fixed;background: rgba(0,0,0,0.35);width: 100%;height: 100%;z-index: 600;top: 0px;left: 0px;" id="scLdr"><div style="margin: 20px auto;max-width: 950px;color: #fff;" id="ldr__2"><div></div></div></div>';
span.innerHTML = txt;
document.body.appendChild(span);
