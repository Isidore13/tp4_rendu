package forgeMaze;

import forgeMaze.door.MagicDoor;
import forgeMaze.door.SimpleDoor;
import forgeMaze.room.Direction;
import forgeMaze.room.EnchantedRoom;
import forgeMaze.room.SimpleRoom;
import forgeMaze.wall.SimpleWall;

public class SimpleMazeGame {


    public void initMaze(){
        Maze lab = new Maze();
        SimpleRoom zone1 = new SimpleRoom(1);
        SimpleRoom zone2 = new SimpleRoom(2);
        SimpleDoor d1 = new SimpleDoor(zone1,zone2);

        zone1.setSide(Direction.NORTH, new SimpleWall());
        zone1.setSide(Direction.SOUTH, new SimpleWall());
        zone1.setSide(Direction.WEST, new SimpleWall());
        zone1.setSide(Direction.EAST, d1);

        zone2.setSide(Direction.NORTH, new SimpleWall());
        zone2.setSide(Direction.SOUTH, new SimpleWall());
        zone2.setSide(Direction.EAST, new SimpleWall());
        zone2.setSide(Direction.WEST, d1);

        lab.addRoom(zone1);
        lab.addRoom(zone2);
    }

    public void initEnchantedMaze(){
        Maze enchantedLab = new Maze();
        EnchantedRoom zone1 = new EnchantedRoom(1);
        EnchantedRoom zone2 = new EnchantedRoom(2);
        MagicDoor md1 = new MagicDoor(zone1,zone2);

        zone1.setSide(Direction.NORTH, new SimpleWall());
        zone1.setSide(Direction.SOUTH, new SimpleWall());
        zone1.setSide(Direction.EAST, md1);
        zone1.setSide(Direction.WEST, new SimpleWall());

        zone2.setSide(Direction.NORTH, new SimpleWall());
        zone2.setSide(Direction.SOUTH, new SimpleWall());
        zone2.setSide(Direction.EAST, new SimpleWall());
        zone2.setSide(Direction.WEST, md1);

        enchantedLab.addRoom(zone1);
        enchantedLab.addRoom(zone2);
    }
}
