var homeapp = {
		initAnnouncement :function(){
			//公告和活动切换效果
			var tabDiv = $("#newsTab");
			var tabHead = tabDiv.find("h3 span a");
			var tabCon = tabDiv.find("div.c");
			tabHead.bind("mouseenter",function(){
				 tabHead.removeClass("newsOn");
				 $(this).addClass("newsOn");
				 var index = tabHead.index(this);
				 tabCon.hide().eq(index).show();
			});
		},
		initTheroll :function(){
			//角色切换
			var rollTab = $("#rollTab");
			var roleTabHead = rollTab.find(".tDiv a");
			var roleTabBody = rollTab.find(".sDiv");
				roleTabHead.bind("mouseenter", function(){
					roleTabHead.removeClass("current")
					$(this).addClass("current");
					var index = roleTabHead.index(this);
					roleTabBody.animate({left:index*(-650)},"fast");
				});				
				
			
		},
		initWxpic :function(){
			//微信关注
			var tabDiv = $("#weixin-foucus");
			var ctrBtn = tabDiv.find(".focus-weixin");
			ctrBtn.bind("click",function(e){
				var t = $(e.target); 
				if(t.parents(".weixin-pic").length > 0) {
					return;
				}
				var txt = $(this);
				var layer = txt.parent(".share-btn").find(".weixin-pic");
				
				if(layer.css("display") == "none") {
					layer.show();
				} else {
					layer.hide();
				}
			});
			$(document).bind("click",function(e){
				var t = $(e.target);
				if(t.parents(".share-btn").length > 0) {
					return;
				}
				tabDiv.find(".weixin-pic").hide();
			});
		},
		initFocus :function(){
			 //焦点幻灯片
			var picBox       = $("#focus");
			var picImg       = picBox.find("li");
			
			if(picImg.length<=1){
				return;
				};
				
			var haddleHtml   = $("<div class='btn'></div>");
			picBox.append(haddleHtml);	
					
			var btnHtml=new Array();  
			for(j=0; j<picImg.length; j++){
				btnHtml.push("<span class='png num_"+ j + (j==0?" on":"") + "'></span>");
			};
			$(btnHtml.join("")).appendTo(haddleHtml);
			
			var haddleBtn = picBox.find(".btn span");
			 	haddleBtn.bind("mouseenter",function(){
					  haddleBtn.removeClass("on");
					  $(this).addClass("on");
					  picImg.stop(true,true);
					  var index=haddleBtn.index(this);
					  var picOut=picImg.filter(":visible");
					  var picOn=picImg.eq(index);
					  if(picOut.get(0)!=picOn.get(0)){
							  picOut.fadeOut();
							  picOn.fadeIn();
					   }
				  });
	    },
		initPicscroll :function(){
			//图片原画处理
			var picCtrl = {
				init :function() {
					picCtrl.initDom();
					picCtrl.initInfo();
					picCtrl.initEvt();
				},
				initDom :function() {
					picCtrl.dom = {};
					picCtrl.dom.pic = $("#showPic");
					picCtrl.dom.lbtn = picCtrl.dom.pic.find("a.image-slider-back");
					picCtrl.dom.rbtn = picCtrl.dom.pic.find("a.image-slider-forward");
					picCtrl.dom.scrollPic =  picCtrl.dom.pic.find("ul");
					picCtrl.dom.li = picCtrl.dom.scrollPic.find("li");
					picCtrl.dom.picBox = picCtrl.dom.pic.find(".picBox");
				},
				initEvt :function() {
					picCtrl.dom.lbtn.bind("click", picCtrl.lClick);
					picCtrl.dom.rbtn.bind("click", picCtrl.rClick);
				},
				initInfo :function() {
					picCtrl.info = {};
					picCtrl.info.scrollWidth = (picCtrl.dom.li.eq(0).width() + 9) * 3;
					picCtrl.info.imgs = picCtrl.dom.li.length;
					picCtrl.info.pages = (picCtrl.info.imgs%3) > 0 ? parseInt(picCtrl.info.imgs/3) + 1 : picCtrl.info.imgs/3;
				},
				lClick :function() {
					picCtrl.dom.scrollPic.stop(true, true);
					
					var scrollLeft = picCtrl.dom.scrollPic.css("left");
						scrollLeft = picCtrl.myParseInt(scrollLeft);
						
					if(scrollLeft >=0 ) {
						return;	
					}
					picCtrl.dom.scrollPic.animate({left :scrollLeft + picCtrl.info.scrollWidth}, function(){
						var left = picCtrl.dom.scrollPic.css("left");
							left = picCtrl.myParseInt(left);
							
							if(left >= 0) {
								picCtrl.dom.lbtn.removeClass("lenble").addClass("lunenble");
							}
							picCtrl.dom.rbtn.removeClass("runenble").addClass("renble");
					});
				},
				rClick :function() {
					picCtrl.dom.scrollPic.stop(true, true);
					
					var scrollLeft = picCtrl.dom.scrollPic.css("left");
						scrollLeft = picCtrl.myParseInt(scrollLeft);
						
					if(scrollLeft <= picCtrl.info.scrollWidth * (picCtrl.info.pages - 1) * -1) {
						return;
					}
					
					picCtrl.dom.scrollPic.animate({left :scrollLeft - picCtrl.info.scrollWidth}, function(){
						var left = picCtrl.dom.scrollPic.css("left");
							left = picCtrl.myParseInt(left);
			
							if(left <=  picCtrl.info.scrollWidth * (picCtrl.info.pages - 1) * -1) {
								picCtrl.dom.rbtn.removeClass("renable").addClass("runenble");
							}
							picCtrl.dom.lbtn.removeClass("lunenble").addClass("lenble");
					});
				},
				myParseInt :function(num) {
					if(typeof num == "string") {
						num = num.replace("px", "");
					}
					num = parseInt(num);
					if(isNaN(num)) {
						return 0;
					}
					return num;
				}
			};
			picCtrl.init();
		
		},
		initNewsList :function(){
			$("#infoList li").hover(function(){
				$(this).addClass("on");
			}, function(){
				$(this).removeClass("on");
			});
		},
		initFriendLink :function() {//友情链接
			var scrollCtrl = {
				init :function() {
					scrollCtrl.initDom();
					scrollCtrl.initInfo();
					if(scrollCtrl.info.nums > 1){
						scrollCtrl.initEvt();
						scrollCtrl.startTask();
					}
				},
				initDom :function() {
					scrollCtrl.dom = {};
					scrollCtrl.dom.scrollArea = $("#flink");
					scrollCtrl.dom.text = scrollCtrl.dom.scrollArea.find("p");
					scrollCtrl.dom.line = scrollCtrl.dom.scrollArea.find("a:first");
				},
				initInfo :function(){
					scrollCtrl.info = {};
					scrollCtrl.info.totalHeight = scrollCtrl.dom.text.height();
					scrollCtrl.info.lineHeight  = scrollCtrl.dom.line.height();
					scrollCtrl.info.nums        = scrollCtrl.info.totalHeight/scrollCtrl.info.lineHeight;	
					scrollCtrl.info.step 		= 1;				
				},
				task :function() {
					if(scrollCtrl.info.step == scrollCtrl.info.nums)
					{
						scrollCtrl.dom.text.css('marginTop', 0);
						scrollCtrl.info.step = 1;
						scrollCtrl.timer = setTimeout(scrollCtrl.task, 5000);
						return;
					}
					scrollCtrl.dom.text.stop(true, true).animate({"marginTop" : - scrollCtrl.info.step * scrollCtrl.info.lineHeight}, 1000, function(){
						scrollCtrl.info.step += 1;
						scrollCtrl.timer = setTimeout(scrollCtrl.task, 5000);
					});
				},
				startTask :function() {
					scrollCtrl.timer = setTimeout(scrollCtrl.task, 5000);
				},
				initEvt :function(){
					scrollCtrl.dom.scrollArea.hover(function(){
						if(scrollCtrl.timer) {
							clearTimeout(scrollCtrl.timer);
						}
					},function(){
						scrollCtrl.startTask(); 
					});
				}
			};
			scrollCtrl.init();
		},
		
		initBackTop :function(){
			var back = {
					init :function() {
						back.initDom();
						back.initEvt();
					},
					initDom :function() {
						back.dom = {};
						back.dom.btn = $('<a href="javascript:void(0)" class="backToTop" onfocus="this.blur();"> </a>').appendTo($(document.body));
						back.dom.nav = $("#nav");
					},
					initEvt :function() {
						back.dom.btn.bind("click", function() {
							back.dom.nav.hide();
							$("html, body").animate({ scrollTop: 0 }, 300, function(){
								back.dom.nav.fadeIn();
							});
						});
						$(window).scroll(function(){
							if(document.documentElement.scrollTop > 100) {
								back.dom.btn.show();
							} else {
								back.dom.btn.hide();
							}
						});
					}
			}
			back.init();						
		}
	};
    




 

			


