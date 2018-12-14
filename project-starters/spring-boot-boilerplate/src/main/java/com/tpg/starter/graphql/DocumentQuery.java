package com.tpg.starter.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.tpg.starter.service.DocumentService;
import com.tpg.starter.service.dto.DocumentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DocumentQuery implements GraphQLQueryResolver {

    private DocumentService documentService;

    @Autowired
    public DocumentQuery(DocumentService documentService) {
        this.documentService = documentService;
    }

    public DocumentDto document(Long id) {
        return documentService.getDocument(id);
    }

    public List<DocumentDto> documents(int pageNumber, int numberOfItems) {
        Page<DocumentDto> result = documentService.getDocuments(pageNumber, numberOfItems);
        return result.getContent();
    }


    public List<DocumentDto> getDocuments(int pageNumber, int numberOfItems) {
        Page<DocumentDto> result = documentService.getDocuments(pageNumber, numberOfItems);
        return result.getContent();
    }

    public DocumentDto getDocument(Long id) {
        return documentService.getDocument(id);
    }
}
