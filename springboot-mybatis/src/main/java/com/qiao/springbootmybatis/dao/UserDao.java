package com.qiao.springbootmybatis.dao;

import com.qiao.springbootmybatis.entity.User;

import java.util.List;
import java.util.Map;

public interface UserDao {
    int deleteByPrimaryKey(Long id);

    int insert(User record);

    List<User> selectList(Map<String, Object> map);

    Long count(Long id);

    User selectByPrimaryKey(Long id);

    int updateByPrimaryKey(User record);
}
