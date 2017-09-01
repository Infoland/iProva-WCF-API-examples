/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose this in the front end.
*/

var _trustedApplicationID = "set trusted application id";
var _userName = "j.t.kirk";
var _tokenID;

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
// Create token and call function to get the recently viewed content of a user
$.ajax({
    method: "GET",
	url: "http://iprova/externalapi/MyRecentlyViewedItems/MyRecentlyViewedItemsAPI.svc/web/GetTokenForUser",
    contentType: "application/json",
	data: JSON.stringify({ "strTrustedApplicationID": _trustedApplicationID,"strLoginCode":_userName}),
    success: function (result)
    {
        _tokenID = result;
		getNews();
    }
});

function getMyRecentlyViewedItems()
{
	var credentials =
		{
			"Type": 1,
			"TokenID": _tokenID
		};

	// Get the recently viewed items of a user
	$.ajax({
		method: "GET",
		url: "http://iprova/externalapi/MyRecentlyViewedItems/MyRecentlyViewedItemsAPI.svc/web/GetMyRecentlyViewedItems",
		contentType: "application/json",
		data: JSON.stringify({ "objCredentials": credentials}),
		success: function (result)
		{
			alert("Number of recent items: " + result.Items.length);
		}
	});
}