export default `
    mutation BatchJobExecutedListSelectMutation ($params: PaginatedInput!) {
        
        getBatchJobExecutedList (params: $params) {

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