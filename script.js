
document.onreadystatechange = () => {
  if (document.readyState === "complete") {
    initApplication();
  }
};



function initApplication() {
	let rootNode = {
		"name": "Root",
		"value": 0,
		"children" : []
	};
	fetchNode(1, rootNode, 2).then(()=> {
		visualizedata(rootNode);
		listNode(rootNode);
		listChildren(rootNode);
		createTable(rootNode);
	});
}



async function fetchNode(nodeid, node, level) {
	let queryBody = "";
	queryBody += "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> ";
	queryBody += "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> ";
	queryBody += "SELECT * WHERE { ";
	queryBody += "?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn> <https://culture.ld.admin.ch/ais/" + nodeid + ">. ";
	queryBody += "?child <https://www.ica.org/standards/RiC/ontology#title> ?child_title. ";
    queryBody += "?child <https://schema.ld.admin.ch/position> ?position. ";
	queryBody += "} ORDER BY ASC(?position) LIMIT 100";

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

	let response = await fetch(
		"https://lindas.admin.ch/query",
		{
			method: 'POST',
			headers: {
				'accept' : "application/sparql-results+json,*/*;q=0.9",
				'content-type' : "application/x-www-form-urlencoded"
			},
			body: formBody
		}
	);

	let responsejson = await response.json(); 
	let childs = responsejson['results']['bindings']
	node.identifier = node.value;
	node.value = 1;

	await fetchChildren(childs, node, level);
}



async function fetchChildren(children, parentNode, level) {

	let fetchCalls = [];

	for (const child of children) {

		let childId = child.child.value.replace("https://culture.ld.admin.ch/ais/", "");

		let childNode = {
			"name": child.child_title.value,
			"value": childId,
			"children" : []
		}

		if (level > 0) {
			fetchCalls.push(fetchNode(childId, childNode, level - 1));
		}
		childNode.identifier = childNode.value;
		childNode.value = 1;
	
		parentNode.children.push(childNode);
	}
	await Promise.all(fetchCalls);
} 


function visualizedata(adapteddata) {
	d3.select("#chart").select("svg").remove();
	//const color = d3.scaleOrdinal(d3.schemeCategory10);
	var color = d3.scaleOrdinal(d3.schemeReds[9]);
	console.log(color);
	Sunburst()
      .data(adapteddata)
      .color(d => color(d.name))
      /*.minSliceAngle(.4)*/
      .excludeRoot(true)
      .maxLevels(2)
      .showLabels(true)
      .tooltipContent((d, node) => `Size: <i>${node.value}</i>`)
    (document.getElementById('chart'));
}

function listNode(node) {

}
function listChildren(node) {
	
}

function createTable(adapteddata){
	console.log(adapteddata.name);
	console.log(adapteddata.children);
	console.log(adapteddata.listChildren);
	console.log(adapteddata.children[0].name)
	
	const table = document.createElement('table');

	table.style.cursor = 'pointer';

	// Create the table header row
	const headerRow = document.createElement('tr');
	const nameHeader = document.createElement('th');
	nameHeader.textContent = 'Bundesarchiv';
	headerRow.appendChild(nameHeader);
	table.appendChild(headerRow);
	
	// Create a row for the root object
	const rootRow = document.createElement('tr');
	const rootNameCell = document.createElement('td');
	rootNameCell.textContent = adapteddata.name;
	rootRow.appendChild(rootNameCell);
	table.appendChild(rootRow);
	
	// Create rows for the root object's children
	adapteddata.children.forEach(child => {
	  const childRow = document.createElement('tr');
	  const childNameCell = document.createElement('td');
	  childNameCell.textContent = child.name;
	  childRow.appendChild(childNameCell);
	  table.appendChild(childRow);
	  childRow.addEventListener('click', () => {
		console.log(child.name);

		visualizedata(child);
	  })
	});
	
	// Add the table to the document
	document.body.appendChild(table);
	
}

