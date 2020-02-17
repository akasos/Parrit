package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.DTOs.NewProjectDTO;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.exceptions.ProjectNameAlreadyExistsException;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Project;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/project", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final ProjectRepository projectInfoRepository;

    public ProjectController(ProjectRepository projectInfoRepository) {
        this.projectInfoRepository = projectInfoRepository;
    }

    @GetMapping
    @RequestMapping(value="/{id}")
    public ResponseEntity<Optional<Project>> getProjectInfo(@PathVariable Long id) {
        return ResponseEntity.ok().body(projectInfoRepository.findById(id));
    }

    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody NewProjectDTO projectDTO){

        String name = projectDTO.getName();

        if(projectInfoRepository.findByName(name).isPresent()){
            throw new ProjectNameAlreadyExistsException("Not again. That name already exists, try a different one.");
        }

        //Need to hash password here

        List<PairingBoard> defaultPairingBoardList = new ArrayList<>();
        defaultPairingBoardList.add(new PairingBoard("Area 51", new ArrayList<>()));
        defaultPairingBoardList.add(new PairingBoard("The Moon Base", new ArrayList<>()));

        Project project = new Project(name, "1234", defaultPairingBoardList, new ArrayList<>());
        projectInfoRepository.save(project);

        return ResponseEntity.ok().body(projectInfoRepository.save(project));
    }

//    @PutMapping("/reset")
//    public ResponseEntity<ProjectInfo> reset(@PathVariable Long id) {
//        ProjectInfo projectInfo = projectInfoRepository.findById(id).get();
//        for (PairingBoard pairingBoard : projectInfo.getPairingBoardList()) {
//           if(pairingBoard.getTeammates().size() == 0)
//                continue;
//            for(Person person: projectInfo.getTeammateList()){
//                if(person.getPairingBoard() != null && person.getPairingBoard().getId().equals(pairingBoard.getId())){
//                    pairingBoard.removeTeammate(person);
//                }
//            }
//        }
//        projectInfoRepository.save(projectInfo);
//        return ResponseEntity.ok().body(projectInfoRepository.findById(id).get());
    //}
}
