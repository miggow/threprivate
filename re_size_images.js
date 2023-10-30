document.addEventListener("DOMContentLoaded", function (event) {
    let parents = document.getElementById("__auto_resize_images");
    let children = null;
    if (parents) {
        children = parents.children;
    } else {
        return;
    }
    let containerWidth = document.querySelector(".container").offsetWidth;
    let src = [];
    let galleryWidths = [95,100];
    let productWidths = [95,100];
    let margins = [20];
    let productSizeMax = false;
    for (let i = 0; i < children.length; i++) {
        children[i].style.marginBottom = margins[Math.floor(Math.random() * margins.length)] + "px";
        if (window.screen.availWidth >= 600) {
            for (let j = 0; j < children[i].childNodes.length; j++) {

                if (children[i].childNodes[j].className === "gallery-image") {
                    let width = galleryWidths[Math.floor(Math.random() * galleryWidths.length)];
                    children[i].style.width = width + "%";
                    if (width === 70) {
                        productSizeMax = true;
                    }
                } else if (children[i].childNodes[j].className === "product-image") {
                    if (productSizeMax) {
                        children[i].style.width = [10, 20][Math.floor(Math.random() * [10, 20].length)] + "%";
                        productSizeMax = false;
                    } else {
                        children[i].style.width = productWidths[Math.floor(Math.random() * productWidths.length)] + "%";
                    }
                }
            }
        } else {
            children[i].style.width = "100%";
            children[i].style.marginTop = "20px";
            children[i].style.marginLeft = "0";
            children[i].style.padding = "0 20px";
            children[i].style.float = "left";
        }


    }
});