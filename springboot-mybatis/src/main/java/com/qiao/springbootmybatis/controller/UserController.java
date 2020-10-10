package com.qiao.springbootmybatis.controller;

import com.qiao.springbootmybatis.entity.Organization;
import com.qiao.springbootmybatis.entity.User;
import com.qiao.springbootmybatis.service.UserService;
import com.qiao.springbootmybatis.utils.PageResult;
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
    public PageResult<Organization> listUser(Long organization, int page, int size) {
        return userService.listUser(organization, (page - 1) * size, size);
    }

    @GetMapping("{id}/")
    public User getUser(@PathVariable("id") long id) {
        return userService.getUser(id);
    }

    @PostMapping("/")
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        userService.createUser(user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{id}/")
    public ResponseEntity<Object> updateUser(@PathVariable("id") long id, @RequestBody User user) {
        userService.updateUser(id, user);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/{id}/")
    public ResponseEntity<Object> deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
