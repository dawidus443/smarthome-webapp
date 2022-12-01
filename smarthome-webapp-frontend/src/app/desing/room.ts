export interface Room {
    id: number;
    roomName: string;
    roomArea: number;
    numberOfDoors: number;
    numberOfWindows: number;
    
    antiFireModule: boolean;
    antiBurglaryModule: boolean;
    weatherModule: boolean;

    roomCode: string;
}