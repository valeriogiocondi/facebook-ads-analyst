export default `
    query BatchJobExecutedListSelectQuery($authToken: String, $limit: Int, $page: Int) {
        
        getBatchJobExecutedList(authToken: $authToken, limit: $limit, page: $page) {

            token
            batchJobExecutedCount
            batchJobExecutedList {
                id
                batchJob {
                    id
                    pageSocial {
                        id
                        internalId
                        name
                        publisherPlatform {
                            idPublisherPlatform
                            valuePublisherPlatform
                        }
                    }
                }
                byBatch
                numAds
                created
            }
        }        
    }
`