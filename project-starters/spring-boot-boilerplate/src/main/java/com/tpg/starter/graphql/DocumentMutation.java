package com.tpg.starter.graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.tpg.starter.service.DocumentService;
import com.tpg.starter.service.dto.DocumentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DocumentMutation implements GraphQLMutationResolver {

    private DocumentService documentService;

    @Autowired
    public DocumentMutation(DocumentService documentService) {
        this.documentService = documentService;
    }

    public DocumentDto addDocument(String name, String description, String url) {
        DocumentDto documentDto = new DocumentDto();
        documentDto.setName(name);
        documentDto.setDescription(description);
        documentDto.setUrl(url);
        Long documentId = documentService.createDocument(documentDto);

        documentDto.setId(documentId);
        return documentDto;
    }
}
