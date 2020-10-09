package com.qiao.springbootjpa.service.dto;

import cn.hutool.core.bean.BeanUtil;
import cn.hutool.core.bean.copier.CopyOptions;
import com.qiao.springbootjpa.domain.Organization;
import lombok.Data;

@Data
public class OrganizationDto {
    private Long id;

    private String name;

    private String type;

    private Long pid;

    private String parent;

    public void copy(Organization source){
        BeanUtil.copyProperties(source,this, CopyOptions.create().setIgnoreNullValue(true));
    }
}
