## LINDAS, use POST request, x-www-form-urlencoded and json as result
```javascript
let queryBody = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> " + 
            "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> " +
			" SELECT * WHERE { " +
	   	"?sub_1 <https://www.ica.org/standards/RiC/ontology#hasRecordSetType> ?all. " +
	   			"VALUES ?all {<https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/1> <https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/10001> <https://culture.ld.admin.ch/ais/vocabularies/recordSetTypes/10003> } " +
	    "    ?sub_1 <https://www.ica.org/standards/RiC/ontology#title> ?title. " +
	    "    ?sub_1 <https://www.ica.org/standards/RiC/ontology#hasRecordSetType> ?level. " +
		"} LIMIT 1000000";

var details = {
    'query': queryBody,
    'lang': 'de'
};

var formBody = [];
for (var property in details) {
  var encodedKey = encodeURIComponent(property);
  var encodedValue = encodeURIComponent(details[property]);
  formBody.push(encodedKey + "=" + encodedValue);
}
formBody = formBody.join("&");

var url = "https://lindas.admin.ch/query";

async function asyncCall() {
	let response = await fetch(
		url,
		{
			method: 'POST',
			headers: {
				'accept' : "application/sparql-results+json,*/*;q=0.9",
				'content-type' : "application/x-www-form-urlencoded"
			},
			body: formBody
		}
	);
	let responsetext = await response.text(); 
	console.log(responsetext);
	let adapteddata = adaptdata(responsetext);
	visualizedata(adapteddata);
}
```
