package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class TeammateController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private PersonRepository personRepository;

    public TeammateController(PersonRepository personRepository){
        this.personRepository = personRepository;
    }

    @GetMapping(path = "/teammates", produces = "application/json")
    public List<Person> getAllTeammates(){
       return  personRepository.findAll();
    };

    @PostMapping(path = "/add", produces = "application/json")
    public ResponseEntity<Person> addTeammate(@Valid @RequestBody Person person) throws URISyntaxException {
        Person temp = personRepository.save(person);
        return ResponseEntity.created(new URI("/api/add/" + temp.getId())).body(temp);
    }


}
