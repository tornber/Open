package entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import java.io.Serializable;
import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public abstract class BaseEntity<IO extends Serializable> {
    @CreatedDate
    @Column(name = "CREATED_DATE",updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    protected Date createdDate;

    @LastModifiedDate
    @Column(name = "UPDATED_AT")
    @Temporal(TemporalType.TIMESTAMP)
    protected Date lastModifiedDate;

    @Column(name = "RECORD_STATE")
    protected RecordState recordState;
}
