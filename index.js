import './screenAnimate.scss';
import './index.scss';


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
// 离开效果一样，可以封装
function runLeaveQueue(preclass, [...notBtnClassNames]) {
    let queue = [
        {
            time: 0,
            cb() {
                [...notBtnClassNames].forEach((e) => {
                    document.querySelector(`.${preclass} .${e}`).className = e + ' screen-out-1';
                });
                document.querySelector(`.${preclass} .btn-box`).className = 'btn-box screen-out-2'
            }
        }, {
            time: 600,
            cb() {
                [...notBtnClassNames, 'btn-box'].forEach((e) => {
                    document.querySelector(`.${preclass} .${e}`).className = e + ' no-opacity';
                });
            }
        }];

    excuteQueue(queue);
}
// 第二屏切入
let secondScreenComeStalk = [
    {
        time: 0, // 进入
        cb() {
            $('.screen-two .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-two .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-two .p-box').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-two .btn-box').removeClass('no-opacity').addClass('screen-in-3');
        }
    }, {
        time: 800, // 500
        cb() {
            $('.screen-two .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-two .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 600, // 600
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

let secondScreenNotBtnClassNames = ['card-people', 'card-zu-1', 'card-zu-2', 'card-zu-3', 'card-zu-4', 'h-box', 'p-box'];


// 第三屏

let thirdScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-three .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-three .card-people').removeClass('no-opacity').addClass('screen-in-8');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-three .p-box').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-three .btn-box').removeClass('no-opacity').addClass('screen-in-3');
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

let thirdScreenNotBtnClassNames = ['card-people', 'card-zu-1', 'card-zu-2', 'card-zu-3', 'card-zu-4', 'card-zu-1', 'card-fu-1', 'card-fu-2', 'card-fu-3', 'h-box', 'p-box'];

// 第四屏
let fourthScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-four .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-four .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-four .p-box').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-four .btn-box').removeClass('no-opacity').addClass('screen-in-3');
        }
    }, {
        time: 500, // 500开始，1100结束
        cb() {
            $('.screen-four .card-zu-1').removeClass('no-opacity').addClass('screen-in-4');
            $('.screen-four .card-zu-2').removeClass('no-opacity').addClass('screen-in-2');
            $('.screen-four .card-zu-3').removeClass('no-opacity').addClass('screen-in-9');
        }
    }];
let fourthScreenNotBtnClassNames = ['card-zu-1', 'card-zu-2', 'card-zu-3', 'h-box', 'p-box'];

// 第五屏
let fifthScreenComeStalk = [
    {
        time: 0, // 进入，不结束
        cb() {
            $('.screen-five .h-box').removeClass('no-opacity').addClass('screen-in-1');
            $('.screen-five .card-people').removeClass('no-opacity').addClass('screen-in-6');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-five .p-box').removeClass('no-opacity').addClass('screen-in-2');
        }
    }, {
        time: 10,
        cb() {
            $('.screen-five .btn-box').removeClass('no-opacity').addClass('screen-in-3');
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
        time: 300, // 1000开始 
        cb() {
            $('.screen-five .card-num-2').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 1100, // 1100
        cb() {
            $('.screen-five .card-zu-1').removeClass('screen-in-4').addClass('screen-move-1');
            $('.screen-five .card-zu-2').removeClass('screen-in-2').addClass('screen-move-2');
        }
    }, {
        time: 100, // 1200
        cb() {
            $('.screen-five .card-zu-3').removeClass('screen-in-4').addClass('screen-move-3');
            $('.screen-five .card-num-1').removeClass('no-opacity').addClass('screen-in-5');
            $('.screen-five .card-num-3').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 100, // 1300
        cb() {
            $('.screen-five .card-num-2').removeClass('no-opacity').addClass('screen-in-5');
        }
    }, {
        time: 500, // 1700
        cb() {
            $('.screen-five .card-num-1').removeClass('screen-in-5').addClass('screen-move-1');
        }
    }, {
        time: 100, // 1800
        cb() {
            $('.screen-five .card-num-2').removeClass('screen-in-5').addClass('screen-move-2');
        }
    }, {
        time: 100, // 1900
        cb() {
            $('.screen-five .card-num-3').removeClass('screen-in-5').addClass('screen-move-3');
        }
    }];
let fifthScreenNotBtnClassNames = ['card-people', 'card-zu-1', 'card-zu-2', 'card-zu-3', 'card-num-1', 'card-num-2', 'card-num-3', 'h-box', 'p-box'];

$(document).ready(function () {

    let isInitFullpage = false;
    $(window).resize(function () {
        let width = $(this).width();
        if (width < 1024) {

            var pricingSwiper = new Swiper('.feature-images', {
                direction: 'horizontal',
                speed: 500,
                autoplay: 2000,
                autoplayDisableOnInteraction: false,
                loop: true,
                observer: true,
                observeParents: true
            });
            isInitFullpage && $('#fullpage').fullpage.destroy('all');
            isInitFullpage = false;
        } else {
            if (isInitFullpage) {
                return;
            }
            isInitFullpage = true;
            resizeImg($('.demo-bg img')[0], $('.demo-bg img').data('src'));

            $('#fullpage').fullpage({
                //Scrolling
                css3: true,
                scrollingSpeed: 700,
                // fitToSection: true,
                fitToSectionDelay: 1000,
                easing: 'easeInOutCubic',
                easingcss3: 'ease',
                touchSensitivity: 15,

                //Accessibility
                keyboardScrolling: true,
                animateAnchor: true,
                // recordHistory: true,
                scrollOverflow: true,
                scrollOverflowOptions: {
                    scrollbars: false
                },
                //Custom selectors
                sectionSelector: '.screen',

                //events
                onLeave: function (index, nextIndex, direction) {

                    if (index == 1 && direction == 'down') {
                        excuteQueue(secondScreenComeStalk);
                    }

                    if (index == 2 && direction == 'down') {
                        runLeaveQueue('screen-two', secondScreenNotBtnClassNames);
                        excuteQueue(thirdScreenComeStalk)
                    } else if (index == 2 && direction == 'up') {
                        runLeaveQueue('screen-two', secondScreenNotBtnClassNames);
                    }

                    if (index == 3 && direction == 'down') {
                        runLeaveQueue('screen-three', thirdScreenNotBtnClassNames);
                        excuteQueue(fourthScreenComeStalk);
                    } else if (index == 3 && direction == 'up') {
                        excuteQueue(secondScreenComeStalk);
                        runLeaveQueue('screen-three', thirdScreenNotBtnClassNames);
                    }

                    if (index == 4 && direction == 'down') {
                        runLeaveQueue('screen-four', fourthScreenNotBtnClassNames);
                        excuteQueue(fifthScreenComeStalk);
                    } else if (index == 4 && direction == 'up') {
                        runLeaveQueue('screen-four', fourthScreenNotBtnClassNames);
                        excuteQueue(thirdScreenComeStalk);
                    }

                    if (index == 5 && direction == 'down') {
                        runLeaveQueue('screen-five', fifthScreenNotBtnClassNames);
                    } else if (index == 5 && direction == 'up') {
                        runLeaveQueue('screen-five', fifthScreenNotBtnClassNames);
                        excuteQueue(fourthScreenComeStalk);
                    }

                    if (index == 6 && direction == 'up') {
                        excuteQueue(fifthScreenComeStalk);
                    }
                }
            });
        }

    }).trigger('resize');
})