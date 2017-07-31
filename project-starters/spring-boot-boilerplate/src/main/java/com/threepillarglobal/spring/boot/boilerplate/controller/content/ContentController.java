package com.threepillarglobal.spring.boot.boilerplate.controller.content;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@Validated
@RequestMapping("/api")
public class ContentController {

    private static final Logger log = LoggerFactory.getLogger(ContentController.class);

    @RequestMapping(path = "/documents", method = RequestMethod.GET)
    public ResponseEntity<List<DocumentDto>> getDocuments() {
        log.debug("[getDocuments]");
        List<DocumentDto> documents = createDocumentsResponse();
        return ResponseEntity.ok(documents);
    }

    private List<DocumentDto> createDocumentsResponse() {

        DocumentDto documentDto1 = new DocumentDto();
        documentDto1.setName("Document 1");
        documentDto1.setDescription("Document 1 description");
        documentDto1.setUrl("https://www.someurl.com/document1.pdf");

        DocumentDto documentDto2 = new DocumentDto();
        documentDto2.setName("Document 2");
        documentDto2.setDescription("Document 2 description");
        documentDto2.setUrl("https://www.someurl.com/document2.pdf");

        List<DocumentDto> result = new ArrayList<>();
        result.add(documentDto1);
        result.add(documentDto2);
        return result;
    }
}
