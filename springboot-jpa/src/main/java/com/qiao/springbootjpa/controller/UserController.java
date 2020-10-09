package com.qiao.springbootjpa.controller;

import com.qiao.springbootjpa.domain.Organization;
import com.qiao.springbootjpa.domain.User;
import com.qiao.springbootjpa.service.UserService;
import com.qiao.springbootjpa.service.dto.UserDto;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rbac/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public PageResult<Organization> listUser(Long organizationId) {
        return userService.listUser(organizationId);
    }

    @GetMapping("{id}/")
    public User getUser(@PathVariable("id") long id) {
        return userService.getUser(id);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createUser(@RequestBody UserDto userDto) {
        userService.createUser(userDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/")
    public ResponseEntity<Object> updateUser(@PathVariable("id") long id, @RequestBody UserDto userDto) {
        userService.updateUser(id, userDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
