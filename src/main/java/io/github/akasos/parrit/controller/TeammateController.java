package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.DTOs.ProjectDTO;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.model.Person;
import io.github.akasos.parrit.model.Project;
import io.github.akasos.parrit.transformers.ProjectTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/api/project", produces = MediaType.APPLICATION_JSON_VALUE)
public class TeammateController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final ProjectRepository projectInfoRepository;

    public TeammateController(ProjectRepository projectInfoRepository) {
        this.projectInfoRepository = projectInfoRepository;
    }

//    @GetMapping
//    public ResponseEntity<List<Person>> getAllTeammates() {
//        return ResponseEntity.ok().body(personRepository.findAll()    );
//    }

    @PostMapping(path="/{projectId}/person")
    public ResponseEntity<ProjectDTO> createTeammate(@PathVariable Long projectId, @Valid @RequestBody Person person) {
        Project project = projectInfoRepository.findById(projectId).get();
        project.getTeammateList().add(person);
        Project updatedProject = projectInfoRepository.save(project);
        return ResponseEntity.created(URI.create("/person/" + person.getName().replaceAll("\\s+",""))).body(ProjectTransformer.transform(updatedProject));
    }

//    @PutMapping(path = "/{teammateId}")
//    public ResponseEntity<Person> upDateTeammate(@PathVariable Long teammateId, @Valid @RequestBody Person person) {
//        Optional<Person> newPerson = personRepository.findById(teammateId);
//        if (!newPerson.isPresent()) {
//            throw new ResourceNotFoundException("TeammateId " + teammateId + " not found");
//        }
//        return ResponseEntity.ok().body(personRepository.save(person));
//    }
//
//    @DeleteMapping(value = "/{teammateId}")
//    public ResponseEntity<?> deleteTeammate(@PathVariable Long teammateId) {
//        return personRepository.findById(teammateId).map(teammate -> {
//            personRepository.delete(teammate);
//            return ResponseEntity.ok().build();
//        }).orElseThrow(() -> new ResourceNotFoundException("TeammateId " + teammateId + " not found"));
//    }
}
