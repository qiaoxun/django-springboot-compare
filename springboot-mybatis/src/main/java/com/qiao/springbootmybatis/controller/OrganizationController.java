package com.qiao.springbootmybatis.controller;

import com.qiao.springbootmybatis.entity.Organization;
import com.qiao.springbootmybatis.service.OrganizationService;
import com.qiao.springbootmybatis.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
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
        return organizationService.listOrganization((page - 1) * size, size);
    }

    @GetMapping("{id}/")
    public Organization getOrganization(@PathVariable("id") Long id) {

        return organizationService.getOrganization(id);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createOrganization(@RequestBody Organization organization) {
        organizationService.createOrganization(organization);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{id}/")
    public ResponseEntity<Object> updateOrganization(@PathVariable("id") Long id, @RequestBody Organization Organization) {
        organizationService.updateOrganization(id, Organization);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<Object> deleteOrganization(@PathVariable("id") Long id) {
        organizationService.deleteOrganization(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
