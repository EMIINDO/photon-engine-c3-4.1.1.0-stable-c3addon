"use strict";

{
	globalThis.C3.Plugins.Photon.Cnds =
	{
		onError 				() { return true; },
		onStateChange 			() { return true; },
		onEvent 				(code) { return this.eventCode == code; },
		onAnyEvent 				() { return true; },
		onRoomList 				() { return true; },
		onRoomListUpdate 		() { return true; },
		onActorPropertiesChange () { return true; },
		onMyRoomPropertiesChange() { return true; },
		onJoinRoom 				() { return true; },
		onActorJoin 			() { return true; },
		onActorLeave 			() { return true; },
		onActorSuspend 			() { return true; },
		onWebRpcResult 			() { return true; },
		onFindFriendsResult 	() { return true; },
		onLobbyStats 			() { return true; },
		onAppStats 				() { return true; },
		onJoinedLobby 	 		() { return true; },
		onDisconnected			() { return true; },
		onJoinRandomRoomNoMatchFound  () { return true; },
		
		isConnectedToNameServer  ()
		{
			return this.lbc.isConnectedToNameServer();
		},
		isConnectedToMaster  ()
		{
			return this.lbc.isConnectedToMaster();
		},
		isInLobby  ()
		{
			return this.lbc.isInLobby();
		},
		isJoinedToRoom  ()
		{
			return this.lbc.isJoinedToRoom();
		}
	};
}