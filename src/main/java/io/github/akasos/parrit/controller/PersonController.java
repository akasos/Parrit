package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.model.Person;
import io.github.akasos.parrit.dao.PersonRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class PersonController {

    private final Logger log = LoggerFactory.getLogger(PersonController.class);
    private PersonRepository personRepository;

    public PersonController(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @GetMapping(path = "/people", produces = "application/json")
    public List<Person> getAllPeople(){
       return  personRepository.findAll();
    };


}
