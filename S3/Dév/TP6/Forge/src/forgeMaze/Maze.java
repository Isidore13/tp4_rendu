package forgeMaze;

import forgeMaze.room.Room;

import java.util.ArrayList;
import java.util.List;

public class Maze {

	List<Room> rooms;

	public Maze() {
		this.rooms = new ArrayList<Room>();
	}

	public void addRoom(Room room) {
		this.rooms.add(room);
	}

	public Room getRoom(int number) {
		for (Room room : rooms) {
			if (room.getNumber() == number) {
				return room;
			}
		}
		return null;
	}

	public String toString() {
		String str = "Maze with " + rooms.size() + " room"
				+ (rooms.size() > 1 ? "s" : "") + ":\n";
		for (Room room : rooms) {
			str += "- " + room + "\n";
		}
		return str;
	}

}
