export default `
    query PageSocialListSelectQuery ($authToken: String, $limit: Int!, $page: Int!) {
    
        getPageSocialList (authToken: $authToken, limit: $limit, page: $page) {

            token
            pageSocialCount
            pageSocialList {
                id
                internalId
                name
                publisherPlatform {
                    idPublisherPlatform
                    valuePublisherPlatform
                }
                numAds
            }
        }
    }
`