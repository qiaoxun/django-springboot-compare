package com.qiao.springbootmybatis.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class Organization {

    private Long id;

    private String name;

    private String parent;

    private String type;

    @JsonProperty(value = "type_meaning")
    private String typeMeaning;

    private Long pid;

}
