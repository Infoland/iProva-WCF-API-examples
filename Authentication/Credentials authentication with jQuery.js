/*
This example shows how credential authentication is handled with jQuery.
Of course you should never expose this in the front end.
*/

var _userName = "j.t.kirk";
var _password = "set password";

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
function getMyRecentlyViewedItems()
{
	var credentials =
		{
			"Type": 2,
			"LoginCode": _userName,
			"Password" : _password
		};

	// Get the recently viewed items of a user
	$.ajax({
		method: "GET",
		url: "http://iprova/externalapi/MyRecentlyViewedItems/MyRecentlyViewedItemsAPI.svc/web/GetMyRecentlyViewedItems",
		contentType: "application/json",
		data: JSON.stringify({ "objCredentials": credentials}),
		success: function (result)
		{
			alert(result.Items.length);
		}
	});
}