/*
This example shows how to get all the collections of a user
*/

var _credentials =
	{
		"Type": 1,
		"TokenID": "generated token id"
	};

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});
 
$.ajax({
    method: "GET",
	url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/GetCollections",
    contentType: "application/json",
	data: JSON.stringify({ "objCredentials": _credentials}),
    success: function (result)
    {
		alert("Number of collections: " + result.Collections.length);
    }
});