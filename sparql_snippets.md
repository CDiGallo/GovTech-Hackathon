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
