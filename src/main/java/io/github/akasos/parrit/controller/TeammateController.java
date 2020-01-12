package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.exception.ResourceNotFoundException;
import io.github.akasos.parrit.model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/teammates", produces = MediaType.APPLICATION_JSON_VALUE)
public class TeammateController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private final PersonRepository personRepository;

    public TeammateController(PersonRepository personRepository) {
        this.personRepository = personRepository;
    }

    @GetMapping
    public List<Person> getAllTeammates() {
        return personRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Person> createTeammate(@Valid @RequestBody Person person) {
        Person temp = personRepository.save(person);
        return ResponseEntity.ok().body(temp);
    }

    @DeleteMapping(value = "/{teammateId}")
    public ResponseEntity<?> deleteTeammate(@PathVariable Long teammateId) {
        return personRepository.findById(teammateId).map(teammate -> {
            personRepository.delete(teammate);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("TeammateId " + teammateId + " not found"));
    }
}
