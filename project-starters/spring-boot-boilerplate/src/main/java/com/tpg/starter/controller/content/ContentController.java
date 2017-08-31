package com.tpg.starter.controller.content;

import com.tpg.starter.service.DocumentService;
import com.tpg.starter.service.dto.DocumentDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.Min;


@RestController
@Validated
@RequestMapping("/api")
public class ContentController {

    private static final Logger log = LoggerFactory.getLogger(ContentController.class);

    @Autowired
    private DocumentService documentService;

    @RequestMapping(path = "/documents", method = RequestMethod.GET)
    public ResponseEntity<Page<DocumentDto>> getDocuments(@RequestParam(value = "pageNumber", defaultValue = "0", required = false) @Min(0) int pageNumber,
                                                          @RequestParam(value = "numberOfItems", defaultValue = "10", required = false) @Min(1) int numberOfItems) {
        log.debug("[getDocuments]");
        Page<DocumentDto> result = documentService.getDocuments(pageNumber, numberOfItems);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

}
