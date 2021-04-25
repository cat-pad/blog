"use strict";
function getQL() {
    return {
        operationName: "getRepoInfo",
        query: '\n\tquery getRepoInfo($owner: String = "Tomotoes", $weibo: String = "weibo", $gallery: String = "gallery") {\n\t\trepository(owner: $owner, name: $weibo) {\n\t\t\tissues(filterBy: {createdBy: $owner, states: OPEN}) {\n\t\t\t\ttotalCount\n\t\t\t}\n\t\t}\n\t\trepositoryOwner(login: $owner) {\n\t\t\trepository(name: $gallery) {\n\t\t\t\tdescription\n\t\t\t}\n\t\t}\n\t}\n\t'
    }
}
/*
// 获取文章总数
function getGithubCount(t, e) {
    $.ajax({
        url: "https://api.github.com/graphql",
        type: "post",
        data: JSON.stringify(getQL()),
        headers: {
            Accept: "application/json",
            Authorization: "bearer ".concat(["9c48ed2297d7d9bf9447", "6de723dbf1a6e4adeacd"].join(""))
        },
        success: t,
        error: e
    })
}
// 加载博客总量等
 function initCount() {
     var e = sessionStorage.getItem("WEIBO-COUNT")
       , n = sessionStorage.getItem("PHOTO-COUNT");
     if (!e || !n || "null" === e || "null" === n)
         return getGithubCount(function(t) {
             n = t.data.repositoryOwner.repository.description.match(/\d+/)[0],
             e = t.data.repository.issues.totalCount,
             n && e && (document.getElementById("weibo-count").innerText = e,
             document.getElementById("photo-count").innerText = n,
             sessionStorage.setItem("WEIBO-COUNT", e),
             sessionStorage.setItem("PHOTO-COUNT", n))
         }, console.error);
     document.getElementById("weibo-count").innerText = e,
     document.getElementById("photo-count").innerText = n
 }
 initCount();
  */
 //使头部动态隐藏
var header = document.getElementById("header")
  , headroom = new Headroom(header,{
    classes: {
        initial: "headroom",
        pinned: "headroom--pinned",
        unpinned: "headroom--unpinned",
        top: "headroom--top",
        notTop: "headroom--not-top",
        bottom: "headroom--bottom",
        notBottom: "headroom--not-bottom",
        frozen: "headroom--frozen"
    }
});
headroom.init();
var maskEl = document.querySelector(".mask"), setNightMode = function() {
    maskEl.classList.add("night"),
    sessionStorage.setItem("night", "1")
}, banNightMode = function() {
    maskEl.classList.remove("night"),
    sessionStorage.setItem("night", "0")
};
function switchNightMode() {
    ("1" === sessionStorage.getItem("night") ? banNightMode : setNightMode)()
}
"1" === sessionStorage.getItem("night") && setNightMode(),
function() {
    var a, t = window || this, e = t.BLOG.even, n = t.BLOG.$, o = n("#search"), r = n("#search-wrap"), i = n("#key"), s = n("#back"), c = n("#search-panel"), u = n("#search-result");
    var h = n("html")
      , m = {
        show: function() {
            t.innerWidth < 760 && h.classList.add("lock-size"),
            c.classList.add("in")
        },
        hide: function() {
            t.innerWidth < 760 && h.classList.remove("lock-size"),
            c.classList.remove("in")
        }
    };
    function p(t) {
        var e = ""
          , e = t.length ? t.map(function(t) {
            return e = d,
            n = {
                title: t.title,
                path: "/blog".concat(t.path),
                date: new Date(t.date).toLocaleDateString(),
                tags: t.tags.map(function(t) {
                    return "<span>#".concat(t.name, "</span>")
                }).join("")
            },
            e.replace(/\{\w+\}/g, function(t) {
                var e = t.replace(/\{|\}/g, "");
                return n[e] || ""
            });
            var e, n
        }).join("") : '<li class="tips"><p>未发现匹配文章</p></li>';
        u.innerHTML = e
    }
    function g(t, e) {
        return e.lastIndex = 0,
        e.test(t)
    }
}
.call(void 0),
jQuery.easing.jswing = jQuery.easing.swing,
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    easeOutCubic: function(t, e, n, o, r) {
        return o * ((e = e / r - 1) * e * e + 1) + n
    },
    easeOutBounce: function(t, e, n, o, r) {
        return (e /= r) < 1 / 2.75 ? o * (7.5625 * e * e) + n : e < 2 / 2.75 ? o * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + n : e < 2.5 / 2.75 ? o * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + n : o * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + n
    }
}),
function(i) {
    i.fn.bumpyText = function(a) {
        return a = i.extend({
            bounceHeight: "1.3em",
            bounceUpDuration: 500,
            bounceDownDuration: 700
        }, a),
        this.each(function() {
            var t = i(this);
            if (t.text() === t.html()) {
                for (var e = t.text(), n = "", o = 0; o <= e.length; o++) {
                    var r = e.slice(o, o + 1);
                    n += i.trim(r) ? '<span class="bumpy-char">'.concat(r, "</span>") : r
                }
                t.html(n),
                t.find("span.bumpy-char").each(function() {
                    i(this).mouseover(function() {
                        i(this).animate({
                            bottom: a.bounceHeight
                        }, {
                            queue: !1,
                            duration: a.bounceUpDuration,
                            easing: "easeOutCubic",
                            complete: function() {
                                i(this).animate({
                                    bottom: 0
                                }, {
                                    queue: !1,
                                    duration: a.bounceDownDuration,
                                    easing: "easeOutBounce"
                                })
                            }
                        })
                    })
                })
            }
        })
    }
}(jQuery),
$("#name").bumpyText(),
Waves.init(),
Waves.attach(".page-share li", ["waves-block"]),
Waves.attach(".article-tag-list-link, #page-nav a, #page-nav span", ["waves-button"]),
isPhone || (function() {
    var t = $(".sliding-bar");
    $(".nav > .items").hover(function() {
        t.offset($(this).offset())
    })
}());
