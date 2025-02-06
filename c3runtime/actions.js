"use strict";

{
	globalThis.C3.Plugins.Photon.Acts =
	{
		setUserId (userId)
		{
			this.lbc.setUserId(userId);
		},
		
		setCustomAuthentication (authParameters, authType)
		{
			this.lbc.setCustomAuthentication(authParameters, authType);
		},
	
		setHostingType (hostType)
		{
			this.SelfHosted = hostType == 1;
		},
	
		setSelfHostedAddress (address)
		{		
			this.SelfHostedAddress = address;
		},
		
		setRegion (region)
		{
			this.Region = region;
		},
		
		setAppId (appId)
		{
			this.AppId = appId;
		},
	
		setAppVersion (version)
		{
			this.AppVersion = version;
		},

		connect ()
		{
			if (this.SelfHosted) {
				this.lbc.setMasterServerAddress(this.SelfHostedAddress);
				this.lbc.connect();
			}
			else {
				if (this.Region)
					this.lbc.connectToRegionMaster(this.Region);
				else
					this.lbc.connectToNameServer();
			}
		},
	
		createRoom (name, lobbyName, lobbyType)
		{
			if (lobbyType == 1)  {
				lobbyType = Photon.LoadBalancing.Constants.LobbyType.SqlLobby; // 2
			}
			var options = {			
				"lobbyName": lobbyName,
				"lobbyType": lobbyType
			};
			this.lbc.createRoomFromMy(name, options);
		},
	
		joinRoom (name, rejoin, createIfNotExists, lobbyName, lobbyType)
		{
			if (lobbyType == 1)  {
				lobbyType = Photon.LoadBalancing.Constants.LobbyType.SqlLobby; // 2
			}
			var joinOptions = {
			"rejoin": rejoin && true,
				"createIfNotExists": createIfNotExists && true,
				"lobbyName": lobbyName,
				"lobbyType": lobbyType
			};
			var createOptions = {			
				"lobbyName": lobbyName,
				"lobbyType": lobbyType
			};
			createOptions = this.lbc.copyCreateOptionsFromMyRoom(createOptions);
			this.lbc.joinRoom(name, joinOptions, createOptions);
		},
	
		joinRandomRoom (matchMyRoom, matchmakingMode, lobbyName, lobbyType, sqlLobbyFilter)
		{
			if (lobbyType == 1)  {
				lobbyType = Photon.LoadBalancing.Constants.LobbyType.SqlLobby; // 2
			}
			var options = {						
				"matchmakingMode": matchmakingMode,
				"lobbyName": lobbyName,
				"lobbyType": lobbyType,
				"sqlLobbyFilter": sqlLobbyFilter
			};
			if (matchMyRoom) {
				options.expectedCustomRoomProperties = this.lbc.myRoom()._customProperties;
				options.expectedMaxPlayers = this.lbc.myRoom().maxPlayers;
			}
			this.lbc.joinRandomRoom(options);
		},
		
		disconnect ()
		{
			this.lbc.disconnect();
		},
		
		suspendRoom ()
		{
			this.lbc.suspendRoom();
		},
		
		leaveRoom ()
		{
			this.lbc.leaveRoom();
		},
		
		raiseEvent (eventCode, data, interestGroup, cache, receivers, targetActors, webForward)
		{
			var opt = {
				"interestGroup": interestGroup,
				"cache": cache,
				"receivers": receivers,
				// "targetActors": targetActors,
				"webForward": webForward
			};
			if(typeof(targetActors) === "string" && targetActors) {
				opt.targetActors = targetActors.split(",").map(function(x) { return parseInt(x); } );
			}
			this.lbc.raiseEvent(eventCode, data, opt);
		},
	
		changeGroups (action, group)
		{
			switch (action) {
				case 0: // Add
					this.lbc.changeGroups(null, [group]);
					break;
				case 1: // Add all current
					this.lbc.changeGroups(null ,[]);
					break;
				case 2: // Remove				
					this.lbc.changeGroups([group], null);
					break;
				case 3: // Remove all
					this.lbc.changeGroups([], null);
					break;
			}
		},
	
		webRpc (uriPath, parameters, parametersType)
		{
			this.lbc.webRpc(uriPath, parametersType ? JSON.parse(parameters) : parameters);
		},
		
		findFriends (friends)
		{
			this.lbc.findFriends(friends.split(","));
		},
		
		requestLobbyStats ()
		{
			this.lbc.requestLobbyStats();
		},
	
		setMyActorName (name)
		{
			this.lbc.myActor().setName(name);
		},

		setPropertyOfActorByNr (nr, propName, propValue, webForward, checkAndSet, expectedValue)
		{
			this.lbc.myRoomActors()[nr].setCustomProperty(propName, propValue, webForward, checkAndSet ? expectedValue : undefined);
		},

		setPropertyOfMyRoom (propName, propValue, webForward, checkAndSet, expectedValue)
		{
			this.lbc.myRoom().setCustomProperty(propName, propValue, webForward, checkAndSet ? expectedValue : undefined);
		},

		setPropsListedInLobby (propNames)
		{
			this.lbc.myRoom().setPropsListedInLobby(propNames.split(","));
		},

		setMyRoomIsVisible (isVisisble)
		{
			this.lbc.myRoom().setIsVisible(isVisisble ? true : false);
		},

		setMyRoomIsOpen (isOpen)
		{
			this.lbc.myRoom().setIsOpen(isOpen ? true : false);
		},

		setMyRoomMaxPlayers (maxPlayers)
		{
			this.lbc.myRoom().setMaxPlayers(maxPlayers);
		},

		setEmptyRoomLiveTime (emptyRoomLiveTime)
		{
			this.lbc.myRoom().setEmptyRoomLiveTime(emptyRoomLiveTime);
		},

		setSuspendedPlayerLiveTime (suspendedPlayerLiveTime)
		{
			this.lbc.myRoom().setSuspendedPlayerLiveTime(suspendedPlayerLiveTime);
		},

		setUniqueUserId (unique)
		{
			this.lbc.logger.error("'Set unique userid check' action is deprecated. Please remove it from project. Rooms always created with 'unique userid check' set to true.");
		},

		reset ()
		{
			this.lbc.disconnect();
			this.createLBC();
			this.lbc.logger.info("Photon client reset.");
		}
	};
}