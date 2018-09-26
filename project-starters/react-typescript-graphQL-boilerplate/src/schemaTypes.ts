/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddDocument
// ====================================================

export interface AddDocument_addDocument {
  __typename: "DocumentDto";
  name: string | null;
  description: string | null;
  url: string | null;
}

export interface AddDocument {
  addDocument: AddDocument_addDocument;
}

export interface AddDocumentVariables {
  name: string;
  description?: string | null;
  url?: string | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDocument
// ====================================================

export interface getDocument_getDocument {
  __typename: "DocumentDto";
  id: any;
  name: string | null;
  description: string | null;
}

export interface getDocument {
  getDocument: getDocument_getDocument;
}

export interface getDocumentVariables {
  id: string;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
