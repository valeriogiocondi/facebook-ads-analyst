export default `
    query AdsByBatchJobIdSelectQuery($authToken: String, $batchJobId: ID!)  { 
    
        exportCsvAdsByBatchJobId (
            authToken: $authToken,
            batchJobId: $batchJobId
        ) {
            token
            code
            payload
        }
    }
`