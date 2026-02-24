package forgeMaze.wall;

import forgeMaze.MazeComponent;

public abstract class Wall implements MazeComponent {

	public void enter() {
		System.out.println("Ouch!");
	}
	
	public String toString() {
		return "wall";
	}

}
