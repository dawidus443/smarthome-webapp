package com.example.demo.controller;

import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@Controller
public class RoomController {
    @Autowired
    private RoomRepository eRepo;

    @GetMapping({"showRooms", "/", "/list"})
    public ModelAndView showRoom(){
        ModelAndView mav = new ModelAndView("room-list");
        List<Room> list = eRepo.findAll();
        mav.addObject("rooms", list);
        return mav;
    }

    @GetMapping("/addRoomForm")
    public ModelAndView addRoomForm(){
        ModelAndView mav = new ModelAndView("add-room-form");
        Room newRoom = new Room();
        mav.addObject("room", newRoom);
        return mav;
    }

    public String saveRoom(@ModelAttribute Room room){
        eRepo.save(room);
        return "redirect:/list";
    }
}