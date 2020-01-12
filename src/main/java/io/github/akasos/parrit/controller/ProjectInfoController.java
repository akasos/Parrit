package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.dao.PersonRepository;
import io.github.akasos.parrit.model.ProjectInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/projectinfo", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectInfoController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private final PersonRepository personRepository;
    private final PairingBoardRepository pairingBoardRepository;


    public ProjectInfoController(PersonRepository personRepository, PairingBoardRepository pairingBoardRepository){
        this.personRepository = personRepository;
        this.pairingBoardRepository = pairingBoardRepository;
    }
        
    @GetMapping
    public ProjectInfo getProjectInfo(){
        return new ProjectInfo(this.pairingBoardRepository.findAll(),this.personRepository.findAll());
    }
}
