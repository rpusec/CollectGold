using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using CollectGold.Model;
using System.Threading.Tasks;

namespace CollectGold
{
    /// <summary>
    /// This hub is responsible for the chat functionality. 
    /// </summary>
    public class ChatHub : Hub
    {
        private static List<Player> players = new List<Player>();

        /// <summary>
        /// Adds a new player to chat. 
        /// </summary>
        /// <param name="playerName">Player's name</param>
        public void AddToChat(string playerName) 
        {
            //adds the player and also adds its connection ID
            players.Add(new Player(playerName, Context.ConnectionId));
            
            //notifies all clients about the new login
            Clients.All.notifyNewLogin(playerName);
        }

        /// <summary>
        /// Broadcasts a message from a client to all other clients. 
        /// </summary>
        /// <param name="message">Client's message. </param>
        /// <param name="senderName">Client's screen-name. </param>
        public void SendMessage(string message, string senderName)
        {
            //validates the sender name
            if (ValidateSenderName(senderName))
                Clients.All.broadcastMessage(message, senderName);
            else
                Clients.Caller.notifyError("Please log into the game to chat. "); //notifies an error if client's name doesn't exist
        }

        /// <summary>
        /// Notifies all clients that two players had collided. 
        /// </summary>
        /// <param name="name1">First player's name. </param>
        /// <param name="name2">Second player's name. </param>
        public void NotifyPlayerCollision(string name1, string name2)
        {
            Clients.All.notifyPalyerCollision(name1, name2);
        }

        /// <summary>
        /// Notifies that a client collected gold. 
        /// </summary>
        /// <param name="name">Client's name. </param>
        /// <param name="goldAmount">Amount of gold that was picked up by the client. </param>
        public void NotifyGoldAddition(string name, double goldAmount)
        {
            Clients.All.notifyGoldAddition(name, goldAmount);
        }

        /// <summary>
        /// Overridden method which additionally removes the 
        /// disconnected player from the players list. 
        /// </summary>
        /// <returns></returns>
        public override Task OnDisconnected() 
        {
            foreach(Player p in players)
            {
                //finds the player object of the client that disconnected
                if (p.ConnectionId.Equals(Context.ConnectionId))
                {
                    //removes the player, notifies other clients about the disconnected player
                    Clients.All.notifyDisconnect(p.Name);
                    players.Remove(p);
                    break;
                }
            }

            return base.OnDisconnected();
        }

        /// <summary>
        /// Validates that the sender (client who sent a message)
        /// exists on the list of players. 
        /// </summary>
        /// <param name="senderName">Client's screen-name. </param>
        /// <returns></returns>
        private bool ValidateSenderName(string senderName) 
        {
            //iterates through the players list and finds the client by its senderName
            foreach (Player p in players) 
            {
                if (p.Name.Equals(senderName))
                    return true;
            }

            return false;
        }
    }
}