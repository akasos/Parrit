package io.github.akasos.parrit.dao;


import io.github.akasos.parrit.model.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long>{
    Person findById(String name);
    List<Person> findAll();

}