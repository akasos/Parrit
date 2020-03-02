package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.DTOs.ProjectDTO;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.model.Project;
import io.github.akasos.parrit.transformers.ProjectTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/project", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProjectController {

    private final Logger log = LoggerFactory.getLogger(this.getClass());

    private final ProjectRepository projectRepository;

    public ProjectController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @GetMapping
    @RequestMapping(value="/{name}")
    public ResponseEntity<ProjectDTO> getProject(@PathVariable String name) {
        Project project = projectRepository.findByName(name).get();
        return ResponseEntity.ok().body(ProjectTransformer.transform(project));
    }

//    @PostMapping
//    public ResponseEntity<Project> createProject(@Valid @RequestBody NewProjectDTO projectDTO){
//
//        String name = projectDTO.getName();
//
//        if(projectRepository.findByName(name).isPresent()){
//            throw new ProjectNameAlreadyExistsException("Not again. That name already exists, try a different one.");
//        }
//
//        //Need to hash password here
//
//        List<PairingBoard> defaultPairingBoardList = new ArrayList<>();
//        defaultPairingBoardList.add(new PairingBoard("Area 51", new ArrayList<>()));
//        defaultPairingBoardList.add(new PairingBoard("The Moon Base", new ArrayList<>()));
//
//        Project project = new Project(name, "1234", defaultPairingBoardList, new ArrayList<>());
//        projectRepository.save(project);
//
//        return ResponseEntity.ok().body(projectRepository.save(project));
//    }

//    @PutMapping("/reset")
//    public ResponseEntity<ProjectInfo> reset(@PathVariable Long id) {
//        ProjectInfo projectInfo = projectRepository.findById(id).get();
//        for (PairingBoard pairingBoard : projectInfo.getPairingBoardList()) {
//           if(pairingBoard.getTeammates().size() == 0)
//                continue;
//            for(Person person: projectInfo.getTeammateList()){
//                if(person.getPairingBoard() != null && person.getPairingBoard().getId().equals(pairingBoard.getId())){
//                    pairingBoard.removeTeammate(person);
//                }
//            }
//        }
//        projectRepository.save(projectInfo);
//        return ResponseEntity.ok().body(projectRepository.findById(id).get());
    //}
}
