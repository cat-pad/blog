"use strict";
window.isMenuOpen = !1,
window.BLOG = {},
window.windowHeight = $(window).height();
var hiddenProperty = "hidden"in document ? "hidden" : "webkitHidden"in document ? "webkitHidden" : "mozHidden"in document ? "mozHidden" : null
  , visibilityChangeEvent = hiddenProperty.replace(/hidden/i, "visibilitychange")
  , throttle = function(n, i, o) {
    var s, a, c, d = null, r = 0;
    o = o || {};
    function l() {
        r = !1 === o.leading ? 0 : (new Date).getTime(),
        d = null,
        c = n.apply(s, a),
        d || (s = a = null)
    }
    return function() {
        var e = (new Date).getTime();
        r || !1 !== o.leading || (r = e);
        var t = i - (e - r);
        return s = this,
        a = arguments,
        t <= 0 || i < t ? (d && (clearTimeout(d),
        d = null),
        r = e,
        c = n.apply(s, a),
        d || (s = a = null)) : d || !1 === o.trailing || (d = setTimeout(l, t)),
        c
    }
};
Object.defineProperty(window, "_scrollTop", {
    get: function() {
        return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    },
    set: function(e) {
        document.documentElement.scrollTop = e,
        window.pageYOffset = e,
        document.body.scrollTop = e
    }
}),
function(t, e) {
    function n() {}
    function a(e) {
        var t, n = e.offsetLeft, i = e.offsetTop;
        return e.offsetParent && (n += (t = a(e.offsetParent)).x,
        i += t.y),
        {
            x: n,
            y: i
        }
    }
    var c = e.querySelector.bind(e)
      , i = e.querySelectorAll.bind(e)
      , o = (c("html"),
    c("#gotop"))
      , s = c("#menu")
      , d = c("#main")
      , r = c("#header")
      , l = c("#mask")
      , u = c("#menu-toggle")
      , h = c(".header-title")
      , f = Array.prototype.forEach;
    /micromessenger/i.test(navigator.userAgent);
    t.even = "ontouchstart"in t && isPhone ? "touchstart" : "click";
    var v, g = {
        toggleGotop: function(e) {
            e > t.innerHeight / 2 ? o.classList.add("in") : o.classList.remove("in")
        },
        toggleMenu: function(e) {
            e ? (isMenuOpen = !0,
            s.classList.remove("hide"),
            isPhone && (l.classList.add("in"),
            s.classList.add("show"))) : (l.classList.remove("in"),
            s.classList.remove("show"))
        },
        fixedHeader: function(e) {
            e > r.clientHeight ? r.classList.add("fixed") : r.classList.remove("fixed")
        },
        toc: function() {
            if (isPost) {
                var i = c("#post-toc")
                  , t = c(".post-header").clientHeight
                  , o = r.clientHeight
                  , s = c("#post-content").querySelectorAll("h1, h2, h3, h4, h5, h6");
                return i.querySelector('a[href="#'.concat(s[0].id, '"]')).parentNode.classList.add("active"),
                d.classList.add("show"),
                h.classList.add("toc"),
                {
                    fixed: function(e) {
                        t - o <= e ? i.classList.add("fixed") : i.classList.remove("fixed")
                    },
                    actived: function(e) {
                        for (var t = 0, n = s.length; t < n; t++) {
                            e > a(s[t]).y - o - 5 && (i.querySelector("li.active").classList.remove("active"),
                            i.querySelector('a[href="#'.concat(s[t].id, '"]')).parentNode.classList.add("active"))
                        }
                        e < a(s[0]).y && (i.querySelector("li.active").classList.remove("active"),
                        i.querySelector('a[href="#'.concat(s[0].id, '"]')).parentNode.classList.add("active"))
                    }
                }
            }
            isPhone && h.classList.add("toc")
        }(),
        hideOnMask: [],
        modal: function(e) {
            this.$modal = c(e),
            this.$off = this.$modal.querySelector(".close");
            var t = this;
            this.show = function() {
                l.classList.add("in"),
                isPhone || (d.classList.add("Mask"),
                s.classList.add("Mask")),
                t.$modal.classList.add("ready"),
                setTimeout(function() {
                    t.$modal.classList.add("in")
                }, 10)
            }
            ,
            this.onHide = n,
            this.hide = function() {
                t.onHide();
                var e = !!c("div.page-modal.reward-lay.ready.in");
                isPhone && !e || l.classList.remove("in"),
                isPhone || (d.classList.remove("Mask"),
                s.classList.remove("Mask")),
                t.$modal.classList.remove("in"),
                setTimeout(function() {
                    t.$modal.classList.remove("ready")
                }, 300)
            }
            ,
            this.toggle = function() {
                return t.$modal.classList.contains("in") ? t.hide() : t.show()
            }
            ,
            g.hideOnMask.push(this.hide),
            this.$off && this.$off.addEventListener(even, this.hide)
        },
        share: function() {
            var t = c("#pageShare")
              , n = c("#shareFab");
            n && (n.addEventListener(even, function() {
                t.classList.toggle("in")
            }, !1),
            e.addEventListener(even, function(e) {
                n.contains(e.target) || t.classList.remove("in")
            }, !1))
        },
        colorpicker: function() {
            new iro.ColorPicker("#color-picker-container",{
                width: 200,
                color: "#7af",
                borderWidth: 6,
                borderColor: "#ccc"
            }).on("color:change", function(e) {
                selectedColor = e.hexString,
                changeColor(selectedColor)
            });
            var e = new this.modal("#color-picker");
            c("#color-picker-icon").addEventListener(even, function() {
                e.toggle()
            })
        },
        post: function() {
            g.share()
        },
        scroll: function() {
            isPost && !isPhone && (o && g.toggleGotop(_scrollTop),
            g.toc.fixed(_scrollTop),
            g.toc.actived(_scrollTop),
            isMenuOpen && (s.classList.add("hide"),
            isMenuOpen = !1))
        },
        page: (v = i(".fade, .fade-scale"),
        {
            loaded: function() {
                document[hiddenProperty] || g.page.visible || (g.scroll(),
                f.call(v, function(e) {
                    e.classList.add("in")
                }),
                g.page.visible = !0)
            },
            unload: function() {
                f.call(v, function(e) {
                    e.classList.remove("in")
                }),
                0
            },
            visible: !1
        })
    };
    t.addEventListener("DOMContentLoaded", function() {
        g.page.loaded()
    }),
    t.addEventListener("load", function() {
        g.colorpicker(),
        isPost && setTimeout(g.post, 0)
    }),
    t.addEventListener("beforeunload", g.page.unload),
    t.addEventListener(visibilityChangeEvent, g.page.loaded),
    t.addEventListener("resize", throttle(function() {
        even = "ontouchstart"in t ? "touchstart" : "click",
        t.BLOG.even = even,
        g.toggleMenu()
    }, 150)),
    o && o.addEventListener(even, function() {
        window.scrollTo(0, 0)
    }, !1),
    u.addEventListener(even, function(e) {
        g.toggleMenu(!0)
    }, !1),
    l.addEventListener(even, function(e) {
        g.toggleMenu(),
        g.hideOnMask.forEach(function(e) {
            e()
        })
    }, !1),
    t.addEventListener("scroll", throttle(g.scroll, 150), !1),
    g.noop = n,
    g.even = even,
    g.$ = c,
    g.$$ = i,
    Object.keys(g).reduce(function(e, t) {
        return e[t] = g[t],
        e
    }, t.BLOG)
}(window, document);
