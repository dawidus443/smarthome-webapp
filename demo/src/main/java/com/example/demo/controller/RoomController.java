package com.example.demo.controller;

import com.example.demo.entity.Room;
import com.example.demo.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;
import java.util.stream.Collectors;

@Controller
public class RoomController {
    @Autowired
    private RoomRepository eRepo;

    @GetMapping({"showRooms", "/", "/list"})
    public ModelAndView showRoom(){
        long totalArea;
        long totalNumberOfDoors;
        long totalNumberOfWindows;
        long antiFireModule = 0;
        long antiBurglaryModuleHC = 0;
        long antiBurglaryModulePIR = 0;
        long weatherModule = 0;

        ModelAndView mav = new ModelAndView("room-list");
        List<Room> list = eRepo.findAll();
        totalArea = list.stream().mapToLong(room -> (Long) room.getRoomArea()).sum();
        totalNumberOfDoors = list.stream().mapToLong(room -> (Long) room.getNumberOfDoors()).sum();
        totalNumberOfWindows = list.stream().mapToLong(room -> (Long) room.getNumberOfWindows()).sum();

        // a = list.stream().filter(room -> room.getModules().contains("Anti-fire")).count();

        // Anti-fire modules counter
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).getModules().contains("Anti-fire")){
                int roomAreaAssistant = Math.toIntExact(list.get(i).getRoomArea());
                antiFireModule++;
                while(roomAreaAssistant > 36){
                    antiFireModule++;
                    roomAreaAssistant -= 36;
                }
            }
        }

        // Anti-burglaryHC modules counter
        for (int i = 0; i < list.size(); i++) {
            antiBurglaryModuleHC = list.stream().mapToLong(room -> (Long) room.getNumberOfWindows()).sum() +
                    list.stream().mapToLong(room -> (Long) room.getNumberOfWindows()).sum();
        }
        // Anti-burglaryPIR modules counter
        for (int i = 0; i < list.size(); i++) {
            if(list.get(i).getModules().contains("Anti-burglary")){
                int roomAreaAssistant = Math.toIntExact(list.get(i).getRoomArea());
                antiBurglaryModulePIR++;
                while(roomAreaAssistant > 36){
                    antiBurglaryModulePIR++;
                    roomAreaAssistant -= 36;
                }
            }
        }

        // Weather modules counter
        for (int i = 0; i < list.size(); i++) {
            weatherModule = list.stream().filter(room -> room.getModules().contains("Weather")).count();
        }

        mav.addObject("rooms", list);
        mav.addObject("totalArea", totalArea);
        mav.addObject("totalNumberOfDoors", totalNumberOfDoors);
        mav.addObject("totalNumberOfWindows", totalNumberOfWindows);
        mav.addObject("antiFireModule", antiFireModule);
        mav.addObject("antiBurglaryModuleHC", antiBurglaryModuleHC);
        mav.addObject("antiBurglaryModulePIR", antiBurglaryModulePIR);
        mav.addObject("weatherModule", weatherModule);

        return mav;
    }

    @GetMapping("/addRoomForm")
    public ModelAndView addRoomForm(){
        ModelAndView mav = new ModelAndView("add-room-form");
        Room newRoom = new Room();
        mav.addObject("room", newRoom);
        return mav;
    }
    @PostMapping("saveRoom")
    public String saveRoom(@ModelAttribute Room room){
        eRepo.save(room);
        return "redirect:/list";
    }

    @GetMapping("/showUpdateForm")
    public ModelAndView showUpdateForm(@RequestParam Long roomId){
        ModelAndView mav = new ModelAndView("add-room-form");
        Room room = eRepo.findById(roomId).get();
        mav.addObject("room", room);
        return mav;
    }

    @GetMapping("/deleteRoom")
    public String deleteRoom(@RequestParam Long roomId){
        eRepo.deleteById(roomId);
        return "redirect:/list";
    }
}