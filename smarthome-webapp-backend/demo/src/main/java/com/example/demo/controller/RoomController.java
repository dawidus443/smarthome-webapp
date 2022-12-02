package com.example.demo.controller;

import com.example.demo.entity.Room;
import com.example.demo.service.RoomService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<Room>> getAllRooms(){
        List<Room> rooms = roomService.findAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Room> getRoomById(@PathVariable("id") Long id){
        Room room = roomService.findRoomById(id);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Room> addRoom(@RequestBody Room room){
        Room newRoom = roomService.addRoom(room);
        return new ResponseEntity<>(newRoom, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Room> updateRoom(@RequestBody Room room){
        Room updateRoom = roomService.addRoom(room);
        return new ResponseEntity<>(updateRoom, HttpStatus.OK);
    }

    @Transactional
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable("id") Long id){
        roomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/module/anti-burglary/PIR")
    public Long numberOfPIRModules(){

        return roomService.totalNumberOfPIRSensors();
    }

    @GetMapping("/module/anti-burglary/HC")
    public Long numberOfHCModules(){

        return roomService.totalNumberOfHCSensors();
    }
    @GetMapping("/module/anti-fire")
    public Long numberOfAntiFireModules(){

        return roomService.totalNumberOfAntiFireModules();
    }

    @GetMapping("/module/weather")
    public Long numberOfWeatherModules(){

        return roomService.totalNumberOfWeatherModules();
    }


}