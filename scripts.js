document.addEventListener("DOMContentLoaded", function () {
    // viewBoxSvgFBChat();

    let lis1 = document.querySelectorAll(".duplicated-menu-1 li a.has-sub-menu");
    if (lis1.length) {
        for (let i = 0; i < lis1.length; i++) {
            let lia = lis1[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.parentNode.childNodes.length; j++) {
                    if (lia.parentNode.childNodes[j].className === "sub-menu") {
                        lia.parentNode.childNodes[j].classList.add("active");
                        lia.parentNode.childNodes[j].style.height = lia.parentNode.childNodes[j].children.length * 30 + "px";
                    } else if (lia.parentNode.childNodes[j].className === "sub-menu active") {
                        lia.parentNode.childNodes[j].style.height = 0;
                        lia.parentNode.childNodes[j].classList.remove("active");
                    }
                }
            });
        }
    }
    let lis2 = document.querySelectorAll(".duplicated-menu-2 li a.has-sub-menu");
    if (lis2.length) {
        for (let i = 0; i < lis2.length; i++) {
            let lia = lis2[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.parentNode.childNodes.length; j++) {
                    if (lia.parentNode.childNodes[j].className === "sub-menu") {
                        lia.parentNode.childNodes[j].classList.add("active");
                    } else if (lia.parentNode.childNodes[j].className === "sub-menu active") {
                        lia.parentNode.childNodes[j].classList.remove("active");
                    }
                }
            });
        }
    }
    let share = document.querySelectorAll(".social-connect li.share a.has-sub-menu");
    if (share.length) {
        for (let i = 0; i < share.length; i++) {
            let lia = share[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.parentNode.childNodes.length; j++) {
                    if (lia.parentNode.childNodes[j].className === "sub-menu") {
                        lia.parentNode.childNodes[j].classList.add("active");
                    } else if (lia.parentNode.childNodes[j].className === "sub-menu active") {
                        lia.parentNode.childNodes[j].classList.remove("active");
                    }
                }
            });
        }
    }
    let conn = document.querySelectorAll(".social-connect li.connect a.has-sub-menu");
    if (conn.length) {
        for (let i = 0; i < conn.length; i++) {
            let lia = conn[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.parentNode.childNodes.length; j++) {
                    if (lia.parentNode.childNodes[j].className === "sub-menu") {
                        lia.parentNode.childNodes[j].classList.add("active");
                    } else if (lia.parentNode.childNodes[j].className === "sub-menu active") {
                        lia.parentNode.childNodes[j].classList.remove("active");
                    }
                }
            });
        }
    }

    let product__collapse = document.querySelectorAll(".product__collapse-content li.has-sub-content");
    if (product__collapse.length) {
        for (let i = 0; i < product__collapse.length; i++) {
            let lia = product__collapse[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.childNodes.length; j++) {
                    if (lia.childNodes[j].className === "sub-content") {
                        lia.childNodes[j].classList.add("active");
                        this.classList.add("active");
                    } else if (lia.childNodes[j].className === "sub-content active") {
                        lia.childNodes[j].classList.remove("active");
                        this.classList.remove("active");
                    }
                }
            });
        }
    }

    let mobileMenu = document.querySelectorAll("#mobile-menu li a.has-sub-menu");
    if (mobileMenu.length) {
        for (let i = 0; i < mobileMenu.length; i++) {
            let lia = mobileMenu[i];
            lia.addEventListener('click', function (e) {
                e.preventDefault();
                for (let j = 0; j < lia.parentNode.childNodes.length; j++) {
                    if (lia.parentNode.childNodes[j].className === "sub-menu") {
                        lia.parentNode.childNodes[j].classList.add("active");
                        lia.parentNode.childNodes[j].style.height = lia.parentNode.childNodes[j].children.length * 30 + "px";
                    } else if (lia.parentNode.childNodes[j].className === "sub-menu active") {
                        lia.parentNode.childNodes[j].style.height = 0;
                        lia.parentNode.childNodes[j].classList.remove("active");
                    }
                }
            });
        }
    }

    if (typeof calculateDotsPosition === "function") {
        calculateDotsPosition();
    }

    startSlick();
    initModals();
    coverBhHeight();

    $('.select2-basic').select2({
        minimumResultsForSearch: -1
    });
    // initTabs();

    $("#formSubscribe").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $("#formSubscribe input").val('');
                if (data.status === 200) {
                    $("#formSubscribe input").val('');

                    $("#pop_up__subscribe").addClass("active");
                    setTimeout(function(){
                        $("#pop_up__subscribe").removeClass("active");
                    }, 5000);
                }
            }
        });


    });

    $("#formSubscribeMobile").submit(function(e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var form = $(this);
        var url = form.attr('action');
        $.ajax({
            type: "POST",
            url: url,
            data: form.serialize(), // serializes the form's elements.
            success: function(data)
            {
                $("#formSubscribeMobile input").val('');
                $("#icon-menu-mobile").trigger("click");
                if (data.status === 200) {
                    $("#formSubscribeMobile input").val('');
                    $("#pop_up__subscribe_mobile").addClass("active");
                    setTimeout(function(){
                        $("#pop_up__subscribe_mobile").removeClass("active");
                    }, 5000);
                }
            }
        });


    });
});

function goTo(url) {
    // window.location.href = url;
}

function myFunction() {
    let x = document.getElementById("mobile-menu-container");
    let brandName = document.querySelector(".brand-name");
    let mobileIcon = document.getElementById("icon-menu-mobile");
    if (x.classList.contains("active")) {
        x.classList.remove("active");
        brandName.classList.remove("focus");
        if (mobileIcon) {
            mobileIcon.classList.remove("focus");
        }
        let rightMenu = document.querySelector(".right-menu");
        if (rightMenu && mobileIcon && brandName) {
            brandName.style.marginTop = mobileIcon.style.marginTop = rightMenu.style.marginTop;
        }

        /*change the icon while active and inactive*/
        document.getElementById("hamburger").classList.remove("is-active");
        // document.getElementById("menu-close").style.display = "block";
        // document.getElementById("menu-open").style.display = "none";
    } else {
        x.classList.add("active");
        brandName.classList.add("focus");
        if (mobileIcon) {
            mobileIcon.classList.add("focus");
        }
        /*change the icon while active and inactive*/
        document.getElementById("hamburger").classList.add("is-active");
        // document.getElementById("menu-close").style.display = "none";
        // document.getElementById("menu-open").style.display = "block";
    }
}


function startSlick() {
    let wContainer = $(".container").width();
    let widthScreen = ($(window).width() - wContainer) / 2 - 10;
    let $detailSlider = $('.detail-slider');
    $detailSlider.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var $status = $('.detail-slider .slick.paging-info');
        var i = (currentSlide ? currentSlide : 0) + 1;
        if (!$status.length && slick.slideCount > 1) {
            $detailSlider.append('<div class="slick paging-info"><span class="page">0' + i + '</span><sup><span class="total">0' + slick.slideCount + '</span></sup></div>');
        } else {
            $status[0].innerHTML = '<span class="page">0' + i + '</span><sup><span class="total">0' + slick.slideCount + '</span></sup>';
        }
    });

    
}

function viewBoxSvgFBChat() {
    let icon = null;
    let interval = null;
    interval = setInterval(function(){
        icon = document.querySelector(".fb_dialog.fb_dialog_advanced.fb_customer_chat_bubble_animated_no_badge svg");
        console.log(icon);
        if (icon) {
            console.log(icon);
            clearInterval(interval);
        }
        clearInterval(interval);
    }, 1000);
}

function nextSlide() {
    let $detailSliderDesktop = $('.detail-slider.desktop');
    $detailSliderDesktop.slick('slickNext');
}

function prevSlide() {
    let $detailSliderDesktop = $('.detail-slider.desktop');
    $detailSliderDesktop.slick('slickPrev');
}

function initModals() {
    let elems = document.querySelectorAll('.modal');
    let modalInstances = window.instancesModals = M.Modal.init(elems);
    window.modalIntances = modalInstances;
}

function initTabs() {
    let el = document.querySelector(".tabs");
    let options = {};
    let tabsInstace = M.Tabs.init(el);
    window.tabsInstace = tabsInstace;
    // tabsInstace.select('test1');
}

function coverBhHeight() {
    let cover = document.querySelector(".cart-page-cover");
    let coverBg = document.querySelector(".cart-page-cover.has-background");
    if (window.innerWidth > 600) {
        if (cover && coverBg) {
            coverBg.style.minHeight = cover.offsetHeight + "px";
        }
    }

}
