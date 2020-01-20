package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
import io.github.akasos.parrit.model.ProjectInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/api/projectinfo", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectInfoController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private final PersonRepository personRepository;
    private final PairingBoardRepository pairingBoardRepository;


    public ProjectInfoController(PersonRepository personRepository, PairingBoardRepository pairingBoardRepository) {
        this.personRepository = personRepository;
        this.pairingBoardRepository = pairingBoardRepository;
    }

    @GetMapping
    public ResponseEntity<ProjectInfo> getProjectInfo() {
        return ResponseEntity.ok().body(new ProjectInfo(this.pairingBoardRepository.findAll(), this.personRepository.findAll()));
    }

    @PutMapping("/reset")
    public ResponseEntity<ProjectInfo> reset() {
        List<PairingBoard> pairingBoardsList = this.pairingBoardRepository.findAll();
        List<Person> personList = this.personRepository.findAll();
        for (PairingBoard pairingBoard : pairingBoardsList) {
            if(pairingBoard.getTeammates().size() == 0)
                continue;
            for(Person person: personList){
                if(person.getPairingBoard() != null && person.getPairingBoard().getId().equals(pairingBoard.getId())){
                    pairingBoard.removeTeammate(person);
                }
            }
        }
        this.pairingBoardRepository.saveAll(pairingBoardsList);
        return ResponseEntity.ok().body(new ProjectInfo(this.pairingBoardRepository.findAll(), this.personRepository.findAll()));
    }
}
