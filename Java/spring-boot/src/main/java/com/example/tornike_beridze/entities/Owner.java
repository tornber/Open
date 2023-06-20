package entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.Set;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@Table(name = "OWNERS")
@Entity
public class Owner {
    @Id
    @SequenceGenerator(name = "ownerSeq",sequenceName = "OWNER_SEQ",allocationSize = 1)
    @GeneratedValue(generator = "ownerSeq",strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "NAME",nullable = false)
    private String name;
    @OneToMany(mappedBy = "owner")
    private Set<Building> buildings;
}
