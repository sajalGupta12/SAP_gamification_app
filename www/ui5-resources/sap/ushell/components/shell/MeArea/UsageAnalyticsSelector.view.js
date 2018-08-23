// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/m/Label','sap/ushell/resources'],function(L,r){"use strict";sap.ui.jsview("sap.ushell.components.shell.MeArea.UsageAnalyticsSelector",{createContent:function(c){var f=sap.ui.Device.system.phone?'Start':'Center',F=sap.ui.Device.system.phone?'Wrap':'NoWrap',s=sap.ui.Device.system.phone?'Column':'Row',t=sap.ui.Device.system.phone?'Left':'Right',a=sap.ui.Device.system.phone?'Baseline':'Auto',w=sap.ui.Device.system.phone?'auto':'11.75rem';this.oLabel=new L({width:w,textAlign:t,text:r.i18n.getText("allowTracking")+":"}).addStyleClass('sapUshellUsageAnalyticsSelectorLabel');this.oSwitchButton=new sap.m.Switch("usageAnalyticsSwitchButton",{type:sap.m.SwitchType.Default}).addStyleClass('sapUshellUsageAnalyticsSelectorSwitchButton');this.oMessage=new sap.m.Text({text:sap.ushell.Container.getService("UsageAnalytics").getLegalText()}).addStyleClass('sapUshellUsageAnalyticsSelectorLegalTextMessage');this.fBox=new sap.m.HBox({alignItems:f,wrap:F,direction:s,height:"2rem",items:[this.oLabel,this.oSwitchButton],layoutData:new sap.m.FlexItemData({alignSelf:a})});this.vBox=new sap.m.VBox({items:[this.fBox,this.oMessage]});return this.vBox;},getControllerName:function(){return"sap.ushell.components.shell.MeArea.UsageAnalyticsSelector";}});},true);