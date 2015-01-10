using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CollectGold.Model
{
    public class Gold
    {
        public double Amount{ get; set; }
        public int Id { get; private set; }
        public int X { get; set; }
        public int Y { get; set; }
        private const int MAX_GOLD = 500;
        private const int MIN_GOLD = 100;

        public Gold(int id) 
        {
            this.Id = id;
            Random randomNum = new Random((int)DateTime.Now.Ticks);
            this.Amount = randomNum.Next(MIN_GOLD, MAX_GOLD);
            this.X = randomNum.Next(90, 420);
            this.Y = randomNum.Next(90, 420);
        }
    }
}