import "./setting.scss";
import './screenAnimate.scss';
import "./index.scss";

let timeDelay = (time = 500) => (new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
}));

function excuteQueue([...timeCallStack]) {
    timeCallStack.reduce((promise, current) => promise.then(() => {
        current.cb && current.cb();
        return timeDelay(current.time);
    }), Promise.resolve());
}
async function loadFrame(frameClass = 'animate-frame-one') {
    $(`.${frameClass} .part-screen.figure-content`).removeClass('no-opacity').addClass('slide-in-5');
    await timeDelay(500);
    $(`.${frameClass} .part1`).removeClass('no-opacity').addClass('slide-in-1');
    $(`.${frameClass} .part2`).removeClass('no-opacity').addClass('slide-in-2');
    $(`.${frameClass} .part3`).removeClass('no-opacity').addClass('slide-in-3');

    // 时刻1000ms,进入浮动阶段
    await timeDelay(400);
    $(`.${frameClass} .part1`).removeClass('slide-in-1').addClass('move-1');

    // 时刻1100ms + 100延时
    await timeDelay(200);
    $(`.${frameClass} .part2`).removeClass('slide-in-2').addClass('move-2');

    // 延时1200ms + 200延时
    await timeDelay(300);
    $(`.${frameClass} .part3`).removeClass('slide-in-3').addClass('move-3');

    // 目测无限滚动时间为2.2s
    await timeDelay(2200);
    $(`.${frameClass} .part1`).removeClass('move-1').addClass('switch-out-1');
    $(`.${frameClass} .part2`).removeClass('move-2').addClass('switch-out-1');
    $(`.${frameClass} .part3`).removeClass('move-3').addClass('switch-out-1');

    await timeDelay(300);
    $(`.${frameClass} .part1,.${frameClass} .part2,.${frameClass} .part3`).removeClass('switch-out-1').addClass('no-opacity');

    await timeDelay(200);
    $(`.${frameClass} .part-screen.figure-content`).removeClass('slide-in-5').addClass('switch-out-1');
    await timeDelay(100);
    $(`.${frameClass} .part-screen.figure-content`).removeClass('switch-out-1').addClass('no-opacity');

}

let frameClassList = ['animate-frame-one', 'animate-frame-two', 'animate-frame-three', 'animate-frame-four'],
    len = frameClassList.length,
    currenFrameIndex = 0;
(async function () {
    await timeDelay(100);
    $('.screen-one .p-box').removeClass('no-opacity').addClass('slide-in-7');

    setInterval(() => {
        if (currenFrameIndex >= len) {
            currenFrameIndex = 0;
        }
        loadFrame(frameClassList[currenFrameIndex]);
        currenFrameIndex++;
    }, 4000);

    // 初始化
    loadFrame(frameClassList[0]);
    currenFrameIndex++;

})();


// 因为每项逻辑相似，以高阶函数递归的形式组织代码

// 第二屏切入
let secondScreenComeStalk = [
    {
        time: 0, // 进入
        cb() {
            $('.screen-two .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-two .p-box').removeClass('no-opacity').addClass('screen-in-2');
            $('.screen-two .btn-box').removeClass('no-opacity').addClass('screen-in-3');
            $('.screen-two .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 500, // 500
        cb() {
            $('.screen-two .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-two .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 100, // 600
        cb() {
            $('.screen-two .card-zu-3').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-two .card-zu-4').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 600, // 1300 
        cb() {
            $('.screen-two .card-zu-1').removeClass('screen-in-4').addClass('screen-move-1');
            $('.screen-two .card-zu-4').removeClass('screen-in-2').addClass('screen-move-2');
        }
    }, {
        time: 100, // 1400 
        cb() {
            $('.screen-two .card-zu-2').removeClass('screen-in-2').addClass('screen-move-1');
            $('.screen-two .card-zu-3').removeClass('screen-in-4').addClass('screen-move-2');
        }
    }];

excuteQueue(secondScreenComeStalk);

// 第三屏

let thirdScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-three .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-three .p-box').removeClass('no-opacity').addClass('screen-in-2');
            $('.screen-three .btn-box').removeClass('no-opacity').addClass('screen-in-3');
            $('.screen-three .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 500, // 500开始，1100结束
        cb() {
            $('.screen-three .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-three .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 200, // 700开始,1300结束，+ 延时200s
        cb() {
            $('.screen-three .card-zu-3').removeClass('no-opacity').addClass('screen-in-4');
        }
    }, {
        time: 400, // 1100，1100结束处理
        cb() {
            $('.screen-three .card-zu-1').removeClass('screen-in-4').addClass('screen-move-1');
            $('.screen-three .card-zu-4').removeClass('no-opacity').addClass('screen-move-2');
        }
    }, {
        time: 300, // 1400开始  ,2000结束
        cb() {
            $('.screen-three .card-fu-2').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 100, // 1500  ，1500 处理结束
        cb() {
            $('.screen-three .card-zu-3').removeClass('screen-in-4').addClass('screen-move-3');
        }
    }, {
        time: 100, // 1600开始  2200 结束
        cb() {
            $('.screen-three .card-fu-1').removeClass('no-opacity').addClass('screen-in-5');
            $('.screen-three .card-fu-3').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 400, // 2000
        cb() {
            $('.screen-three .card-fu-2').removeClass('screen-in-5').addClass('screen-move-1');
        }
    }, {
        time: 200, // 2200
        cb() {
            $('.screen-three .card-fu-1').removeClass('screen-in-5').addClass('screen-move-1');
            $('.screen-three .card-fu-3').removeClass('screen-in-5').addClass('screen-move-2');
        }
    }];

excuteQueue(thirdScreenComeStalk);


// 第四屏
let fourthScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-four .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-four .p-box').removeClass('no-opacity').addClass('screen-in-2');
            $('.screen-four .btn-box').removeClass('no-opacity').addClass('screen-in-3');
            $('.screen-four .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 500, // 500开始，1100结束
        cb() {
            $('.screen-four .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-four .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 200, // 700开始,1300结束，+ 延时200s
        cb() {
            $('.screen-four .card-zu-3').removeClass('no-opacity').addClass('screen-in-4');
        }
    }];
excuteQueue(fourthScreenComeStalk);

let fifthScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-five .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-five .p-box').removeClass('no-opacity').addClass('screen-in-2');
            $('.screen-five .btn-box').removeClass('no-opacity').addClass('screen-in-3');
            $('.screen-five .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 500, // 500开始，1100结束
        cb() {
            $('.screen-five .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-five .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 200, // 700开始,1300结束，+ 延时200s
        cb() {
            $('.screen-five .card-zu-3').removeClass('no-opacity').addClass('screen-in-4');
        }
    }, {
        time: 400, // 1100，1100结束处理
        cb() {
            $('.screen-five .card-zu-1').removeClass('screen-in-4').addClass('screen-move-1');
            $('.screen-five .card-zu-4').removeClass('no-opacity').addClass('screen-move-2');
        }
    }, {
        time: 300, // 1400开始  ,2000结束
        cb() {
            $('.screen-five .card-fu-2').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 100, // 1500  ，1500 处理结束
        cb() {
            $('.screen-five .card-zu-3').removeClass('screen-in-4').addClass('screen-move-3');
        }
    }];
excuteQueue(fifthScreenComeStalk);