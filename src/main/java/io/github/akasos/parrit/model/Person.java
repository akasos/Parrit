package io.github.akasos.parrit.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @ManyToOne(fetch = FetchType.LAZY, cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH} )
    @JoinColumn(name = "pairing_board_id")
    @JsonBackReference
    private PairingBoard pairingBoard;

    @Column(name = "pairing_board_id", insertable = false, updatable = false)
    private Long pairing_board_fk;


    public Person(Long id,String name){
        this.id = id;
        this.name = name;
    }

}
