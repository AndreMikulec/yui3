YUI.add("attribute-base",function(C){C.State=function(){this.data={};};C.State.prototype={add:function(O,Y,b){var a=this.data;a[Y]=a[Y]||{};a[Y][O]=b;},addAll:function(O,a){var Y;for(Y in a){if(a.hasOwnProperty(Y)){this.add(O,Y,a[Y]);}}},remove:function(O,Y){var a=this.data;if(a[Y]&&(O in a[Y])){delete a[Y][O];}},removeAll:function(O,a){var Y=this.data;C.each(a||Y,function(c,b){if(C.Lang.isString(b)){this.remove(O,b);}else{this.remove(O,c);}},this);},get:function(O,Y){var a=this.data;return(a[Y]&&O in a[Y])?a[Y][O]:undefined;},getAll:function(O){var a=this.data,Y;C.each(a,function(c,b){if(O in a[b]){Y=Y||{};Y[b]=c[O];}},this);return Y;}};var I=C.Object,J=C.EventTarget,U=".",S="Change",L="getter",K="setter",M="readOnly",V="writeOnce",Z="validator",G="value",N="valueFn",E="broadcast",Q="lazyAdd",X="added",B="initializing",H="initValue",T="published",R="defaultValue",A="lazy",P="isLazyAdd",F,W={};W[M]=1;W[V]=1;W[L]=1;W[E]=1;function D(){var Y=this,O=this.constructor.ATTRS;Y._ATTR_E_FACADE={};J.call(Y,{emitFacade:true});Y._conf=Y._state=new C.State();Y._stateProxy=Y._stateProxy||null;Y._requireAddAttr=Y._requireAddAttr||false;if(O&&C.Base&&!(Y instanceof C.Base)){Y.addAttrs(O);}}D.INVALID_VALUE={};F=D.INVALID_VALUE;D._ATTR_CFG=[K,L,Z,G,N,V,M,Q,E];D.prototype={addAttr:function(Y,O,b){var c=this,e=c._state,d,a;b=(Q in O)?O[Q]:b;if(b&&!c.attrAdded(Y)){e.add(Y,A,O||{});e.add(Y,X,true);}else{if(!c.attrAdded(Y)||e.get(Y,P)){O=O||{};a=(G in O);if(a){d=O.value;delete O.value;}O.added=true;O.initializing=true;e.addAll(Y,O);if(a){c.set(Y,d);}e.remove(Y,B);}}return c;},attrAdded:function(O){return !!this._state.get(O,X);},modifyAttr:function(Y,O){var a=this,c,b;if(a.attrAdded(Y)){if(a._isLazyAttr(Y)){a._addLazyAttr(Y);}b=a._state;for(c in O){if(W[c]&&O.hasOwnProperty(c)){b.add(Y,c,O[c]);if(c===E){b.remove(Y,T);}}}}},removeAttr:function(O){this._state.removeAll(O);},get:function(O){return this._getAttr(O);},_isLazyAttr:function(O){return this._state.get(O,A);},_addLazyAttr:function(Y){var a=this._state,O=a.get(Y,A);a.add(Y,P,true);a.remove(Y,A);this.addAttr(Y,O);},set:function(O,a,Y){return this._setAttr(O,a,Y);},reset:function(O){var a=this,Y;if(O){if(a._isLazyAttr(O)){a._addLazyAttr(O);}a.set(O,a._state.get(O,H));}else{Y=a._state.data.added;C.each(Y,function(b,c){a.reset(c);},a);}return a;},_set:function(O,a,Y){return this._setAttr(O,a,Y,true);},_getAttr:function(a){var b=this,f=a,c=b._state,d,O,e,Y;if(a.indexOf(U)!==-1){d=a.split(U);a=d.shift();}if(b._tCfgs&&b._tCfgs[a]){Y={};Y[a]=b._tCfgs[a];delete b._tCfgs[a];b._addAttrs(Y,b._tVals);}if(b._isLazyAttr(a)){b._addLazyAttr(a);}e=b._getStateVal(a);O=c.get(a,L);e=(O)?O.call(b,e,f):e;e=(d)?I.getValue(e,d):e;return e;},_setAttr:function(a,d,O,b){var f=true,Y=this._state,g=Y.data,e,h,i,c;if(a.indexOf(U)!==-1){h=a;i=a.split(U);a=i.shift();}if(this._isLazyAttr(a)){this._addLazyAttr(a);}e=(!g.value||!(a in g.value));if(this._requireAddAttr&&!this.attrAdded(a)){}else{if(!e&&!b){if(Y.get(a,V)){f=false;}if(Y.get(a,M)){f=false;}}if(f){c=this.get(a);if(i){d=I.setValue(C.clone(c),i,d);if(d===undefined){f=false;}}if(f){if(Y.get(a,B)){this._setAttrVal(a,h,c,d);}else{this._fireAttrChange(a,h,c,d,O);}}}}return this;},_fireAttrChange:function(e,d,b,a,O){var g=this,c=e+S,Y=g._state,f;if(!Y.get(e,T)){g.publish(c,{queuable:false,defaultFn:g._defAttrChangeFn,silent:true,broadcast:Y.get(e,E)});Y.add(e,T,true);}f=(O)?C.merge(O):g._ATTR_E_FACADE;f.type=c;f.attrName=e;f.subAttrName=d;f.prevVal=b;f.newVal=a;g.fire(f);},_defAttrChangeFn:function(O){if(!this._setAttrVal(O.attrName,O.subAttrName,O.prevVal,O.newVal)){O.stopImmediatePropagation();}else{O.newVal=this._getStateVal(O.attrName);}},_getStateVal:function(O){var Y=this._stateProxy;if(!Y||this.attrAdded(O)){return this._state.get(O,G);}else{return(Y&&Y[O]);}},_setStateVal:function(O,a){var Y=this._stateProxy;if(!Y||this.attrAdded(O)){this._state.add(O,G,a);}else{Y[O]=a;}},_setAttrVal:function(j,i,f,d){var k=this,g=true,a=k._state,b=a.get(j,Z),e=a.get(j,K),h=a.get(j,B),Y=i||j,c,O;if(b){O=b.call(k,d,Y);if(!O&&h){d=a.get(j,R);O=true;}}if(!b||O){if(e){c=e.call(k,d,Y);if(c===F){g=false;}else{if(c!==undefined){d=c;}}}if(g){if(!i&&d===f){g=false;}else{if(a.get(j,H)===undefined){a.add(j,H,d);}k._setStateVal(j,d);}}}else{g=false;}return g;},setAttrs:function(Y){for(var O in Y){if(Y.hasOwnProperty(O)){this.set(O,Y[O]);}}return this;},getAttrs:function(b){var d=this,f={},c,Y,O,e,a=(b===true);b=(b&&!a)?b:I.keys(d._state.data.added);for(c=0,Y=b.length;c<Y;c++){O=b[c];e=d.get(O);if(!a||d._getStateVal(O)!=d._state.get(O,H)){f[O]=d.get(O);}}return f;},addAttrs:function(O,Y,a){var b=this;if(O){b._tCfgs=O;b._tVals=b._normAttrVals(Y);b._addAttrs(O,b._tVals,a);b._tCfgs=b._tVals=null;}return b;},_addAttrs:function(Y,a,b){var d=this,O,c,e;for(O in Y){if(Y.hasOwnProperty(O)){c=Y[O];c.defaultValue=c.value;e=d._getAttrInitVal(O,c,d._tVals);if(e!==undefined){c.value=e;}if(d._tCfgs[O]){delete d._tCfgs[O];}d.addAttr(O,c,b);}}},_normAttrVals:function(O){return(O)?C.merge(O):null;},_getAttrInitVal:function(O,Y,a){var b=(!Y[M]&&a&&a.hasOwnProperty(O))?b=a[O]:(Y[N])?Y[N].call(this):Y[G];return b;}};C.mix(D,J,false,null,1);C.Attribute=D;},"@VERSION@",{requires:["event-custom"]});