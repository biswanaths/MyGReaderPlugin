/*
 * taken from http://userscripts.org/scripts/show/24955
 */
function simulateClick(node) {
  var event = node.ownerDocument.createEvent("MouseEvents");
  event.initMouseEvent("click",
                      true, true, window, 1, 0, 0, 0, 0,
                      false, false, false, false, 0, null);
  node.dispatchEvent(event);
}

function simulateKeyPress(node, keyCode) {
  var e = node.ownerDocument.createEvent("KeyboardEvent");
  e.initKeyboardEvent('keypress', true, true, window, false, false, false, false, 78, 0x4E);
  node.dispatchEvent(e);
}

/*
 * original
 * thx to http://sites.google.com/site/ggchromium/ for fixes
 */
document.addEventListener("keypress", function(e){
  
  var name = e.target.tagName;
  // Do nothing if the target of this event is an edit box
  if (name == "TEXTAREA" || name == "INPUT"){ return; }
  
  var keycode = (e.keyCode) ? e.keyCode : e.which;
  var k = String.fromCharCode(keycode);
  if (k=="v" && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey){ // just 'v' and no modifiers
    // Get the current entry node
    var current_entry = document.getElementById('current-entry');
    
    // Get the url. In Expanded view or List view?
    var card_content = current_entry.getElementsByClassName('card-content')[0]
    if (card_content){
      var url = current_entry.getElementsByClassName('entry-title-link')[0].href;
    } else {
      var url = current_entry.getElementsByClassName('entry-original')[0].href;
    }
      
    if(!url){ return true; }
    
    // open the link in background
    chrome.extension.sendRequest({"func":"open_in_background", "url":url});
    
    // mark the entry as read
   //    simulateClick(current_entry.childNodes[0]);
  //  simulateKeyPress(current_entry.childNodes[0]);
    
    // make sure the event doesn't propate
    e.stopPropagation();
    e.preventDefault();
  }
    if (k=="c" && !e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey){ // just 'c' and no modifiers
    // Get the current entry node
	var current_entry = document.getElementById('current-entry');
    
    // Get the url. In Expanded view or List view?
   
    var url = current_entry.querySelector("div.entry-container div.entry-main div.entry-body div.item-body a").href;    
      
    if(!url){ return true; }
    
    // open the link in background
    chrome.extension.sendRequest({"func":"open_in_background", "url":url});
    
    // mark the entry as read
    //simulateClick(current_entry.childNodes[0]);
    //simulateClick(current_entry.childNodes[0]);
    
    // make sure the event doesn't propate
    e.stopPropagation();
    e.preventDefault();
  }
}, true);