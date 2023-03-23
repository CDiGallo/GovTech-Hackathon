
function initApplication() {
	getChildForParentId();
}




document.onreadystatechange = () => {
  if (document.readyState === "interactive") {
    initApplication();
  }
};


function getChildForParentId(id)  {
	let endpoint = "https://lindas.admin.ch/query";
	let query = `
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> SELECT * WHERE { ?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn> <https://culture.ld.admin.ch/ais/1>. ?child <https://www.ica.org/standards/RiC/ontology#title> ?title. } LIMIT 10
`;
	let url = endpoint + encodeURI(query);
	postRequest(endpoint, query);
}

async function postRequest(url, postdata) {
^	let response = await fetch(
		url,
		{
			method: 'POST',
			query: postdata,
			headers: {
				'accept' : "text/csv"
			}
		}
	);
	let responsetext = await response.text(); 
	processResponseText(responsetext);
}

async function getRequest(url) {
	let response = await fetch(
		url,
		{
			method: 'GET',
			headers: {
				'accept' : "text/csv"
			}
		}
	);
	let responsetext = await response.text(); 
	processResponseText(responsetext);
}


function processResponseText(responseText) {
	console.log(responseText);
}