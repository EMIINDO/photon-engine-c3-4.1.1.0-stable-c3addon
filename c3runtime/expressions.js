"use strict";

{
	globalThis.C3.Plugins.Photon.Exps =
	{
		ErrorCode ()
		{
			return (this.errorCode || 0);
		},
		
		ErrorMessage ()
		{
			return (this.errorMsg || "");
		},
		
		State ()
		{
			return (this.lbc.state);
		},
		
		StateString ()
		{
			return (Photon.LoadBalancing.LoadBalancingClient.StateToName(this.lbc.state));
		},
	
		UserId ()
		{
			return (this.lbc.getUserId() || "");
		},
	
		MyActorNr ()
		{
			return (this.lbc.myActor().actorNr);
		},
	
		ActorNr ()
		{
			return (this.actorNr || 0);
		},
		
		MyRoomName ()
		{
			return (this.lbc.myRoom().name || "");
		},
		
		EventCode ()
		{
			return (this.eventCode || 0);
		},
		
		EventData ()
		{
			return (this.eventData);
		},
		
		RoomCount ()
		{
			return (this.lbc.availableRooms().length);
		},
	
		RoomNameAt (i)
		{
			return (this.lbc.availableRooms()[i].name || "");
		},
	
		RoomMaxPlayers (name)
		{
			var r = this.lbc.roomInfosDict[name];
			return (r && r.maxPlayers || 0);
		},
	
		RoomIsOpen (name)
		{
			var r = this.lbc.roomInfosDict[name];
			return (r && r.isOpen ? 1 : 0);
		},
		
		RoomPlayerCount (name)
		{
			var r = this.lbc.roomInfosDict[name];
			return (r && r.playerCount);
		},
	
		RoomProperty (name, propName)
		{
			var r = this.lbc.roomInfosDict[name];
			return (r && r.getCustomProperty(propName));
		},
		
		PropertyOfMyRoom (propName)
		{
			var r = this.lbc.myRoom();
			return (r && r.getCustomProperty(propName));
		},
		
		ActorCount ()
		{
			return (this.lbc.myRoomActorsArray().length);
		},

		ActorNrAt (i)
		{
			var a = this.lbc.myRoomActorsArray()[i];
			return (a && a.actorNr || -i);
		},
	
		ActorNameByNr (nr)
		{
			var a = this.lbc.myRoomActors()[nr];
			return (a && a.name || "-- not found acorNr " + nr);
		},
	
		PropertyOfActorByNr (nr, propName)
		{
			var a = this.lbc.myRoomActors()[nr];
			return (a && a.getCustomProperty(propName));
		},
	
		ChangedPropertiesCount ()
		{
			return (this.changedPropertiesNames && this.changedPropertiesNames.length || 0);
		},
	
		ChangedPropertyNameAt (i)
		{
			return (this.changedPropertiesNames && this.changedPropertiesNames[i]);
		},
	
		MasterActorNr (i)
		{
			return (this.lbc.myRoomMasterActorNr());
		},
		
		WebRpcUriPath ()
		{
			return (this.webRpcUriPath || "");
		},
		
		WebRpcResultCode ()
		{
			return (this.webRpcResultCode || 0);
		},
	
		WebRpcData ()
		{
			return (this.webRpcData);
		},
		
		FriendOnline (name)
		{
			return (this.friends && this.friends[name] && this.friends[name].online ? 1 : 0);
		},
		
		FriendRoom (name)
		{
			return (this.friends && this.friends[name] ? this.friends[name].roomId : "");
		},
	
		LobbyStatsCount ()
		{
			return (this.lobbyStats ? this.lobbyStats.length : 0);
		},
		
		LobbyStatsNameAt (i)
		{
			return (this.lobbyStats && this.lobbyStats[i] ? this.lobbyStats[i].lobbyName : "");
		},
		
		LobbyStatsTypeAt (i)
		{
			return (this.lobbyStats && this.lobbyStats[i] ? this.lobbyStats[i].lobbyType : 0);
		},
	
		LobbyStatsPeerCountAt (i)
		{
			return (this.lobbyStats && this.lobbyStats[i] ? this.lobbyStats[i].peerCount : 0);
		},
		
		LobbyStatsGameCountAt (i)
		{
			return (this.lobbyStats && this.lobbyStats[i] ? this.lobbyStats[i].gameCount : 0);
		},
	
		AppStatsPeerCount (i)
		{
			return (this.appStats ? this.appStats.peerCount : 0);
		},
	
		AppStatsMasterPeerCount (i)
		{
			return (this.appStats ? this.appStats.masterPeerCount : 0);
		},
	
		AppStatsGameCount (i)
		{
			return (this.appStats ? this.appStats.gameCount : 0);
		}
	};
}