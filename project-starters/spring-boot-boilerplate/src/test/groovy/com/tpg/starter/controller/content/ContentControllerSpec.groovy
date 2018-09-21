package com.tpg.starter.controller.content

import com.tpg.starter.controller.content.BaseControllerSpecification
import com.tpg.starter.service.DocumentService
import com.tpg.starter.service.dto.DocumentDto
import com.tpg.starter.service.repository.DocumentRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Ignore

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@Ignore
class ContentControllerSpec extends BaseControllerSpecification {

    private static final int FIRST_PAGE_NUMBER = 0

    @Autowired
    private MockMvc mockMvc

    @Autowired
    private DocumentService documentService

    @Autowired
    private DocumentRepository documentRepository

    Long documentId1, documentId2, documentId3

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

        when: 'requesting documents without pagination paramters'
        def response1 = mockMvc.perform(get('/api/documents'))

        then: 'the first page containing the existing documents should be retrieved'
        response1.andExpect(status().isOk())
                .andExpect(jsonPath('$.content', hasSize(3)))
                .andExpect(jsonPath('$.content[0].id').value(documentId1))
                .andExpect(jsonPath('$.content[1].id').value(documentId2))
                .andExpect(jsonPath('$.content[2].id').value(documentId3))
                .andExpect(jsonPath('$.totalElements').value(3))
                .andExpect(jsonPath('$.totalPages').value(1))
                .andExpect(jsonPath('$.numberOfElements').value(3))
                .andExpect(jsonPath('$.number').value(FIRST_PAGE_NUMBER))

        when: 'requesting second page with one item per page'
        def response2 = mockMvc.perform(get('/api/documents')
                                .param('pageNumber', "1")
                                .param('numberOfItems', "1"))

        then: 'the second page containing only the second document should be retrieved'
        response2.andExpect(status().isOk())
                .andExpect(jsonPath('$.content', hasSize(1)))
                .andExpect(jsonPath('$.content[0].id').value(documentId2))
                .andExpect(jsonPath('$.totalElements').value(3))
                .andExpect(jsonPath('$.totalPages').value(3))
                .andExpect(jsonPath('$.numberOfElements').value(1))
                .andExpect(jsonPath('$.number').value(FIRST_PAGE_NUMBER + 1))

    }

}