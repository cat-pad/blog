"use strict";
isPhone || $(".post-toc-link").click(function() {
    return $("html, body").animate({
        scrollTop: "".concat($($(this).attr("href")).offset().top, "px")
    }, 600),
    !1
}),
function() {
    function e(t) {
        var s, r, c, d, l;
        this.$img = t.querySelector("img"),
        this.$overlay = t.querySelector("overlay"),
        this.margin = 40,
        this.title = this.$img.title || this.$img.alt || "",
        this.isZoom = !1,
        this.calcRect = function() {
            d = $(window).width();
            var t = (l = windowHeight) - 2 * this.margin
              , e = s
              , i = r
              , a = (this.margin,
            d < e ? d / e : 1)
              , o = t < i ? t / i : 1
              , n = Math.min(a, o);
            return {
                w: e *= n,
                h: i *= n,
                t: (l - i) / 2 - c.top,
                l: (d - e) / 2 - c.left + this.$img.offsetLeft
            }
        }
        ,
        this.setImgRect = function(t) {
            this.$img.style.cssText = "width: ".concat(t.w, "px; max-width: ").concat(t.w, "px; height:").concat(t.h, "px; top: ").concat(t.t, "px; left: ").concat(t.l, "px")
        }
        ,
        this.setFrom = function() {
            this.setImgRect({
                w: c.width,
                h: c.height,
                t: 0,
                l: (t.offsetWidth - c.width) / 2
            })
        }
        ,
        this.setTo = function() {
            this.setImgRect(this.calcRect())
        }
        ,
        this.addTitle = function() {
            this.title && (this.$caption = document.createElement("div"),
            this.$caption.innerHTML = this.title,
            this.$caption.className = "overlay-title",
            t.appendChild(this.$caption))
        }
        ,
        this.removeTitle = function() {
            this.$caption && t.removeChild(this.$caption)
        }
        ;
        var e = this;
        this.zoomIn = function() {
            s = this.$img.naturalWidth || this.$img.width,
            r = this.$img.naturalHeight || this.$img.height,
            c = this.$img.getBoundingClientRect(),
            t.style.height = "".concat(c.height, "px"),
            t.classList.add("ready"),
            this.setFrom(),
            this.addTitle(),
            this.$img.classList.add("zoom-in"),
            setTimeout(function() {
                t.classList.add("active"),
                e.setTo(),
                e.isZoom = !0
            }, 0)
        }
        ,
        this.zoomOut = function() {
            this.isZoom = !1,
            t.classList.remove("active"),
            this.$img.classList.add("zoom-in"),
            this.setFrom(),
            setTimeout(function() {
                e.$img.classList.remove("zoom-in"),
                e.$img.style.cssText = "",
                e.removeTitle(),
                t.classList.remove("ready"),
                t.removeAttribute("style")
            }, 300)
        }
        ,
        t.addEventListener("click", function(t) {
            e.isZoom ? e.zoomOut() : "IMG" === t.target.tagName && e.zoomIn()
        }),
        window.addEventListener("scroll", throttle(function() {
            e.isZoom && e.zoomOut()
        }), 150),
        window.addEventListener("resize", function() {
            e.isZoom && e.zoomOut()
        })
    }
    Array.prototype.forEach.call(document.querySelectorAll(".img-lightbox"), function(t) {
        new e(t)
    })
}();


var isElementInViewport, loadImage, processImages, hadLoadSymbol, images = Array.prototype.slice.call(document.querySelectorAll("img[data-original]"));
images && images.length && (isElementInViewport = function(t) {
    var e = t.getBoundingClientRect()
      , i = window.innerHeight || document.documentElement.clientHeight
      , a = window.innerWidth || document.documentElement.clientWidth
      , o = e.top <= i && 0 <= e.top + e.height
      , n = e.left <= a && 0 <= e.left + e.width;
    return o && n || 0 <= e.left && 0 <= e.top && e.left + e.width <= a && e.top + e.height <= i
}
,
loadImage = function(t, e) {
    var i = new Image
      , a = t.dataset.original || "https://cdn.jsdelivr.net/gh/Tomotoes/images/404.png";
    i.src = a,
    i.onload = function() {
        t.src = a,
        hadLoadSymbol[e] = !0
    }
    ,
    i.onerror = function() {
        t.src = "https://cdn.jsdelivr.net/gh/Tomotoes/images/404.png",
        hadLoadSymbol[e] = !0
    }
}
,
processImages = function() {
    for (var t = 0; t < images.length; ++t)
        !hadLoadSymbol[t] && isElementInViewport(images[t]) && loadImage(images[t], t)
}
,
hadLoadSymbol = Array.from({
    length: images.length
}),
processImages(),
window.addEventListener("scroll", throttle(processImages, 300), !1));



var El, modal, mask, rewardCode, rewardToggle, tipFirst, tipPosition, wechatPay, alipayPay, caret, wechatImg, alipayImg, hadLoadReward, tip = function(t, e, i) {
    e = e ? "alert-".concat(e) : "alert-success",
    i = i || 350,
    $("<div>").appendTo("body").addClass("alert ".concat(e)).html(t).show().delay(i).fadeOut()
};
document.querySelector(".highlight") && ((El = document.createElement("script")).src = "https://cdn.jsdelivr.net/npm/clipboard@2.0.6/dist/clipboard.min.js",
document.body.appendChild(El),
El.onload = function() {
    window,
    document,
    function() {
        $(".highlight .code pre").before('<button class="btn-copy waves-block waves-effect" data-clipboard-snippet="">  <span>Copy</span></button>');
        var t = new ClipboardJS(".btn-copy",{
            target: function(t) {
                return t.nextElementSibling
            }
        });
        t.on("success", function(t) {
            tip("复制成功！", "success"),
            t.clearSelection()
            //,t.preventDefault()
        }),
        t.on("error", function(t) {
            tip("复制失败！", "danger")
        })
    }()
}
),
isReward && (modal = new BLOG.modal("#reward"),
mask = document.querySelector("#mask"),
rewardCode = document.querySelector("#rewardCode"),
rewardToggle = document.querySelector("#rewardToggle"),
tipFirst = !1,
tipPosition = -1,
wechatPay = document.querySelector(".wechatPay"),
alipayPay = document.querySelector(".alipayPay"),
caret = document.querySelector(".icon-caretup"),
wechatImg = rewardCode.dataset.wechat,
alipayImg = rewardCode.dataset.alipay,
document.querySelector("#rewardBtn").addEventListener(even, function() {
    1 === tipPosition ? rewardCode.src = alipayImg : 0 === tipPosition && (rewardCode.src = wechatImg),
    mask.parentNode.appendChild(document.querySelector("#reward")),
    modal.toggle()
}),
wechatPay.addEventListener("click", function() {
    tipFirst = !0
}),
rewardToggle && rewardToggle.addEventListener("change", function() {
    tipPosition = this.checked ? tipFirst ? (rewardCode.src = wechatImg,
    alipayPay.classList.remove("show"),
    wechatPay.classList.add("show"),
    caret.style = "margin-left:-20%;",
    0) : (rewardCode.src = alipayImg,
    alipayPay.classList.add("show"),
    wechatPay.classList.remove("show"),
    caret.style = "margin-left:20%;",
    this.checked = !1,
    1) : (rewardCode.src = alipayImg,
    alipayPay.classList.add("show"),
    wechatPay.classList.remove("show"),
    caret.style = "margin-left:20%;",
    1)
}),
hadLoadReward = !1,
document.querySelector(".page-reward").addEventListener(isPhone ? even : "mouseenter", function() {
    hadLoadReward || ($("head").append('<link rel="preload" href="'.concat(alipayImg, '" as="image">')),
    $("head").append('<link rel="preload" href="'.concat(wechatImg, '" as="image">')),
    hadLoadReward = !0)
}));
