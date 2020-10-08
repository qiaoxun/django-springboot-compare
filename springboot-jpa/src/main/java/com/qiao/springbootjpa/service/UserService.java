package com.qiao.springbootjpa.service;

import com.qiao.springbootjpa.domain.User;
import com.qiao.springbootjpa.repository.UserRepository;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public PageResult listUser(Long organizationId) {
        Long count = userRepository.countByOrganizationId(organizationId);
        List<User> results = userRepository.findByOrganizationId(organizationId);
        return new PageResult(count, results);
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public void updateUser(Long id, User resource) {
        User user = userRepository.findById(id).orElseGet(User::new);
        user.copy(resource);
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
