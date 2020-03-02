package io.github.akasos.parrit.dao;

import io.github.akasos.parrit.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Optional<Project> findByName(String name);
    @Override
    Optional<Project> findById(Long aLong);
}

