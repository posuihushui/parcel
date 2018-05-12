import "./setting.scss";
import './screenAnimate.scss';
import "./index.scss";


let timeDelay = (time=500)=>new Promise((resolve)=>{
    setTimeout(() => {
        resolve();
    }, time);
})
async function loadFrame(frameClass ='animate-frame-one') {
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

let frameClassList = ['animate-frame-one', 'animate-frame-two', 'animate-frame-three','animate-frame-four'],
    len = frameClassList.length,
    currenFrameIndex = 0;
(async function (){
    await timeDelay(100);
    $('.p-box').removeClass('no-opacity').addClass('slide-in-7');

    setInterval(() => {
        if (currenFrameIndex >= len){
            currenFrameIndex  = 0;
        }
        loadFrame(frameClassList[currenFrameIndex]);
        currenFrameIndex++;
    }, 4000);

    // 初始化
    loadFrame(frameClassList[0]);
    currenFrameIndex++;
    
})();