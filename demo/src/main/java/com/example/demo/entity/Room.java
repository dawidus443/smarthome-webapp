package com.example.demo.entity;

import lombok.*;

import javax.persistence.*;


@Entity
@Table(name = "tbl_rooms")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Room {

    @Id
    @SequenceGenerator(
            name = "room_sequence",
            sequenceName = "room_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "room_sequence"
    )
    @Column(
            name = "id",
            updatable = false
    )
    private Long id;

    @Column(
            name = "room_name",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String roomName;

    @Column(
            name = "room_area",
            nullable = false
    )
    private Long roomArea;

    @Column(
            name = "number_of_doors",
            nullable = false
    )
    private Long numberOfDoors;

    @Column(
            name = "number_of_windows",
            nullable = false
    )
    private Long numberOfWindows;

    @Column(
            name = "modules",
            nullable = false,
            columnDefinition = "TEXT"
    )
    private String modules;

}
