function wireUpElementClick(buttonId, functionName){
	
var buttonElement = document.getElementById(buttonId);
  
  buttonElement.addEventListener('click', function() {

    chrome.tabs.getSelected(null, function(tab) {

      //chrome.tabs.executeScript(null,
      //  {code:"alert(chumProfilesFound())"});
		
	  //chrome.tabs.executeScript(null,
      //  {code:"hideProfile(prompt('What is the profileId?'))"});
	
      chrome.tabs.executeScript(null,	
		  {code:functionName});
		
      window.close();

    });
  }, false);

}

document.addEventListener('DOMContentLoaded', function() {

/*
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
*/
	wireUpElementClick("btnProfileOptions","appendOptions()");
	wireUpElementClick("btnCleanPage","cleanPage()");
	wireUpElementClick("chkAutoClean","saveAutoClean(" + $("chkAutoClean").checked + ")");
	//$("#chkAutoClean").checked
	
	chrome.storage.sync.get("AutoClean", function (obj) {
		//console.log(obj.AutoClean);
		$("chkAutoClean").prop('checked', obj.AutoClean);
	});
  
}, false);