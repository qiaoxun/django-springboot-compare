package com.qiao.springbootjpa.service.dto;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.qiao.springbootjpa.domain.User;
import lombok.Data;

@Data
public class UserDto {
    private Long id;

    private String name;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    @JsonProperty(value = "organization_id")
    private Long organizationId;

    @JsonProperty(value = "organization_name")
    private String organizationName;

    public void copy(User source){
        BeanUtil.copyProperties(source,this, CopyOptions.create().setIgnoreNullValue(true));
    }
}
