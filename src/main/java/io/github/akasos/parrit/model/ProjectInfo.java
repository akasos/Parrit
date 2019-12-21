package io.github.akasos.parrit.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ProjectInfo {
    private List<PairingBoard> pairingBoardList;
    private List<Person> teammateList;

}
