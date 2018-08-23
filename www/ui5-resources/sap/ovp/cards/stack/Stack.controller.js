sap.ui.define(["sap/ovp/cards/generic/Card.controller","sap/m/library","jquery.sap.global","sap/ovp/ui/ObjectStream","sap/ovp/cards/AnnotationHelper","sap/ui/Device","sap/ui/base/BindingParser","sap/ui/core/ComponentContainer","sap/m/Link","sap/ovp/ui/CustomData","sap/ui/core/Icon","sap/m/FlexItemData","sap/m/Text","sap/m/VBox"],function(C,S,q,O,A,D,B,a,L,b,I,F,T,V){"use strict";return C.extend("sap.ovp.cards.stack.Stack",{onInit:function(){C.prototype.onInit.apply(this,arguments);var v=this._oCard=this.getView().byId("stackContent");v.addEventDelegate({onclick:this.openStack.bind(this),onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();this.openStack();}}.bind(this)});if(D.system.phone){this.bAfterColumnUpdateAttached=false;this.bDeviceOrientationAttached=false;}this._createObjectStream();},onExit:function(){if(this.oObjectStream){this.oObjectStream.destroy();}},addPlaceHolder:function(n){var v=this.getView();var c=v.getModel("ovpCardProperties");var o=c.getProperty("/objectStreamCardsNavigationProperty");var s=o?true:false;if(!s){var N=this.getEntityNavigationEntries();if(N.length>0){var d=N[0].label;if(this.sPlaceHolderText==undefined){this.sPlaceHolderText=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("PlaceHolder_default");}var p=this._createPlaceHolder(n,this.sPlaceHolderText,d);var t=this;p.addEventDelegate({onclick:function(){t.doNavigation(null);}});this.oObjectStream.setPlaceHolder(p);}}},onAfterRendering:function(){C.prototype.onAfterRendering.apply(this,arguments);if(D.system.phone){this._cardWidth=this.getView().$().width();if(!this.bAfterColumnUpdateAttached){var c=this.getOwnerComponent().getComponentData();if(c&&c.mainComponent){var m=c.mainComponent,l=m.byId("ovpLayout");l.attachAfterColumnUpdate(function(e){this._setObjectStreamCardsSize(false);}.bind(this));this.bAfterColumnUpdateAttached=true;}}if(!this.bDeviceOrientationAttached){D.orientation.attachHandler(function(e){this._setObjectStreamCardsSize(true);}.bind(this));}}if(this.bSetErrorState&&this.bSetErrorState===true){this.setErrorState();return;}var v=this.getView();if(this.oObjectStream){var o=this.oObjectStream.getBinding("content");o.attachDataRequested(function(){if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){q(this.getView().byId('stackSize').getDomRef()).css('visibility','hidden');q(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','hidden');}},this);o.attachDataReceived(function(){var d=this.getView().getModel("ovpCardProperties").getObject("/category"),n=o.getCurrentContexts().length,e=o.getLength();v.byId("stackSize").setText(n);v.byId("stackTotalSize").setText(sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("Total_Size_Stack_Card",[e]));var s=this.getView().byId("stackContent").getDomRef();q(s).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCardContent",[n,e,d]));var f=this.getView().byId("stackSize").getDomRef();q(f).attr("aria-label",sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("stackCard",[n]));this.addPlaceHolder(e);if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){q(this.getView().byId('stackSize').getDomRef()).css('visibility','visible');q(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','visible');}var g=this.getView().getDomRef();var h=q(g).find('.sapOvpCardContentContainer');if(e!==0){if(h.length!==0){h.addClass('sapOvpCardNavigable');}}else{if(h.length!==0){var i=h.find("[role='button']");if(i.length!==0){i.removeAttr("role");}}}},this);this.addPlaceHolder("");if(o.bPendingRequest===false){o.fireDataReceived();}if(this.checkNavigation()){this.oObjectStream.getTitle().addStyleClass('sapOvpCardNavigable');}}},getCardItemsBinding:function(){return this.oObjectStream.getBinding("content");},_setObjectStreamCardsSize:function(i){var c=this.getView().$().width();if(this._cardWidth!=c||i){this.oObjectStream.setCardsSize(c);this._cardWidth=c;}},_createObjectStream:function(){if(this.oObjectStream instanceof O){return;}var o=this.getOwnerComponent();var c=o.getComponentData&&o.getComponentData();var p;var P;if(c.i18n){var d=c.i18n;}if(c&&c.mainComponent){p=c.mainComponent._getOvplibResourceBundle();}else{p=o.getOvplibResourceBundle();}P=o.getPreprocessors(p);var m=c.model;var e=P.xml.ovpCardProperties;var E=e.getProperty("/entitySet");var f=e.getProperty("/objectStreamCardsSettings");var M=m.getMetaModel();var g=M.getODataEntitySet(E);var h=M.getODataEntityType(g.entityType);var s=e.getProperty("/annotationPath");var i=(s)?s.split(","):[];var j,k,G;if(c){j=c.appComponent;k=c.mainComponent;}if(k){G=k.getView().byId("ovpGlobalFilter");}function l(N){if(N==="ovpCardProperties"){return e;}else if(N==="dataModel"){return m;}else if(N==="_ovpCache"){return{};}}var n=[{getSetting:l,bDummyContext:true},g].concat(i);var r=A.formatItems.apply(this,n);var t=B.complexParser(r);var u=e.getProperty("/objectStreamCardsNavigationProperty");var v=u?true:false;var w;var x=e.getProperty("/objectStreamCardsTemplate");if(v){if(x==="sap.ovp.cards.quickview"){q.sap.log.error("objectStreamCardsTemplate cannot be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is provided");this.bSetErrorState=true;return;}w=this._determineFilterPropertyId(m,g,h,u);f.entitySet=m.getMetaModel().getODataAssociationSetEnd(h,u).entitySet;}else{if(x!=="sap.ovp.cards.quickview"){q.sap.log.error("objectStreamCardsTemplate must be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is not provided");this.bSetErrorState=true;return;}var y=null;var z=e.getProperty("/identificationAnnotationPath");var H=(z)?z.split(","):[];if(H&&H.length>1){y=H[1];}if(y){f.identificationAnnotationPath=y;}if(h["com.sap.vocabularies.UI.v1.HeaderInfo"]&&h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName&&h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String){f.title=h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;}else{f.title=h.name;}f.entitySet=E;}f.isObjectStream=true;t.factory=function(N,Q){var R=f,U;if(v){U={filters:[{path:w.foreignKey,operator:"EQ",value1:Q.getProperty(w.key)}]};R=q.extend(U,f);}var W=new a();var X={name:e.getProperty("/objectStreamCardsTemplate"),async:true,componentData:{cardId:N,model:m,settings:R,appComponent:j,mainComponent:k}};if(G){X.componentData.globalFilter={getUiState:G.getUiState.bind(G)};}sap.ui.component(X).then(function(Y){Y.setBindingContext(Q);if(d){Y.setModel(d,"@i18n");}W.setComponent(Y);W.setBindingContext=function(Q){Y.setBindingContext(Q);};});return W;};var J=e.getObject("/title");this.sPlaceHolderText=e.getObject("/itemText");var K=new L({text:J,subtle:true,press:this.handleObjectStreamTitlePressed.bind(this)}).addStyleClass("sapOvpObjectStreamHeader");K.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));K.addCustomData(new b({key:"aria-label",value:J,writeToDom:true}));this.oObjectStream=new O(this.getView().getId()+"_ObjectStream",{title:K,content:t});this.oObjectStream.setModel(m);},_determineFilterPropertyId:function(m,e,E,n){var N,c=E.namespace,r,o;for(var i=0;i<E.navigationProperty.length;i++){if(E.navigationProperty[i].name===n){N=E.navigationProperty[i];break;}}r=N.relationship;o=A.getAssociationObject(m,r,c);var R=o.referentialConstraint,f={};if(R){f.foreignKey=R.dependent.propertyRef[0].name;f.key=R.principal.propertyRef[0].name;return f;}},_createPlaceHolder:function(n,p,s){var i=new I({src:"sap-icon://display-more",useIconTooltip:false,layoutData:new F({alignSelf:S.FlexAlignSelf.Center,styleClass:"sapOvpStackPlaceHolderIconContainer"})});i.addStyleClass("sapOvpStackPlaceHolderIcon");var c=n+" "+p;var d=sap.ui.getCore().getLibraryResourceBundle("sap.ovp").getText("SeeMoreContentAppName",[c,s]);var t=new T({text:d,textAlign:"Center",layoutData:new F({alignSelf:S.FlexAlignSelf.Center,maxWidth:"14rem"})});t.addCustomData(new b({key:"role",value:"heading",writeToDom:true}));t.addCustomData(new b({key:"aria-label",value:d,writeToDom:true}));t.addStyleClass("sapOvpStackPlaceHolderTextLine");var o=new V({items:[t]});o.addStyleClass("sapOvpStackPlaceHolderLabelsContainer");o.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));o.addCustomData(new b({key:"role",value:"button",writeToDom:true}));var v=new V({items:[i,o]});v.addStyleClass("sapOvpStackPlaceHolder");v.addEventDelegate({onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();e.srcControl.$().click();}}});return v;},openStack:function(){if(this.oObjectStream){var l=this.oObjectStream.getBinding("content");if(l.getCurrentContexts().length>0){var c=this.getView().$().width();this.getView().addDependent(this.oObjectStream);this.oObjectStream.setModel(this.getView().getModel("@i18n"),"@i18n");this.oObjectStream.open(c,this._oCard);}}},handleObjectStreamTitlePressed:function(e){this.doNavigation(null);}});});