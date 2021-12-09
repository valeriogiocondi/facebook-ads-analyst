export default `
    query AdsBySocialPageIdSelectQuery($authToken: String, $pageInternalId: String!) { 
        
        exportCsvAdsBySocialPageId (
            authToken: $authToken,
            pageInternalId: $pageInternalId
        ) {
            token
            code
            payload
        }
    }
`;