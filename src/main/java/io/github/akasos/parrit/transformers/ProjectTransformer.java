package io.github.akasos.parrit.transformers;

import io.github.akasos.parrit.DTOs.ProjectDTO;
import io.github.akasos.parrit.model.Project;

public class ProjectTransformer {

    public static ProjectDTO transform(Project project) {
        ProjectDTO projectDTO = new ProjectDTO();
        projectDTO.setId(project.getId());
        projectDTO.setName(project.getName());
        projectDTO.setPeople(PersonTransformer.transform(project.getTeammateList()));
        projectDTO.setPairingBoards(PairingBoardTransformer.transform(project.getPairingBoardList()));
        return projectDTO;
    }
}
