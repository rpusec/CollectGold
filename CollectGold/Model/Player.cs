using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollectGold.Model
{
    public class Player
    {
        public int X { get; set; }
        public int Y { get; set; }
        public string Name { get; set; }
        public string ConnectionId { get; private set; }
        public double AmountOfGold { get; set; }

        public Player(string name, int x, int y) 
        {
            this.X = x;
            this.Y = y;
            this.Name = name;
        }

        public Player(string name, int x, int y, string connectionId)
        {
            this.X = x;
            this.Y = y;
            this.Name = name;
            this.ConnectionId = connectionId;
            this.AmountOfGold = 0;
        }

        public Player(string name, string connectionId)
        {
            this.Name = name;
            this.ConnectionId = connectionId;
        }

        public override string ToString()
        {
            return "Name: " + this.Name + ", X: " + this.X + ", Y: " + this.Y + ", Gold: " + this.AmountOfGold;
        }
    }
}