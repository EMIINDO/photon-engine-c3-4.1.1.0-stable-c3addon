//Converted with C2C3AddonConverter v1.0.0.14

//C3 runtime support based on Photon Plugin Upgrade to C3Runtime by Chadori_RebornXD
//https://www.construct.net/ru/forum/construct-3/plugin-sdk-10/construct-3-runtime-a-few-cons-137539

"use strict";

{
	const SDK = globalThis.SDK;

	const PLUGIN_ID = "Photon";
	// const PLUGIN_VERSION = "4.1.1.0";
	const PLUGIN_CATEGORY = "web";

	let app = null;

	const PLUGIN_CLASS = SDK.Plugins.Photon = class Photon extends SDK.IPluginBase
	{
		constructor()
		{
			super(PLUGIN_ID);
			SDK.Lang.PushContext("plugins." + PLUGIN_ID.toLowerCase());
		//	this._info.SetIcon("icon.png", "image/png");
			this._info.SetName(globalThis.lang(".name"));
			this._info.SetDescription(globalThis.lang(".description"));
			// this._info.SetVersion(PLUGIN_VERSION);
			this._info.SetCategory(PLUGIN_CATEGORY);
		//	this._info.SetAuthor("Exit Games");
			this._info.SetHelpUrl(globalThis.lang(".help-url"));
            this._info.SetRuntimeModuleMainScript("c3runtime/main.js");
			this._info.SetIsSingleGlobal(true);
			this._info.SetIsDeprecated(false);
			this._info.SetSupportsEffects(false);
			this._info.SetMustPreDraw(false);
			this._info.SetCanBeBundled(false);

			// Support both C2 and C3 runtimes
			this._info.SetSupportedRuntimes(["c2", "c3"]);

			SDK.Lang.PushContext(".properties");
			this._info.SetProperties([
				new SDK.PluginProperty("text", "appid", "<app-id>"),
				new SDK.PluginProperty("text", "appversion", "1.0"),
				new SDK.PluginProperty("combo", "protocol", {initialValue:"ws", items:["ws","wss"]}),
				new SDK.PluginProperty("combo", "region", {initialValue:"eu", items:["eu","us","asia","jp","au","usw","sa","cae","kr","in","cn","ru","rue"]}),
				new SDK.PluginProperty("combo", "hosttype", {initialValue:"photon cloud", items:["photon cloud","self hosted"]}),
				new SDK.PluginProperty("text", "selfhostedaddress", "localhost:9090"),
				new SDK.PluginProperty("combo", "loglevel", {initialValue:"info", items:["debug","info","warn","error","off"]})
			]);
			this._info.AddFileDependency({
				filename: "Photon-Javascript_SDK.js",
				type: "inline-script"
				});
			SDK.Lang.PopContext();		// .properties
			SDK.Lang.PopContext();
		}
	};
	PLUGIN_CLASS.Register(PLUGIN_ID, PLUGIN_CLASS);
}
