package com.example.demo.service;

import com.example.demo.entity.Room;
import com.example.demo.exception.RoomNotFoundException;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {
    private final RoomRepository roomRepository;

    @Autowired
    public RoomService( RoomRepository roomRepository){
        this.roomRepository=roomRepository;
    }

    public Room addRoom(Room room){
        room.setRoomCode(UUID.randomUUID().toString());
        return roomRepository.save(room);
    }

    public List<Room> findAllRooms(){
        return roomRepository.findAll();
    }

    public Room updateRoom(Room room){
        return roomRepository.save(room);
    }

    public Room findRoomById(Long id){
        return roomRepository.findRoomById(id)
                .orElseThrow(()-> new RoomNotFoundException("Room by id " + id + " was not found"));
    }

    public void deleteRoom(Long id){
        roomRepository.deleteRoomById(id);
    }
}
