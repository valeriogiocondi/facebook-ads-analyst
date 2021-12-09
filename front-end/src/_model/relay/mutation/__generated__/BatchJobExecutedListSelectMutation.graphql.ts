/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PaginatedInput = {
    authToken?: string | null;
    page?: number | null;
    limit?: number | null;
};
export type BatchJobExecutedListSelectMutationVariables = {
    params: PaginatedInput;
};
export type BatchJobExecutedListSelectMutationResponse = {
    readonly getBatchJobExecutedList: {
        readonly token: string | null;
        readonly batchJobExecutedCount: number | null;
        readonly batchJobExecutedList: ReadonlyArray<{
            readonly id: string;
            readonly batchJob: {
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
            };
            readonly byBatch: number;
            readonly numAds: number | null;
            readonly created: string | null;
        } | null>;
    } | null;
};
export type BatchJobExecutedListSelectMutation = {
    readonly response: BatchJobExecutedListSelectMutationResponse;
    readonly variables: BatchJobExecutedListSelectMutationVariables;
};



/*
mutation BatchJobExecutedListSelectMutation(
  $params: PaginatedInput!
) {
  getBatchJobExecutedList(params: $params) {
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
            "concreteType": "BatchJobExecutedListResponse",
            "kind": "LinkedField",
            "name": "getBatchJobExecutedList",
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
                    "name": "batchJobExecutedCount",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "BatchJobExecuted",
                    "kind": "LinkedField",
                    "name": "batchJobExecutedList",
                    "plural": true,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "BatchJob",
                            "kind": "LinkedField",
                            "name": "batchJob",
                            "plural": false,
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
                                }
                            ],
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "byBatch",
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
            "name": "BatchJobExecutedListSelectMutation",
            "selections": (v2 /*: any*/),
            "type": "Mutation"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "BatchJobExecutedListSelectMutation",
            "selections": (v2 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "BatchJobExecutedListSelectMutation",
            "operationKind": "mutation",
            "text": "mutation BatchJobExecutedListSelectMutation(\n  $params: PaginatedInput!\n) {\n  getBatchJobExecutedList(params: $params) {\n    token\n    batchJobExecutedCount\n    batchJobExecutedList {\n      id\n      batchJob {\n        id\n        pageSocial {\n          id\n          internalId\n          name\n          publisherPlatform {\n            idPublisherPlatform\n            valuePublisherPlatform\n          }\n        }\n      }\n      byBatch\n      numAds\n      created\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '7fdd807b0e642d498e55f9336742e6f7';
export default node;
