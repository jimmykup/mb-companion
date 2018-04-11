console.warn(" 💎💎💎 [korra-email-design-tooklit] loaded /js/dropbox/file-viewer.js");
//////////////////////////////////////////////////////////////////////////////////////

// Create the full local URL once the iframe preview loads
////////
////////
document.arrive("iframe.previewhtml", function() {

  console.log("iframe.previewhtml arrived");

  // Get the Dropbox Parent Folder
  ////////
  ////////
  if ( typeof fullPathToDropboxFolder !== 'undefined' ) {

    buildKorraBar();

  } else {

    chrome.storage.promise.sync.get('fullPathToDropboxFolder').then(function(items) {
      console.log("retrieved fullPathToDropboxFolder from chrome.storage.sync");
      fullPathToDropboxFolder = items.fullPathToDropboxFolder;
      buildKorraBar();
    }, function(error) {
      console.error("Could not retrieve item from chrome.storage.sync.");
    });

  }

});

////////
////////
function buildKorraBar() {

  localUrl = "file:///" + fullPathToDropboxFolder + "/" +  document.querySelectorAll("iframe.previewhtml")[0].src.replace(/(^.+?\/get\/|\?_subject_uid.+)/gi,"");

  // Listen for arrival of the file viewer header
  ////////
  ////////
  document.arrive(".react-file-viewer", {existing: true}, function() {

    destroyIfExists(document.getElementById("korrabar"));

    console.log("it's arrived!");
    console.log(this);

    var korraBar = document.createElement("a");
    korraBar.id = "korrabar";
    korraBar.addEventListener('click', viewLocalFile, false);
    korraBar.style = "color:#fff; font-weight:bold; font-size:14px; height:40px; line-height:40px; background: linear-gradient(to right, #8f15ff 0%,#3fd1ff 100%);"
    korraBar.innerHTML = '<div style="background:rgba(0,0,0,0.2); padding:0 15px 0 10px; display:inline-flex; align-items:center;"><svg style="margin-right:8px;" width="24" height="24" viewBox="0 0 334.5 334.5"><path fill="#FFFFFF" d="M332.8 13.7c-1.5-1.3-3.6-1.6-5.4-0.8L2.9 163.7c-1.7 0.8-2.9 2.6-2.9 4.5s1.1 3.7 2.8 4.5l91.8 45.1c1.7 0.8 3.7 0.6 5.2-0.5l89.3-66.7L119 222.7c-1 1-1.5 2.4-1.4 3.9l7 90.9c0.2 2 1.5 3.7 3.4 4.4 0.5 0.2 1 0.2 1.6 0.2 1.4 0 2.8-0.6 3.8-1.7l48.7-56.5 60.3 28.8c1.3 0.6 2.8 0.7 4.2 0.1 1.3-0.6 2.3-1.7 2.8-3.1l85-270.6C334.9 17.1 334.3 15 332.8 13.7z"/></svg>View in Korra</div>';

    this.prepend(korraBar);

  });

}

////////
////////
function viewLocalFile() {

	chrome.runtime.sendMessage({greeting: localUrl}, function(response) {
	  console.log(response.farewell);
	});


  //
  //
  // var pageUrl = document.URL;
  //
  //
  // var normalDbLink = pageUrl.replace(/dl\./gi, "www.");
  //   normalDbLink = normalDbLink.replace(/\.dropboxusercontent/gi, ".dropbox");
  //
  // console.log(normalDbLink);
  //
  // var localFilePath = "file:///Users/jameskupczak/Dropbox%20(MedBridge%20.)"
  //
  // // https://dropbox.github.io/dropbox-api-v2-explorer/#sharing_get_shared_link_metadata
  // dbx.sharingGetSharedLinkMetadata({url: normalDbLink})
  // .then(function(response) {
  //
  //   console.log(response);
  //
  //   var fileNameWithQuery = document.URL.replace(/^.+\//gi, "");
  //   var cleanFileName = document.URL.replace(/(^.+\/|\?.+)/gi, "");
  //
  //   var cleanFileNameRegEx = escapeRegExp(cleanFileName);
  //   var cleanFileNameRegEx = new RegExp(cleanFileNameRegEx, "gi");
  //
  //   var pathFromDb = response.path_lower.replace(cleanFileNameRegEx, "")
  //
  //   var fullLocalFilePath = localFilePath + pathFromDb + fileNameWithQuery;
  //
  //   console.log(cleanFileName);
  //   console.log(fileNameWithQuery);
  //   console.log(pathFromDb);
  //   console.log(fullLocalFilePath);
  //
  //   // We cannot navigate to local paths from a website. So we send a message to the chrome extension event page to do it for us.
  // 	chrome.runtime.sendMessage({greeting: fullLocalFilePath}, function(response) {
  // 	  console.log(response.farewell);
  // 	});
  //
  // })
  // .catch(function(error) {
  //   console.log(error);
  //   alertify.error("Could not find file on Dropbox for reference.", 0);
  //
  // });
}