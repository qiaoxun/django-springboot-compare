package com.qiao.springbootmybatis.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {

    private Long id;

    private String name;

    @JsonProperty(value = "first_name")
    private String firstName;

    @JsonProperty(value = "last_name")
    private String lastName;

    private String email;

    private String password;

    @JsonProperty(value = "organization_id")
    private Long organizationId;

    @JsonProperty(value = "organization_name")
    private String organizationName;
}