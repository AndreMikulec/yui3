YUI.add("event-focus",function(C){var B=C.Event,A=C.Lang.isString;function D(F,E){var G="_"+F+"Notifiers";C.Event.define(F,{_attach:function(I,J,H){return B._attach([this._proxyEvent,this._proxy,I,this,J,H],{capture:true});},_proxyEvent:E,_proxy:function(O,M,K){var L=O.target,J=L._node,H=L.getData(G),I=C.stamp(O.currentTarget),N;M.currentTarget=(K)?L:O.currentTarget;if(!H){H={};L.setData(G,H);N=B._attach([F,this._notify,J]);N.sub.once=true;}if(!H[I]){H[I]=[];}H[I].push(M);},_notify:function(O){var L=O.currentTarget,J=L.getData(G),N=L.get("ownerDocument")||L,M=L,I=[],K,H;while(M&&M!==N){I.push.apply(I,J[C.stamp(M)]||[]);M=M.get("parentNode");}I.push.apply(I,J[C.stamp(N)]||[]);for(K=0,H=I.length;K<H;++K){O.currentTarget=I[K].currentTarget;I[K].fire(O);}L.clearData(G);},on:function(J,H,I){H.onHandle=this._attach(J._node,I);},detach:function(I,H){H.onHandle.detach();},delegate:function(K,I,J,H){if(A(H)){H=C.delegate.compileFilter(H);}var L=this._attach(K._node,J,true);L.sub.getCurrentTarget=H;L.sub._notify=C.delegate.notifySub;I.delegateHandle=L;},detachDelegate:function(I,H){H.delegateHandle.detach();}},true);}D("focus",("onfocusin" in C.config.doc)?"beforeactivate":"focus");D("blur",("onfocusout" in C.config.doc)?"beforedeactivate":"blur");},"@VERSION@",{requires:["event-synthetic"]});