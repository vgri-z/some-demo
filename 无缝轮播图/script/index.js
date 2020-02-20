// 配置对象
var config = {
    imgWidth: 520, //一张图片的宽度
    dotWidth: 12, //一个小圆点的宽度
    doms: {//需要用到的dom元素
        divBanner: document.querySelector(".banner"),
        divImgs: document.querySelector(".banner .imgs"),
        divDots: document.querySelector(".banner .dots"),
        divArrows: document.querySelector(".banner .arrow")
    },
    currentIndex: 0, //表示当前显示的是第几张图片，从0开始，到imgNumber - 1为止
    animate: {
        id: null,
        duration: 15,
        toatl: 500
    }
}

config.imgNumber = config.doms.divImgs.children.length; //图片数量

function init() {
    // 设置尺寸
    config.doms.divImgs.style.width = (config.imgNumber + 2) * config.imgWidth + "px";
    config.doms.divDots.style.width = config.imgNumber * config.dotWidth + "px";
    // 调用函数才能看到效果 调用函数 调用函数 调用函数 调用函数
    // 设置元素
    var firstChild = config.doms.divImgs.firstElementChild;
    var lastChild = config.doms.divImgs.lastElementChild;
    var firstClone = firstChild.cloneNode(true); //深度克隆
    config.doms.divImgs.appendChild(firstClone);
    var lastClone = lastChild.cloneNode(true);
    config.doms.divImgs.insertBefore(lastClone, firstChild);
    // 设置小圆点
    for (var i = 0; i < config.imgNumber; i++) {
        var span = document.createElement("span");//创建了元素就要把它加入到页面里面去
        config.doms.divDots.appendChild(span);
    }
    // 小圆点的状态
    setDotsStatus();
    // 设置divImgs的marginLeft
    getCorrectMarginLeft();
    config.doms.divImgs.style.marginLeft = getCorrectMarginLeft(config.currentIndex) + "px";
    regEvent();
}

init();

// 设置小圆点的状态
function setDotsStatus() {
    for (var i = 0; i < config.doms.divDots.children.length; i++) {
        var span = config.doms.divDots.children[i];
        if (i === config.currentIndex) {
            span.className = "active"
        } else {
            span.className = "";
        }
    }
}

function getCorrectMarginLeft(index) {
    return (-index - 1) * config.imgWidth;
}

// 切换图片
function switchTo(index, direction) {
    if (index === config.currentIndex) {
        return;
    }
    // 切换图片就是改变divImgs的marginLeft，向左运动，就是图片往右跑，divImgs的marginLeft越来越大
    //向右运动，就是图片往左跑，divImgs的marginLeft越来越小（marginLeft是负数，所以距离越远，反而越小）
    var newLeft = getCorrectMarginLeft(index);
    animateBegin();

    function animateBegin() {
        stopAnimate();
        //计算次数
        var number = Math.ceil(config.animate.toatl / config.animate.duration);
        //运动总距离
        var totalWidth = config.imgNumber * config.imgWidth;
        var curNumber = 0;
        var distance;
        var curLeft = parseFloat(config.doms.divImgs.style.marginLeft);
        if (direction === "right") {
            if (newLeft < curLeft) {
                distance = newLeft - curLeft;
            }
            else {
                distance = -(totalWidth - Math.abs(newLeft - curLeft));
            }
        }
        else {
            if (newLeft > curLeft) {
                distance = newLeft - curLeft;
            }
            else {
                distance = totalWidth - Math.abs(newLeft - curLeft);
            }
        }
        console.log(distance);// 调试用的
        //每次运动的距离
        var everyDis = distance / number;


        config.animate.id = setInterval(function () {
            curLeft += everyDis;
            if (direction === "right" && Math.abs(curLeft) >= (config.imgNumber + 0.5) * config.imgWidth) {
                curLeft += totalWidth;
            }
            else if (direction === "left" && Math.abs(curLeft) <= 0.5 * config.imgWidth) {
                curLeft -= totalWidth;
            }
            config.doms.divImgs.style.marginLeft = curLeft + "px";
            curNumber++;
            if (curNumber === number) {
                stopAnimate();
            }
        }, config.animate.duration)
    }

    config.currentIndex = index;
    setDotsStatus();

    function stopAnimate() {
        clearInterval(config.animate.id);
        config.animate.id = null;
    }
}

// 注册事件
function regEvent() {
    config.doms.divDots.onclick = function (e) {
        if (e.target.tagName === "SPAN") {
            var index = Array.from(config.doms.divDots.children).indexOf(e.target);
            switchTo(index, index > config.currentIndex ? "right" : "left");
        }
    }

    config.doms.divArrows.onclick = function (e) {
        if (e.target.className === "item left") {
            //左
            var index = config.currentIndex - 1;
            if (index < 0) {
                index = config.imgNumber - 1;
            }
            switchTo(index, "left");
        }
        else if (e.target.className === "item right") {
            //右
            // var index = config.currentIndex + 1;
            // if (index > config.imgNumber - 1) {
            //     index = 0;
            // }
            var index = (config.currentIndex + 1) % config.imgNumber;
            switchTo(index, "right");
        }
    }
}