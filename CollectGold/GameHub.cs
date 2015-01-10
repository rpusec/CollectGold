using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using CollectGold.Model;
using System.Timers;
using System.Threading.Tasks;
using System.Collections;

namespace CollectGold
{
    /// <summary>
    /// This hub is responsible for the gameplay of the application.
    /// </summary>
    public class GameHub : Hub
    {
        //attributes
        private static List<Player> players = new List<Player>();
        private static List<Gold> goldList = new List<Gold>();
        private static System.Timers.Timer timer = new System.Timers.Timer();
        private static Boolean IsGameStarted = false;
        private static Boolean IsGameOver = false;
        private static int CountDown = 20;

        //constants
        private const int PLAYER_WIDTH = 50;
        private const int PLAYER_HEIGHT = 60;
        private const int COLLISION_BREAK = 30;
        private const int GAME_ENDING_SECONDS = 60;
        private const int TIMER_SPEED = 1000;

        /// <summary>
        /// Tests whether the game is over. If it is, notifies the user 
        /// about it, otherwise returns all player names to the caller.
        /// </summary>
        public void ConfirmGameOver() 
        {
            if (!IsGameOver)
            {
                List<String> playerNames = new List<String>();

                foreach (Player p in players)
                    playerNames.Add(p.Name);

                Clients.Caller.getNames(playerNames);
            }
            else 
            {
                //notifies the caller that the game is over
                Clients.Caller.notifyGameOver();
            }
        }

        /// <summary>
        /// Adds the new player to the stage
        /// </summary>
        /// <param name="name">Name of the new player. </param>
        /// <param name="x">New Player's X coordiante. </param>
        /// <param name="y">New Player's Y coordinate. </param>
        public void AddPlayer(string name, int x, int y)
        {
            if (!IsGameOver)
            {
                players.Add(new Player(name, x, y, Context.ConnectionId));
                Clients.Caller.drawWorld(); //draws the whole world
                Clients.Caller.sendOtherPlayers(players); //sending the caller all of the other players (including the caller him/herself)
                Clients.Caller.addAllGold(goldList); //adds all gold to the new client
                Clients.AllExcept(Context.ConnectionId).sendNewPlayer(new Player(name, x, y)); //the new player is broadcasted to all the other clients ("Context" refers to the client's connection id)   
            }
        }

        /// <summary>
        /// Notifies the new location of a certain player. 
        /// </summary>
        /// <param name="name">Name of the player. </param>
        /// <param name="x">New X coordiante. </param>
        /// <param name="y">New Y coordinate. </param>
        public void NotifyLocation(string name, int x, int y)
        {
            if (!IsGameOver)
            {
                //the player to be sent
                Player playerToSend = null;

                //iterates though the players list and finds the specified player
                for (var i = 0; i < players.Count; i++)
                {
                    if (players[i].Name.Equals(name))
                    {
                        //updates its information
                        players[i].X = x;
                        players[i].Y = y;
                        playerToSend = players[i];
                        break;
                    }
                }

                //is sent to clients
                Clients.All.notifyLocation(playerToSend);
            }
        }

        /// <summary>
        /// Notifies all clients that a player is 
        /// supposed to change its animation
        /// </summary>
        /// <param name="name">Player's name</param>
        /// <param name="animation">Player's new animation. </param>
        public void NotifyAnimationChange(string name, string animation) 
        {
            if (!IsGameOver)
                Clients.All.notifyAnimationDirection(name, animation);
        }

        /// <summary>
        /// Notifies all clients that a player picked up gold. 
        /// </summary>
        /// <param name="playerName">Player's name</param>
        /// <param name="goldId">The ID of the gold object. </param>
        public void NotifyGoldAddition(string playerName, int goldId)
        {
            if (!IsGameOver)
            {
                Gold chosenGold = null; //gold to add to the player

                foreach (Gold g in goldList)
                {
                    if (g.Id == goldId)
                    {
                        chosenGold = g;
                        break;
                    }
                }

                //searches for the particular player and adds gold
                foreach (Player p in players)
                {
                    if (p.Name.Equals(playerName))
                    {
                        //adding the amount of gold to the specified player
                        p.AmountOfGold += chosenGold.Amount;
                        break;
                    }
                }

                //the chosen gold is deleted
                goldList.Remove(chosenGold);

                Clients.All.removeGoldFromStage(playerName, goldId);
            }
        }

        /// <summary>
        /// Method which initializes the timer. 
        /// </summary>
        public void InitializeTimer() 
        {
            if (!timer.Enabled)
            {
                timer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
                timer.Interval = TIMER_SPEED;
                timer.Enabled = true;
            }
        }

        /// <summary>
        /// The method which is executed by our timer. It is used
        /// for the countdown on our game. 
        /// </summary>
        /// <param name="source"></param>
        /// <param name="e"></param>
        private void OnTimedEvent(object source, ElapsedEventArgs e) 
        {
            //if the game hasn't started yet
            if (!IsGameStarted)
            {
                Clients.All.countDownNotification("The game will start in <b>" + CountDown + "</b> seconds. ", "#fff");
                CountDown--;

                //if it passed 0, the game starts
                if (CountDown == -1)
                {
                    IsGameStarted = true;
                    CountDown = GAME_ENDING_SECONDS;
                }
            }
            else 
            {
                //notifying on players' screens that the game started
                if (CountDown == GAME_ENDING_SECONDS) 
                    Clients.All.notifyGameStartOnStage();

                string ColorToUse = "#fff"; //this variable is the color of our countDownNotification text 

                //if the CountDown is less or equal to 10, we should alarm players that the game is close to end
                if (CountDown <= 10)
                {
                    //if it's divisible by 2, the text should be red
                    if ((CountDown % 2) == 0)
                        ColorToUse = "#f00";
                }

                Clients.All.countDownNotification("<b>Hurry up!</b> The game ends in <b>" + CountDown + "</b> seconds. ", ColorToUse);
                CountDown--;

                //if it passed 0, the game should end
                if (CountDown == -1) 
                {
                    //notifies the users that the game ended 
                    Clients.All.countDownNotification("Game Over", "#fff");

                    //disabling the timer
                    timer.Enabled = false;
                    IsGameStarted = false;

                    //setting game over to true
                    IsGameOver = true;

                    //initializing the game over screen
                    InitGameOverScreen();

                    //closing method execution
                    return;
                }

                //if current countdown is divisible by 5, it should add a gold to stage
                if ((CountDown % 5) == 0)
                {
                    Gold newGold = null;

                    //if gold already exists
                    if (goldList.Count != 0)
                        newGold = new Gold(goldList[goldList.Count - 1].Id + 1);
                    else
                        newGold = new Gold(0);

                    //adds gold to the list
                    goldList.Add(newGold);

                    Clients.All.addGoldToStage(newGold);
                }
            }
        }

        /// <summary>
        /// Prepares the list of winners and broadcasts that list
        /// to all the other clients. 
        /// </summary>
        private void InitGameOverScreen() 
        {
            //Sorts by amount of Gold
            players.Sort(new SortByMostGold());
            
            //send the clients the updated list
            Clients.All.onGameOver(players);
        }

        /// <summary>
        /// Overriden method which additionally removes
        /// a client from the list of players. 
        /// </summary>
        /// <returns></returns>
        public override Task OnDisconnected()
        {
            string ClientId = Context.ConnectionId;
            string playerName = "";

            //removing the player off of the list
            foreach (Player p in players) 
            {
                if (p.ConnectionId.Equals(ClientId))
                {
                    playerName = p.Name;
                    players.Remove(p);
                    break;
                }
            }

            Clients.AllExcept(ClientId).notifyDisconnection(playerName);
            return base.OnDisconnected();
        }

        /// <summary>
        /// Sorts the players list by most gold. 
        /// </summary>
        private class SortByMostGold : IComparer<Player>
        {
            public int Compare(Player p1, Player p2)
            {
                if (p1.AmountOfGold < p2.AmountOfGold)
                    return 1;
                if (p1.AmountOfGold > p2.AmountOfGold)
                    return -1;
                else
                    return 0;
            }
        }
    }
}