package com.qiao.springbootjpa.repository;

import com.qiao.springbootjpa.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface UserRepository  extends JpaRepository<User, Long>, JpaSpecificationExecutor<User> {
    Long countByOrganizationId(Long organizationId);
    List<User> findByOrganizationId(Long organizationId);
}
