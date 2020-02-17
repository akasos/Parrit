package io.github.akasos.parrit.dao;


import io.github.akasos.parrit.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long>{
    List<Person> findAll();
    @Override
    Optional<Person> findById(Long aLong);
}