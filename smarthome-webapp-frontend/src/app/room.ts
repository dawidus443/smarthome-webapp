export interface Room {
    id: number;
    roomName: string;
    roomArea: string;
    numberOfDoors: string;
    numberOfWindows: string;
    
    antiFireModule: boolean;
    antiBurglaryModule: boolean;
    weatherModule: boolean;

    roomCode: string;
}