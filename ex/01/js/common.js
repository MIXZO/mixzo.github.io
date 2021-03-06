﻿var common = (function($) {
	var commonFun = {
			viewportFix: function() {
				var v_t;
				var _width = 640	//PSD width

				var heightFix = function() { //框架高度
					$('#pageWrap').height('100%');
				}

				var advice = function() { //viewport width
					var _viewport = $('[name=viewport]');
					var phoneWidth = parseInt(window.screen.width);
					var phoneScale = phoneWidth / _width;
					var ua = navigator.userAgent;
					if (/Android (\d+\.\d+)/.test(ua)) {
						var version = parseFloat(RegExp.$1);
						// andriod 2.3
						if (version > 2.3) {
							_viewport.attr('content', 'width=' + _width + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi');
							// andriod 2.3以上
						} else {
							_viewport.attr('content', 'width=' + _width + ', target-densitydpi=device-dpi');
						}
						// 其他系统
					} else {
						_viewport.attr('content', 'width=640, user-scalable=no, target-densitydpi=device-dpi');
					}

					heightFix();

					if (window.orientation != undefined) {
						if (window.orientation == 0) {
							$('#advice').hide();
						} else {
							$('#advice').show();
						}
					}
				}
				advice();

				$(window).resize(function() {
					clearTimeout(v_t);
					v_t = setTimeout(function() {
						advice();
					}, 10);
				}).on("orientationchange", function(event) {
					clearTimeout(v_t);
					v_t = setTimeout(function() {
						advice();
					}, 10);
				});
			},
			actionFun: function() { //页面动作
				var touchLock = function() {	//屏蔽上下弹动页面
					$('#pageWrap').on('touchstart', function(event) {
						event.preventDefault();
					});
				}
				touchLock();
				commonFun.viewportFix();
				/*ico bottom*/
				var b_t;
				var bottomFun = function() {
					$('#bottom').hide();
					clearTimeout(b_t);
					b_t = setTimeout(function() {
						if (!$('.step-box').last().hasClass('show')) {
							$('#bottom').fadeIn('slow');
						};
					}, 3000);
				}
				window.onload = function() {
					if (document.readyState == 'complete') {
						$('#loading').fadeOut('slow', function() {
							$('.step-box').first().addClass('show').css('display', 'block').transition({
								'opacity': '1'
							});
						});
						bottomFun();
					}
				}
				$('.step-box').swipe({
					swipeUp: function(event, direction, distance, duration, fingerCount) {
						var that = $('.step-box.show'),
							index = that.index(),
							prev = that.prev(),
							next = that.next();
						if (index != $('.step-box').size() - 1) {
							next.addClass('show').css({
								'transform': 'scale(0.3) translate3d(0,80%,0)',
								'display': 'block'
							});
							that.removeClass('show').transition({
								'scale': '0.3',
								'y': '-80%',
								'opacity': '0'
							});
							next.transition({
								'scale': '1',
								'y': '0',
								'opacity': '1'
							});
						};
						bottomFun();
						if ($('.step-6').hasClass('show')) {
							$('#pageWrap').unbind('touchstart');
						} else {
							touchLock();
						};
					},
					swipeDown: function(event, direction, distance, duration, fingerCount) {
						var that = $('.step-box.show'),
							index = that.index(),
							prev = that.prev(),
							next = that.next();
						if (index == '5' && ($('.step-6 .s-2').css('display') == 'block') || $('.step-6 .s-4').css('display') == 'block') {
							$('.step-6 .s-2, .step-6 .s-4').slideUp('fast').siblings('.s-1').slideDown('fast').parents('.step-6').find('.bg-tenant').fadeOut('slow');
							$('.step-6 .form-box').find('.relative-box>.bg').animate({
		                        'opacity': '0.2'
		                    }, 'slow');
							return;
						};

						if (index != 0) {
							prev.addClass('show').css({
								'transform': 'scale(0.3) translate3d(0,-80%,0)',
								'display': 'block'
							});
							that.removeClass('show').transition({
								'scale': '0.3',
								'y': '80%',
								'opacity': '0'
							});
							prev.transition({
								'scale': '1',
								'y': '0',
								'opacity': '1'
							});
						};
						if (index == '5') {
							$('#pageWrap').unbind('touchstart');
						} else {
							touchLock();
						};
					}
				});
			}
		}
		//共用调用
	commonFun.actionFun();
	return commonFun;

})(jQuery)