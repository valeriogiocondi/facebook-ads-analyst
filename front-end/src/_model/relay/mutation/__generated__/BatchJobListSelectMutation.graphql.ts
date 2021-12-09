/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PaginatedInput = {
    authToken?: string | null;
    page?: number | null;
    limit?: number | null;
};
export type BatchJobListSelectMutationVariables = {
    params: PaginatedInput;
};
export type BatchJobListSelectMutationResponse = {
    readonly getBatchJobList: {
        readonly token: string | null;
        readonly batchJobCount: number | null;
        readonly batchJobList: ReadonlyArray<{
            readonly id: string;
            readonly pageSocial: {
                readonly id: string;
                readonly internalId: string;
                readonly name: string;
                readonly publisherPlatform: {
                    readonly idPublisherPlatform: string;
                    readonly valuePublisherPlatform: string;
                };
            };
            readonly adActiveStatus: number | null;
            readonly adReachedCountries: number | null;
            readonly adType: number | null;
            readonly impressionCondition: number | null;
            readonly searchTerms: string | null;
            readonly time: string | null;
            readonly numAds: number | null;
            readonly created: string | null;
        } | null>;
    } | null;
};
export type BatchJobListSelectMutation = {
    readonly response: BatchJobListSelectMutationResponse;
    readonly variables: BatchJobListSelectMutationVariables;
};



/*
mutation BatchJobListSelectMutation(
  $params: PaginatedInput!
) {
  getBatchJobList(params: $params) {
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
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "params",
            "type": "PaginatedInput!"
        } as any)
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v2 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "params",
                    "variableName": "params"
                }
            ],
            "concreteType": "BatchJobListResponse",
            "kind": "LinkedField",
            "name": "getBatchJobList",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "token",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "batchJobCount",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "BatchJob",
                    "kind": "LinkedField",
                    "name": "batchJobList",
                    "plural": true,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "PageSocial",
                            "kind": "LinkedField",
                            "name": "pageSocial",
                            "plural": false,
                            "selections": [
                                (v1 /*: any*/),
                                {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "internalId",
                                    "storageKey": null
                                },
                                {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                },
                                {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PublisherPlatform",
                                    "kind": "LinkedField",
                                    "name": "publisherPlatform",
                                    "plural": false,
                                    "selections": [
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "idPublisherPlatform",
                                            "storageKey": null
                                        },
                                        {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "valuePublisherPlatform",
                                            "storageKey": null
                                        }
                                    ],
                                    "storageKey": null
                                }
                            ],
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adActiveStatus",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adReachedCountries",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "adType",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "impressionCondition",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "searchTerms",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "time",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "numAds",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "created",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "BatchJobListSelectMutation",
            "selections": (v2 /*: any*/),
            "type": "Mutation"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobListSelectMutation",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobListSelectMutation",
            "operationKind": "mutation",
            "text": "mutation BatchJobListSelectMutation(\n  $params: PaginatedInput!\n) {\n  getBatchJobList(params: $params) {\n    token\n    batchJobCount\n    batchJobList {\n      id\n      pageSocial {\n        id\n        internalId\n        name\n        publisherPlatform {\n          idPublisherPlatform\n          valuePublisherPlatform\n        }\n      }\n      adActiveStatus\n      adReachedCountries\n      adType\n      impressionCondition\n      searchTerms\n      time\n      numAds\n      created\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'a08ac6dd99b0518c64427545da1f7363';
export default node;
