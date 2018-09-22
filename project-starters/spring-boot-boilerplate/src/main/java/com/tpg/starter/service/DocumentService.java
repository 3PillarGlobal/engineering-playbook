package com.tpg.starter.service;

import com.tpg.starter.domain.Document;
import com.tpg.starter.service.dto.DocumentDto;
import com.tpg.starter.service.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class DocumentService {

    @Autowired
    private DocumentRepository documentRepository;

    public Page<DocumentDto> getDocuments(int pageNumber, int numberOfItems) {
        Sort sort = new Sort(Sort.Direction.ASC, "name");
        PageRequest pageRequest = new PageRequest(pageNumber, numberOfItems, sort);
        Page<Document> documents = documentRepository.findAll(pageRequest);
        return documents.map(document -> documentToDocumentDto().apply(document));
    }

    public Long createDocument(DocumentDto documentDto) {
        Document document = documentDtoToDocument().apply(documentDto);
        return documentRepository.save(document).getId();
    }

    public DocumentDto getDocument(Long id){
        Document document = documentRepository.findOne(id);
        return documentToDocumentDto().apply(document);
    }

    private Function<Document, DocumentDto> documentToDocumentDto() {
        return document -> {
          DocumentDto documentDto = new DocumentDto();
          documentDto.setId(document.getId());
          documentDto.setName(document.getName());
          documentDto.setDescription(document.getDescription());
          documentDto.setUrl(document.getUrl());
          return documentDto;
        };
    }

    private Function<DocumentDto, Document> documentDtoToDocument() {
        return documentDto -> {
          Document document = new Document();
          document.setName(documentDto.getName());
          document.setDescription(document.getDescription());
          document.setUrl(documentDto.getUrl());
          return document;
        };
    }

}
