"use strict";

{
	// callMap path/SDK/instance.js

	const SDK = globalThis.SDK;
    const PLUGIN_CLASS = SDK.Plugins.Photon;

	PLUGIN_CLASS.Instance = class PhotonInstance extends SDK.IInstanceBase
	{
		constructor(sdkType, inst)
		{
			super(sdkType, inst);
		}
		Release()
		{
		}
		OnCreate()
		{
		}
		OnPropertyChanged(id, value)
		{
		}
		LoadC2Property(name, valueString)
		{
			return false;       // not handled
		}
	};
}
