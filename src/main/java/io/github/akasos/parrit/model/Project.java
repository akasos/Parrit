package io.github.akasos.parrit.model;

import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name= "project")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Column
    private String name;

    @NonNull
    @Column
    private String password;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id", nullable = false)
    private List<PairingBoard> pairingBoardList;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "project_id", nullable = false)
    private List<Person> teammateList;

    public Project(String name, String password, List<PairingBoard> pairingBoardList, List<Person> teammateList){
        this.name = name;
        this.password = password;
        this.pairingBoardList = pairingBoardList;
        this.teammateList = teammateList;
    }

    public List<PairingBoard> getPairingBoardList() {
        return pairingBoardList;
    }

    public void setPairingBoardList(List<PairingBoard> pairingBoardList) {
        this.pairingBoardList = pairingBoardList;
    }

    public List<Person> getTeammateList() {
        return teammateList;
    }

    public void setTeammateList(List<Person> teammateList) {
        this.teammateList = teammateList;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Project that = (Project) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(name, that.name) &&
                Objects.equals(password, that.password) &&
                Objects.equals(pairingBoardList, that.pairingBoardList) &&
                Objects.equals(teammateList, that.teammateList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, password, pairingBoardList, teammateList);
    }
}
