/*
This example shows how token authentication is handled with PHP using Guzzle.
https://github.com/guzzle/guzzle
*/

$trustedApplicationID = 'set trusted application id';
$userName = 'j.t.kirk';
$tokenID = '';

$myRecentlyViewedItemsClient = new \GuzzleHttp\Client([
    // Base URI is used with relative requests
    'base_uri' => 'http://iprova/externalapi/MyRecentlyViewedItems/MyRecentlyViewedItemsAPI.svc/web/'
]);

$params = array(
    'strTrustedApplicationID' => $trustedApplicationID,
    'strLoginCode' => $userName,
);

$response = $myRecentlyViewedItemsClient->post(
	'GetTokenForUser', 
	[
		'body' => json_encode($params),
		'headers' => [
			'Content-type' => 'application/json',
		]
	]);

$tokenID = json_decode($response->getBody(), true);

$params = array(
    'objCredentials' => array(
		'Type' => 1,
		'TokenID' => TokenID
	)
);

$response = $myRecentlyViewedItemsClient->get(
	'GetMyRecentlyViewedItems', 
	[
		'body' => json_encode($params),
		'headers' => [
			'Content-type' => 'application/json',
		]
	]);

echo json_decode($response.getBody(), true);
