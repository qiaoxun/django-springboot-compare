package com.qiao.springbootjpa.service;

import com.qiao.springbootjpa.domain.Organization;
import com.qiao.springbootjpa.repository.OrganizationRepository;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public PageResult listOrganization() {
        Long count = organizationRepository.count();
        List<Organization> results = organizationRepository.findAll();
        return new PageResult(count, results);
    }

    public Organization getOrganization(Long id) {
        return organizationRepository.findById(id).orElse(null);
    }

    public void createOrganization(Organization Organization) {
        organizationRepository.save(Organization);
    }

    public void updateOrganization(Long id, Organization resource) {
        Organization Organization = organizationRepository.findById(id).orElseGet(Organization::new);
        Organization.copy(resource);
        organizationRepository.save(Organization);
    }

    public void deleteOrganization(Long id) {
        organizationRepository.deleteById(id);
    }

}
