package forgeMaze.room;

public enum Direction {
	NORTH, SOUTH, EAST, WEST;
	public Direction opposite() {
		if (this == NORTH) {
			return SOUTH;
		} else if (this == EAST) {
			return WEST;
		} else if (this == SOUTH) {
			return NORTH;
		} else {
			return EAST;
		}
	}
}
