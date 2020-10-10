package com.qiao.springbootmybatis.dao;

import com.qiao.springbootmybatis.entity.Organization;

import java.util.List;
import java.util.Map;

public interface OrganizationDao {
    int deleteByPrimaryKey(Long id);

    int insert(Organization record);

    List<Organization> selectList(Map<String, Object> map);

    Long count();

    Organization selectByPrimaryKey(Long id);

    int updateByPrimaryKey(Organization record);
}
