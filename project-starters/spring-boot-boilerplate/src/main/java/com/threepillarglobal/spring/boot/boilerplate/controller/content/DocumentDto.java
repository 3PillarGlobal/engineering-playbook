package com.threepillarglobal.spring.boot.boilerplate.controller.content;

import java.util.UUID;

public class DocumentDto {

    private final String id = UUID.randomUUID().toString();
    private String name;
    private String description;
    private String url;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
