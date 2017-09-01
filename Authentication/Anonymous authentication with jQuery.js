/*
This example shows how anonymous authentication is handled with jQuery.
*/

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
function getAnonymousCollections()
{
	var credentials =
		{
			"Type": 3
		};

	// Get the collections of the anonymous user
	$.ajax({
		method: "GET",
		url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/GetCollections",
		contentType: "application/json",
		data: JSON.stringify({ "objCredentials": credentials}),
		success: function (result)
		{
			alert("Number of collections: " + result.Collections.length);
		}
	});
}