package forgeMaze.door;

import forgeMaze.room.Room;

public class SimpleDoor extends Door {

	public SimpleDoor(Room room1, Room room2, boolean isOpen) {
		super(room1, room2, isOpen);
	}
	
	public SimpleDoor(Room room1, Room room2) {
		this(room1, room2, true);
	}

}
