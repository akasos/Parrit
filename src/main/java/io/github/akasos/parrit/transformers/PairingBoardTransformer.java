package io.github.akasos.parrit.transformers;

import io.github.akasos.parrit.DTOs.PairingBoardDTO;
import io.github.akasos.parrit.model.PairingBoard;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class PairingBoardTransformer {

    public static PairingBoardDTO transform(PairingBoard pairingBoard){
        PairingBoardDTO pairingBoardDTO = new PairingBoardDTO();
        pairingBoardDTO.setId(pairingBoard.getId());
        pairingBoardDTO.setName(pairingBoard.getTitle());
        pairingBoardDTO.setPersonList(PersonTransformer.transform(pairingBoard.getTeammates()));
        return pairingBoardDTO;
    }

    public static List<PairingBoardDTO> transform(List<PairingBoard> pairingBoards){
        if(pairingBoards == null || pairingBoards.isEmpty()) return Collections.emptyList();
        return pairingBoards.stream()
                .map(PairingBoardTransformer::transform)
                .collect(Collectors.toList());
    }
}
