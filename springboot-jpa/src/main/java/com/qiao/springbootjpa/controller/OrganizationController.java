package com.qiao.springbootjpa.controller;

import com.qiao.springbootjpa.domain.Organization;
import com.qiao.springbootjpa.service.OrganizationService;
import com.qiao.springbootjpa.service.dto.OrganizationDto;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rbac/org")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @GetMapping("/")
    public PageResult<Organization> listOrganization(int page, int size) {
        return organizationService.listOrganization(PageRequest.of(page - 1, size));
    }

    @GetMapping("{id}/")
    public Organization getOrganization(@PathVariable("id") Long id) {

        return organizationService.getOrganization(id);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createOrganization(@RequestBody OrganizationDto organizationDto) {
        organizationService.createOrganization(organizationDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/")
    public ResponseEntity<Object> updateOrganization(@PathVariable("id") Long id, @RequestBody OrganizationDto organizationDto) {
        organizationService.updateOrganization(id, organizationDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<Object> deleteOrganization(@PathVariable("id") Long id) {
        organizationService.deleteOrganization(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
