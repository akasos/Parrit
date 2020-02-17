package io.github.akasos.parrit.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "pairing_board")
public class PairingBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    @Size(max = 35)
    @Column(unique = true)
    private String title;

    @OneToMany(mappedBy = "pairingBoard", cascade = {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH}, fetch = FetchType.EAGER)
    private List<Person> teammates = new ArrayList<>();

    public PairingBoard(String title, List<Person> teammatesList){
        this.title = title;
        this.teammates = teammatesList;
    }

    public void addTeammate(Person person) {
        this.teammates.add(person);
        person.setPairingBoard(this);
    }

    public void removeTeammate(Person person) {
        this.teammates.remove(person);
        person.setPairingBoard(null);
    }

    public void removeTeammates() {
        if (!this.teammates.isEmpty()) {
            List<Person> teammates = new ArrayList<>(this.teammates);
            for (Person teammate : teammates) {
                removeTeammate(teammate);
            }
        }
    }

}
