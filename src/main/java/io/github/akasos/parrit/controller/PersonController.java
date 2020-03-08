package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.DTOs.ProjectDTO;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.exceptions.PersonNotFoundException;
import io.github.akasos.parrit.model.PairingBoard;
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
import java.util.List;
import java.util.stream.Stream;

@RestController
@RequestMapping(value = "/api/project", produces = MediaType.APPLICATION_JSON_VALUE)
public class PersonController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());
    private final ProjectRepository projectRepository;

    public PersonController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PostMapping(path="/{projectId}/person")
    public ResponseEntity<ProjectDTO> createPerson(@PathVariable Long projectId, @Valid @RequestBody Person person) {
        Project project = projectRepository.findById(projectId).get();
        project.getTeammateList().add(person);
        Project updatedProject = projectRepository.save(project);
        return ResponseEntity.created(URI.create("/person/" + person.getName().replaceAll("\\s+",""))).body(ProjectTransformer.transform(updatedProject));
    }


//    @PutMapping(path = "/{projectId}/person/{personId}/person")
//    public ResponseEntity<ProjectDTO> moveTeammate(@PathVariable Long projectId, @PathVariable Long personId, @Valid @RequestBody PersonDTO personDTO) {
//        Project project = projectRepository.findById(projectId).get();
//        List<PairingBoard> pairingBoardList = project.getPairingBoardList();
//        List<Person> personList = project.getTeammateList();
//
//
//    }
//
    @DeleteMapping(path="/{projectId}/person/{personId}")
    public ResponseEntity<ProjectDTO> deletePerson(@PathVariable Long projectId, @PathVariable Long personId) {
        Project project = projectRepository.findById(projectId).get();
        Stream<List<Person>> floatingPeople = Stream.of(project.getTeammateList());
        Stream<List<Person>> pairingBoardPeople = project.getPairingBoardList().stream().map(PairingBoard::getTeammates);
        List<Person> listWithPerson = Stream.concat(floatingPeople, pairingBoardPeople)
                .filter(ppl -> ppl.stream().anyMatch(person -> person.getId() == personId)).findFirst()
                .orElseThrow(() -> new PersonNotFoundException("That person does not exist"));
        listWithPerson.removeIf(person -> person.getId() == personId);
        Project updatedProject = projectRepository.save(project);
        return ResponseEntity.ok().body(ProjectTransformer.transform(updatedProject));
    }
}
