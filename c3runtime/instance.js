"use strict";

{
	// Porting BY EMI INDO with c3addon-ide-plus

	globalThis.C3.Plugins.Photon.Instance = class PhotonInstance extends globalThis.ISDKInstanceBase
	{
		createLBC() 
		{
			Photon.LoadBalancing.LoadBalancingClient.prototype.roomFactory = function(name) {
				var r = new Photon.LoadBalancing.Room(name);
				r.onPropertiesChange = function (changedCustomProps, byClient) {
					self.changedPropertiesNames = [];
					for(var i in changedCustomProps) {
						self.changedPropertiesNames.push(i);
					}
				};
				return r;
			};
			Photon.LoadBalancing.LoadBalancingClient.prototype.actorFactory = function(name, actorNr, isLocal) {
				var a = new Photon.LoadBalancing.Actor(name, actorNr, isLocal);
				a.onPropertiesChange = function (changedCustomProps, byClient) {

					self.changedPropertiesNames = [];
					for(var i in changedCustomProps) {
						self.changedPropertiesNames.push(i);
					}
				};
				return a;
			};

			Exitgames.Common.Logger.setExceptionHandler(function(code, message) {
				self.errorCode = code;
				self.errorMsg = message;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onError);
				return false;
			});
			
			this.lbc = new Photon.LoadBalancing.LoadBalancingClient(this.Protocol, this.AppId, this.AppVersion);
			var self = this;
			
			this.lbc.setLogLevel(this.LogLevel);
			
			this.lbc.onError = function(errorCode, errorMsg) {
				self.errorCode = errorCode;
				self.errorMsg = errorMsg;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onError);
			};
			
			this.lbc.onStateChange = function(state) {
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onStateChange);
				
				var LBC = Photon.LoadBalancing.LoadBalancingClient;
				switch (state) {
	//				case LBC.State.ConnectedToNameServer:
	//					this.getRegions();
	//					this.connectToRegionMaster(this.Region);
	//					break;
					case LBC.State.JoinedLobby:
						self._trigger(globalThis.C3.Plugins.Photon.Cnds.onJoinedLobby);
						break;
					case LBC.State.Disconnected:
						self._trigger(globalThis.C3.Plugins.Photon.Cnds.onDisconnected);
					break;						
					default:
						break;
				}
			};
			
			this.lbc.onOperationResponse = function (errorCode, errorMsg, code, content) {
				if (errorCode) {
					switch (code) {
						case Photon.LoadBalancing.Constants.OperationCode.JoinRandomGame:
							switch (errorCode) {
								case Photon.LoadBalancing.Constants.ErrorCode.NoRandomMatchFound:
									self._trigger(globalThis.C3.Plugins.Photon.Cnds.onJoinRandomRoomNoMatchFound);
									break;
								default:
									break;
							}
							break;
						default:
	//						console.log("Operation Response error:", errorCode, errorMsg, code, content);
							self.errorCode = errorCode;
							self.errorMsg = errorMsg;
							self._trigger(globalThis.C3.Plugins.Photon.Cnds.onError);
							break;
					}
				}
			};
			
			this.lbc.onEvent = function (code, data, actorNr) {
				self.eventCode = code;
				self.eventData = data;
				self.actorNr = actorNr;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onEvent);
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onAnyEvent);
			};
			
			this.lbc.onRoomList = function (rooms){ 
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onRoomList);
			};

			this.lbc.onRoomListUpdate = function (rooms, roomsUpdated, roomsAdded, roomsRemoved) { 
				// TODO:
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onRoomListUpdate);
			};
			
			this.lbc.onMyRoomPropertiesChange = function () { 
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onMyRoomPropertiesChange);
			};

			this.lbc.onActorPropertiesChange = function (actor) { 
				self.actorNr = actor.actorNr;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onActorPropertiesChange);
			};
			
			this.lbc.onJoinRoom = function (createdByMe) {
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onJoinRoom);
			};
			
			this.lbc.onActorJoin = function (actor) {
				self.actorNr = actor.actorNr;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onActorJoin);
			};
			this.lbc.onActorLeave = function (actor) {
				self.actorNr = actor.actorNr;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onActorLeave);
			};
			this.lbc.onActorSuspend = function (actor) {
				self.actorNr = actor.actorNr;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onActorSuspend);
			};
			this.lbc.onWebRpcResult = function (errorCode, errorMsg, uriPath, resultCode, data) {
				self.errorCode = errorCode;
				self.errorMsg = errorMsg;
				self.webRpcUriPath = uriPath;
				self.webRpcResultCode = resultCode;
				self.webRpcData = data;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onWebRpcResult);
			};
			this.lbc.onFindFriendsResult = function (errorCode, errorMsg, friends) {
				self.errorCode = errorCode;
				self.errorMsg = errorMsg;
				self.friends = friends;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onFindFriendsResult);
			};
			this.lbc.onLobbyStats = function (errorCode, errorMsg, lobbies) {
				self.errorCode = errorCode;
				self.errorMsg = errorMsg;
				self.lobbyStats = lobbies;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onLobbyStats);
			};
			this.lbc.onAppStats = function (errorCode, errorMsg, stats) {
				self.errorCode = errorCode;
				self.errorMsg = errorMsg;
				self.appStats = stats;
				self._trigger(globalThis.C3.Plugins.Photon.Cnds.onAppStats);
			};
		}
		
		constructor()
		{
			super();

            const properties = this._getInitProperties();
			
			// Initialise object properties
			if (properties)
			{ 
				// --> Set Properties
				this.properties = properties;

				this.AppId = this.properties[0];
				this.AppVersion = this.properties[1];
				// advanced minimizer breaks enum access via .Wss
				this.Protocol = ["ws", "wss"][this.properties[2]] == "wss" ? this.Protocol = Photon.ConnectionProtocol["Wss"] : Photon.ConnectionProtocol["Ws"];
				this.Region = ["eu", "us", "asia", "jp", "au", "usw", "sa", "cae", "kr", "in", "cn", "ru", "rue"][this.properties[3]];
				this.SelfHosted = this.properties[4] == 1;
				this.SelfHostedAddress = this.properties[5];
				this.LogLevel = this.properties[6] + Exitgames.Common.Logger.Level.DEBUG; // list starts from DEBUG = 1
			}	
			
			this.createLBC();
		}
		
		_release()
		{
			super._release();
		}
		
		_saveToJson()
		{
			return {
			};
		}
		
		_loadFromJson(o)
		{
		}
	};
}