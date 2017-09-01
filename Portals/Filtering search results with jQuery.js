/*
This example shows how to implement the supported filtering system.
Searching and getting content items from a set of collections or a portal will produce a ListIdentifer.
This ListIdentifier can be used to get context sensitive filters and for applying them to the already existing query.
This gives it an performance boost.
*/

var _credentials =
	{
		"Type": 1,
		"TokenID": "generated token id"
	};

var _portalID = 1; // Or use the start portal of the user
var _searchText = "test";
var _listIdentifier;

// Globally handle all ajax errors
$(document).ajaxError(function( event, jqxhr, settings, thrownError ) {
  alert(JSON.stringify(jqxhr));
});

// Search on the text and then continue in the filter flow
$.ajax({
    method: "GET",
	url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/SearchContentItemsInPortal",
    contentType: "application/json",
	data: JSON.stringify({
		"objCredentials": _credentials,
		"intPortalID": _portalID,
		"strSearchText": _searchText
	}),
    success: function (result)
	{
		// Search on all the items and a ListIdentifer has been generated
		alert("Total number of found items: " + result.TotalNumberOfResults);
		_listIdentifier = result.ListIdentifier;

		// Get context sensitive filters
		$.ajax({
			method: "GET",
			url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/GetFilterFields",
			contentType: "application/json",
			data: JSON.stringify({
				"objCredentials": _credentials,
				"guidListIdentifier": _listIdentifier,
				"objCurrentFilter": null
			}),
			success: function (result)
			{
				var filterFields = result.FilterFields;
				var field = filterFields[0];
				var fieldValue = field.FilterFieldValues[0];
				// A filter value can have an “overridecontenttypeid” set. This is only possible in the “type” filter
				// because this field can contain values from different content types and else the system will loose to which contenttype the filter belongs
				var contentTypeID = (fieldValue.OverrideContentTypeID > 0 ? fieldValue.OverrideContentTypeID : field.ContentTypeID);

				var filter = [];
				var filterRule = {
					"FieldID": field.FieldID,
					"ContentTypeID": contentTypeID,
					"FilterValueID": fieldValue.ID
				};

				filter.push(filterRule);

				// Filter on the first option of the first filter 
				$.ajax({
					method: "GET",
					url: "http://iprova/externalapi/Portals/PortalsAPI.svc/web/SearchContentItemsInPortal",
					contentType: "application/json",
					data: JSON.stringify({
						"objCredentials": _credentials,
						"intPortalID": _portalID,
						"strSearchText": _searchText,
						"objOptions": {
							"ListIdentifier": _listIdentifier,
							"Filter": filter
						}
					}),
					success: function (result)
					{
						alert("Total number of found items after applying the first option of the first filter: " + result.TotalNumberOfResults);
					}
				});
			}
		});
    }
});