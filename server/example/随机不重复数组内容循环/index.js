var tipList = ['提示1', '提示2', '提示3', '提示4', '提示5', '提示6', '提示7', '提示8', '提示9'];
var tipListShow = [];
tipListShow = Object.assign([], tipList);
var timer = null;

function play() {
    //随机显示一个，显示了之后，把这个项从tipListShow中删除掉，防止在同一轮重复出现！
    console.log(tipListShow.splice(Math.floor(Math.random() * tipListShow.length), 1)[0]);
    //当循环完了之后，tipListShow的长度就会是0，然后就重新赋值，准备进行下一轮的随机循环
    if (tipListShow.length === 0) {
        tipListShow = Object.assign([], tipList);
    }
    //如果需要暂停或者停止的，清除这个定时器即可，下次执行就重新这样创建定时器，执行play();！
    timer = setTimeout(function() {
        play();
    }, 500);
}
play();