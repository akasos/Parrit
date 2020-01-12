package io.github.akasos.parrit.controller;

import io.github.akasos.parrit.dao.PairingBoardRepository;
import io.github.akasos.parrit.exception.ResourceNotFoundException;
import io.github.akasos.parrit.model.PairingBoard;
import io.github.akasos.parrit.model.Person;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/api/pairingboards", produces = MediaType.APPLICATION_JSON_VALUE)
public class PairingBoardController {

    private final Logger log = LoggerFactory.getLogger(TeammateController.class);
    private final PairingBoardRepository pairingBoardRepository;

    public PairingBoardController(PairingBoardRepository pairingBoardRepository) {
        this.pairingBoardRepository = pairingBoardRepository;
    }

    @GetMapping
    public List<PairingBoard> getAllPairingBoards() {
        return pairingBoardRepository.findAll();

    }

    @PostMapping
    public ResponseEntity<PairingBoard> createPairingBoard(@Valid @RequestBody PairingBoard pairingBoard) {
        PairingBoard tempPairingBoard = pairingBoardRepository.save(pairingBoard);
        return ResponseEntity.ok().body(tempPairingBoard);
    }

    @PutMapping(path = "/{pairingBoardId}")
    public ResponseEntity<PairingBoard> updatePairingBoard(@PathVariable Long pairingBoardId, @Valid @RequestBody PairingBoard pairingBoardRequest) {//        if(pairingBoardRequest.getTeammates().size() > 0){
        //            Long personId = pairingBoardRequest.getTeammates().get(0).getId();
        //            Person person = personRepository.findById(personId).get();
        //            if(person.getPairingBoard() != null) {
        //                PairingBoard tempPairingBoard = pairingBoardRepository.findById(person.getPairingBoard().getId()).get();
        //                tempPairingBoard.removeTeammate(person);
        //                pairingBoardRepository.save(tempPairingBoard);
        //            }
        //        }
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
