sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(q,B,F,a){"use strict";var A=new F({filters:[new F({path:"type",operator:a.EQ,value1:sap.ui.core.MessageType.Warning}),new F({path:"type",operator:a.EQ,value1:sap.ui.core.MessageType.Error})],and:false});var l="model";function g(t,c,C){var y,n;var I;var s=(function(){var o=c.getOwnerComponent();var r=t.componentRegistry[o.getId()];return!!(r.methods.showConfirmationOnDraftActivate&&r.methods.showConfirmationOnDraftActivate());})();function b(S){var r,L,m;r=C.getDialogFragment("sap.suite.ui.generic.template.fragments.MessagesBeforeSave",{itemSelected:function(){L.setProperty("/backbtnvisibility",true);},onBackButtonPress:function(){m.navigateBack();L.setProperty("/backbtnvisibility",false);},onAccept:function(){r.close();(y||q.noop)();},onReject:function(){r.close();(n||q.noop)();}},l,function(k){m=k.getContent()[0];k.setModel(sap.ui.getCore().getMessageManager().getMessageModel(),"msg");I=k.getContent()[0].getBinding("items");});L=r.getModel(l);L.setProperty("/situation",S);L.setProperty("/backbtnvisibility",false);var d=[];var e=t.oNavigationControllerProxy.getActiveComponents();var o=(S<3);for(var i=0;i<e.length;i++){var h=e[i];var R=t.componentRegistry[h];if(R.oController===c||S!==2){var j=(R.methods.getMessageFilters||q.noop)(o);d=j?d.concat(j):d;}}if(d.length===0){return null;}var O=d.length===1?d[0]:new F({filters:d,and:false});if(S===3){O=new F({filters:[O,A],and:true});}I.filter(O);return I.getLength()&&r;}function f(i){var v=b(i?1:2);if(v){v.open();return Promise.reject();}if(!(i&&s)){return Promise.resolve();}v=b(3);return v?new Promise(function(r,R){y=r;n=R;v.open();}):Promise.resolve();}function p(i,o){t.oApplicationProxy.performAfterSideEffectExecution(function(){if(!t.oBusyHelper.isBusy()){f(i).then(o);}});}return{prepareAndRunSaveOperation:p};}return B.extend("sap.suite.ui.generic.template.lib.BeforeSaveHelper",{constructor:function(t,c,C){q.extend(this,g(t,c,C));}});});