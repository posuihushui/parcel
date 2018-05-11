import "./setting.scss";
import './screenAnimate.scss';
import "./index.scss";


let timeDelay = (time=500)=>new Promise((resolve)=>{
    setTimeout(() => {
        resolve();
    }, time);
})

console.log('callinxxxxg');
(async function (){
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
     
})();