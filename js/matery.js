$(function () {
    /**
     * 添加文章卡片hover效果.
     */
    let articleCardHover = function () {
        let animateClass = 'animated pulse';
        $('article .article').hover(function () {
            $(this).addClass(animateClass);
        }, function () {
            $(this).removeClass(animateClass);
        });
    };
    articleCardHover();

    /*菜单切换*/
    $('.sidenav').sidenav();

    /* 修复文章卡片 div 的宽度. */
    let fixPostCardWidth = function (srcId, targetId) {
        let srcDiv = $('#' + srcId);
        if (srcDiv.length === 0) {
            return;
        }

        let w = srcDiv.width();
        if (w >= 450) {
            w = w + 21;
        } else if (w >= 350 && w < 450) {
            w = w + 18;
        } else if (w >= 300 && w < 350) {
            w = w + 16;
        } else {
            w = w + 14;
        }
        $('#' + targetId).width(w);
    };

    /**
     * 修复footer部分的位置，使得在内容比较少时，footer也会在底部.
     */
    let fixFooterPosition = function () {
        $('.content').css('min-height', window.innerHeight - 165);
    };

    /**
     * 修复样式.
     */
    let fixStyles = function () {
        fixPostCardWidth('navContainer', 'articles');
        fixPostCardWidth('artDetail', 'prenext-posts');
        fixFooterPosition();
    };
    fixStyles();

    /*调整屏幕宽度时重新设置文章列的宽度，修复小间距问题*/
    $(window).resize(function () {
        fixStyles();
    });

    /*初始化瀑布流布局*/
    $('#articles').masonry({
        itemSelector: '.article'
    });

    AOS.init({
        easing: 'ease-in-out-sine',
        duration: 700,
        delay: 100
    });

    /*文章内容详情的一些初始化特性*/
    let articleInit = function () {
        $('#articleContent a').attr('target', '_blank');

        $('#articleContent img').each(function () {
            let imgPath = $(this).attr('src');
            $(this).wrap('<div class="img-item" data-src="' + imgPath + '" data-sub-html=".caption"></div>');
            // 图片添加阴影
            $(this).addClass("img-shadow img-margin");
            // 图片添加字幕
            let alt = $(this).attr('alt');
            let title = $(this).attr('title');
            let captionText = "";
            // 如果alt为空，title来替
            if (alt === undefined || alt === "") {
                if (title !== undefined && title !== "") {
                    captionText = title;
                }
            } else {
                captionText = alt;
            }
            // 字幕不空，添加之
            if (captionText !== "") {
                let captionDiv = document.createElement('div');
                captionDiv.className = 'caption';
                let captionEle = document.createElement('b');
                captionEle.className = 'center-caption';
                captionEle.innerText = captionText;
                captionDiv.appendChild(captionEle);
                this.insertAdjacentElement('afterend', captionDiv)
            }
        });
        $('#articleContent, #myGallery').lightGallery({
            selector: '.img-item',
            // 启用字幕
            subHtmlSelectorRelative: true
        });

        // progress bar init
        const progressElement = window.document.querySelector('.progress-bar');
        if (progressElement) {
            new ScrollProgress((x, y) => {
                progressElement.style.width = y * 100 + '%';
            });
        }
    };
    articleInit();

    $('.modal').modal();

    /*回到顶部*/
    $('#backTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 400);
        return false;
    });

    /*监听滚动条位置*/
    let $nav = $('#headNav');
    let $backTop = $('.top-scroll');
    $(window).scroll(function () {
        /* 回到顶部按钮根据滚动条的位置的显示和隐藏.*/
        let scroll = $(window).scrollTop();
        if (scroll < 100) {
            $nav.addClass('nav-transparent');
            $backTop.slideUp(300);
        } else {
            $nav.removeClass('nav-transparent');
            $backTop.slideDown(300);
        }
    });
});


//  start snow effect
(function SnowModule(factory) {
	"use strict";
	if(typeof define === "function" && define.amd) {
		define(factory);
	} else if(typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	} else if(typeof Package !== "undefined") {
		Snow = factory();
	} else {
		window["Snow"] = factory();
	}
})(function SnowFactory() {
	"use strict";
	function Snow(option) {
		option = option || {};
		this.snowmax = option.snowmax || 100;
		this.snowcolor = option.snowcolor || new Array("#FFDA65", "#00AADD", "#aaaacc", "#ddddff", "#ccccdd", "#f3f3f3", "#f0ffff", "#bbf7f9");
		this.snowtype = option.snowtype || new Array("Times", "Arial", "Times", "Verdana");
		this.snowletter = option.snowletter || "*";
		this.sinkspeed = option.sinkspeed || 0.6;
		this.snowmaxsize = option.snowmaxsize || 30;
		this.snowminsize = option.snowminsize || 8;
		this.snowingzone = option.snowingzone || 1;
		this.snow = new Array();
		this.marginbottom;
		this.marginright;
		this.timer;
		this.i_snow = 0;
		this.x_mv = new Array();
		this.crds = new Array();
		this.lftrght = new Array();
		this.browserinfos = window.navigator.userAgent;
		this.ie5 = document.all && document.getElementById && !this.browserinfos.match(/Opera/);
		this.ns6 = document.getElementById && !document.all;
		this.opera = this.browserinfos.match(/Opera/);
		this.browserok = this.ie5 || this.ns6 || this.opera;

		this.startSnow();
	}
	Snow.prototype.randommaker = function(range) {
		var rand = Math.floor(range * Math.random());
		return rand;
	}
	Snow.prototype.initsnow = function() {
		if(this.ie5 || this.opera) {
			this.marginbottom = document.body.scrollHeight;
			this.marginright = document.body.clientWidth - 15;
		} else if(this.ns6) {
			this.marginbottom = document.body.scrollHeight;
			this.marginright = window.innerWidth - 15;
		}
		this.snowsizerange = this.snowmaxsize - this.snowminsize;
		for(var i = 0; i <= this.snowmax; i++) {
			this.crds[i] = 0;
			this.lftrght[i] = Math.random() * 15;
			this.x_mv[i] = 0.03 + Math.random() / 10;
			this.snow[i] = document.getElementById("s" + i);
			this.snow[i].style.fontFamily = this.snowtype[this.randommaker(this.snowtype.length)];
			this.snow[i].size = this.randommaker(this.snowsizerange) + this.snowminsize;
			this.snow[i].style.fontSize = this.snow[i].size + 'px';
			this.snow[i].style.color = this.snowcolor[this.randommaker(this.snowcolor.length)];
			this.snow[i].style.zIndex = 1000;
			this.snow[i].sink = this.sinkspeed * this.snow[i].size / 5;
			if(this.snowingzone == 1) {
				this.snow[i].posx = this.randommaker(this.marginright - this.snow[i].size)
			}
			if(this.snowingzone == 2) {
				this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size)
			}
			if(this.snowingzone == 3) {
				this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 4
			}
			if(this.snowingzone == 4) {
				this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 2
			}
			this.snow[i].posy = this.randommaker(2 * this.marginbottom - this.marginbottom - 2 * this.snow[i].size);
			this.snow[i].style.left = this.snow[i].posx + 'px';
			this.snow[i].style.top = this.snow[i].posy + 'px';
		}
		this.movesnow();
	}
	Snow.prototype.movesnow = function() {
		for(var i = 0; i <= this.snowmax; i++) {
			this.crds[i] += this.x_mv[i];
			this.snow[i].posy += this.snow[i].sink;
			this.snow[i].style.left = this.snow[i].posx + this.lftrght[i] * Math.sin(this.crds[i]) + 'px';
			this.snow[i].style.top = this.snow[i].posy + 'px';

			if(this.snow[i].posy >= this.marginbottom - 2 * this.snow[i].size || parseInt(this.snow[i].style.left) > (this.marginright - 3 * this.lftrght[i])) {
				if(this.snowingzone == 1) {
					this.snow[i].posx = this.randommaker(this.marginright - this.snow[i].size)
				}
				if(this.snowingzone == 2) {
					this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size)
				}
				if(this.snowingzone == 3) {
					this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 4
				}
				if(this.snowingzone == 4) {
					this.snow[i].posx = this.randommaker(this.marginright / 2 - this.snow[i].size) + this.marginright / 2
				}
				this.snow[i].posy = 0;
			}
		}
		var that = this;
		var timer = window.setTimeout(function() {
				that.movesnow();
			},
			50);
	}
	Snow.prototype.createSnow = function() {
		var body = document.getElementsByTagName('body')[0];
		for(var i = 0; i <= this.snowmax; i++) {
			var content = document.createElement("span");
			content.id = 's' + i;
			content.style.position = "absolute";
			content.style.top = "-" + this.snowmaxsize;
			content.innerHTML =this.snowletter;//new Array('*','seeyoubug','欲泪程雪','*')[parseInt(Math.random()*3)];
			body.appendChild(content);
		}
	}
	Snow.prototype.startSnow = function() {
		this.createSnow();
		if(this.browserok) {
			this.initsnow();
		}
	}
	Snow.create = function(options) {
		return new Snow(options);
	};
	Snow.version = '1.0.1';
	return Snow;
});
var snow = new Snow();
// end snow effect

