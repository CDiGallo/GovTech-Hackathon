## Parent/child, childs with sorting on position

```sql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT * WHERE {
  	?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn> <https://culture.ld.admin.ch/ais/1>.
   	?child <https://www.ica.org/standards/RiC/ontology#title> ?child_title.
    ?child <https://schema.ld.admin.ch/position> ?position.
} ORDER BY ASC(?position) LIMIT 100
```

## Parent/child, count childs
```sql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT (COUNT(distinct ?child) as ?count) WHERE {
  	?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn> <https://culture.ld.admin.ch/ais/1>.
}
```
## REGEX for string in title (beware it is expensive)
```sql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
SELECT * WHERE {
   ?sub <https://www.ica.org/standards/RiC/ontology#title> ?title. #i checked, this is only in the AIS-Dataset 
  	Filter REGEX( ?title, "Guisan") .
} LIMIT 10000000
}
```
## Date range filter, direct children only
```sql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 

SELECT *  WHERE {
  ?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn> <https://culture.ld.admin.ch/ais/1>.
  ?child <https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate> ?date.
  ?date <https://www.ica.org/standards/RiC/ontology#beginningDate> ?beginningDate.
  ?date <https://www.ica.org/standards/RiC/ontology#endDate> ?endDate.
  FILTER ("1850-05-23"^^xsd:date > ?beginningDate && "1850-05-23"^^xsd:date < ?endDate).
} LIMIT 1
```

## Date range filter, deep search on children
```sql
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> 

SELECT *  WHERE {
  ?child <https://www.ica.org/standards/RiC/ontology#isOrWasIncludedIn>* <https://culture.ld.admin.ch/ais/1>.
  ?child <https://www.ica.org/standards/RiC/ontology#isAssociatedWithDate> ?date.
  ?date <https://www.ica.org/standards/RiC/ontology#beginningDate> ?beginningDate.
  ?date <https://www.ica.org/standards/RiC/ontology#endDate> ?endDate.
  FILTER ("1850-05-23"^^xsd:date > ?beginningDate && "1850-05-23"^^xsd:date < ?endDate).
} LIMIT 1
```
