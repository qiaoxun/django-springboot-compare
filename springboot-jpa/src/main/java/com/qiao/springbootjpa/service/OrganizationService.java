package com.qiao.springbootjpa.service;

import com.qiao.springbootjpa.domain.Organization;
import com.qiao.springbootjpa.repository.OrganizationRepository;
import com.qiao.springbootjpa.service.dto.OrganizationDto;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class OrganizationService {

    @Autowired
    private OrganizationRepository organizationRepository;

    public PageResult listOrganization(Pageable pageable) {
        Page<Organization> page = organizationRepository.findAll(pageable);

        List<OrganizationDto> results = new ArrayList<>();

        page.getContent().forEach(organization -> {
            OrganizationDto dto = new OrganizationDto();
            if ("company".equals(organization.getType())) {
                dto.setTypeMeaning("Company");
            } else {
                dto.setTypeMeaning("Department");
            }
            dto.copy(organization);
            if (null != organization.getParent())
                dto.setParent(organization.getParent().getName());
            results.add(dto);
        });

        return new PageResult(page.getTotalElements(), results);
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
