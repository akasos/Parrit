package io.github.akasos.parrit.DTOs;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class PairingBoardDTO {

    private long id;

    @NotNull(message = "Hey! This name needs to be between 1 and 32 characters.")
    @Size(max = 32, message = "Hey! This name needs to be between 1 and 32 characters.")
    private String name;

    @Valid
    private List<PersonDTO> teammatesList;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<PersonDTO> getPersonList() {
        return teammatesList;
    }

    public void setPersonList(List<PersonDTO> teammatesList) {
        this.teammatesList = teammatesList;
    }
}
