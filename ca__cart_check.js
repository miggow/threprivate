document.addEventListener("DOMContentLoaded", function () {
    calculateDotsPosition();
    noticeOnCart();

    // let cartEle = document.getElementById("cart");
    // if (cartEle) {
    //     cartEle.addEventListener("click", function (e) {
    //         e.preventDefault();
    //         document.getElementById("pop_up__cart").classList.toggle("active");
    //     });
    // }

    // window.addEventListener("click", function (e) {
    //     let liCart = document.getElementById("cart");
    //     let iFas = document.querySelector("i.fas.fa-tshirt");
    //     let quantityEle = document.querySelector(".quantity");
    //     let tdName = document.querySelector("td.name");
    //     let tdDelete = document.querySelector("td.delete");
    //     let btnCartPurchase = document.querySelector(".btn.cart-purchase");
    //     if (tdName && tdDelete) {
    //         if (
    //             e.target.id !== liCart.id &&
    //             e.target.className !== iFas.className &&
    //             e.target.className !== quantityEle.className &&
    //             e.target.className !== tdName.className &&
    //             e.target.className !== tdDelete.className &&
    //             e.target.className !== btnCartPurchase.className
    //         ) {
    //             document.getElementById("pop_up__cart").classList.remove("active");
    //         }
    //     } else {
    //         if (
    //             e.target.id !== liCart.id &&
    //             e.target.className !== iFas.className &&
    //             e.target.className !== quantityEle.className &&
    //             e.target.className !== btnCartPurchase.className
    //         ) {
    //             document.getElementById("pop_up__cart").classList.remove("active");
    //         }
    //     }
    //
    // });
});

function clickInItStyle(ele, i) {
    document.querySelector(".slick-dots").children[i].click();
}

function calculateDotsPosition() {
    let detailSlider = document.querySelector(".detail-slider");
    let detailSliderHeight = 0;
    if (detailSlider) {
        detailSliderHeight = detailSlider.offsetHeight;
    } else {
        return;
    }
    let dots = document.querySelector(".slick-dots");
    let dotsHeight = 0;
    if (dots) {
        dotsHeight = dots.offsetHeight;
    } else {
        return;
    }

    let dotsTop = 0;
    if (window.screen.availWidth <= 600) {
        dotsTop = (detailSliderHeight / 2) - (dotsHeight / 2);
    } else {
        dotsTop = (detailSliderHeight / 2) + (dotsHeight / 2);
    }
    dots.style.top = dotsTop + "px";
}

function changeSize(ele, size) {
    let pa = ele.parentNode;
    for (let i = 0; i < pa.children.length; i++) {
        pa.children[i].classList.remove("choose");
        pa.children[i].classList.remove("border-bottom");
    }
    ele.classList.toggle("choose");
    ele.classList.toggle("border-bottom");
    document.querySelector("input[name='size']").value = size;
}

function addToCart(ele) {
    let cart = localStorage.getItem("cart");
    let productId = document.querySelector("input[name=productId]").value;
    let price = document.querySelector("input[name=price]").value;
    let size = document.querySelector("input[name=size]").value;
    let thumbnail = document.querySelector("input[name=thumbnail]").value;
    let url = document.querySelector("input[name=url]").value;
    let name = document.querySelector("input[name=name]").value;
    let quantity = 1;
    let item = {
        productId: productId,
        name: name,
        price: price,
        size: size,
        amount: price * quantity,
        quantity: quantity,
        thumbnail: thumbnail,
        url: url
    };

    cart = JSON.parse(cart);
    if (cart && cart.length) {
        let template = "";
        for (let i = 0; i < cart.length; i++) {
            if (
                item.productId === cart[i].productId &&
                item.size === cart[i].size
            ) {
                cart[i].quantity += 1;
                localStorage.setItem("cart", JSON.stringify(cart));
                noticeOnCart(cart);
                showPopupCart();
                return;
            } else {
                if (i === cart.length - 1) {
                    cart.push(item);
                    localStorage.setItem("cart", JSON.stringify(cart));
                    noticeOnCart(cart);
                    showPopupCart();
                    return;
                }
            }
        }
    } else {
        cart = [item];
        localStorage.setItem("cart", JSON.stringify(cart));
        noticeOnCart(cart);
        showPopupCart();
    }
}

function noticeOnCart(cart = null) {
    if (!cart) {
        cart = JSON.parse(localStorage.getItem("cart"));
    }

    if (cart) {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].quantity || 0;
        }
        let numberSpan = document.querySelectorAll("span.numbers");

        if (numberSpan) {
            for(let ni = 0; ni < numberSpan.length; ni++){
                numberSpan[ni].innerHTML = "(" + total + ")";
            }
        }
        callApiUpdateSession();
    }
}

function deleteCart(e, i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart[i]) {
        e.parentNode.remove();
        cart.splice(i, 1);
        noticeOnCart(cart);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartInfoInView(cart[i], i);
        callApiUpdateSession();
    }
}

function purchaseCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    $.ajax({
        method: 'post',
        url: '/orders',
        dataType: 'json',
        data: {
            'cart': cart,
            '_token': __token,
            'accountId': localStorage.getItem("id")
        },
        success: function (resp) {
            if (resp && resp.status === 200) {
                localStorage.setItem("cart", null);
                noticeOnCart();
                window.location.href = "/payment";
            }

        }
    });
}

function callApiUpdateSession() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    $.ajax({
        method: 'post',
        url: '/orders/update-cart',
        dataType: 'json',
        data: {
            'cart': cart.length !== 0 ? cart : [],
            '_token': __token
        },
        success: function (resp) {
            if (resp && resp.status === 200) {
                localStorage.setItem("cart", null);
                noticeOnCart();
                window.location.href = "/";
            }
        }
    });
}
function callApiCompleteCart() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    $.ajax({
        method: 'post',
        url: '/orders/complete-cart',
        dataType: 'json',
        data: {
            'cart': cart.length !== 0 ? cart : [],
            '_token': __token
        },
        success: function (resp) {
            if (resp && resp.status === 200) {
                localStorage.setItem("cart", null);
                noticeOnCart();
                window.location.href = "/";
            }
        }
    });
}

function updateCartInfoInView() {
    let cart = JSON.parse(localStorage.getItem("cart"));
    let template = "";
    // let template_at_infor_page = "";
    let totalAmount = 0;
    if (cart) {
        for (let i = 0; i < cart.length; i++) {
            let item = cart[i];
            totalAmount += (parseInt(item.price) * item.quantity);
            template += '<tr>' +
                '<td class="thumbnail">' +
                '<a href="/product' + item.url + '"><img src="' + item.thumbnail + '"/></a>' +
                '</td>' +
                '<td class="left-align name">' +
                '<p class="product-name"><a href="/product' + item.url + '">' + item.name + '</a></p>' +
                '<p class="product-info">SIZE: ' + item.size + '</p>' +
                '<p class="product-info hide-on-med-and-up">' + (parseInt(item.price)).numberFormat(0, ',', '.') + ' VND</p>' +
                '<div class="quantity-block hide-on-med-and-up">' +
                '<p class="quantity-box">' +
                '<span class="controls-quantity" onclick="decreaseItem(this, ' + i + ')">-</span>' +
                '<span>' + item.quantity + '</span>' +
                '<span class="controls-quantity" onclick="increaseItem(this, ' + i + ')">+</span>' +
                '</p>' +
                '<p class="remove-button" onclick="deleteCart(this, ' + i + ')">REMOVE</p>' +
                '</div>' +
                '</td>' +
                '<td width="20%" class="center-align quantity hide-on-small-and-down">' +
                '<div class="quantity-block">' +
                '<p class="quantity-box">' +
                '<span class="controls-quantity" onclick="decreaseItem(this, ' + i + ')">-</span>' +
                '<span>' + item.quantity + '</span>' +
                '<span class="controls-quantity" onclick="increaseItem(this, ' + i + ')">+</span>' +
                '</p>' +
                '<p class="remove-button" onclick="deleteCart(this, ' + i + ')">REMOVE</p>' +
                '</div>' +
                '</td>' +
                '<td  class="hide-on-small-and-down" width="15%" class="right-align total-amount">' + (parseInt(item.price) * item.quantity).numberFormat(0, ',', '.') + ' VND</td>' +
                '</tr>';

            // template_at_infor_page += '<tr>' +
            //     '                                            <td width="25%">' +
            //     '                                                <a class="img-wrapper covered" href="' + item.url + '">' +
            //     '                                                    <img src="' + item.thumbnail + '"/>' +
            //     '                                                    <span>' + ((item.quantity.length && String(item.quantity).length < 2) ? String(item.quantity).padStart(2, '0') : item.quantity) + '</span>' +
            //     '                                                </a>' +
            //     '                                            </td>' +
            //     '                                            <td>' +
            //     '                                                <p class="product-name">' +
            //     '                                                    <a href="' + item.url + '">' + item.name + '</a>' +
            //     '                                                </p>' +
            //     '                                                <p class="product-info">SIZE: ' + item.size + '</p>' +
            //     '                                                <p class="product-price">' + (parseInt(item.price) * item.quantity).numberFormat(0, ',', '.') +
            //     '                                                    VND</p>' +
            //     '                                            </td>' +
            //     '                                        </tr>'
        }
    }

    template += '<tr>' +
        '                   <td class="right-align" colspan="4">' +
        '                   <div class="summary-block">' +
        '                       <p class="total">TOTAL</p>' +
        '                       <p class="amount">' + totalAmount.numberFormat(0, ',', '.') + ' VND</p>' +
        '                       <p class="shipping">Shipping  calculated at checkout</p>' +
        '                       <a href="/" class="btn purchase default hide-on-small-only">BACk</a>' +
        '                       <button class="btn purchase" type="button" onclick="nextTabs(\'cart2\')">CHECK OUT</button>' +
        '                   </div>' +
        '                   </td>' +
        '               </tr>';

    // template_at_infor_page += '<tr>' +
    //     '                                    <td colspan="2">' +
    //     '                                        <label class="info-promotion" for="name">PROMOTIONAL CODE</label>' +
    //     '                                        <div class="row">' +
    //     '                                            <div class="input-field group-input-button col s8">' +
    //     '                                                <input type="text" id="promotionCode" name="promotionCode" placeholder="Discount Code"' +
    //     '                                            </div>' +
    //     '                                            <div class="input-field col s4">' +
    //     '                                                <a class="btn apply-promotion">APPLY</a>' +
    //     '                                            </div>' +
    //     '                                        </div>' +
    //     '                                    </td>' +
    //     '                                </tr>';

    let cartItemEle = document.querySelector("#cart1 table tbody");
    if (cartItemEle) {
        cartItemEle.innerHTML = template;
    }
    // let __previewItemsAndPromotion = document.querySelector("table.__preview-items-and-promotion tbody");
    // if (__previewItemsAndPromotion) {
    //     __previewItemsAndPromotion.innerHTML = template_at_infor_page;
    // }

}

function increaseItem(e, i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart[i]) {
        ++cart[i].quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartInfoInView(cart[i], i);
        noticeOnCart();
    }
}

function decreaseItem(e, i) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart && cart[i] && cart[i].quantity > 1) {
        --cart[i].quantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartInfoInView(cart[i], i);
        noticeOnCart();
    }
}

function nextTabs(tabId) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    switch (tabId) {
        case "cart1":
            window.location.href = "/orders/cart-details";
            break;
        case "cart2":
            let span = document.querySelector("#cart1 span.help-block.has-error");
            if (!cart || cart.length === 0) {
                if (span) {
                    span.innerText = "Vui lòng chọn sản phẩm vào giỏ hàng";
                }
            } else {
                if (span) {
                    span.innerText = "";
                }
                window.location.href = "/orders/cart-contact";
            }
            break;
        case "cart3":
            let formContact = document.getElementById("cart-contact");
            if (formContact) {
                formContact.submit();
            } else {
                window.location.href = "/orders/cart-shipping";
            }
            break;
        case "cart4":
            let formShipping = document.getElementById("cart-shipping");
            if (formShipping) {
                formShipping.submit();
            } else {
                window.location.href = "/orders/cart-payment";
            }
            break;
        case "complete":
            callApiCompleteCart();
            break;
    }
    tabsInstace.select(tabId);
}

function cityChange(ele, changeTo='districtId') {
    if (ele && ele.value && ele.value.length !== 0) {
        let route = "district";
        if (changeTo === "wardId") {
            route = "ward"
        }
        let id = ele.value;
        $.ajax({
            method: 'get',
            url: '/address/' + route,
            dataType: 'json',
            data: {
                'provinceId': id,
                'districtId': id,
                '_token': __token
            },
            success: function (resp) {
                if (resp && resp.status === 200) {
                    let data = resp.data;
                    let selectOption = "";
                    selectOption += '<option value="">Chọn</option>';
                    for (let i = 0; i < data.length; i++) {
                        selectOption += '<option value="' + data[i].id + '">' + data[i].name + '</option>';
                    }
                    let selectEle = document.getElementById(changeTo);
                    selectEle.innerHTML = selectOption;
                }

            }
        });
    }
}

function showPopupCart(){
    document.getElementById("pop_up__cart").classList.add("active");
    setTimeout(function(){
        document.getElementById("pop_up__cart").classList.remove("active");
    }, 5000);
}

// function nextTabs(eleClass, tabId) {
//     let tab = document.getElementById(tabId);
//     let tabs = document.querySelectorAll("li.tab a");
//     let tab_data = document.querySelectorAll(".tab__data");
//     if (tab_data) {
//         for(let i = 0; i < tab_data.length; i++) {
//             if (tab_data[i] && tab_data[i].classList.contains("active")) {
//                 tab_data[i].classList.remove("active");
//             }
//         }
//     }
//     if (tabs) {
//         for(let i = 0; i < tabs.length; i++) {
//             if (tabs[i] && tabs[i].classList.contains("active")) {
//                 tabs[i].classList.remove("active");
//             }
//         }
//     }
//     if (tab) {
//         tab.classList.add("active");
//         let tabClick = document.querySelectorAll(eleClass);
//         if (tabClick) {
//             for(let i = 0; i < tabClick.length; i++) {
//                 if (tabClick[i] && !tabClick[i].classList.contains("active")) {
//                     tabClick[i].classList.add("active");
//                 }
//             }
//         }
//     }
// }