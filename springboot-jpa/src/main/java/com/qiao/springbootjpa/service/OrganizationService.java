package com.qiao.springbootjpa.service;

import com.qiao.springbootjpa.domain.Organization;
import com.qiao.springbootjpa.repository.OrganizationRepository;
import com.qiao.springbootjpa.service.dto.OrganizationDto;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public PageResult listOrganization() {
        Long count = organizationRepository.count();
        List<Organization> orgList = organizationRepository.findAll();

        List<OrganizationDto> results = new ArrayList<>();

        orgList.forEach(organization -> {
            OrganizationDto dto = new OrganizationDto();
            dto.copy(organization);
            if (null != organization.getParent())
                dto.setParent(organization.getParent().getName());
            results.add(dto);
        });

        return new PageResult(count, results);
    }

    public Organization getOrganization(Long id) {
        return organizationRepository.findById(id).orElse(null);
    }

    public void createOrganization(OrganizationDto organizationDto) {
        Organization org = new Organization();
        org.copy(organizationDto);
        if (null != organizationDto.getPid()) {
            org.setParent(organizationRepository.getOne(organizationDto.getPid()));
        }
        organizationRepository.save(org);
    }

    public void updateOrganization(Long id, OrganizationDto organizationDto) {

        Organization organization = organizationRepository.findById(id).orElseGet(Organization::new);
        organization.copy(organizationDto);
        if (null != organizationDto.getPid()) {
            organization.setParent(organizationRepository.getOne(organizationDto.getPid()));
        } else {
            organization.setParent(null);
        }
        organizationRepository.save(organization);
    }

    public void deleteOrganization(Long id) {
        organizationRepository.deleteById(id);
    }

}
