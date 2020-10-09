package com.qiao.springbootjpa.service;

import com.qiao.springbootjpa.domain.User;
import com.qiao.springbootjpa.repository.OrganizationRepository;
import com.qiao.springbootjpa.repository.UserRepository;
import com.qiao.springbootjpa.service.dto.UserDto;
import com.qiao.springbootjpa.utils.PageResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private OrganizationRepository organizationRepository;

    public PageResult listUser(Long organizationId) {
        Long count = userRepository.countByOrganizationId(organizationId);
        List<User> userList = userRepository.findByOrganizationId(organizationId);

        List<UserDto> results = new ArrayList<>();
        userList.forEach(user -> {
            UserDto userDto = new UserDto();
            userDto.copy(user);
            if (null != user.getOrganization()) {
                userDto.setOrganizationId(user.getOrganization().getId());
                userDto.setOrganizationName(user.getOrganization().getName());
            }
        });

        return new PageResult(count, results);
    }

    public User getUser(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public void createUser(UserDto userDto) {
        User user = new User();
        user.copy(userDto);
        if (null != userDto.getOrganizationId()) {
            user.setOrganization(organizationRepository.getOne(userDto.getOrganizationId()));
        }
        userRepository.save(user);
    }

    public void updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id).orElseGet(User::new);
        if (null != userDto.getOrganizationId()) {
            user.setOrganization(organizationRepository.getOne(userDto.getOrganizationId()));
        } else {
            user.setOrganization(null);
        }
        user.copy(userDto);
        userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

}
