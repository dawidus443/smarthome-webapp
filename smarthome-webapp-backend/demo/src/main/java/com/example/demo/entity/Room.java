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
@ToString
public class Room {

    @Id
    @GeneratedValue(
            strategy = GenerationType.AUTO,
            generator = "room_sequence"
    )
    @Column(
            name = "id",
            nullable = false,
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
            name = "anti_fire_module"
    )
    private boolean antiFireModule;

    @Column(
            name = "anti_burglary_module"
    )
    private boolean antiBurglaryModule;

    @Column(
            name = "weather_module"
    )
    private boolean weatherModule;

    @Column(
            name = "codes",
            nullable = false,
            updatable = false
    )
    private String roomCode;

}
