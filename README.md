# Overview
 This GitHub contains examples how to use the WCF api of iProva.

## Schema

All API access is possible over the same protocols as the iProva.

```javascript
var iprova = "https://iprova.yourcompany.nl";
var api = "https://iprova.yourcompany.nl/externalapi";
```


## End points

There are two end points for each resource: one for SOAP and service references and one for JSON or web calls.

The first is denoted by just the resource path: `http://iprova/externalapi/Portals/PortalsAPI.svc/GetTokenForUser`. The second is denoted by added `web` between the resource and the method: `http://iprova/externalapi/Portals/PortalsAPI.svc/web/GetTokenForUser`