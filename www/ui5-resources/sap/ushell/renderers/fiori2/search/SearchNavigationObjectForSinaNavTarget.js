sap.ui.define(['sap/ushell/renderers/fiori2/search/SearchNavigationObject'],function(S){"use strict";return S.extend("sap.ushell.renderers.fiori2.search.SearchNavigationObjectForSinaNavTarget",{constructor:function(s){S.prototype.constructor.apply(this,arguments);this._sinaNavigationTarget=s;this.setHref(s.targetUrl);this.setText(s.label);this.setTarget(s.target);this.sina=this._sinaNavigationTarget.sina;},performNavigation:function(p){this.trackNavigation();this._sinaNavigationTarget.performNavigation(p);},getResultSet:function(){return this.getResultSetItem().parent;},getResultSetItem:function(){var p=this._sinaNavigationTarget.parent;if(p instanceof this.sina.SearchResultSetItemAttribute){p=p.parent;}if(!(p instanceof this.sina.SearchResultSetItem)){throw'programm error';}if(p.parent instanceof this.sina.ObjectSuggestion){p=p.parent;}return p;},getResultSetId:function(){return this.getResultSet().id;},getPositionInList:function(){var r=this.getResultSet();var a=this.getResultSetItem();return r.items.indexOf(a);}});});