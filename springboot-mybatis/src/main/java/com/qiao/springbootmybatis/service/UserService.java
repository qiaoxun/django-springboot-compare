package com.qiao.springbootmybatis.service;

import com.qiao.springbootmybatis.dao.UserDao;
import com.qiao.springbootmybatis.entity.User;
import com.qiao.springbootmybatis.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserDao userDao;

    public PageResult listUser(Long organizationId, int begin, int size) {
        Map<String, Object> map = new HashMap<>();
        map.put("begin", begin);
        map.put("size", size);
        map.put("organizationId", organizationId);
        List<User> userList = userDao.selectList(map);
        Long count = userDao.count(organizationId);
        return new PageResult(count, userList);
    }

    public User getUser(Long id) {
        return userDao.selectByPrimaryKey(id);
    }

    public void createUser(User user) {
        userDao.insert(user);
    }

    public void updateUser(Long id, User user) {
        userDao.updateByPrimaryKey(user);
    }

    public void deleteUser(Long id) {
        userDao.deleteByPrimaryKey(id);
    }

}
