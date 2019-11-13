function animate(ele, target, callback) {
    clearInterval(ele.timer)
    ele.timer = setInterval(function() {
        // let distance = target - ele.offsetLeft
        // if (distance > 0) {
        //     step = Math.ceil((distance) / 10)
        // } else {
        //     step = Math.floor((distance) / 10)
        // }

        let step = (target - ele.offsetLeft) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        if (ele.offsetLeft == target) {
            clearInterval(ele.timer)
            if (callback) {
                callback()
            }
        } else {
            ele.style.left = ele.offsetLeft + step + 'px'
        }
    }, 30)
}