export default `
    mutation BatchJobListSelectMutation ($params: PaginatedInput!) {
        
        getBatchJobList (params: $params) {

            token
            batchJobCount
            batchJobList {
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
                adActiveStatus
                adReachedCountries
                adType
                impressionCondition
                searchTerms
                time
                numAds
                created
            }
        }        
    }
`