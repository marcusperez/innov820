/* 
 * Pages in POF to handle
    --> Root of the site (Clicking Online tab)
        --> Removes profiles without pictures
 */

var profileLinkSelector = "a[href^='viewprofile.aspx']";


$(function () {
	appendOptions();
});

function totalProfilesFoundOnPage() {
    var chum_profiles = $(profileLinkSelector);
    var chum_profilesFound = chum_profiles.length;

    return chum_profilesFound;
}

function getProfileLinkSelector(profileId) {
    var profileLinkSelector = "a[href*='profile_id=" + profileId + "']";
    return profileLinkSelector
}

function hideProfile(profileId) {
    //var profileLinkSelector = "a[href^='viewprofile.aspx?profile_id=" + profileId + "']";
    var profileLinkSelector = getProfileLinkSelector(profileId);
    var profileLink = $(profileLinkSelector);
    // Get the div it sits in
    var parentDiv = profileLink.closest("div");
    parentDiv.hide();
}

function getProfileIdFromLink(link) {
    // viewprofile.aspx?profile_id=103252723
    // find the ?
    var questionPosition = link.search("\\?");

    // strip from the ?
    var profilePiece = link.substr(questionPosition + 1)

    // "?sld=1&profile_id=106585925"

    // split off any ampersands to break up the querystring
    var queryStringParams = profilePiece.split("&");

    // Loop through and find the profile_id
    for (var paramKeyValue in queryStringParams) {
        // split off the =
        var param = queryStringParams[paramKeyValue].split("=");

        if (param[0] === "profile_id") {
            var profileId = param[1].trim();
            return profileId;
        }
    }
}

function appendOptionsViewMatches(chum_profiles) {

    var tablesToRemove = [];

    chum_profiles.each(function (index) {

        var parentDiv = $(this).closest("div");

        // Remove profiles without pictures
        if (parentDiv.hasClass("blank")) {
            // Remove the cell
            parentDiv.closest("td").remove();
        } else {

            parentDiv.css("float", "left");
            parentDiv.css("padding", "10px");

            var parentTable = $(this).closest("table");
            tablesToRemove.push(parentTable);

            var tabsBarParent = $(".tabs-bar").closest("div");
            parentDiv.insertAfter(tabsBarParent);

            var link = $(this).attr("href");
            var profileId = getProfileIdFromLink(link);
            var checkboxTemplate = '<br/><input type="checkbox" id="' + profileId + '" name="chum_id_' + profileId + '" value="' + profileId + '" style="width:25px;height:25px;cursor:pointer;"> Hide';

            //document.write(link + " " + checkboxTemplate + " <br/>");

            //Check to see if the child element for the link found is an image. If so, append the checkbox.
            if ($(this).has("img").length) {
                parentDiv.append(checkboxTemplate)
            }

            $("#" + profileId).on("click", function () {
                hideProfile(profileId);
                //TODO: Need to store the users selections somewhere.
                // Save it using the Chrome extension storage API.

                // Use a computed property name for the key
                chrome.storage.sync.set({ [profileId]: profileId });

                //TODO: Allow user to look at the list of users they hid sorted from most recently hidden.

            });

        }
    });

    // Remove tables
    for (i = 0; i < tablesToRemove.length; i++) {
        $(tablesToRemove[i]).remove();
    }
}

function appendOptionsOnline(chum_profiles) {

    var tablesToRemove = [];

    chum_profiles.each(function (index) {

        var parentDiv = $(this).closest("div");

        // Remove profiles without pictures
        if (parentDiv.hasClass("blank")) {
            // Remove the cell
            parentDiv.closest("td").remove();
        } else {

            parentDiv.css("float", "left");
            parentDiv.css("padding", "15px");
            
            parentDiv.insertAfter($("#grey-box"));

            var parentTable = $(this).closest("table");
            tablesToRemove.push(parentTable);

            var link = $(this).attr("href");
            var profileId = getProfileIdFromLink(link);
            var checkboxTemplate = '<br/><input type="checkbox" id="' + profileId + '" name="chum_id_' + profileId + '" value="' + profileId + '" style="width:25px;height:25px;cursor:pointer;"> Hide';

            //document.write(link + " " + checkboxTemplate + " <br/>");

            //Check to see if the child element for the link found is an image. If so, append the checkbox.
            if ($(this).has("img").length) {
                parentDiv.append(checkboxTemplate)
            }

            $("#" + profileId).on("click", function () {
                hideProfile(profileId);
                //TODO: Need to store the users selections somewhere.
                // Save it using the Chrome extension storage API.

                // Use a computed property name for the key
                chrome.storage.sync.set({ [profileId]: profileId });

                //TODO: Allow user to look at the list of users they hid sorted from most recently hidden.

            });


        }
    });

    // Remove tables
    for (i = 0; i < tablesToRemove.length; i++) {
        $(tablesToRemove[i]).remove();
    }

}

function appendOptions() {
    var chum_profiles = $(profileLinkSelector);

    var pageName = document.location.pathname.match(/[^\/]+$/);
    pageName = pageName == null ? "online" : document.location.pathname.match(/[^\/]+$/)[0];

    switch (pageName.toLowerCase()) {
        case "viewmatches.aspx":
            appendOptionsViewMatches(chum_profiles);
			cleanPage();
            break;
        case "everyoneonline.aspx":
        case "online":
            appendOptionsOnline(chum_profiles);
			cleanPage();
            break; 
		case "meetme.aspx":
			//setTimeout(function () { autoMeetMe(); }, 3000);
			autoMeetMe();
			break;
    }

}

function showToastMessage(toastMessage){
	$("body").append("<div class='ktbToastMessage' style='display:none;width:200px;height:auto;position:fixed;right:10px;bottom:10px;background-color: #383838;color: #F0F0F0;font-family: Calibri;font-size: 20px;padding:10px;text-align:center;border-radius: 2px;-webkit-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);-moz-box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);box-shadow: 0px 0px 24px -1px rgba(56, 56, 56, 1);'>" + toastMessage + "</div>")

    $('.ktbToastMessage').stop().fadeIn(400).delay(3000).fadeOut(400);
	
}

function hideToastMessage(){
	setTimeout(function () { $('.ktbToastMessage').remove(); }, 2000);
}

function cleanPage() {
    //console.log(chrome.storage);

    chrome.storage.sync.get(null, function (data) {
        if (chrome.runtime.lastError) {
            /* error */
            console.log("Runtime error.");
            return;
        }

		var totalProfilesEliminatedOnPage = 0;
		
        //console.log(data);
		//alert(data.length);

        //Loop through and hide the profiles
        for (var key in data) {
            //Check to see if the profile is found on the page. If so, keep count. Let's tell the user how many bs profiles we spared them from.
            var profileLinkSelector = getProfileLinkSelector(key);
            if ($(profileLinkSelector).length) {
                totalProfilesEliminatedOnPage++;
            }
            hideProfile(key);
            //document.write(key + " <br/><br/>");
        }

        var message = "";
        if (totalProfilesEliminatedOnPage > 0) {
            message = "Poof! " + totalProfilesEliminatedOnPage + " profiles removed from this page.";
        }
        else {
            message = "No profiles found to eliminate.";
        }

		showToastMessage(message);

        // Remove the elements from the DOM
        for (var key in data) {
            var profileLinkSelector = getProfileLinkSelector(key);
            if ($(profileLinkSelector).length) {
                //$(profileLinkSelector).remove();
                $(profileLinkSelector).closest("td").remove();
            }
        }

        hideToastMessage();

        /*
		if (Notification.permission !== "granted")
			Notification.requestPermission();
		else {
			var notification = new Notification('DTF Succeeded!', {
			icon: 'http://www.pof.com/image/en_upgrade-fish.png',
			body: "Poof!" + totalProfilesEliminatedOnPage + " were eliminated from the page.",
		});
		
		
		notification.onclick = function () {
			window.open("http://www.pof.com");      
		};
		

		}
		*/

        //toastr.success(totalProfilesEliminatedOnPage);

        // Let's take any remaining images and rearrange them so the user isn't scrolling around all over the place

        // Loop through remaining images and move the divs before the table they live in and add
        // some float and padding so it looks decent

        //var chum_profiles = $(profileLinkSelector);

        //chum_profiles.each(function(index) {
        //    var parentDiv = $(this).closest("div");
        //    parentDiv.css("float", "left");
        //    parentDiv.css("padding", "15px");

        //    var parentTable = $(this).closest("table");
        //    parentDiv.insertBefore(parentTable);
        //});
    });
}

function saveAutoClean(isAuto) {
    chrome.storage.sync.set({ AutoClean: isAuto });
}

function cityMatchesTarget(cityName){
	return $("b:containsNC('" + cityName + "')").length > 0;
}

function autoMeetMe(){
	//TODO: Give user a way to specify the cities they want to target.
	
	$.extend($.expr[":"], { "containsNC": function(elem, i, match, array) { 	return (elem.textContent || elem.innerText || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;}
	});
	
	if(cityMatchesTarget("Jacksonville") 
		|| cityMatchesTarget("Jacksonville Beach")
		|| cityMatchesTarget("Atlantic Beach")
		|| cityMatchesTarget("Neptune Beach")
		|| cityMatchesTarget("Orange Park")) {
		//alert('click maybe');
		showToastMessage("Maybe");
		//$('input[type="image"][name="voteb"]').click();
	} else {
		//alert('click no');
		showToastMessage("No"); 	
		$('input[type="image"][name="votec"]').click();
	}
}

function httpGetUserProfile(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}

function okCupidShowLastOnlineInformtion(){
	jQuery("<div style='clear:both;'>" + jQuery(".userinfo2015-basics-username-online").data("tooltip") + "</div>").appendTo(".userinfo2015-basics-asl")
}

//TODO: Calculate the number of profiles found compared to the number of profiles we eliminated from the page. 