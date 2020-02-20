// //  小羊 自身动作 自身移动
// var num = 0;
// var cot = null;
// var sheep = document.getElementsByClassName('sheep')[0];
// var timer1 = setInterval(function () {
//     num += 164;
//     if(num == 1312){ // 如果图片长度全部没有了，让图片在重新从 0 0 点开始
//         num = 0;
//     }
//     sheep.style.backgroundPosition = -num + "px " + 0 + "px";
// }, 30);

// var timer2 = setInterval(function() { // 自身移动的方法是距离的减少
//     cot = sheep.offsetLeft - 5;
//     if(cot <= -164){
//         clearInterval(timer1);
//         clearInterval(timer2);
//     }
//     sheep.style.left = cot + "px";
// }, 30);


(function () {

    obj = {
        sheepN: 0,
        sheepS: 0,
        stage: document.getElementsByClassName('stage')[0],
        speed: 5,
        frequency: 80
    }

    function SheepOrigin(data) {
        this.stage = data.stage;
        this.sheep = document.createElement('div');
        this.stage.appendChild(this.sheep);
        this.sheep.className = 'sheep';
        this.speed = data.speed;
        this.speedOrigin = data.speed;
        this.sheepW = this.sheep.offsetWidth;
        this.frequency = (Math.floor(Math.random() * data.frequency)) + 20;
        this.top = 0;
        this.sheepN = data.sheepN;
        this.sheepS = data.sheepS;
    }

    // var sheepOrigin = new SheepOrigin(obj);
    // console.log(sheepOrigin);

    init();

    function init() {
        createSheep();
    }

    function createSheep() {
        var timer = setInterval(function () {
            var sheepNum = obj.stage.children.length;
            if (sheepNum > 100) {
                return false;
            } else {
                var sheepOrigin = new SheepOrigin(obj);
                sheepRun(sheepOrigin);
            }
        }, 1500)
    }

    function sheepRun(SheepOrigin) {
        var timer1 = setInterval(function () {
            SheepOrigin.sheepN += SheepOrigin.sheepW;
            if (SheepOrigin.sheepN == (SheepOrigin.sheepW * 8)) { // 如果图片长度全部没有了，让图片在重新从 0 0 点开始
                SheepOrigin.sheepN = 0;
            }
            // SheepOrigin.sheep.style.backgroundPosition = - SheepOrigin.sheepN + "px " + this.top + "px";(this要换成SheepOrigin)
            SheepOrigin.sheep.style.backgroundPosition = - SheepOrigin.sheepN + 'px ' + SheepOrigin.top + 'px';
        }, SheepOrigin.frequency);

        var timer2 = setInterval(function () { // 自身移动的方法是距离的减少
            SheepOrigin.sheepS = SheepOrigin.sheep.offsetLeft - SheepOrigin.speed;
            if (SheepOrigin.sheepS <= -SheepOrigin.sheepW) {
                clearInterval(timer1);
                clearInterval(timer2);
                console.log("ok");
            }
            SheepOrigin.sheep.style.left = SheepOrigin.sheepS + "px";
        }, SheepOrigin.frequency);

        SheepOrigin.sheep.onmousedown = function (e) {
            var event = e || window.event;
            SheepOrigin.speed = 0;
            SheepOrigin.top = -128;
            SheepOrigin.x = e.pageX;
            SheepOrigin.y = e.pageY;

            document.onmousemove = function (e) {
                var event = e || window.event;
                SheepOrigin.sheep.style.left = SheepOrigin.sheep.offsetLeft + (e.pageX - SheepOrigin.x) + "px";
                SheepOrigin.sheep.style.top = SheepOrigin.sheep.offsetTop + (e.pageY - SheepOrigin.y) + "px";
                SheepOrigin.x = event.pageX;
                SheepOrigin.y = event.pageY;
            }
            document.onmouseup = function (e) {
                document.onmousemove = null;
                SheepOrigin.top = 0;
                SheepOrigin.speed = SheepOrigin.speedOrigin;

            }
        }
    }
}())