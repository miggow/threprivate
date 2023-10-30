document.addEventListener("DOMContentLoaded", function (event) {
    let config = {
        overlayId: "overlay",
        collectionHighlightId: "collection-highlight",
        spaceToDisplay: window.innerHeight * 70 / 100, //pixel
        spaceToHidden: window.innerHeight * 20 / 100, //pixel
        mainContentEleId: "main-content",
        delayViewId: "__ca_delayed_view",
        brandName: "brand-name",
        rightMenu: "right-menu",
        duplicatedMenu1: "duplicated-menu-1",
        duplicatedMenu2: "duplicated-menu-2",
        socialConnect: "social-connect",
        __scroll: "__scroll",
        mobileMenuIcon: "icon-menu-mobile"
    };

    /**
     * Banner script,
     * start zoom-in banner
     * then turn on - Scroll action
     */
    if (document.getElementById("js-main-banner")) {
        document.getElementById("js-main-banner").classList.add("is-loaded");
        setTimeout(function () {
            document.getElementById("js-main-banner").classList.add("is-active")
        }, 2500);
    }

    /**
     * call show delay view first Time
     */
    scrollView(config, "down");
    /**
     * Main content script
     * default it's opacity 0, while the banner go top, and the space go to about 100px remaining
     * turn on transition main content
     */
    let lastScrollTop = 0;
    let scrollWhere = "";
    let curStorage = {
        home: ""
    };
    if (sessionStorage.getItem("storageScroll") === null) {
        curStorage = {
            home: ""
        };
    } else {
        curStorage = JSON.parse(sessionStorage.getItem("storageScroll"));
        if (location.pathname === "/") {
            // window.scroll("top", curStorage.home);
        }
    }

    let isShowing = false;
    let mainwrapper = document.querySelector(".mainwrapper");
    let productInfoContainer = document.querySelector(".product-info-container");
    let productInfoWrapper = document.querySelector(".div-product-wrapper");
    if (productInfoContainer) {
        productInfoContainer.addEventListener("mousewheel", function (e) {
            mainwrapper.scroll("top", mainwrapper.scrollTop + e.deltaY);
        });
    }
    mainwrapper.addEventListener("scroll", function (e) {
        let st = this.scrollTop;
        if (st > lastScrollTop) {
            scrollWhere = "down";
       
            scrollView(config, scrollWhere, isShowing);
        } else {
            scrollWhere = "up";
        }
        lastScrollTop = st <= 0 ? 0 : st;
    });

    let lastScroll = 0;
    mainwrapper.addEventListener("scroll", function(e){
        if (window.innerWidth > 600) {
            let wrapper = document.querySelector(".div-product-wrapper");
            if (wrapper) {
                let container = document.querySelector(".product-info-container");
                let wrapperRect = wrapper.getBoundingClientRect();
                let containerRect = productInfoContainer.getBoundingClientRect();


                let st = mainwrapper.scrollTop;
                if (st > lastScroll) {
                    scrollWhere = "down";
                    if(containerRect.top < 38) {
                        container.style.position = "fixed";
                        container.style.top = "38px";
                    }
                    if (wrapperRect.bottom <= containerRect.bottom) {
                        container.style.position = "absolute";
                        container.style.top = "";
                        container.style.bottom = "0";
                    }
                } else {
                    scrollWhere = "up";
                    if(containerRect.top > 134) {
                        container.style.position = "fixed";
                        container.style.top = "134px";
                        container.style.bottom = "";
                    }
                }
                lastScroll = st <= 0 ? 0 : st;
            }

        }
    });
});

function scrollView(config, scrollWhere, isShowing) {
    let collectionHighlightEle = null;
    if (typeof config.collectionHighlightId !== "undefined" && config.collectionHighlightId !== "") {
        collectionHighlightEle = document.getElementById(config.collectionHighlightId);
    } else {
        return;
    }
    let mainContentEle = null;
    if (typeof config.mainContentEleId !== "undefined" && config.mainContentEleId !== "") {
        mainContentEle = document.getElementById(config.mainContentEleId);
    } else {
        return;
    }
    let overlayEle = null;
    if (typeof config.overlayId !== "undefined" && config.overlayId) {
        overlayEle = document.getElementById(config.overlayId);
        if (overlayEle) {
            let overlayRect = overlayEle.getBoundingClientRect();
            if (overlayRect.bottom <= config.spaceToDisplay && scrollWhere === "down") {
                if (collectionHighlightEle) {
                    collectionHighlightEle.classList.add("active");
                }
            } else if (overlayRect.bottom >= config.spaceToHidden && scrollWhere === "up") {
                if (collectionHighlightEle) {
                    collectionHighlightEle.classList.remove("active");
                }
            }
        }
    }
    if (collectionHighlightEle !== null && mainContentEle !== null) {
        let rectAbove = collectionHighlightEle.getBoundingClientRect();
        window.rectAbove = rectAbove;

        if (rectAbove.bottom <= config.spaceToDisplay && scrollWhere === "down") {
         
            mainContentEle.classList.add("active");
            delayedView("show");
        } else if (rectAbove.bottom > config.spaceToDisplay && scrollWhere === "up") {
            mainContentEle.classList.remove("active");
            delayedView("hide");
        }
    } else {
        delayedView("show");
    }
}

function delayedView(status = "show") {
    let wrapView = document.getElementById("__ca_delayed_view");
    if (wrapView !== null) {
        let timeout = [];
        let children = wrapView.children;
        if (children.length !== 0) {
            for (let i = 0; i < children.length; i++) {
                let delayTime = children[i].attributes['data-delay'] ? children[i].attributes['data-delay'].value : 0;
                if (status === "show") {
                    setTimeout(function () {
                        children[i].classList.add("active");
                        if (children[i].children.length > 0) {
                            let childOfChild = children[i].children[0];
                            if (
                                childOfChild.classList.contains("brand-name") ||
                                childOfChild.classList.contains("left-menu") ||
                                childOfChild.classList.contains("right-menu")
                            ) {
                                childOfChild.classList.add("active");
                            }
                        }
                    }, delayTime * 1000);
                } else {
                    setTimeout(function () {
                        children[i].classList.remove("active");
                        if (children[i].children.length > 0) {
                            let childOfChild = children[i].children[0];
                            if (
                                childOfChild.classList.contains("brand-name") ||
                                childOfChild.classList.contains("left-menu") ||
                                childOfChild.classList.contains("right-menu")
                            ) {
                                childOfChild.classList.remove("active");
                            }
                        }
                        setTimeout(function () {
                            children[i].style.transition = "";
                            children[i].style.webkitTransition = "";
                        }, 40)
                    }, 200);
                }
            }
        }
        let containerProduct = document.querySelector(".container.production");
        if (containerProduct) {
            containerProduct.classList.add("active");
        }
        let __auto_delay_view = document.querySelector(".__auto_delay_view");
        if (__auto_delay_view) {
            __auto_delay_view.classList.add("active");
        }
    }

    let __auto_delay_view = document.querySelector(".__auto_delay_view");
    if (__auto_delay_view) {
        __auto_delay_view.classList.add("active");
    }
}

function storageScroll(curStorage) {
    if (window.location.pathname === "/") {
        curStorage.home = window.scrollY;
    }
    sessionStorage.setItem("storageScroll", JSON.stringify(curStorage));
}

let keys = [32, 33, 34, 35, 36, 37, 38, 39, 40];

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
    preventDefault(e);
}

function disable_scroll() {
    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;
    document.onkeydown = keydown;
    disable_scroll_mobile();
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
    enable_scroll_mobile();
}

// My improvement

// MOBILE
function disable_scroll_mobile() {
    document.addEventListener('touchmove', preventDefault, false);
}

function enable_scroll_mobile() {
    document.removeEventListener('touchmove', preventDefault, false);
}

function noscroll(scrollY) {
    window.scrollTo(0, scrollY);
}