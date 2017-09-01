/*
This example shows to get the start portal of a user
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
	url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/GetMyStartPortal",
    contentType: "application/json",
	data: JSON.stringify({ "objCredentials": _credentials}),
    success: function (portal)
    {
		alert("ID of my start portal: " + portal.PortalID);
    }
});