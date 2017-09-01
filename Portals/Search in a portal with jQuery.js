/*
This example shows how search in a portal
*/

var _credentials =
	{
		"Type": 1,
		"TokenID": "generated token id"
	};

var _portalID = 1; // Or use the start portal of the user
var _searchText = "test";

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});

var params = {
	"objCredentials": _credentials,
	"intPortalID": _portalID,
	"strSearchText": _searchText,
	"objOptions": {
		"MaxResult": 10,
		"StartIndex": 0,
		"ListIdentifier" : null,
		"Filter": null
	}
}
 
$.ajax({
    method: "GET",
	url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/SearchContentItemsInPortal",
    contentType: "application/json",
	data: JSON.stringify(params),
    success: function (result)
	{
		alert("Total number of returned items: " + result.ContentItems.length);
		alert("Total number of found items: " + result.TotalNumberOfResults);
		alert("Identifier when applying filtering to the current filter query: " + result.ListIdentifier);
    }
});