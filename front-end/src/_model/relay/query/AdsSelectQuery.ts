export default `
    query AdsSelectQuery($id: ID!) { 
        
        adsById(id: $id) {
            _id,
            id,
            adCreationTime, 
            adCreativeBody, 
            adCreativeLinkCaption, 
            adCreativeLinkDescription, 
            adCreativeLinkTitle, 
            adDeliveryStartTime, 
            adSnapshotUrl, 
            currency, 
            fundingEntity, 
            pageId, 
            pageName, 
            impressions {
                lowerBound,
                upperBound,
            }, 
            publisherPlatforms, 
            demographicDistribution {
                percentage, 
                age, 
                gender,
            }, 
            spend {
                lowerBound,
                upperBound,
            }, 
            created,
        }
    }
`