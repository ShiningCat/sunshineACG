(function ($) {
    var j = {
        defaults: {
            click_to_close: true,
            stay_open: false
        },
        init: function (h) {
            var o = h,
                $this = $(this);
            $this.each(function (i) {
                    var g = $(this),
                        settings = $.extend({}, j.defaults, o),
                        $menu = $('.' + settings.menu);
                    g.on('mousedown', function (e) {
                            if (e.which !== 3 && $(e.target).parents('.GalMenu').length < 1 && settings.click_to_close) {
                                g.find('.GalMenu').stop(true, false).animate({
                                    opacity: 0
                                }, {
                                    duration: 100,
                                    queue: false,
                                    complete: function () {
                                        $(this).css('display', 'none').find('.active').removeClass('active').next().stop(true, true).slideUp('normal')
                                    }
                                });
                                $(".circle").removeClass("open");
                                $("#overlay").hide();
                                $(".GalMenu").delay(400).hide(0);
                                audio.pause();
                                audio.currentTime = 0
                            }
                        });
                    g.on('contextmenu', function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            j.getCoords(e);
                            $('.GalMenu_close_me').stop(true, false).animate({
                                opacity: 0
                            }, {
                                duration: 100,
                                queue: false,
                                complete: function () {
                                    $(this).css('display', 'none')
                                }
                            });
                            var a = $("#audio")[0];
                            var b = 150;
                            var c = Coords.clientY - b,
                                left = ($('body')[0] === e.target) ? Coords.clickX - b : Coords.clientX - b;
                            var d = document.documentElement.clientHeight;
                            var f = document.documentElement.clientWidth;
                            if (c < 0) c = 0;
                            if (d - Coords.clientY < 150) c = d - 300;
                            if (left < 0) left = 0;
                            if ($('body')[0] === e.target) {
                                    if (f - Coords.clickX < 150) left = f - 300
                                } else {
                                    if (f - Coords.clientX < 150) left = f - 300
                                };
                            $menu.css({
                                    top: c + 'px',
                                    left: left + 'px',
                                    display: 'block'
                                }).stop(true, false).animate({
                                    opacity: 1
                                }, {
                                    duration: 100,
                                    queue: false
                                });
                            if ($("#gal").hasClass("open")) {
                                    $(".circle").removeClass("open");
                                    $("#overlay").hide();
                                    $(".GalMenu").delay(400).hide(0);
                                    a.pause();
                                    a.currentTime = 0
                                } else {
                                    $(".circle").addClass("open");
                                    $("#overlay,.GalMenu").show();
                                    a.play()
                                }
                        })
                })
        },
        getCoords: function (e) {
            var a = e ? e : window.event;
            var b = 0,
                clickY = 0;
            if ((a.clientX || a.clientY) && document.body && document.body.scrollLeft != null) {
                    b = a.clientX + document.body.scrollLeft;
                    clickY = a.clientY + document.body.scrollTop
                };
            if ((a.clientX || a.clientY) && document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.scrollLeft != null) {
                    b = a.clientX + document.documentElement.scrollLeft;
                    clickY = a.clientY + document.documentElement.scrollTop
                };
            if (a.pageX || a.pageY) {
                    b = a.pageX;
                    clickY = a.pageY
                };
            return Coords = {
                    clickX: b,
                    clickY: clickY,
                    clientX: a.clientX,
                    clientY: a.clientY,
                    screenX: a.screenX,
                    screenY: a.screenY
                }
        }
    };
    $.fn.GalMenu = function (a, b) {
        if (j[a]) {
            return j[a].apply(this, Array.prototype.slice.call(arguments, 1))
        } else if (typeof a === 'object' || !a) {
            return j.init.apply(this, arguments)
        } else {
            $.error('Method ' + a + ' does not exist')
        }
    }
})(jQuery);
String.prototype.removeWS = function () {
    return this.toString().replace(/\s/g, '')
};
String.prototype.pF = function () {
    return parseFloat(this)
};
Number.prototype.pF = function () {
    return parseFloat(this)
};
(function webpackUniversalModuleDefinition(a, b) {
    if (typeof exports === 'object' && typeof module === 'object') module.exports = b();
    else if (typeof define === 'function' && define.amd) define([], b);
    else if (typeof exports === 'object') exports["POWERMODE"] = b();
    else a["POWERMODE"] = b()
})(this, function () {
    return (function (c) {
        var d = {};

        function __webpack_require__(a) {
            if (d[a]) return d[a].exports;
            var b = d[a] = {
                exports: {},
                id: a,
                loaded: false
            };
            c[a].call(b.exports, b, b.exports, __webpack_require__);
            b.loaded = true;
            return b.exports
        }
        __webpack_require__.m = c;
        __webpack_require__.c = d;
        __webpack_require__.p = "";
        return __webpack_require__(0)
    })([function (g, h, j) {
        'use strict';
        var k = document.createElement('canvas');
        k.width = window.innerWidth;
        k.height = window.innerHeight;
        k.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:888';
        window.addEventListener('resize', function () {
            k.width = window.innerWidth;
            k.height = window.innerHeight
        });
        document.body.appendChild(k);
        var l = k.getContext('2d');
        var m = [];
        var n = 0;
        POWERMODE.shake = true;

        function getRandom(a, b) {
            return Math.random() * (b - a) + a
        }
        function getColor(a) {
            if (POWERMODE.colorful) {
                var u = getRandom(0, 360);
                return 'hsla(' + getRandom(u - 10, u + 10) + ', 100%, ' + getRandom(50, 80) + '%, ' + 1 + ')'
            } else {
                return window.getComputedStyle(a).color
            }
        }
        function getCaret() {
            var a = document.activeElement;
            var b;
            if (a.tagName === 'TEXTAREA' || (a.tagName === 'INPUT' && a.getAttribute('type') === 'text')) {
                var c = j(1)(a, a.selectionStart);
                b = a.getBoundingClientRect();
                return {
                    x: c.left + b.left,
                    y: c.top + b.top,
                    color: getColor(a)
                }
            }
            var d = window.getSelection();
            if (d.rangeCount) {
                var e = d.getRangeAt(0);
                var f = e.startContainer;
                if (f.nodeType === document.TEXT_NODE) {
                    f = f.parentNode
                }
                b = e.getBoundingClientRect();
                return {
                    x: b.left,
                    y: b.top,
                    color: getColor(f)
                }
            }
            return {
                x: 0,
                y: 0,
                color: 'transparent'
            }
        }
        function createParticle(x, y, a) {
            return {
                x: x,
                y: y,
                alpha: 1,
                color: a,
                velocity: {
                    x: -1 + Math.random() * 2,
                    y: -3.5 + Math.random() * 2
                }
            }
        }
        function POWERMODE() {
            {
                var a = getCaret();
                var b = 5 + Math.round(Math.random() * 10);
                while (b--) {
                    m[n] = createParticle(a.x, a.y, a.color);
                    n = (n + 1) % 500
                }
            } {
                if (POWERMODE.shake) {
                    var c = 1 + 2 * Math.random();
                    var x = c * (Math.random() > 0.5 ? -1 : 1);
                    var y = c * (Math.random() > 0.5 ? -1 : 1);
                    document.body.style.marginLeft = x + 'px';
                    document.body.style.marginTop = y + 'px';
                    setTimeout(function () {
                        document.body.style.marginLeft = '';
                        document.body.style.marginTop = ''
                    }, 75)
                }
            }
        };
        POWERMODE.colorful = false;

        function loop() {
            requestAnimationFrame(loop);
            l.clearRect(0, 0, k.width, k.height);
            for (var i = 0; i < m.length; ++i) {
                var a = m[i];
                if (a.alpha <= 0.1) continue;
                a.velocity.y += 0.075;
                a.x += a.velocity.x;
                a.y += a.velocity.y;
                a.alpha *= 0.96;
                l.globalAlpha = a.alpha;
                l.fillStyle = a.color;
                l.fillRect(Math.round(a.x - 1.5), Math.round(a.y - 1.5), 3, 3)
            }
        }
        requestAnimationFrame(loop);
        g.exports = POWERMODE
    },


    function (n, o) {
        (function () {
            var l = ['direction', 'boxSizing', 'width', 'height', 'overflowX', 'overflowY', 'borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth', 'borderStyle', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontStyle', 'fontVariant', 'fontWeight', 'fontStretch', 'fontSize', 'fontSizeAdjust', 'lineHeight', 'fontFamily', 'textAlign', 'textTransform', 'textIndent', 'textDecoration', 'letterSpacing', 'wordSpacing', 'tabSize', 'MozTabSize'];
            var m = window.mozInnerScreenX != null;

            function getCaretCoordinates(b, c, d) {
                var e = d && d.debug || false;
                if (e) {
                    var f = document.querySelector('#input-textarea-caret-position-mirror-div');
                    if (f) {
                        f.parentNode.removeChild(f)
                    }
                }
                var g = document.createElement('div');
                g.id = 'input-textarea-caret-position-mirror-div';
                document.body.appendChild(g);
                var h = g.style;
                var i = window.getComputedStyle ? getComputedStyle(b) : b.currentStyle;
                h.whiteSpace = 'pre-wrap';
                if (b.nodeName !== 'INPUT') h.wordWrap = 'break-word';
                h.position = 'absolute';
                if (!e) h.visibility = 'hidden';
                l.forEach(function (a) {
                    h[a] = i[a]
                });
                if (m) {
                    if (b.scrollHeight > parseInt(i.height)) h.overflowY = 'scroll'
                } else {
                    h.overflow = 'hidden'
                }
                g.textContent = b.value.substring(0, c);
                if (b.nodeName === 'INPUT') g.textContent = g.textContent.replace(/\s/g, "\u00a0");
                var j = document.createElement('span');
                j.textContent = b.value.substring(c) || '.';
                g.appendChild(j);
                var k = {
                    top: j.offsetTop + parseInt(i['borderTopWidth']),
                    left: j.offsetLeft + parseInt(i['borderLeftWidth'])
                };
                if (e) {
                    j.style.backgroundColor = '#aaa'
                } else {
                    document.body.removeChild(g)
                }
                return k
            }
            if (typeof n != "undefined" && typeof n.exports != "undefined") {
                n.exports = getCaretCoordinates
            } else {
                window.getCaretCoordinates = getCaretCoordinates
            }
        }())
    }])
});
(function () {
    var e = document.createElement('input');
    var f = ('placeholder' in e);

    function extend(a, b) {
        var c = {};
        for (var d in a) {
            c[d] = b[d] === undefined ? a[d] : b[d]
        }
        return c
    }
    var g = {
        letterDelay: 100,
        sentenceDelay: 1000,
        loop: false,
        startOnFocus: true,
        shuffle: false,
        showCursor: true,
        cursor: '|'
    };

    function PlaceHolder(a, b, c) {
        this.el = a;
        this.texts = b;
        c = c || {};
        this.options = extend(g, c);
        this.timeouts = [];
        this.begin()
    }
    PlaceHolder.prototype.begin = function () {
        var a = this,
            temp, randomIndex;
        a.originalPlaceholder = a.el.getAttribute('placeholder');
        if (a.options.shuffle) {
                for (var i = a.texts.length; i--;) {
                    randomIndex = ~~ (Math.random() * i);
                    temp = a.texts[randomIndex];
                    a.texts[randomIndex] = a.texts[i];
                    a.texts[i] = temp
                }
            }
        if (a.options.startOnFocus) {
                a.el.addEventListener('focus', function () {
                    a.processText(0)
                });
                a.el.addEventListener('blur', function () {
                    a.cleanUp()
                })
            } else {
                a.processText(0)
            }
    };
    PlaceHolder.prototype.cleanUp = function () {
        for (var i = this.timeouts.length; i--;) {
            clearTimeout(this.timeouts[i])
        }
        this.el.setAttribute('placeholder', this.originalPlaceholder);
        this.timeouts.length = 0
    };
    PlaceHolder.prototype.typeString = function (b, c) {
        var d = this,
            timeout;
        if (!b) {
                return false
            }
        function setTimeoutCallback(a) {
                d.el.setAttribute('placeholder', b.substr(0, a + 1) + (a === b.length - 1 || !d.options.showCursor ? '' : d.options.cursor));
                if (a === b.length - 1) {
                    c()
                }
            }
        for (var i = 0; i < b.length; i++) {
                timeout = setTimeout(setTimeoutCallback, i * d.options.letterDelay, i);
                d.timeouts.push(timeout)
            }
    };
    PlaceHolder.prototype.processText = function (a) {
        var b = this,
            timeout;
        b.typeString(b.texts[a], function () {
                timeout = setTimeout(function () {
                    b.processText(b.options.loop ? ((a + 1) % b.texts.length) : (a + 1))
                }, b.options.sentenceDelay);
                b.timeouts.push(timeout)
            })
    };
    var h = function (a) {
        if (!f) {
            return
        }
        new PlaceHolder(a.el, a.sentences, a.options)
    };
    if (typeof exports === 'object') {
        module.exports = h
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return h
        })
    } else {
        window.superplaceholder = h
    }
})();
jQuery(document).ready(function () {
    var k = 0;
    var l = 0;
    jQuery(".magnify").mousemove(function (e) {
        if (!k && !l) {
            var a = new Image();
            a.src = jQuery(".small").attr("src");
            k = a.width;
            l = a.height
        } else {
            var b = jQuery(this).offset();
            var c = e.pageX - b.left;
            var d = e.pageY - b.top;
            if (c < jQuery(this).width() && d < jQuery(this).height() && c > 0 && d > 0) {
                jQuery(".large").fadeIn(100)
            } else {
                jQuery(".large").fadeOut(100)
            }
            if (jQuery(".large").is(":visible")) {
                var f = Math.round(c / jQuery(".small").width() * k - jQuery(".large").width() / 2) * -1;
                var g = Math.round(d / jQuery(".small").height() * l - jQuery(".large").height() / 2) * -1;
                var h = f + "px " + g + "px";
                var i = c - jQuery(".large").width() / 2;
                var j = d - jQuery(".large").height() / 2;
                jQuery(".large").css({
                    left: i,
                    top: j,
                    backgroundPosition: h
                })
            }
        }
    })
//   var s = new Array();
//   for (let i = 0; i < $('.aos-init').length; i++) {
//       s.push($('.aos-init')[i])
//   }
//   sTop = $(window).scrollTop();
//     for (let i = 0; i < s.length; i++) {
//       if($(s[i]).offset().top > sTop){
//         $(s[i]).addClass("aos-animate")
//       } else if ($(s[i]).offset().top + $(s[i]).height() < sTop){
//         $(s[i]).removeClass("aos-animate")
//       }
//     }

    setTimeout(() => {
        sTop = $(window).scrollTop()
        for (let i = 0; i < $('.aos-init').length; i++) {
        if($($('.aos-init')[i]).offset().top > sTop){
            $($('.aos-init')[i]).addClass("aos-animate")
        } else if ($($('.aos-init')[i]).offset().top + $($('.aos-init')[i]).height() < sTop){
            $($('.aos-init')[i]).removeClass("aos-animate")
        }
        }
    }, 1000);
    
  $(window).scroll(function() {
    sTop = $(window).scrollTop()
    for (let i = 0; i < $('.aos-init').length; i++) {
      if($($('.aos-init')[i]).offset().top > sTop){
        $($('.aos-init')[i]).addClass("aos-animate")
      } else if ($($('.aos-init')[i]).offset().top + $($('.aos-init')[i]).height() < sTop){
        $($('.aos-init')[i]).removeClass("aos-animate")
      }
    }
  })
})

document.oncontextmenu = function() {
    return false;
}
$("body").mousedown(function(e) {
    if (3 == e.which) {
        var display =$('#overlay').css('display')
        if(display == 'none'){
            $('#overlay').show()
        } else {
            $('#overlay').hide()
        }
        
    }
})
$("#zan-gotop").click(function() {
    $("html,body").animate({scrollTop:0}, 500)
})
