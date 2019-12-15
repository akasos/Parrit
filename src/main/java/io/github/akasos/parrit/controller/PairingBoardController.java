package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.exception.ResourceNotFoundException;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/pairingboards")
public class PairingBoardController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private PairingBoardRepository pairingBoardRepository;

    public PairingBoardController(PairingBoardRepository pairingBoardRepository){
        this.pairingBoardRepository = pairingBoardRepository;
    }

    @GetMapping(produces = "application/json")
    public List<PairingBoard> getAllPairingBoards(){
        return pairingBoardRepository.findAll();
    }


    @PostMapping(produces = "application/json")
    public ResponseEntity<PairingBoard> createPairingBoard(@Valid @RequestBody PairingBoard pairingBoard) {
        PairingBoard tempPairingBoard = pairingBoardRepository.save(pairingBoard);
        return ResponseEntity.ok().body(tempPairingBoard);
    }

    @PutMapping(path ="/{pairingBoardId}", produces = "application/json")
    public ResponseEntity<PairingBoard> updatePairingBoard(@PathVariable Long pairingBoardId, @Valid @RequestBody PairingBoard pairingBoardRequest) {
        return pairingBoardRepository.findById(pairingBoardId).map(pairingBoard -> {
            pairingBoard.setTitle(pairingBoardRequest.getTitle());
            for (Person teammate : pairingBoardRequest.getTeammates()) {
                pairingBoard.addTeammate(teammate);
            }
            PairingBoard tempPairingBoard = pairingBoardRepository.save(pairingBoard);
            return ResponseEntity.ok().body(tempPairingBoard);
        }).orElseThrow(() -> new ResourceNotFoundException("PairingBoardId " + pairingBoardId + " not found"));
    }

    @DeleteMapping("/{pairingBoardId}")
    public ResponseEntity<?> deletePairingBoard(@PathVariable Long pairingBoardId) {
        return pairingBoardRepository.findById(pairingBoardId).map(pairingBoard -> {
            pairingBoardRepository.delete(pairingBoard);
            return ResponseEntity.ok().build();
        }).orElseThrow(() -> new ResourceNotFoundException("PairingBoardId " + pairingBoardId + " not found"));
    }


}
