package entities;

import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode()
@Entity
@Table(name="BUILDINGS")

public class Building {
    @Id
    @SequenceGenerator(name = "buildingIdSeq",sequenceName = "BUILDING_ID_SEQ",allocationSize = 1)
    @GeneratedValue(generator = "buildingIdSeq",strategy = GenerationType.SEQUENCE)
    private long id;

    @Column(name = "ADRESS",nullable = false)
    private String address;
    @ManyToOne
    @JoinColumn(name = "OWNER_ID",nullable = false)
    private Owner owner;
}
