/**
 * @class Widget.Fader
 * @version 1.2.0
 * @author Marc Heiligers marc@eternal.co.za http://www.eternal.co.za
 */
if(typeof Widget=="undefined"){Widget={}}Widget.Fader=Class.create({initialize:function(A,C,B){this.img=$(A);this.list=C;this.options=Object.extend({id:this.img.id,fadeInDuration:2.5,fadeOutDuration:1.5,displayDuration:2.5,autoSize:false,autoStart:true,attributes:{},dir:"",beforeFade:null,startIndex:0,builder:Widget.Fader.imageBuilder},B||{});this.options.attributes.id=this.options.id;this.index=this.options.startIndex;this.container=$(this.img.parentNode);this.loadedObserver=this.loaded.bind(this);this.fadeInObserver=this.fadeIn.bind(this);this.nextObserver=this.next.bind(this);if(this.options.autoStart){setTimeout(this.start.bind(this),this.options.displayDuration*1000)}},start:function(){this.stopped=false;this.next()},stop:function(){this.stopped=true;try{clearTimeout(this.timeout)}catch(A){}try{Effect.Queues.get(this.options.id).each(function(B){B.cancel()})}catch(A){}if(this.oldImg){this.img=this.oldImg;--this.index}Element.setOpacity(this.img,1)},next:function(){this.oldImg=this.img;if(this.stopped||this.list.length==0){return }++this.index;if(this.index>=this.list.length){this.index=0}this.img=this.options.builder(this,this.list[this.index],this.loadedObserver)},loaded:function(){Event.stopObserving(this.img,"load",this.loadedObserver);if(typeof this.options.beforeFade=="function"){this.options.beforeFade(this.oldImg,false)}new Effect.Opacity(this.oldImg,{duration:this.options.fadeOutDuration,from:1,to:0,queue:{scope:this.options.id}});this.timeout=setTimeout(this.fadeInObserver,this.options.fadeOutDuration*1000)},fadeIn:function(){if(typeof this.options.beforeFade=="function"){this.options.beforeFade(this.img,true)}this.img.id=this.id;Element.setOpacity(this.img,0);if(this.options.autoSize){this.resize(this.img)}this.container.replaceChild(this.img,this.oldImg);this.oldImg=null;new Effect.Opacity(this.img,{duration:this.options.fadeInDuration,from:0,to:1,queue:{scope:this.options.id}});this.timeout=setTimeout(this.nextObserver,(this.options.fadeInDuration+this.options.displayDuration)*1000)},resize:function(B){var F=this.container.getDimensions();F.width-=parseInt(this.container.getStyle("padding-left"))+parseInt(this.container.getStyle("padding-right"))+parseInt(this.container.getStyle("border-left-width"))+parseInt(this.container.getStyle("border-right-width"));F.height-=parseInt(this.container.getStyle("padding-top"))+parseInt(this.container.getStyle("padding-bottom"))+parseInt(this.container.getStyle("border-top-width"))+parseInt(this.container.getStyle("border-bottom-width"));var C=F.width/B.width;var E=F.height/B.height;var A=B.width*E;var D=B.height*C;if(C>E){B.width=A;B.height=F.height}else{B.width=F.width;B.height=D}}});Widget.Fader.imageBuilder=function(D,C,B){var A=new Element("img",D.options.attributes);A.observe("load",B);A.src=D.options.dir+C;return A};Widget.Fader.textBuilder=function(C,B,A){var D=new Element("div",C.options.attributes).update(B);A.defer();return D};var Fader=Widget.Fader;