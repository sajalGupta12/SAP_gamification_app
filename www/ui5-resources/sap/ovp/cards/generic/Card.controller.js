sap.ui.define(["sap/ui/core/mvc/Controller","sap/ovp/cards/ActionUtils","sap/ui/generic/app/navigation/service/SelectionVariant","sap/ui/generic/app/navigation/service/PresentationVariant","sap/ovp/cards/CommonUtils","sap/ovp/cards/OVPCardAsAPIUtils","sap/ui/core/ResizeHandler","sap/ui/core/format/NumberFormat","sap/ovp/cards/AnnotationHelper","sap/ui/model/odata/AnnotationHelper","sap/m/MessageBox","sap/ui/generic/app/navigation/service/NavError","sap/ui/core/CustomData","sap/ui/model/FilterOperator","sap/ui/model/json/JSONModel","sap/m/Dialog","sap/m/Button","sap/m/MessageToast","sap/ui/core/TextDirection","sap/ovp/cards/loading/State","sap/ui/generic/app/library","jquery.sap.global"],function(C,A,S,P,a,O,R,N,b,c,M,d,e,F,J,D,B,f,T,L,G,q){"use strict";return C.extend("sap.ovp.cards.generic.Card",{onInit:function(){this.oCardComponent=this.getOwnerComponent();this.oCardComponentData=this.oCardComponent&&this.oCardComponent.getComponentData();this.oMainComponent=this.oCardComponentData&&this.oCardComponentData.mainComponent;this.sCardId=this.oCardComponentData.cardId;var s=this.getView().mPreprocessors.xml[0].ovpCardProperties.oData.state;if(s!=="Loading"&&s!=="Error"){var h=this.getView().byId("ovpCardHeader");if(!!h){h.attachBrowserEvent("click",this.onHeaderClick.bind(this));h.addEventDelegate({onkeydown:function(E){if(!E.shiftKey&&(E.keyCode==13||E.keyCode==32)){E.preventDefault();this.onHeaderClick();}}.bind(this)});}}var n=this.getView().byId("kpiNumberValue");if(n){n.addEventDelegate({onAfterRendering:function(){var $=n.$();var g=$.find(".sapMNCValueScr");var i=$.find(".sapMNCScale");g.attr("aria-label",g.text());i.attr("aria-label",i.text());var j=this.getView().byId("ovpCardHeader").getDomRef();var o=this.getOwnerComponent().getComponentData();if(!!o&&!!o.appComponent){var k=o.appComponent;if(!!k.getModel("ui")){var u=k.getModel("ui");if(!!u.getProperty("/containerLayout")&&u.getProperty("/containerLayout")==="resizable"){var l=o.appComponent.getDashboardLayoutUtil();if(!!l){l.setKpiNumericContentWidth(j);}}}}}.bind(this)});}},exit:function(){if(this.resizeHandlerId){R.deregister(this.resizeHandlerId);}},onAfterRendering:function(){var o=this.getCardPropertiesModel();this.enableClick=true;var s=o.getProperty("/contentFragment");var g=this.getOwnerComponent().getComponentData();this._handleCountHeader();this._handleKPIHeader();var h=o.getProperty("/selectedKey");if(h&&o.getProperty("/state")!=='Loading'){var i=this.getView().byId("ovp_card_dropdown");if(i){i.setSelectedKey(h);}}try{var g=this.getOwnerComponent().getComponentData();if(g&&g.appComponent){var j=g.appComponent;if(j.getModel('ui')){var u=j.getModel('ui');if(u.getProperty('/containerLayout')==='resizable'){var k=j.getDashboardLayoutUtil();if(k){this.oDashboardLayoutUtil=k;this.cardId=g.cardId;if(k.isCardAutoSpan(g.cardId)){this.resizeHandlerId=R.register(this.getView(),function(Q){q.sap.log.info('DashboardLayout autoSize:'+Q.target.id+' -> '+Q.size.height);k.setAutoCardSpanHeight(Q);});}}}}}}catch(l){q.sap.log.error("DashboardLayout autoSpan check failed.");}if(this.oDashboardLayoutUtil&&this.oDashboardLayoutUtil.isCardAutoSpan(this.cardId)){var $=q("#"+this.oDashboardLayoutUtil.getCardDomId(this.cardId));if(this.oView.$().outerHeight()>$.innerHeight()){this.oDashboardLayoutUtil.setAutoCardSpanHeight(null,this.cardId,this.oView.$().height());}}var I=0;if(g&&g.mainComponent){var m=g.mainComponent;if(m.bGlobalFilterLoaded){I=this.checkNavigation();}}else if(O.checkIfAPIIsUsed(this)){I=this.checkNavigation();}var n=this.getCardPropertiesModel();var p=n.getProperty("/state");if(p!=="Loading"&&p!=="Error"){var r=n.getProperty("/template");if(r==="sap.ovp.cards.stack"){if(!I){var v=this.getView().byId('ViewAll');if(v){v=v.getDomRef();q(v).remove();}}}}if(I){if(s?s!=="sap.ovp.cards.quickview.Quickview":true){if(s==="sap.ovp.cards.stack.Stack"){var t=this.getView().getDomRef();var w=q(t).find('.sapOvpCardContentRightHeader');if(w.length!==0){w.addClass('sapOvpCardNavigable');}}else{this.getView().addStyleClass("sapOvpCardNavigable");}}if(s&&s==="sap.ovp.cards.quickview.Quickview"){var H=this.byId("ovpCardHeader");if(H){H.addStyleClass("sapOvpCardNavigable");}}}else{if(s){this.getView().addStyleClass("ovpNonNavigableItem");var H=this.byId("ovpCardHeader");if(H){H.$().removeAttr('role');H.addStyleClass('ovpNonNavigableItem');}var x=this.checkLineItemNavigation();if(!x){switch(s){case"sap.ovp.cards.list.List":var y=this.getView().byId("listItem");if(y){y.setType("Inactive");}break;case"sap.ovp.cards.table.Table":var y=this.getView().byId("tableItem");if(y){y.setType("Inactive");}break;case"sap.ovp.cards.linklist.LinkList":if(!this.checkNavigationForLinkedList()){var y=this.getView().byId("ovpCLI");if(y){y.setType("Inactive");}}break;}}}}var z=this.getView().byId("ovp_card_dropdown");var E=this.getView().byId("toolbar");if(E){var K=E.getDomRef();q(K).attr("aria-label",z.getSelectedItem().getText());}},checkNavigation:function(){var o=this.getCardPropertiesModel();var E=this.getEntityType();if(E){if(o){var i=o.getProperty("/identificationAnnotationPath");var s=i;var g=o.getProperty("/contentFragment");if(g&&(g==="sap.ovp.cards.stack.Stack"||g==="sap.ovp.cards.quickview.Quickview")){var h=(i)?i.split(","):[];if(h&&h.length>1){if(g==="sap.ovp.cards.stack.Stack"){s=h[0];}else{s=h[1];}}}var r=E[s];if(this.isNavigationInAnnotation(r)){return 1;}if(o&&o.getProperty("/template")==="sap.ovp.cards.charts.analytical"){var k=o.getProperty("/kpiAnnotationPath");if(E&&k){var j=E[k];var l=j.Detail&&j.Detail.SemanticObject&&j.Detail.SemanticObject.String;var m=j.Detail&&j.Detail.Action&&j.Detail.Action.String;if(l&&m){return 1;}}}}}else if(o&&o.getProperty("/template")==="sap.ovp.cards.linklist"&&o.getProperty("/staticContent")&&o.getProperty("/targetUri")){return 1;}return 0;},checkNavigationForLinkedList:function(){if(this.getEntityType()){var E=this.getEntityType();var l=E['com.sap.vocabularies.UI.v1.LineItem'];if(l&&(l[0].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||l[0].RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl")){return true;}}return false;},checkLineItemNavigation:function(){if(this.getEntityType()){var E=this.getEntityType();var o=this.getCardPropertiesModel();if(o){var s=o.getProperty("/annotationPath");var r=E[s];return this.isNavigationInAnnotation(r);}}},isNavigationInAnnotation:function(r){if(r&&r.length){for(var i=0;i<r.length;i++){var I=r[i];if(I.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"||I.RecordType==="com.sap.vocabularies.UI.v1.DataFieldForAction"||I.RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl"){return 1;}}}return 0;},onHeaderClick:function(){if(O.checkIfAPIIsUsed(this)){a.onHeaderClicked();}else{var o=this.getCardPropertiesModel();var t=o.getProperty("/template");var s=o.getProperty("/targetUri");if(t=="sap.ovp.cards.linklist"&&o.getProperty("/staticContent")!==undefined&&s){window.location.href=s;}else if(o.getProperty("/staticContent")!==undefined&&s===""){return;}else{this.doNavigation(this.getView().getBindingContext());}}},resizeCard:function(g){q.sap.log.info(g);if(this.resizeHandlerId){R.deregister(this.resizeHandlerId);this.resizeHandlerId=null;}},_handleCountHeader:function(){var g=this.getView().byId("ovpCountHeader");if(g){var i=this.getCardItemsBinding();if(i){this.setHeaderCounter(i,g);i.attachDataReceived(function(){this.setHeaderCounter(i,g);}.bind(this));i.attachChange(function(){this.setHeaderCounter(i,g);}.bind(this));}}},setHeaderCounter:function(i,g){var t=i.getLength();var h=i.getCurrentContexts().length;var o,j="";var n=N.getIntegerInstance({minFractionDigits:0,maxFractionDigits:1,decimalSeparator:".",style:"short"});h=parseFloat(h,10);var k=this.getOwnerComponent().getComponentData();if(k&&k.appComponent){var l=k.appComponent;if(l.getModel('ui')){var u=l.getModel('ui');if(u.getProperty('/containerLayout')!=='resizable'){if(t!==0){t=n.format(Number(t));}if(h!==0){h=n.format(Number(h));}}else{o=l.getDashboardLayoutUtil().dashboardLayoutModel.getCardById(k.cardId);}}}if(h===0){j="";}else if(o&&o.dashboardLayout.showOnlyHeader){j=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Count_Header_Total",[t]);}else if(t!=h){j=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Count_Header",[h,t]);}g.setText(j);var m=g.$();m.attr("aria-label",j);},_handleKPIHeader:function(){var k,s;if(this.getView()&&this.getView().getDomRef()){k=this.getView().getDomRef().getElementsByClassName("numericContentHbox");s=this.getView().getDomRef().getElementsByClassName("noDataSubtitle");}else{return;}if(k||s){var i=this.getCardItemsBinding();if(i){i.attachDataReceived(function(){this._setSubTitleWithUnitOfMeasure(i);var t=i.getLength();if(k[0]){k[0].style.visibility=null;if(t===0){k[0].style.visibility='hidden';}else{k[0].style.visibility='visible';}}if(s.length!==0){s[0].style.display="none";if(t===0){s[0].style.display="flex";}}}.bind(this));}}},_setSubTitleWithUnitOfMeasure:function(i){var o=this.getCardPropertiesModel();if(!!o){var g=o.getData();var s=this.getView().byId("SubTitle-Text");if(!!s){s.setText(g.subTitle);if(!!g&&!!g.entityType&&!!g.dataPointAnnotationPath){var E=o.getData().entityType;var h=g.dataPointAnnotationPath.split("/");var j=h.length===1?E[g.dataPointAnnotationPath]:E[h[0]][h[1]];var m;if(j&&j.Value&&j.Value.Path){m=j.Value.Path;}else if(j&&j.Description&&j.Description.Value&&j.Description.Value.Path){m=j.Description.Value.Path;}if(!!m){var p=a.getUnitColumn(m,E);var k=this.byId("kpiHeader");if(!!k){var l=k.getAggregation("items")[0];if(!!l){var n=l.getItems()[0];if(!!n){var r=n.getBindingContext().getPath();if(!!r){var u;var t=this.getModel();var v=t.getContext(r);if(!!p&&!!v){u=v.getProperty(p);}else{u=a.getUnitColumn(m,E,true);}var w=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("SubTitle_IN");if(!!g.subTitle&&!!w&&!!u){s.setText(g.subTitle+" "+w+" "+u);var x=s.getAggregation("customData");if(x){var y;for(y in x){var z=x[y];if(z.getKey()==="aria-label"){z.setValue(g.subTitle+" "+w+" "+u);break;}}}}}}}}}}}}},getCardItemsBinding:function(){},onActionPress:function(E){var s=E.getSource(),o=this._getActionObject(s),g=s.getBindingContext();if(o.type.indexOf("DataFieldForAction")!==-1){this.doAction(g,o);}else{this.doNavigation(g,o);}},_getActionObject:function(s){var g=s.getCustomData();var o={};for(var i=0;i<g.length;i++){o[g[i].getKey()]=g[i].getValue();}return o;},doNavigation:function(o,n){if(!this.enableClick){return;}this.enableClick=false;setTimeout(function(){this.enableClick=true;}.bind(this),1000);if(!this.oMainComponent){return;}if(!n){n=this.getEntityNavigationEntries(o)[0];}var g=q.extend(true,{},o);var h=q.extend(true,{},n);var i=this.oMainComponent.doCustomNavigation&&this.oMainComponent.doCustomNavigation(this.sCardId,g,h);if(i){var t=i.type;if(t&&typeof t==="string"&&t.length>0){t=t.split(".").pop().split("/").pop().toLowerCase();switch(t){case"datafieldwithurl":i.type="com.sap.vocabularies.UI.v1.DataFieldWithUrl";break;case"datafieldforintentbasednavigation":i.type="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";break;}n=i;}}function p(){if(n){switch(n.type){case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":this.doNavigationWithUrl(o,n);break;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":this.doIntentBasedNavigation(o,n,false);break;case"com.sap.vocabularies.UI.v1.KPIDetailType":this.doIntentBasedNavigation(o,n,false);break;}}}if(!this.oMainComponent.oAppStatePromise){p.call(this);}else{this.oMainComponent.oAppStatePromise.then(p.bind(this));}},doNavigationWithUrl:function(o,n){if(!sap.ushell.Container){return;}var p=sap.ushell.Container.getService("URLParsing");if(!(p.isIntentUrl(n.url))){window.open(n.url);}else{var g=p.parseShellHash(n.url);var w=g.appSpecificRoute?true:false;this.doIntentBasedNavigation(o,g,w);}},fnHandleError:function(E){if(E instanceof d){if(E.getErrorCode()==="NavigationHandler.isIntentSupported.notSupported"){M.show(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OVP_NAV_ERROR_NOT_AUTHORIZED_DESC"),{title:sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OVP_GENERIC_ERROR_TITLE")});}else{M.show(E.getErrorCode(),{title:sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OVP_GENERIC_ERROR_TITLE")});}}},doCrossApplicationNavigation:function(I,n){var s="#"+I.semanticObject+'-'+I.action;if(I.params){var o=this.oCardComponent&&this.oCardComponent.getComponentData();var g=o&&o.appComponent;if(g){var p=g._formParamString(I.params);s=s+p;}}var t=this;if(!sap.ushell.Container){return;}sap.ushell.Container.getService("CrossApplicationNavigation").isIntentSupported([s]).done(function(r){if(r[s].supported===true){if(!!n.params){if(typeof n.params=='string'){try{n.params=JSON.parse(n.params);}catch(h){q.sap.log.error("Could not parse the Navigation parameters");return;}}}var o=t.getOwnerComponent().getComponentData();var k=o?o.globalFilter:undefined;var u=k&&k.getUiState({allFilters:false});var l=u?JSON.stringify(u.getSelectionVariant()):"{}";k=q.parseJSON(l);if(!n.params){n.params={};}if(!!k&&!!k.SelectOptions){for(var i=0;i<k.SelectOptions.length;i++){var m=k.SelectOptions[i].Ranges;if(!!m){var v=[];for(var j=0;j<m.length;j++){if(m[j].Sign==="I"&&m[j].Option==="EQ"){v.push(m[j].Low);}}n.params[k.SelectOptions[i].PropertyName]=v;}}}sap.ushell.Container.getService("CrossApplicationNavigation").toExternal(n);}else{var E=new d("NavigationHandler.isIntentSupported.notSupported");t.fnHandleError(E);}}).fail(function(){q.sap.log.error("Could not get authorization from isIntentSupported");});},doIntentBasedNavigation:function(o,i,u){if(!sap.ushell.Container){return;}var p,n,g,E=o?o.getObject():null;var h=this.getCardPropertiesModel(),s=h.getProperty("/customParams");if(o&&typeof o.getAllData==="function"&&s){g=o.getAllData();}if(E&&E.__metadata){delete E.__metadata;}var j=a.getNavigationHandler();if(j){if(i){p=this._getEntityNavigationParameters(E,g);n={target:{semanticObject:i.semanticObject,action:i.action},appSpecificRoute:i.appSpecificRoute,params:p.sNavSelectionVariant};var k=null;if(p.sNavPresentationVariant){k=this.oMainComponent&&this.oMainComponent._getCurrentAppState();if(k){k.presentationVariant=p.sNavPresentationVariant;}}if(u){if(i&&i.semanticObject&&i.action){var l=this.getCardPropertiesModel().getProperty("/staticParameters");n.params=(!!l)?l:{};this.doCrossApplicationNavigation(i,n);}}else{j.navigate(n.target.semanticObject,n.target.action,n.params,k,this.fnHandleError);}}}},doAction:function(o,g){this.actionData=A.getActionInfo(o,g,this.getEntityType());if(this.actionData.allParameters.length>0){this._loadParametersForm();}else{this._callFunction();}},getEntityNavigationEntries:function(o,s){var n=[];var E=this.getEntityType();var g=this.getCardPropertiesModel();if(!E){return n;}if(!s&&!o){var k=g.getProperty("/kpiAnnotationPath");var h=g.getProperty("/template");if(k&&h==="sap.ovp.cards.charts.analytical"){s=k;var r=E[s];var j=r&&r.Detail;var l=j.SemanticObject&&j.SemanticObject.String;var m=j.Action&&j.Action.String;if(j.RecordType==="com.sap.vocabularies.UI.v1.KPIDetailType"){if(l&&m){n.push({type:j.RecordType,semanticObject:l,action:m,label:""});}else{q.sap.log.error("Invalid Semantic object and action configured for annotation "+j.RecordType);}}}}if(!s){var I=g.getProperty("/identificationAnnotationPath");var p=(I)?I.split(","):[];if(p&&p.length>1){s=p[0];}else{s=I;}}var t=E[s];if(q.isArray(t)){t=b.sortCollectionByImportance(t);for(var i=0;i<t.length;i++){if(t[i].RecordType==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"){n.push({type:t[i].RecordType,semanticObject:t[i].SemanticObject.String,action:t[i].Action.String,label:t[i].Label?t[i].Label.String:null});}if(t[i].RecordType==="com.sap.vocabularies.UI.v1.DataFieldWithUrl"&&!t[i].Url.UrlRef){var u=this.getView().getModel();var v=u.oMetaModel;var w=v.createBindingContext(E.$path);var x=c.format(w,t[i].Url);var y=new e({key:"url",value:x});y.setModel(u);y.setBindingContext(o);var U=y.getValue();n.push({type:t[i].RecordType,url:U,value:t[i].Value.String,label:t[i].Label?t[i].Label.String:null});}}}return n;},getModel:function(){return this.getView().getModel();},getMetaModel:function(){if(this.getModel()){return this.getModel().getMetaModel();}},getCardPropertiesModel:function(){if(!this.oCardPropertiesModel||q.isEmptyObject(this.oCardPropertiesModel)){this.oCardPropertiesModel=this.getView().getModel("ovpCardProperties");}return this.oCardPropertiesModel;},getEntitySet:function(){if(!this.entitySet){var E=this.getCardPropertiesModel().getProperty("/entitySet");this.entitySet=this.getMetaModel().getODataEntitySet(E);}return this.entitySet;},getEntityType:function(){if(!this.entityType){if(this.getMetaModel()&&this.getEntitySet()){this.entityType=this.getMetaModel().getODataEntityType(this.getEntitySet().entityType);}}return this.entityType;},getCardContentContainer:function(){if(!this.cardContentContainer){this.cardContentContainer=this.getView().byId("ovpCardContentContainer");}return this.cardContentContainer;},_processCustomParameters:function(o,s,g){var h=this.getCardPropertiesModel();if(!this.oMainComponent||!h){return;}var j=h.getProperty("/customParams");if(!j||!this.oMainComponent.onCustomParams){return;}var k=this.oMainComponent.onCustomParams(j);if(!k||!q.isFunction(k)){return;}var l=q.extend(true,{},o);var m=q.extend(true,{},s);var n=k(l,m);if(!n||(!q.isArray(n)&&!q.isPlainObject(n))){return;}var I=q.isPlainObject(n);if(I&&q.isEmptyObject(n)){return;}var p=I&&(n.bIgnoreEmptyString||n.ignoreEmptyString);var r=I?(n.aSelectionVariant||n.selectionVariant):n;if(!q.isArray(r)){return;}var i,t,u,v,V,w;t=r.length;for(i=0;i<t;i++){u=r[i];if(!u){continue;}v=u.path;V=u.value1;w=u.value2;if(!v||typeof v!=="string"||v===""){q.sap.log.error("Custom Variant property path '"+v+"' should be valid string");continue;}if(!(V||V===0||(V===""&&p))){continue;}V=V.toString();w=w&&w.toString();if(V===""&&p){s.removeSelectOption(v);}delete o[v];if(g){delete g[v];}s.addSelectOption(v,u.sign,u.operator,V,w);}if(p){this._removeEmptyStringsFromSelectionVariant(s);}return p;},_getEntityNavigationParameters:function(E,o){var g={};var h=this.getOwnerComponent().getComponentData();var j=h?h.globalFilter:undefined;var k=b.getCardSelections(this.getCardPropertiesModel());var l=k.filters;var m=k.parameters;var n=this.getCardPropertiesModel();var p=this.getEntityType();l&&l.forEach(function(V){V.path=V.path.replace("/",".");switch(V.operator){case F.NE:V.operator=F.EQ;V.sign="E";break;case F.Contains:V.operator="CP";var W=V.value1;V.value1="*"+W+"*";break;case F.EndsWith:V.operator="CP";var W=V.value1;V.value1="*"+W;break;case F.StartsWith:V.operator="CP";var W=V.value1;V.value1=W+"*";}});k.filters=l;m&&m.forEach(function(V){V.path=V.path.replace("/",".");});k.parameters=m;var r=b.getCardSorters(this.getCardPropertiesModel());var s,t;if(E){var u;for(var i=0;p.property&&i<p.property.length;i++){u=p.property[i].name;var v=E[u];if(E.hasOwnProperty(u)){if(q.isArray(E[u])&&E[u].length===1){g[u]=E[u][0];}else if(q.type(v)!=="object"){g[u]=v;}}}}var K=n&&n.getProperty("/kpiAnnotationPath");var w=n&&n.getProperty("/template");if(K&&w==="sap.ovp.cards.charts.analytical"){var x=p[K];var y=x&&x.Detail;if(y&&y.RecordType==="com.sap.vocabularies.UI.v1.KPIDetailType"){g["kpiID"]=x.ID.String;}}t=r&&new P(r);s=this._buildSelectionVariant(j,k);var I;if(o){I=this._processCustomParameters(o,s,g);}else{I=this._processCustomParameters(g,s);}var z=I?G.navigation.service.SuppressionBehavior.ignoreEmptyString:undefined;var H=n&&n.getProperty("/staticParameters");if(H){for(var u in H){if(!g.hasOwnProperty(u)){g[u]=H[u];}}}var Q=a.getNavigationHandler();var U=Q&&Q.mixAttributesAndSelectionVariant(g,s.toJSONString(),z);return{sNavSelectionVariant:U?U.toJSONString():null,sNavPresentationVariant:t?t.toJSONString():null};},_removeEmptyStringsFromSelectionVariant:function(s){var p=s.getParameterNames();for(var i=0;i<p.length;i++){if(s.getParameter(p[i])===""){s.removeParameter(p[i]);}}var g=s.getSelectOptionsPropertyNames();for(i=0;i<g.length;i++){var h=s.getSelectOption(g[i]);for(var j=0;j<h.length;j++){if(h[j].Low===""&&!h[j].High){h.splice(j,1);j--;}}if(h.length===0){s.removeSelectOption(g[i]);}}return s;},_buildSelectionVariant:function(g,o){var u=g&&g.getUiState({allFilters:false});var s=u?JSON.stringify(u.getSelectionVariant()):"{}";var h=new S(s);var k,v,V,p;var l=o.filters;var m=o.parameters;for(var i=0;i<l.length;i++){k=l[i];if(k.path&&k.operator&&typeof k.value1!=="undefined"){v=k.value1.toString();V=(typeof k.value2!=="undefined")?k.value2.toString():undefined;h.addSelectOption(k.path,k.sign,k.operator,v,V);}}var n,r,t;for(var j=0;j<m.length;j++){p=m[j];if(!p.path||!p.value){continue;}n=p.path.split("/").pop();n=n.split(".").pop();if(n.indexOf("P_")===0){r=n;t=n.substr(2);}else{r="P_"+n;t=n;}if(h.getParameter(r)){continue;}if(h.getParameter(t)){continue;}h.addParameter(n,p.value);}return h;},_loadParametersForm:function(){var p=new J();p.setData(this.actionData.parameterData);var t=this;var o=new D('ovpCardActionDialog',{title:this.actionData.sFunctionLabel,afterClose:function(){o.destroy();}}).addStyleClass("sapUiNoContentPadding");var g=new B({text:this.actionData.sFunctionLabel,press:function(E){var m=A.getParameters(E.getSource().getModel(),t.actionData.oFunctionImport);o.close();t._callFunction(m,t.actionData.sFunctionLabel);}});var h=new B({text:"Cancel",press:function(){o.close();}});o.setBeginButton(g);o.setEndButton(h);var i=function(E){var m=A.mandatoryParamsMissing(E.getSource().getModel(),t.actionData.oFunctionImport);g.setEnabled(!m);};var j=A.buildParametersForm(this.actionData,i);o.addContent(j);o.setModel(p);o.open();},_callFunction:function(u,g){var p={batchGroupId:"Changes",changeSetId:"Changes",urlParameters:u,forceSubmit:true,context:this.actionData.oContext,functionImport:this.actionData.oFunctionImport};var t=this;var o=new Promise(function(r,h){var m=t.actionData.oContext.getModel();var s;s="/"+p.functionImport.name;m.callFunction(s,{method:p.functionImport.httpMethod,urlParameters:p.urlParameters,batchGroupId:p.batchGroupId,changeSetId:p.changeSetId,headers:p.headers,success:function(i,j){r(j);},error:function(i){i.actionText=g;h(i);}});});o.then(function(r){return f.show(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Toast_Action_Success"),{duration:1000});},function(E){var h=a.showODataErrorMessages(E);if(h===""&&E.actionText){h=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Toast_Action_Error")+' "'+E.actionText+'"'+".";}return M.error(h,{title:sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("OVP_GENERIC_ERROR_TITLE"),onClose:null,styleClass:"",initialFocus:null,textDirection:T.Inherit});});},setErrorState:function(){var o=this.getOwnerComponent();if(!o||!o.oContainer){return;}var g=o.oContainer;var h=this.getCardPropertiesModel();var i={name:"sap.ovp.cards.loading",componentData:{model:this.getView().getModel(),settings:{category:h.getProperty("/category"),title:h.getProperty("/title"),description:h.getProperty("/description"),entitySet:h.getProperty("/entitySet"),state:L.ERROR,template:h.getProperty("/template")}}};var l=sap.ui.component(i);g.setComponent(l);setTimeout(function(){o.destroy();},0);},changeSelection:function(s,g,o){if(!g){var h=this.getView().byId("ovp_card_dropdown");s=parseInt(h.getSelectedKey(),10);}var t={};if(!g){t=this.getCardPropertiesModel().getProperty("/tabs")[s-1];}else{t=o.tabs[s-1];}var u={cardId:this.getOwnerComponent().getComponentData().cardId,selectedKey:s};for(var p in t){u[p]=t[p];}if(O.checkIfAPIIsUsed(this)){O.recreateCard(u,this.getOwnerComponent().getComponentData());}else{this.getOwnerComponent().getComponentData().mainComponent.recreateCard(u);}},getItemHeight:function(g,s,h){if(!!g){var i=g.getView().byId(s);var H=0;if(!!i){if(h){if(i.getItems()[0]&&i.getItems()[0].getDomRef()){H=q(i.getItems()[0].getDomRef()).outerHeight(true);}}else{if(i.getDomRef()){H=q(i.getDomRef()).outerHeight(true);}}}return H;}},getHeaderHeight:function(){var h=this.getItemHeight(this,'ovpCardHeader');var o=this.getOwnerComponent()?this.getOwnerComponent().getComponentData():null;if(o){var g=this.oDashboardLayoutUtil.dashboardLayoutModel.getCardById(o.cardId);return h===0?g.dashboardLayout.headerHeight:h;}else{return h;}}});});