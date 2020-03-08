package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.DTOs.ProjectDTO;
import io.github.akasos.parrit.dao.ProjectRepository;
import io.github.akasos.parrit.exception.ResourceNotFoundException;
import io.github.akasos.parrit.model.PairingBoard;
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
public class PairingBoardController {

    private final Logger log = LoggerFactory.getLogger(PersonController.class);

    private final ProjectRepository projectRepository;

    public PairingBoardController(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @PostMapping(path = "/{pairingBoardId}/pairingboard")
    public ResponseEntity<ProjectDTO> createPairingBoard(@PathVariable Long pairingBoardId, @Valid @RequestBody PairingBoard pairingBoard) {
        Project project = projectRepository.findById(pairingBoardId).get();
        project.getPairingBoardList().add(pairingBoard);
        Project updatedProject = projectRepository.save(project);
        return ResponseEntity.created(URI.create("/pairingboard/" + pairingBoard.getTitle().replaceAll("\\s+",""))).body(ProjectTransformer.transform(updatedProject));
    }

//    @PutMapping(path = "/{pairingBoardId}/person/{personId}/person")
//    public ResponseEntity<PairingBoard> updatePairingBoard(@PathVariable Long pairingBoardId, @PathVariable Long personId) {//        if(pairingBoardRequest.getTeammates().size() > 0){
//
//        return pairingBoardRepository.findById(pairingBoardId).map(pairingBoard -> {
//            pairingBoard.setTitle(pairingBoardRequest.getTitle());
//            for (Person teammate : pairingBoardRequest.getTeammates()) {
//                pairingBoard.addTeammate(teammate);
//            }
//            PairingBoard tempPairingBoard = pairingBoardRepository.save(pairingBoard);
//            return ResponseEntity.ok().body(tempPairingBoard);
//        }).orElseThrow(() -> new ResourceNotFoundException("PairingBoardId " + pairingBoardId + " not found"));
//    }

    @DeleteMapping("/{projectId}/pairingBoard/{pairingBoardId}")
    public ResponseEntity<?> deletePairingBoard(@PathVariable Long projectId, @PathVariable Long pairingBoardId) {

    }
}
