package io.github.akasos.parrit.DTOs;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;
import java.util.Objects;

public class ProjectDTO {

    private long id;

    @NotNull
    @Size(min = 1, max = 32)
    private String name;

    @Valid
    private List<PairingBoardDTO> pairingBoards;

    @Valid
    private List<PersonDTO> people;

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

    public List<PairingBoardDTO> getPairingBoards() {
        return pairingBoards;
    }

    public void setPairingBoards(List<PairingBoardDTO> pairingBoards) {
        this.pairingBoards = pairingBoards;
    }

    public List<PersonDTO> getPeople() {
        return people;
    }

    public void setPeople(List<PersonDTO> people) {
        this.people = people;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProjectDTO that = (ProjectDTO) o;
        return id == that.id &&
                Objects.equals(name, that.name) &&
                Objects.equals(pairingBoards, that.pairingBoards) &&
                Objects.equals(people, that.people);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, pairingBoards, people);
    }
}
