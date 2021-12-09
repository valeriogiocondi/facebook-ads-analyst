const { gql } = require('apollo-server')
// const schemaGraphql = require('./schemaGraphql.graphql')

const typeDefs = gql`

type Query {

    """ LOGIN """
    loginAuth(username: String!, password: String!): String
    loginVerify(token: String): String
    logout(token: String): String
    

    """ ADS """
    adsList(authToken: String, limit: Int, page: Int): AdsListResponse
    adsById(id: ID!): Ads
    adsBySocialPageId(pageSocialInternalId: String!): PageSocialResponseDTO
    adsByBatchJobId(batchJobId: ID!): [Ads]
    adsByBatchJobExecutedId(batchJobEcecutedId: ID!, limit: Int, page: Int): [Ads]

    exportCsvAdsBySocialPageId(authToken: String, pageInternalId: String!): ExportCsvResponseDTO!
    exportCsvAdsByBatchJobId(authToken: String, batchJobId: ID!): ExportCsvResponseDTO!


    """ BATCH JOB """
    getBatchJobList(authToken: String, limit: Int, page: Int): BatchJobListResponse
    getBatchJobById(authToken: String, id: ID!): BatchJobResponse
    
    """ BATCH JOB EXECUTED """
    getBatchJobExecutedList(authToken: String, limit: Int, page: Int): BatchJobExecutedListResponse
    getBatchJobExecutedById(authToken: String, id: ID!): BatchJobExecutedResponse


    """ FACEBOOK API """
    getActiveStatusList(authToken: String): ActiveStatusResponse
    getReachedCountriesList(authToken: String): ReachedCountriesResponse
    getTypeList(authToken: String): TypeResponse
    getImpressionConditionList(authToken: String): ImpressionConditionResponse
    getPublisherPlatformList(authToken: String): PublisherPlatformResponse


    """ PAGE SOCIAL """
    getPageSocialList(authToken: String, limit: Int, page: Int): PageSocialListResponse
    getPageSocial(authToken: String, id: ID!, internalID: ID!, limit: Int, page: Int): PageSocialResponse
}

type Mutation {

    """ GET LIST PAGINATED """
    getPageSocialList(authToken: String, limit: Int, page: Int): PageSocialListResponse
    getBatchJobList(params: PaginatedInput!): BatchJobListResponse
    getBatchJobExecutedList(params: PaginatedInput!): BatchJobExecutedListResponse
    
    
    """ BATCH JOB OPERATION """
    insertBatchJob(params: BatchJobInput!): BatchJob
    editBatchJob(params: BatchJobInput!): BatchJob
    deleteBatchJob(params: BatchJobInput!): BatchJob
}


"""
------------------------------------
                INPUT               
------------------------------------
"""
input PaginatedInput {
    authToken: String
    page: Int
    limit: Int
}

input BatchJobInput {
    id: ID,
    pageId: Int,
    pageInternalId: String,
    publisherPlatformId: Int,
    adActiveStatus: Int,
    adReachedCountries: Int,
    adType: Int,
    impressionCondition: Int,
    searchTerms: String,
    time: String,
    created: String,
}   


"""
------------------------------------
               RESPONSE               
------------------------------------
"""

interface Response {
    token: String
}
type PageSocialListResponse implements Response {
    token: String
    pageSocialCount: Int
    pageSocialList: [PageSocial]!
}
type PageSocialResponse implements Response {
    token: String
    pageSocial: PageSocial!
    adsList: [Ads]
}
type BatchJobListResponse implements Response {
    token: String
    batchJobCount: Int
    batchJobList: [BatchJob]!
}
type BatchJobResponse implements Response {
    token: String
    batchJob: BatchJob!
    adsList: [Ads]
}
type BatchJobExecutedListResponse implements Response {
    token: String
    batchJobExecutedCount: Int
    batchJobExecutedList: [BatchJobExecuted]!
}
type BatchJobExecutedResponse implements Response {
    token: String
    batchJobExecuted: BatchJobExecuted!
    adsList: [Ads]
}
type AdsListResponse implements Response {
    token: String
    adsList: [Ads]!
}
type ActiveStatusResponse implements Response {
    token: String
    activeStatusList: [ActiveStatus]!
}
type ReachedCountriesResponse implements Response {
    token: String
    reachedCountriesList: [ReachedCountries]!
}
type TypeResponse implements Response {
    token: String
    typeList: [Type]!
}
type ImpressionConditionResponse implements Response {
    token: String
    impressionConditionList: [ImpressionCondition]!
}
type PublisherPlatformResponse implements Response {
    token: String
    publisherPlatformList: [PublisherPlatform]!
}


"""
------------------------------------
                TYPES                              
------------------------------------
"""

type Ads {
    _id: String
    id: String
    adCreationTime: String 
    adCreativeBody: String 
    adCreativeLinkCaption: String 
    adCreativeLinkDescription: String 
    adCreativeLinkTitle: String 
    adDeliveryStartTime: String 
    adSnapshotUrl: String 
    currency: String 
    fundingEntity: String
    pageId: String
    pageName: String
    impressions: AdsImpressions
    publisherPlatforms: [String]
    demographicDistribution: [AdsDemographicDistribution]
    regionDistribution: [AdsRegionDistribution]
    spend: AdsSpend
    created: String
}
type AdsImpressions {
    lowerBound: String
    upperBound: String
}
type AdsDemographicDistribution { 
    percentage: String 
    age: String 
    gender: String 
}
type AdsRegionDistribution { 
    percentage: String 
    region: String 
}
type AdsSpend {
    lowerBound: String
    upperBound: String
}

type PageSocial {
    id: ID!
    internalId: String!
    name: String!
    publisherPlatform: PublisherPlatform!
    numAds: Int
}
type BatchJob {
    id: ID!
    pageSocial: PageSocial!
    adActiveStatus: Int
    adReachedCountries: Int
    adType: Int
    impressionCondition: Int    
    searchTerms: String
    numAds: Int
    time: String
    created: String
}
type BatchJobExecuted {
    id: ID!
    pageSocial: PageSocial
    batchJob: BatchJob!
    byBatch: Int!
    numAds: Int
    created: String
}



"""
-------------------
    TYPOLOGICAL                   
-------------------
"""
type ActiveStatus { 
    idActiveStatus: ID!
    valueActiveStatus: String!
}
type ReachedCountries { 
    idReachedCountries: ID!
    valueReachedCountries: String!
}
type Type { 
    idType: ID!
    valueType: String!
}
type ImpressionCondition { 
    idImpressionCondition: ID!
    valueImpressionCondition: String!
}
type PublisherPlatform { 
    idPublisherPlatform: ID!
    valuePublisherPlatform: String!
}

type PageSocialResponseDTO {
    code: Int!
    payload: String
}
type ExportCsvResponseDTO implements Response {
    token: String
    code: Int!
    payload: String
}
`;

module.exports = typeDefs