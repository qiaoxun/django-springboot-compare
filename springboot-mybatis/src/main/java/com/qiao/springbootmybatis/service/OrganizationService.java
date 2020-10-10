package com.qiao.springbootmybatis.service;

import com.qiao.springbootmybatis.dao.OrganizationDao;
import com.qiao.springbootmybatis.entity.Organization;
import com.qiao.springbootmybatis.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class OrganizationService {

    @Autowired
    private OrganizationDao organizationDao;

    public PageResult listOrganization(int begin, int size) {
        Map<String, Object> map = new HashMap<>();
        map.put("begin", begin);
        map.put("size", size);
        List<Organization> page = organizationDao.selectList(map);
        Long count = organizationDao.count();

        return new PageResult(count, page);
    }

    public Organization getOrganization(Long id) {
        return organizationDao.selectByPrimaryKey(id);
    }

    public void createOrganization(Organization organization) {
        organizationDao.insert(organization);
    }

    public void updateOrganization(Long id, Organization organization) {
        organizationDao.updateByPrimaryKey(organization);
    }

    public void deleteOrganization(Long id) {
        organizationDao.deleteByPrimaryKey(id);
    }

}
