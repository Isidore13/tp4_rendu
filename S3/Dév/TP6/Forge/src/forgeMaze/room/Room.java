package forgeMaze.room;

import forgeMaze.MazeComponent;

import java.util.HashMap;
import java.util.Map;


public abstract class Room implements MazeComponent {

	private Map<Direction, MazeComponent> sides;

	private int number;

	public Room(int number) {
		this.sides = new HashMap<Direction, MazeComponent>();
		this.number = number;
	}
	
	public void enter() {
		System.out.println("I enter in the " + this.toString());
	}

	public int getNumber() {
		return this.number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public MazeComponent getSide(Direction direction) {
		return this.sides.get(direction);
	}

	public void setSide(Direction direction, MazeComponent mapSite) {
		this.sides.put(direction, mapSite);
	}

	public String toString() {
		String result = "room " + getNumber();
		for (Direction d : this.sides.keySet()) {
			if (this.sides.get(d) != null) {
//				result += " " + d + ":" + this.sides.get(d).toString();
				if (this.sides.get(d) instanceof Room) {
					result += "room " + ((Room)this.sides.get(d)).getNumber();
				} else {
					result += this.sides.get(d);
				}
			}
		}
		return result;
	}
}
