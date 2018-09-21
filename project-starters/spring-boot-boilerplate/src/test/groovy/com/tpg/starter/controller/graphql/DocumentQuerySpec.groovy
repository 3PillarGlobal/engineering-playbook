package com.tpg.starter.controller.graphql

import com.tpg.starter.controller.BaseGraphQlSpecification
import com.tpg.starter.service.DocumentService
import com.tpg.starter.service.dto.DocumentDto
import com.tpg.starter.service.repository.DocumentRepository
import org.springframework.beans.factory.annotation.Autowired

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class DocumentQuerySpec extends BaseGraphQlSpecification {

    @Autowired
    private DocumentService documentService

    @Autowired
    private DocumentRepository documentRepository

    private Long documentId1, documentId2, documentId3

    def setup() {
        DocumentDto documentDto1 = new DocumentDto()
        documentDto1.name = 'Document 1'
        documentDto1.description = 'Document 1 description'
        documentDto1.url = 'https://www.someurl.com/document1.pdf'
        documentId1 = documentService.createDocument(documentDto1)

        DocumentDto documentDto2 = new DocumentDto()
        documentDto2.name = 'Document 2'
        documentDto2.description = 'Document 2 description'
        documentDto2.url = 'https://www.someurl.com/document2.pdf'
        documentId2 = documentService.createDocument(documentDto2)

        DocumentDto documentDto3 = new DocumentDto()
        documentDto3.name = 'Document 3'
        documentDto3.description = 'Document 3 description'
        documentDto3.url = 'https://www.someurl.com/document3.pdf'
        documentId3 = documentService.createDocument(documentDto3)
    }

    def cleanup() {
        documentRepository.deleteAll()
    }

    def 'getDocuments returns the expected paginated result'() {

        when: 'requesting documents without pagination parameters'

        def response1 = performGraphQlPost("graphql/get-documents.graphqls")

        then: 'the first page containing the existing documents should be retrieved'
        response1.andExpect(status().isOk())
                .andExpect(jsonPath('$.data.getDocuments', hasSize(3)))
                .andExpect(jsonPath('$.data.getDocuments[0].id').value(documentId1))
                .andExpect(jsonPath('$.data.getDocuments[1].id').value(documentId2))
                .andExpect(jsonPath('$.data.getDocuments[2].id').value(documentId3))

        when: 'requesting second page with one item per page'
        def variables = newVariablesObject()
        variables.put("pageNumber", 1)
        variables.put("numberOfItems", 1)

        def response2 = performGraphQlPost("graphql/get-documents.graphqls", variables)

        then: 'the second page containing only the second document should be retrieved'
        response2.andExpect(status().isOk())
                .andExpect(jsonPath('$.data.getDocuments', hasSize(1)))
                .andExpect(jsonPath('$.data.getDocuments[0].id').value(documentId2))

    }

}