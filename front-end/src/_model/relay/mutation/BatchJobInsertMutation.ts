export default `
    mutation BatchJobInsertMutation($params: BatchJobInput!) {

        insertBatchJob(params: $params) {
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
            created
        }
    }
`