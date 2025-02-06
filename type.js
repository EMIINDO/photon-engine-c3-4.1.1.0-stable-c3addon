"use strict";

{
	const SDK = globalThis.SDK;

	const PLUGIN_CLASS = SDK.Plugins.Photon;

	PLUGIN_CLASS.Type = class PhotonType extends SDK.ITypeBase
	{
		constructor(sdkPlugin, iObjectType)
		{
			super(sdkPlugin, iObjectType);
		}
	};
}
