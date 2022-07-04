<script language="javascript" type="text/template" id="ui-copy-texts" data-contents="graphicDisable,videoDisable,audoDisable">
<p class="graphicDisable"><span style="color:#900;">使用者傳送了一張圖檔,但您尚未購買瀏覽圖片權限,無法使用.</span></p>
<p class="videoDisable"><span style="color:#900;">使用者傳送了一段影片,但您尚未購買播放影片權限,無法使用.</span></p>
<p class="audoDisable"><span style="color:#900;">使用者傳送了一段音訊,但您尚未購買播放音訊權限,無法使用.</span></p>
</script>
<script language="javascript" type="text/template" id="ui-copy-chat-pool">
<div class="chat-content col custom-scrollbar" data-child-node-length="0">
	<input type="hidden" name="userName" value />
	<!-- CHAT MESSAGES -->
	<div class="chat-messages">
		
	</div>
	<!-- CHAT MESSAGES -->
</div>
</script>
<script language="javascript" type="text/template" id="ui-copy-chat-speak-bar">
<form class="reply-form row no-gutters align-items-center w-100">
	<input type="hidden" name="userName" value />
	<div class="preview-messages off" data-allow-appear="0">
		<p></p>
	</div>
	<div class="form-group col mr-4">
		<textarea class="form-control" placeholder=""></textarea>
		<span style="position:absolute;bottom:-25px;display:block;font-size:87%;">文字折行請用Shift + Enter</span>
	</div>

	<button type="button" class="btn btn-fab btn-secondary" aria-label="Send message">
		<i class="icon icon-send"></i>
	</button>
</form>
</script>
<script language="javascript" type="text/template" id="ui-copy-chat-preview-messege">

</script>
<script language="javascript" type="text/template" id="ui-copy-operator-bubble">
<div class="row flex-nowrap message-row user p-4">
    <input type="hidden" name="operatorName" value />
    <input type="hidden" name="index" value />
	<div class="bubble">
		<div class="message" style="position:relative;"><button type="button"></button></div>
		<div class="time text-muted text-right mt-2">11/14/2018, 8:52:33 PM</div>
	</div>
</div>
</script>
<script language="javascript" type="text/template" id="ui-copy-user-bubble">
<div class="row flex-nowrap message-row contact p-4">
    <input type="hidden" name="userName" value />
    <input type="hidden" name="index" value />
    <img class="avatar mr-4" src="">
    <div class="bubble">
    	<div class="message" style="position:relative;"><button type="button"></button></div>
    	<div class="time text-muted text-right mt-2"></div>
    </div>
</div>
</script>
<script language="javascript" type="text/template" id="ui-copy-user-list-item">
<div class="contact ripple flex-wrap flex-sm-nowrap row p-4 no-gutters align-items-center unread fuse-ripple-ready">
	<input type="hidden" name="userName" value />
	<div class="col-auto avatar-wrapper"><img src="" class="avatar" alt=""></div>
	<div class="col px-4"><span class="name h6">人名</span>
	<!-- <p class="last-message text-truncate text-muted">pariatur commodo sunt nulla</p> -->
	</div>
	<div class="col-12 col-sm-auto d-flex flex-column align-items-end">
		<div class="last-message-time">日期</div>
		<div class="bg-secondary text-auto unread-message-count mt-2">未讀</div>
	</div>
	<button type="button" class="listItemBtn"></button>
</div>
</script>
<script language="javascript" type="text/template" id="ui-copy-user-list-item-divider">
<div class="divider"></div>
</script>
<script language="javascript" type="text/template" id="ui-copy-graphic-media">
<img style="width:140px">
</script>
<script language="javascript" type="text/template" id="ui-copy-sticker-media">
<img style="width:auto; max-width:100%; height:auto; display:block; margin:0 auto;">
</script>
<script language="javascript" type="text/template" id="ui-copy-video-media">
<video preload="auto" autoplay controls width="240" height="135">
	<source src="" type="video/mp4">
</video>
</script>
<script language="javascript" type="text/template" id="ui-copy-audio-media">
<audio preload="auto" autoplay controls="">
	<source src="" type="audio/mpeg">
</audio>
</script>
<script language="javascript" type="text/template" id="ui-copy-text-media">
<p></p>
</script>

<script language="javascript" type="text/template" id="js-scode-fuse-html-min-js">
!function(e){var n,t,r,d,i=["xs","sm","md","lg","xl"],a={xl:"(min-width: 1200px)",lg:"(min-width: 992px)",md:"(min-width: 768px)",sm:"(min-width: 576px)",xs:"(min-width: 0px)"};function u(){var i,a,o,s;t=e("body"),r=f(),c(),e(window).on("resize",(i=function(){r=f(),e(window).trigger("fuse::windowResized",[r,p,l]),d!==r&&c()},a=400,function(){var e=this,n=arguments,t=o&&!s;clearTimeout(s),s=setTimeout(function(){s=null,o||i.apply(e,n)},a),t&&i.apply(e,n)})),n={watchMatchMedia:u,triggerMatchMediaChanged:c,getCurrentStep:f,isOrAbove:l,isOrBelow:p},window.fuseMatchMedia=n}function f(){var t,i=!1;return e.each(a,function(e,n){!i&&window.matchMedia(n).matches&&(t=e,i=!0)}),t}function c(){t.addClass("media-step-"+r),t.removeClass("media-step-"+d),d=r,e(window).trigger("fuse::matchMediaChanged",[r,p,l])}function l(e){return i.indexOf(e)<=i.indexOf(r)}function p(e){var n=i.indexOf(e);return i.indexOf(r)<=n}e("document").ready(function(){u()})}(jQuery),function(b,e,i,n){var t="fuseRipple",a={duration:300,fromCenter:!1},o={input:function(e){var n=e.parentNode;if("span"!==n.tagName.toLowerCase()||!n.classList.contains("fuse-ripple-ready")){var t=i.createElement("span");t.className=e.className+" fuse-ripple-input-wrapper",e.className="fuse-ripple-input",n.replaceChild(t,e),t.appendChild(e)}},img:function(e){var n=e.parentNode;if("span"!==n.tagName.toLowerCase()||!n.classList.contains("fuse-ripple-ready")){var t=i.createElement("span");n.replaceChild(t,e),t.appendChild(e)}}};function s(e,n){this.element=e,this.options=b.extend({},a,n),this._defaults=a,this._name=t,this.init()}s.prototype={init:function(){i.body;var n,t=this;n=t.element;var e=t.element.tagName.toLowerCase();-1!==["input","img"].indexOf(e)&&(o[e](t.element),n=t.element.parentElement),b(n).hasClass("fuse-ripple-ready")||b(n).addClass("fuse-ripple-ready"),n.addEventListener("mousedown",function(e){e.stopPropagation(),t.triggerRipple(n,t.options,e)})},triggerRipple:function(e,n,t){var i=b(e);0<i.find(".fuse-ripple").length&&i.find(".fuse-ripple").remove();var a=b('<div class="fuse-ripple">'),o=i.offset(),s=0,r=0;"touches"in t&&t.touches.length?(s=t.touches[0].pageY-o.top,r=t.touches[0].pageX-o.left):(s=t.pageY-o.top,r=t.pageX-o.left);var d=i.outerWidth(),u=i.outerHeight(),f=Math.sqrt(Math.pow(d,2)+Math.pow(u,2)),c=.6*Math.max(d,u),l="translate("+parseInt(r-c/2)+"px ,"+parseInt(s-c/2)+"px)";n.fromCenter&&(l="translate("+parseInt(.2*d)+"px ,"+parseInt(.2*u)+"px)");var p="scale(1) "+l,m=f/c,h="scale("+m+")"+" "+("translate("+.5*(d-c)/m+"px ,"+.5*(u-c)/m+"px)"),g="opacity "+n.duration+"ms linear, transform  "+n.duration+"ms cubic-bezier(0.4, 0, 0.2, 1)";n.fromCenter;var v={width:c+"px",height:c+"px",transform:p,opacity:1},w={opacity:"0",transform:h,transition:g};b(a).css(v),i.append(a),setTimeout(function(){b(a).css(w)}),setTimeout(function(){i.find(a).remove()},n.duration)}},b.fn[t]=function(e){return this.each(function(){b.data(this,"plugin_"+t)||b.data(this,"plugin_"+t,new s(this,e))})}}(jQuery,window,document),function(a){function o(e){var n=a(this);r(n),function(e){if(!e.parent().hasClass("form-group"))return;e.parent(".form-group").removeClass("md-focus")}(n)}function s(e){var n=a(this);t(n),function(e){if(!e.parent().hasClass("form-group"))return;e.parent(".form-group").addClass("md-focus")}(n)}function r(e){0!==e.val().length?t(e):e.removeClass("md-has-value")}function t(e){e.addClass("md-has-value")}a.fn.fuseMdInput=function(){!function(e){for(var n,t=e,i=0;n=t[i];i++)r(a(n));t.on("blur",o),t.on("focus",s)}(this)}}(jQuery),function(a){var n,t,o=!0,s=!1;function i(){c("","fuse-aside-expanded"),o=!1,e("fuse::asideExpanded",[])}function r(){c("fuse-aside-expanded",""),o=!0,e("fuse::asideCollapsed",[])}function d(){o?n.expand():n.collapse()}function u(){s?f():function(){if(s)return;r(),s=!0,c("","fuse-aside-folded"),a("body").addClass("fuse-aside-folded"),e("fuse::asideFolded",[])}()}function f(){s&&(i(),s=!1,c("fuse-aside-folded",""),e("fuse::asideUnfolded",[]))}function c(e,n){a("body").removeClass(e).addClass(n)}function e(e,n){setTimeout(function(){a(window).trigger(e,n)},300)}a("document").ready(function(){var e;e=a("#aside"),t=e,n={collapse:r,expand:i,toggle:d,toggleFold:u},window.fuseAside=n,a("[data-fuse-aside-toggle-fold]").on("click",function(){u()}),t.on("mouseenter touchstart",function(){s&&o&&i()}),a(document).on("mousemove touchstart",function(e){t.is(e.target)||0!==t.has(e.target).length||s&&!o&&r()})}),a(window).on("fuse::matchMediaChanged",function(e,n,t,i){window.fuseAside||(t("md")?c("fuse-aside-folded",""):a("body").hasClass("fuse-aside-folded")&&(o=s=!0)),t("md")&&f()})}(jQuery),function(o){var s,r=!1;function d(e){return s.instances[e]}function n(e){var n,t=d(e);t.isActive&&(t.opened?i(e):(n=e,a().then(function(){var e=d(n);e.el.css({transform:"translate3D(0,0,0)"}),e.el.removeClass("fuse-bar-closed"),e.el.addClass("fuse-bar-open"),e.opened=!0,(r=o('<div class="fuse-bar-backdrop fuse-bar-backdrop-'+n.replace(" ","-")+'"></div>')).hide(),e.el.after(r),r.fadeIn(),r.on("click",function(e){e.preventDefault(),e.stopPropagation(),i(n)}),f("fuse::barOpened",[n,e])})))}function i(e,n){var t=jQuery.Deferred(),i=d(e);function a(){i.el.removeClass("fuse-bar-open"),i.el.addClass("fuse-bar-closed"),t.resolve("closed")}return i.el.css({transform:""}),n?a():setTimeout(a,300),i.opened=!1,r&&r.fadeOut(function(){o(this).remove()}),f("fuse::barClosed",[e,i]),t.promise()}function t(e){e.el.addClass("fuse-bar"),e.el.addClass("position-"+e.position),e.isActive=!0,f("fuse::barInit",[e.id,e])}function e(e,n,t,i){o.each(s.instances,function(e,n){u(n)}),a()}function u(e){var n;e.mediaStep?window.fuseMatchMedia.isOrBelow(e.mediaStep)?t(e):((n=e).el.removeClass("fuse-bar"),n.el.removeClass("position-"+n.position),n.isActive=!1,f("fuse::barDestroy",[n.id,n])):(t(e),i(e.id,!0))}function a(){var t=[];return o.each(s.instances,function(e,n){n.opened&&t.push(i(e))}),o.when.apply(o,t)}function f(e,n){setTimeout(function(){o(window).trigger(e,n)},300)}window.fuseBar=s={instances:{},toggle:n,closeAll:a},o("document").ready(function(){o("[data-fuse-bar]").each(function(e){var n,t,i,a;n=o(this),t=n.data("fuse-bar"),i=n.data("fuse-bar-media-step"),a=n.data("fuse-bar-position"),s.instances[t]={id:t,el:n,mediaStep:i||!1,opened:!1,isActive:!1,position:a||"left"},u(s.instances[t])}),o("[data-fuse-bar-toggle]").on("click",function(e){n(o(this).data("fuse-bar-toggle"))}),o("[data-fuse-bar-close]").on("click",function(e){i(o(this).data("fuse-bar-close"))}),o(window).on("fuse::matchMediaChanged",e)}),o(window).on("resize",function(){})}(jQuery),function(e){e("document").ready(function(){e("input.form-control, textarea.form-control").fuseMdInput(),e(".btn-toolbar .btn-group .btn:not(.dropdown-toggle), .radio-icon, .checkbox-icon, .custom-control-indicator, .pagination .page-link, .btn-icon, .btn-fab, .ripple-centered, .ripple-center").fuseRipple({fromCenter:!0}),e(".ripple, .btn:not(.no-ripple), .radio-icon, .checkbox-icon, .custom-control-indicator, .pagination .page-link, .dropdown-item").fuseRipple(),e(window).on("fuse::barInit fuse::barClosed fuse::asideFolded fuse::asideUnfolded",function(e,n){window.dispatchEvent(new Event("resize"))})}),e(window).on("load",function(){setTimeout(function(){e(".fuse-cloak").removeClass("fuse-cloak"),e("[fuse-cloak]").removeAttr("fuse-cloak")})})}(jQuery);
</script>