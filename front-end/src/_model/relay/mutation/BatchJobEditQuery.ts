export default `
    mutation BatchJobEditQuery($params: BatchJobInput!) {

        editBatchJob(params: $params) {
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