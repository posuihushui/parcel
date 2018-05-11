import "./setting.scss";
import './screenAnimate.scss';
import "./index.scss";


let timeDelay = (time=500)=>new Promise((resolve)=>{
    setTimeout(() => {
        resolve();
    }, time);
})

console.log('xxxxxxxx');
(async function (){
    console.log('begin first screen')
    // 延时0ms html
    // 时刻100ms
    await timeDelay(100);
    console.log('100ms')
    $('.p-box').removeClass('no-opacity').addClass('slide-in-7');

    // 时刻600ms
    await timeDelay(500);
    console.log('600ms')
    $('.frame-one .part1').removeClass('no-opacity').addClass('slide-in-1');
    $('.frame-one .part2').removeClass('no-opacity').addClass('slide-in-2');
    $('.frame-one .part3').removeClass('no-opacity').addClass('slide-in-3');

    // 时刻1000ms,进入浮动阶段
    await timeDelay(400);
    console.log('1000ms')
    $('.frame-one .part1').removeClass('slide-in-1').addClass('move-1');
    
    // 时刻1100ms + 100延时
    await timeDelay(200);
    console.log('1100ms')
    $('.frame-one .part2').removeClass('slide-in-2').addClass('move-2');

    // 延时1200ms + 200延时
    await timeDelay(300);
    console.log('1200ms')
    $('.frame-one .part3').removeClass('slide-in-3').addClass('move-3');
    
    // 目测无限滚动时间为2s
    await timeDelay(2000);
    console.log('3200ms')
    $('.frame-one .part1').removeClass('move-1').addClass('switch-out-1');
    $('.frame-one .part2').removeClass('move-2').addClass('switch-out-1');
    $('.frame-one .part3').removeClass('move-3').addClass('switch-out-1');

    await timeDelay(300);
    console.log('3500ms')
    $('.frame-one .part1,.frame-one .part2,.frame-one .part3').removeClass('switch-out-1').addClass('no-opacity');

    await timeDelay(200);
    console.log('3700ms')
    $('.frame-one .part-screen.figure-content').removeClass('slide-in-5').addClass('no-opacity');
    // 总时长3800ms
    console.log('first screen end');


    console.log('begin loop')
    
})();
