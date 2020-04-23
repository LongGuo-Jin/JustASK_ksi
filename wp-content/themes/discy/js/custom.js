(function($) { "use strict";
	
	/* Mobile */
	
	if( navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || 
		navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || 
		navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){ 
		var mobile_device = true;
	}else{ 
		var mobile_device = false;
	}
	
	/* Vars */
	
	var $window = jQuery(window);
	var is_RTL  = jQuery('body').hasClass('rtl')?true:false;
	
	/* Menu */
	
	jQuery("nav.nav ul li ul").parent("li").addClass("parent-list");
	jQuery(".parent-list").find("a:first").append(" <span class='menu-nav-arrow'><i class='icon-right-open-mini'></i></span>");
	
	jQuery("nav.nav ul a").removeAttr("title");
	jQuery("nav.nav ul ul").css({display: "none"});
	jQuery("nav.nav ul li").each(function() {	
		var sub_menu = jQuery(this).find("ul:first");
		jQuery(this).hover(function() {	
			sub_menu.stop().css({overflow:"hidden", height:"auto", display:"none", paddingTop:0}).slideDown(200, function() {
				jQuery(this).css({overflow:"visible", height:"auto"});
			});	
		},function() {	
			sub_menu.stop().slideUp(50, function() {	
				jQuery(this).css({overflow:"hidden", display:"none"});
			});
		});	
	});
	
	/* Header fixed */
	
	var fixed_enabled = jQuery("#wrap").hasClass("fixed-enabled");
	if (fixed_enabled && jQuery(".header").length) {
		var hidden_header = jQuery(".hidden-header").offset().top;
		if (hidden_header < 40) {
			var aboveHeight = -20;
		}else {
			var aboveHeight = hidden_header;
		}
		$window.scroll(function(){
			if ($window.scrollTop() > aboveHeight && $window.scrollTop() > 0) {
				jQuery(".header").css({"top":"0"}).addClass("fixed-nav");
			}else {
				jQuery(".header").css({"top":"auto"}).removeClass("fixed-nav");
			}
		});
	}else {
		jQuery(".header").removeClass("fixed-nav");
	}
	
	/* Header mobile */
	
	jQuery("nav.nav > ul > li").clone().appendTo('.navigation_mobile > ul');
	
	/* Call to action */
	
	if (jQuery(".call-action-style_1").length) {
		var action_button = jQuery(".call-action-button").outerHeight();
		var action_content = jQuery(".call-action-style_1 .discy-container").outerHeight();
		jQuery(".call-action-button").css({"margin-top":(action_content-action_button)/2});
	}
	
	/* User login */
	
	if (jQuery(".user-click").length) {
		jQuery(".user-click:not(.user-click-not)").on("click",function () {
			jQuery(".user-notifications.user-notifications-seen").removeClass("user-notifications-seen").find(" > div").slideUp(200);
			jQuery(".user-messages > div").slideUp(200);
			jQuery(this).parent().toggleClass("user-click-open").find(" > ul").slideToggle(200);
		});
	}
	
	/* Tipsy */
	
	jQuery(".tooltip-n").tipsy({fade:true,gravity:"s"});
	jQuery(".tooltip-s").tipsy({fade:true,gravity:"n"});
	jQuery(".tooltip-nw").tipsy({fade:true,gravity:"nw"});
	jQuery(".tooltip-ne").tipsy({fade:true,gravity:"ne"});
	jQuery(".tooltip-w").tipsy({fade:true,gravity:"w"});
	jQuery(".tooltip-e").tipsy({fade:true,gravity:"e"});
	jQuery(".tooltip-sw").tipsy({fade:true,gravity:"sw"});
	jQuery(".tooltip-se").tipsy({fade:true,gravity:"se"});
	
	if (jQuery(".user-login-click").length) {
		var user_image   = jQuery(".user-login-click .user-image");
		var user_image_h = user_image.outerHeight();
		var user_login   = jQuery(".user-login-click .user-login");
		var user_login_h = user_login.outerHeight();
		user_login.css({"margin-top":(user_image_h-user_login_h)/2});
		
		$window.bind("resize", function () {
			var user_image   = jQuery(".user-login-click .user-image");
			var user_image_h = user_image.outerHeight();
			var user_login   = jQuery(".user-login-click .user-login");
			var user_login_h = user_login.outerHeight();
			user_login.css({"margin-top":(user_image_h-user_login_h)/2});
		});
	}
	
	/* Nav menu */
	
	if (jQuery("nav.nav_menu").length) {
		jQuery(".nav_menu > ul > li > a,.nav_menu > div > ul > li > a").on("click",function () {
			var li_menu = jQuery(this).parent();
			if (li_menu.find(" > ul").length) {
				if (li_menu.hasClass("nav_menu_open")) {
					li_menu.find(" > ul").slideUp(200,function () {
						li_menu.removeClass("nav_menu_open");
					});
				}else {
					li_menu.find(" > ul").slideDown(200,function () {
						li_menu.addClass("nav_menu_open");
					});
				}
				jQuery(".discy-main-wrap,.discy-main-inner,.fixed-sidebar,.fixed_nav_menu").css({"height":"auto"});
				return false;
			}
		});
	}
	
	/* Mobile aside */
	
	if (jQuery('.mobile-menu-click').length) {
		jQuery('.mobile-menu-click').each(function () {
			var mobile_menu_click = jQuery(this);
			var mobile_aside = jQuery('.'+mobile_menu_click.data("menu"));
			mobile_aside.find('li.menu-item-has-children').append('<span class="mobile-arrows"><i class="icon-down-open"></i></span>');
			mobile_aside.find('.mobile-aside-close').on('touchstart click',function () {
				mobile_aside.removeClass('mobile-aside-open');
				return false;
			});
			
			jQuery(mobile_menu_click).on('touchstart click',function () {
				jQuery(".user-notifications.user-notifications-seen").removeClass("user-notifications-seen").find(" > div").slideUp(200);
				jQuery(".user-messages > div").slideUp(200);
				var mobile_open = jQuery(this).data("menu");
				if (jQuery('.'+mobile_open+'.mobile-menu-wrap').hasClass("mobile-aside-open")) {
					jQuery('.mobile-menu-wrap.'+mobile_open).removeClass('mobile-aside-open');
				}else {
					jQuery('.'+mobile_open+'.mobile-menu-wrap').addClass('mobile-aside-open');
				}
				jQuery('.mobile-menu-wrap:not(".'+mobile_open+'")').removeClass('mobile-aside-open');
				return false;
			});
			
			if (mobile_aside.find('ul.menu > li').length) {
				mobile_aside.find('li.menu-item-has-children > a,li.menu-item-has-children > .mobile-arrows').on("touchstart click",function(){
					jQuery(this).parent().find('ul:first').slideToggle(200);
					jQuery(this).parent().find('> .mobile-arrows').toggleClass('mobile-arrows-open');
					return false;
				});
			}
			
			mobile_aside.find('.mobile-aside-inner').mCustomScrollbar({axis:'y'});
		});
	}
	
	/* Post share */
	
	if (jQuery(".article-post-only .post-share").length) {
		var cssArea = (is_RTL == true?"left":"right");
		jQuery(".article-post-only .post-share").each(function () {
			var share_width = jQuery(this).find(" > ul").css({"position":"static"}).outerWidth()+20;
			jQuery(this).find(" > ul").css({"position":"absolute"}).css(cssArea,"-"+share_width+"px");
		});
	}
	
	/* Go up */
	
	$window.scroll(function () {
		var cssArea = (is_RTL == true?"left":"right");
		if (jQuery(this).scrollTop() > 100 ) {
			jQuery(".go-up").css(cssArea,"20px");
			jQuery(".ask-button").css(cssArea,(jQuery(".go-up").length?"70px":"20px"));
		}else {
			jQuery(".go-up").css(cssArea,"-60px");
			jQuery(".ask-button").css(cssArea,"20px");
		}
	});
	
	jQuery(".go-up").on("click",function(){
		jQuery("html,body").animate({scrollTop:0},500);
		return false;
	});
	
	/* Tabs */
	
	if (jQuery(".widget ul.tabs").length) {
		jQuery(".widget ul.tabs").tabs(".widget .tab-inner-wrap",{effect:"slide",fadeInSpeed:100});
	}
	
	if (jQuery("ul.tabs-box").length) {
		jQuery("ul.tabs-box").tabs(".tab-inner-wrap-box",{effect:"slide",fadeInSpeed:100});
	}
	
	/* Owl */
	
	if (jQuery(".slider-owl").length) {
		jQuery(".slider-owl").each(function () {
			var $slider = jQuery(this);
			var $slider_item = $slider.find('.slider-item').length;
			$slider.find('.slider-item').css({"height":"auto"});
			if ($slider.find('img').length) {
				var $slider = jQuery(this).imagesLoaded(function() {
					$slider.owlCarousel({
						autoplay: 5000,
						margin: 10,
						responsive: {
							0: {
								items: 1
							}
						},
						autoplayHoverPause: true,
						navText : ["", ""],
						nav: ($slider_item > 1)?true:false,
						rtl: is_RTL,
						loop: ($slider_item > 1)?true:false,
						autoHeight: true
					});
				});
			}else {
				$slider.owlCarousel({
					autoplay: 5000,
					margin: 10,
					responsive: {
						0: {
							items: 1
						}
					},
					autoplayHoverPause: true,
					navText : ["", ""],
					nav: ($slider_item > 1)?true:false,
					rtl: is_RTL == true,
					loop: ($slider_item > 1)?true:false,
					autoHeight: true
				});
			}
		});
	}
	
	/* Accordion & Toggle */
	
	if (jQuery(".accordion").length) {
		jQuery(".accordion .accordion-title").each(function(){
			jQuery(this).on("click",function() {
				if (jQuery(this).parent().parent().hasClass("toggle-accordion")) {
					jQuery(this).parent().find("li:first .accordion-title").addClass("active");
					jQuery(this).parent().find("li:first .accordion-title").next(".accordion-inner").addClass("active");
					jQuery(this).toggleClass("active");
					jQuery(this).next(".accordion-inner").slideToggle(200).toggleClass("active");
					jQuery(this).find("i").toggleClass("icon-minus").toggleClass("icon-plus");
				}else {
					if (jQuery(this).next().is(":hidden")) {
						jQuery(this).parent().parent().find(".accordion-title").removeClass("active").next().slideUp(200);
						jQuery(this).parent().parent().find(".accordion-title").next().removeClass("active").slideUp(200);
						jQuery(this).toggleClass("active").next().slideDown(200);
						jQuery(this).next(".accordion-inner").toggleClass("active");
						jQuery(this).parent().parent().find("i").removeClass("icon-plus").addClass("icon-minus");
						jQuery(this).find("i").removeClass("icon-minus").addClass("icon-plus");
					}
				}
				jQuery(".discy-main-wrap,.discy-main-inner,.fixed-sidebar,.fixed_nav_menu").css({"height":"auto"});
				return false;
			});
		});
	}
	
	/* Flex menu */
	
	if (jQuery("ul.menu.flex").length) {
		jQuery('ul.menu.flex').flexMenu({
			threshold   : 0,
			cutoff      : 0,
			linkText    : '<i class="icon-dot-3"></i>',
			linkTextAll : '<i class="icon-dot-3"></i>',
			linkTitle   : '',
			linkTitleAll: '',
			showOnHover : ($window.width() > 991?true:false),
		});
		
		jQuery("ul.menu.flex .active-tab,ul.menu.flex .active").closest(".menu-tabs").addClass("active-menu");
	}
	
	if (jQuery("nav.nav ul").length) {
		jQuery('nav.nav ul').flexMenu({
			threshold   : 0,
			cutoff      : 0,
			linkText    : '<i class="icon-dot-3"></i>',
			linkTextAll : '<i class="icon-dot-3"></i>',
			linkTitle   : '',
			linkTitleAll: '',
			showOnHover : ($window.width() > 991?true:false),
		});
		
		jQuery("nav.nav ul .active-tab").parent().parent().addClass("active-menu");
	}
	
	/* Select */
	
	if (jQuery(".widget select").length) {
		jQuery(".widget select").wrap('<div class="styled-select"></div>');
	}
	
	/* Lightbox */
	
	if (jQuery(".active-lightbox").length) {
		var lightboxArgs = {			
			animation_speed: "fast",
			overlay_gallery: true,
			autoplay_slideshow: false,
			slideshow: 5000, // light_rounded / dark_rounded / light_square / dark_square / facebook
			theme: "pp_default", 
			opacity: 0.8,
			show_title: false,
			social_tools: "",
			deeplinking: false,
			allow_resize: true, // Resize the photos bigger than viewport. true/false
			counter_separator_label: "/", // The separator for the gallery counter 1 "of" 2
			default_width: 940,
			default_height: 529
		};
		
		jQuery("a[href$=jpg], a[href$=JPG], a[href$=jpeg], a[href$=JPEG], a[href$=png], a[href$=gif], a[href$=bmp]:has(img)").prettyPhoto(lightboxArgs);
		jQuery("a[class^='prettyPhoto'], a[rel^='prettyPhoto']").prettyPhoto(lightboxArgs);
	}
	
	/* 2 columns questions */
	
	if (jQuery(".article-question.post-with-columns").length) {
		if (jQuery(".article-question.post-with-columns.question-masonry").length) {
			jQuery(".question-articles").isotope({
				filter: "*",
				animationOptions: {
					duration: 750,
					itemSelector: '.question-masonry',
					easing: "linear",
					queue: false,
				}
			});
		}else {
			jQuery(".article-question.post-with-columns").matchHeight();
			jQuery(".article-question.post-with-columns > .single-inner-content").matchHeight();
		}
	}
	
	/* Load */
	
	$window.load(function() {
		
		/* Loader */
		
		jQuery(".loader").fadeOut(500);
		
		/* Users */
		
		if (jQuery(".user-section-grid,.user-section-simple").length) {
			if (jQuery(".users-masonry").length) {
				jQuery(".users-masonry").isotope({
					filter: "*",
					animationOptions: {
						duration: 750,
						itemSelector: '.user-masonry',
						easing: "linear",
						queue: false,
					}
				});
			}else {
				jQuery('.user-section-grid,.user-section-simple').each(function() {
					jQuery(this).find('> div > div').matchHeight();
				});
			}
		}
		
		if (jQuery(".user-section-columns").length) {
			if (jQuery(".users-masonry").length) {
				jQuery(".users-masonry").isotope({
					filter: "*",
					animationOptions: {
						duration: 750,
						itemSelector: '.user-masonry',
						easing: "linear",
						queue: false,
					}
				});
			}else {
				jQuery('.user-section-columns').each(function() {
					jQuery(this).find('.post-inner').matchHeight();
				});
			}
		}
		
		/* Badges & Tags & Categories */
		
		if (jQuery(".badge-section,.tag-sections,.points-section ul .point-section").length) {
			jQuery(".badge-section > *,.tag-sections,.points-section ul .point-section").matchHeight();
		}
		
		/* 2 columns questions */
		
		if (jQuery(".article-question.post-with-columns").length) {
			if (jQuery(".article-question.post-with-columns.question-masonry").length) {
				jQuery(".question-articles").imagesLoaded(function() {
					jQuery(".question-articles").isotope({
						filter: "*",
						animationOptions: {
							duration: 750,
							itemSelector: '.question-masonry',
							easing: "linear",
							queue: false,
						}
					});
				});
			}else {
				jQuery(".article-question.post-with-columns").matchHeight();
				jQuery(".article-question.post-with-columns > .single-inner-content").matchHeight();
			}
		}
		
		/* Sticky Question */
		
		var sticky_sidebar = jQuery(".single-question .question-sticky");
		if (sticky_sidebar.length && $window.width() > 480) {
			jQuery(".single-question .question-vote-sticky").css({"width":sticky_sidebar.outerWidth()});
			jQuery('.single-question .question-vote-sticky').theiaStickySidebar({updateSidebarHeight: false, additionalMarginTop: (jQuery("#wrap.fixed-enabled").length?jQuery(".hidden-header").outerHeight():0)+40,minWidth : sticky_sidebar.outerWidth()});
		}
		
		/* Questions */
		
		if (jQuery(".question-header-mobile").length) {
			$window.bind("resize", function () {
				if (jQuery(this).width() < 480) {
					if (jQuery(".question-header-mobile").length) {
						jQuery(".article-question").each(function () {
							var question_mobile_h = jQuery(this).find(".question-header-mobile").outerHeight()-20;
							var author_image_h = jQuery(this).find(".author-image").outerHeight();
							jQuery(this).find(".author-image").css({"margin-top":(question_mobile_h-author_image_h)/2});
						});
					}
				}else {
					jQuery(".article-question .author-image,.question-image-vote,.question-image-vote .theiaStickySidebar").removeAttr("style");
					jQuery(".article-question .author-image").css({"width":"46px"});
					
					if (sticky_sidebar.length) {
						jQuery(".single-question .question-image-vote").css({"width":sticky_sidebar.outerWidth()});
						jQuery('.single-question .question-image-vote').theiaStickySidebar({updateSidebarHeight: false, additionalMarginTop: (jQuery("#wrap.fixed-enabled").length?jQuery(".hidden-header").outerHeight():0)+40,minWidth : sticky_sidebar.outerWidth()});
					}
				}
			});
			
			if ($window.width() < 480) {
				if (jQuery(".question-header-mobile").length) {
					jQuery(".article-question").each(function () {
						var question_mobile_h = jQuery(this).find(".question-header-mobile").outerHeight()-20;
						var author_image_h = jQuery(this).find(".author-image").outerHeight();
						jQuery(this).find(".author-image").css({"margin-top":(question_mobile_h-author_image_h)/2});
					});
				}
			}
		}
		
		if (jQuery("section .question-articles > .article-question").length > 3 && jQuery("section .question-articles > .article-question .author-image-pop-2").length) {
			var last_question_h = jQuery("section .question-articles > .article-question:last-child").height();
			var last_popup_h = jQuery("section .question-articles > .article-question:last-child .author-image-pop-2").height();
			if (last_question_h < last_popup_h) {
				jQuery("section .question-articles > .article-question:last-child .author-image-pop-2").addClass("author-image-pop-top");
			}
			if (jQuery("section .question-articles > .article-question:last-child .question-bottom > .commentlist").length) {
				var last_question_answer_h = jQuery("section .question-articles > .article-question:last-child .question-bottom > .commentlist .comment").height();
				var last_answer_popup_h = jQuery("section .question-articles > .article-question:last-child .question-bottom > .commentlist .comment .author-image-pop-2").height();
				if (last_question_answer_h < last_answer_popup_h) {
					jQuery("section .question-articles > .article-question:last-child .question-bottom > .commentlist .comment .author-image-pop-2").addClass("author-image-pop-top");
				}
			}
		}
		
		if ($window.width() > 991 && jQuery(".page-content.commentslist > ol > .comment").length > 3 && jQuery(".page-content.commentslist > ol > .comment .author-image-pop-2").length) {
			var last_answer_h = jQuery(".page-content.commentslist > ol > .comment:last-child").height();
			var last_popup_h = jQuery(".page-content.commentslist > ol > .comment:last-child .author-image-pop-2").height();
			if (last_answer_h < last_popup_h) {
				jQuery(".page-content.commentslist > ol > .comment:last-child .author-image-pop-2").addClass("author-image-pop-top");
			}
		}
		
	});
	
})(jQuery);

jQuery.noConflict()(function discy_sidebar() {
	var main_wrap_h    = jQuery(".discy-main-wrap").outerHeight();
	var main_sidebar_h = jQuery(".inner-sidebar").outerHeight();
	if (jQuery(".nav_menu_sidebar").length) {
		var nav_menu_h = jQuery(".nav_menu_sidebar").outerHeight();
		jQuery('.discy-main-wrap,.nav_menu_sidebar').matchHeight();
	}else {
		var nav_menu_h = jQuery(".nav_menu").outerHeight();
	}
	if (jQuery('.menu_left').length && nav_menu_h > main_wrap_h) {
		$window.load(function() {
			setTimeout(function() {
				jQuery('.discy-main-inner,nav.nav_menu,div.nav_menu_sidebar').matchHeight();
			},2000);
		});
	}else if ((main_wrap_h > nav_menu_h && jQuery(".fixed_nav_menu").length) || (main_wrap_h > main_sidebar_h && jQuery(".fixed-sidebar").length)) {
		if (jQuery(".fixed_nav_menu").length) {
			jQuery('.discy-main-wrap,.fixed_nav_menu').theiaStickySidebar({updateSidebarHeight: (jQuery(".widget-footer").length?false:true), additionalMarginTop: (jQuery("#wrap.fixed-enabled").length?jQuery(".hidden-header").outerHeight():0)+jQuery(".admin-bar #wpadminbar").outerHeight()+30});
		}
		if (jQuery(".fixed-sidebar").length) {
			jQuery('.discy-main-wrap,.fixed-sidebar').theiaStickySidebar({updateSidebarHeight: (jQuery(".widget-footer").length?false:true), additionalMarginTop: (jQuery("#wrap.fixed-enabled").length?jQuery(".hidden-header").outerHeight():0)+jQuery(".admin-bar #wpadminbar").outerHeight()});
		}
	}
});


!function(e,t,n){"use strict";!function o(e,t,n){function a(s,l){if(!t[s]){if(!e[s]){var i="function"==typeof require&&require;if(!l&&i)return i(s,!0);if(r)return r(s,!0);var u=new Error("Cannot find module '"+s+"'");throw u.code="MODULE_NOT_FOUND",u}var c=t[s]={exports:{}};e[s][0].call(c.exports,function(t){var n=e[s][1][t];return a(n?n:t)},c,c.exports,o,e,t,n)}return t[s].exports}for(var r="function"==typeof require&&require,s=0;s<n.length;s++)a(n[s]);return a}({1:[function(o,a,r){var s=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(r,"__esModule",{value:!0});var l,i,u,c,d=o("./modules/handle-dom"),f=o("./modules/utils"),p=o("./modules/handle-swal-dom"),m=o("./modules/handle-click"),v=o("./modules/handle-key"),y=s(v),h=o("./modules/default-params"),b=s(h),g=o("./modules/set-params"),w=s(g);r["default"]=u=c=function(){function o(e){var t=a;return t[e]===n?b["default"][e]:t[e]}var a=arguments[0];if(d.addClass(t.body,"stop-scrolling"),p.resetInput(),a===n)return f.logStr("SweetAlert expects at least 1 attribute!"),!1;var r=f.extend({},b["default"]);switch(typeof a){case"string":r.title=a,r.text=arguments[1]||"",r.type=arguments[2]||"";break;case"object":if(a.title===n)return f.logStr('Missing "title" argument!'),!1;r.title=a.title;for(var s in b["default"])r[s]=o(s);r.confirmButtonText=r.showCancelButton?"Confirm":b["default"].confirmButtonText,r.confirmButtonText=o("confirmButtonText"),r.doneFunction=arguments[1]||null;break;default:return f.logStr('Unexpected type of argument! Expected "string" or "object", got '+typeof a),!1}w["default"](r),p.fixVerticalPosition(),p.openModal(arguments[1]);for(var u=p.getModal(),v=u.querySelectorAll("button"),h=["onclick","onmouseover","onmouseout","onmousedown","onmouseup","onfocus"],g=function(e){return m.handleButton(e,r,u)},C=0;C<v.length;C++)for(var S=0;S<h.length;S++){var x=h[S];v[C][x]=g}p.getOverlay().onclick=g,l=e.onkeydown;var k=function(e){return y["default"](e,r,u)};e.onkeydown=k,e.onfocus=function(){setTimeout(function(){i!==n&&(i.focus(),i=n)},0)},c.enableButtons()},u.setDefaults=c.setDefaults=function(e){if(!e)throw new Error("userParams is required");if("object"!=typeof e)throw new Error("userParams has to be a object");f.extend(b["default"],e)},u.close=c.close=function(){var o=p.getModal();d.fadeOut(p.getOverlay(),5),d.fadeOut(o,5),d.removeClass(o,"showSweetAlert"),d.addClass(o,"hideSweetAlert"),d.removeClass(o,"visible");var a=o.querySelector(".sa-icon.sa-success");d.removeClass(a,"animate"),d.removeClass(a.querySelector(".sa-tip"),"animateSuccessTip"),d.removeClass(a.querySelector(".sa-long"),"animateSuccessLong");var r=o.querySelector(".sa-icon.sa-error");d.removeClass(r,"animateErrorIcon"),d.removeClass(r.querySelector(".sa-x-mark"),"animateXMark");var s=o.querySelector(".sa-icon.sa-warning");return d.removeClass(s,"pulseWarning"),d.removeClass(s.querySelector(".sa-body"),"pulseWarningIns"),d.removeClass(s.querySelector(".sa-dot"),"pulseWarningIns"),setTimeout(function(){var e=o.getAttribute("data-custom-class");d.removeClass(o,e)},300),d.removeClass(t.body,"stop-scrolling"),e.onkeydown=l,e.previousActiveElement&&e.previousActiveElement.focus(),i=n,clearTimeout(o.timeout),!0},u.showInputError=c.showInputError=function(e){var t=p.getModal(),n=t.querySelector(".sa-input-error");d.addClass(n,"show");var o=t.querySelector(".sa-error-container");d.addClass(o,"show"),o.querySelector("p").innerHTML=e,setTimeout(function(){u.enableButtons()},1),t.querySelector("input").focus()},u.resetInputError=c.resetInputError=function(e){if(e&&13===e.keyCode)return!1;var t=p.getModal(),n=t.querySelector(".sa-input-error");d.removeClass(n,"show");var o=t.querySelector(".sa-error-container");d.removeClass(o,"show")},u.disableButtons=c.disableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!0,n.disabled=!0},u.enableButtons=c.enableButtons=function(){var e=p.getModal(),t=e.querySelector("button.confirm"),n=e.querySelector("button.cancel");t.disabled=!1,n.disabled=!1},"undefined"!=typeof e?e.sweetAlert=e.swal=u:f.logStr("SweetAlert is a frontend module!"),a.exports=r["default"]},{"./modules/default-params":2,"./modules/handle-click":3,"./modules/handle-dom":4,"./modules/handle-key":5,"./modules/handle-swal-dom":6,"./modules/set-params":8,"./modules/utils":9}],2:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o={title:"",text:"",type:null,allowOutsideClick:!1,showConfirmButton:!0,showCancelButton:!1,closeOnConfirm:!0,closeOnCancel:!0,confirmButtonText:"OK",confirmButtonColor:"#8CD4F5",cancelButtonText:"Cancel",imageUrl:null,imageSize:null,timer:null,customClass:"",html:!1,animation:!0,allowEscapeKey:!0,inputType:"text",inputPlaceholder:"",inputValue:"",showLoaderOnConfirm:!1};n["default"]=o,t.exports=n["default"]},{}],3:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=t("./utils"),r=(t("./handle-swal-dom"),t("./handle-dom")),s=function(t,n,o){function s(e){m&&n.confirmButtonColor&&(p.style.backgroundColor=e)}var u,c,d,f=t||e.event,p=f.target||f.srcElement,m=-1!==p.className.indexOf("confirm"),v=-1!==p.className.indexOf("sweet-overlay"),y=r.hasClass(o,"visible"),h=n.doneFunction&&"true"===o.getAttribute("data-has-done-function");switch(m&&n.confirmButtonColor&&(u=n.confirmButtonColor,c=a.colorLuminance(u,-.04),d=a.colorLuminance(u,-.14)),f.type){case"mouseover":s(c);break;case"mouseout":s(u);break;case"mousedown":s(d);break;case"mouseup":s(c);break;case"focus":var b=o.querySelector("button.confirm"),g=o.querySelector("button.cancel");m?g.style.boxShadow="none":b.style.boxShadow="none";break;case"click":var w=o===p,C=r.isDescendant(o,p);if(!w&&!C&&y&&!n.allowOutsideClick)break;m&&h&&y?l(o,n):h&&y||v?i(o,n):r.isDescendant(o,p)&&"BUTTON"===p.tagName&&sweetAlert.close()}},l=function(e,t){var n=!0;r.hasClass(e,"show-input")&&(n=e.querySelector("input").value,n||(n="")),t.doneFunction(n),t.closeOnConfirm&&sweetAlert.close(),t.showLoaderOnConfirm&&sweetAlert.disableButtons()},i=function(e,t){var n=String(t.doneFunction).replace(/\s/g,""),o="function("===n.substring(0,9)&&")"!==n.substring(9,10);o&&t.doneFunction(!1),t.closeOnCancel&&sweetAlert.close()};o["default"]={handleButton:s,handleConfirm:l,handleCancel:i},n.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],4:[function(n,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=function(e,t){return new RegExp(" "+t+" ").test(" "+e.className+" ")},s=function(e,t){r(e,t)||(e.className+=" "+t)},l=function(e,t){var n=" "+e.className.replace(/[\t\r\n]/g," ")+" ";if(r(e,t)){for(;n.indexOf(" "+t+" ")>=0;)n=n.replace(" "+t+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}},i=function(e){var n=t.createElement("div");return n.appendChild(t.createTextNode(e)),n.innerHTML},u=function(e){e.style.opacity="",e.style.display="block"},c=function(e){if(e&&!e.length)return u(e);for(var t=0;t<e.length;++t)u(e[t])},d=function(e){e.style.opacity="",e.style.display="none"},f=function(e){if(e&&!e.length)return d(e);for(var t=0;t<e.length;++t)d(e[t])},p=function(e,t){for(var n=t.parentNode;null!==n;){if(n===e)return!0;n=n.parentNode}return!1},m=function(e){e.style.left="-9999px",e.style.display="block";var t,n=e.clientHeight;return t="undefined"!=typeof getComputedStyle?parseInt(getComputedStyle(e).getPropertyValue("padding-top"),10):parseInt(e.currentStyle.padding),e.style.left="",e.style.display="none","-"+parseInt((n+t)/2)+"px"},v=function(e,t){if(+e.style.opacity<1){t=t||16,e.style.opacity=0,e.style.display="block";var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity+(new Date-n)/100,n=+new Date,+e.style.opacity<1&&setTimeout(o,t)});o()}e.style.display="block"},y=function(e,t){t=t||16,e.style.opacity=1;var n=+new Date,o=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){e.style.opacity=+e.style.opacity-(new Date-n)/100,n=+new Date,+e.style.opacity>0?setTimeout(o,t):e.style.display="none"});o()},h=function(n){if("function"==typeof MouseEvent){var o=new MouseEvent("click",{view:e,bubbles:!1,cancelable:!0});n.dispatchEvent(o)}else if(t.createEvent){var a=t.createEvent("MouseEvents");a.initEvent("click",!1,!1),n.dispatchEvent(a)}else t.createEventObject?n.fireEvent("onclick"):"function"==typeof n.onclick&&n.onclick()},b=function(t){"function"==typeof t.stopPropagation?(t.stopPropagation(),t.preventDefault()):e.event&&e.event.hasOwnProperty("cancelBubble")&&(e.event.cancelBubble=!0)};a.hasClass=r,a.addClass=s,a.removeClass=l,a.escapeHtml=i,a._show=u,a.show=c,a._hide=d,a.hide=f,a.isDescendant=p,a.getTopMargin=m,a.fadeIn=v,a.fadeOut=y,a.fireClick=h,a.stopEventPropagation=b},{}],5:[function(t,o,a){Object.defineProperty(a,"__esModule",{value:!0});var r=t("./handle-dom"),s=t("./handle-swal-dom"),l=function(t,o,a){var l=t||e.event,i=l.keyCode||l.which,u=a.querySelector("button.confirm"),c=a.querySelector("button.cancel"),d=a.querySelectorAll("button[tabindex]");if(-1!==[9,13,32,27].indexOf(i)){for(var f=l.target||l.srcElement,p=-1,m=0;m<d.length;m++)if(f===d[m]){p=m;break}9===i?(f=-1===p?u:p===d.length-1?d[0]:d[p+1],r.stopEventPropagation(l),f.focus(),o.confirmButtonColor&&s.setFocusStyle(f,o.confirmButtonColor)):13===i?("INPUT"===f.tagName&&(f=u,u.focus()),f=-1===p?u:n):27===i&&o.allowEscapeKey===!0?(f=c,r.fireClick(f,l)):f=n}};a["default"]=l,o.exports=a["default"]},{"./handle-dom":4,"./handle-swal-dom":6}],6:[function(n,o,a){var r=function(e){return e&&e.__esModule?e:{"default":e}};Object.defineProperty(a,"__esModule",{value:!0});var s=n("./utils"),l=n("./handle-dom"),i=n("./default-params"),u=r(i),c=n("./injected-html"),d=r(c),f=".sweet-alert",p=".sweet-overlay",m=function(){var e=t.createElement("div");for(e.innerHTML=d["default"];e.firstChild;)t.body.appendChild(e.firstChild)},v=function(e){function t(){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(){var e=t.querySelector(f);return e||(m(),e=v()),e}),y=function(){var e=v();return e?e.querySelector("input"):void 0},h=function(){return t.querySelector(p)},b=function(e,t){var n=s.hexToRgb(t);e.style.boxShadow="0 0 2px rgba("+n+", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"},g=function(n){var o=v();l.fadeIn(h(),10),l.show(o),l.addClass(o,"showSweetAlert"),l.removeClass(o,"hideSweetAlert"),e.previousActiveElement=t.activeElement;var a=o.querySelector("button.confirm");a.focus(),setTimeout(function(){l.addClass(o,"visible")},500);var r=o.getAttribute("data-timer");if("null"!==r&&""!==r){var s=n;o.timeout=setTimeout(function(){var e=(s||null)&&"true"===o.getAttribute("data-has-done-function");e?s(null):sweetAlert.close()},r)}},w=function(){var e=v(),t=y();l.removeClass(e,"show-input"),t.value=u["default"].inputValue,t.setAttribute("type",u["default"].inputType),t.setAttribute("placeholder",u["default"].inputPlaceholder),C()},C=function(e){if(e&&13===e.keyCode)return!1;var t=v(),n=t.querySelector(".sa-input-error");l.removeClass(n,"show");var o=t.querySelector(".sa-error-container");l.removeClass(o,"show")},S=function(){var e=v();e.style.marginTop=l.getTopMargin(v())};a.sweetAlertInitialize=m,a.getModal=v,a.getOverlay=h,a.getInput=y,a.setFocusStyle=b,a.openModal=g,a.resetInput=w,a.resetInputError=C,a.fixVerticalPosition=S},{"./default-params":2,"./handle-dom":4,"./injected-html":7,"./utils":9}],7:[function(e,t,n){Object.defineProperty(n,"__esModule",{value:!0});var o='<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';n["default"]=o,t.exports=n["default"]},{}],8:[function(e,t,o){Object.defineProperty(o,"__esModule",{value:!0});var a=e("./utils"),r=e("./handle-swal-dom"),s=e("./handle-dom"),l=["error","warning","info","success","input","prompt"],i=function(e){var t=r.getModal(),o=t.querySelector("h2"),i=t.querySelector("p"),u=t.querySelector("button.cancel"),c=t.querySelector("button.confirm");if(o.innerHTML=e.html?e.title:s.escapeHtml(e.title).split("\n").join("<br>"),i.innerHTML=e.html?e.text:s.escapeHtml(e.text||"").split("\n").join("<br>"),e.text&&s.show(i),e.customClass)s.addClass(t,e.customClass),t.setAttribute("data-custom-class",e.customClass);else{var d=t.getAttribute("data-custom-class");s.removeClass(t,d),t.setAttribute("data-custom-class","")}if(s.hide(t.querySelectorAll(".sa-icon")),e.type&&!a.isIE8()){var f=function(){for(var o=!1,a=0;a<l.length;a++)if(e.type===l[a]){o=!0;break}if(!o)return logStr("Unknown alert type: "+e.type),{v:!1};var i=["success","error","warning","info"],u=n;-1!==i.indexOf(e.type)&&(u=t.querySelector(".sa-icon.sa-"+e.type),s.show(u));var c=r.getInput();switch(e.type){case"success":s.addClass(u,"animate"),s.addClass(u.querySelector(".sa-tip"),"animateSuccessTip"),s.addClass(u.querySelector(".sa-long"),"animateSuccessLong");break;case"error":s.addClass(u,"animateErrorIcon"),s.addClass(u.querySelector(".sa-x-mark"),"animateXMark");break;case"warning":s.addClass(u,"pulseWarning"),s.addClass(u.querySelector(".sa-body"),"pulseWarningIns"),s.addClass(u.querySelector(".sa-dot"),"pulseWarningIns");break;case"input":case"prompt":c.setAttribute("type",e.inputType),c.value=e.inputValue,c.setAttribute("placeholder",e.inputPlaceholder),s.addClass(t,"show-input"),setTimeout(function(){c.focus(),c.addEventListener("keyup",swal.resetInputError)},400)}}();if("object"==typeof f)return f.v}if(e.imageUrl){var p=t.querySelector(".sa-icon.sa-custom");p.style.backgroundImage="url("+e.imageUrl+")",s.show(p);var m=80,v=80;if(e.imageSize){var y=e.imageSize.toString().split("x"),h=y[0],b=y[1];h&&b?(m=h,v=b):logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got "+e.imageSize)}p.setAttribute("style",p.getAttribute("style")+"width:"+m+"px; height:"+v+"px")}t.setAttribute("data-has-cancel-button",e.showCancelButton),e.showCancelButton?u.style.display="inline-block":s.hide(u),t.setAttribute("data-has-confirm-button",e.showConfirmButton),e.showConfirmButton?c.style.display="inline-block":s.hide(c),e.cancelButtonText&&(u.innerHTML=s.escapeHtml(e.cancelButtonText)),e.confirmButtonText&&(c.innerHTML=s.escapeHtml(e.confirmButtonText)),e.confirmButtonColor&&(c.style.backgroundColor=e.confirmButtonColor,c.style.borderLeftColor=e.confirmLoadingButtonColor,c.style.borderRightColor=e.confirmLoadingButtonColor,r.setFocusStyle(c,e.confirmButtonColor)),t.setAttribute("data-allow-outside-click",e.allowOutsideClick);var g=e.doneFunction?!0:!1;t.setAttribute("data-has-done-function",g),e.animation?"string"==typeof e.animation?t.setAttribute("data-animation",e.animation):t.setAttribute("data-animation","pop"):t.setAttribute("data-animation","none"),t.setAttribute("data-timer",e.timer)};o["default"]=i,t.exports=o["default"]},{"./handle-dom":4,"./handle-swal-dom":6,"./utils":9}],9:[function(t,n,o){Object.defineProperty(o,"__esModule",{value:!0});var a=function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);return e},r=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?parseInt(t[1],16)+", "+parseInt(t[2],16)+", "+parseInt(t[3],16):null},s=function(){return e.attachEvent&&!e.addEventListener},l=function(t){e.console&&e.console.log("SweetAlert: "+t)},i=function(e,t){e=String(e).replace(/[^0-9a-f]/gi,""),e.length<6&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),t=t||0;var n,o,a="#";for(o=0;3>o;o++)n=parseInt(e.substr(2*o,2),16),n=Math.round(Math.min(Math.max(0,n+n*t),255)).toString(16),a+=("00"+n).substr(n.length);return a};o.extend=a,o.hexToRgb=r,o.isIE8=s,o.logStr=l,o.colorLuminance=i},{}]},{},[1]),"function"==typeof define&&define.amd?define(function(){return sweetAlert}):"undefined"!=typeof module&&module.exports&&(module.exports=sweetAlert)}(window,document);
