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
// GraphQL query operation: AllDocuments
// ====================================================

export interface AllDocuments_documents {
  __typename: "DocumentDto";
  id: any;
  name: string | null;
  description: string | null;
}

export interface AllDocuments {
  documents: (AllDocuments_documents | null)[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Documents
// ====================================================

export interface Documents_documents {
  __typename: "DocumentDto";
  id: any;
  name: string | null;
  description: string | null;
}

export interface Documents {
  documents: (Documents_documents | null)[];
}

export interface DocumentsVariables {
  pageNumber?: number | null;
  numberOfItems?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Document
// ====================================================

export interface Document_document {
  __typename: "DocumentDto";
  id: any;
  name: string | null;
  description: string | null;
}

export interface Document {
  document: Document_document;
}

export interface DocumentVariables {
  id?: number | null;
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
