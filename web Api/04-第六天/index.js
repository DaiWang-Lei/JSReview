window.addEventListener('load', function() {
    let left = document.querySelector('.left')
    let right = document.querySelector('.right')
    let focus = this.document.querySelector('.focus')
    let ul = focus.querySelector('ul')
    let ol = focus.querySelector('.circle')
    let focusWidth = focus.offsetWidth
        // 1.鼠标经过就显示两侧按钮
    focus.addEventListener('mouseenter', function() {
            clearInterval(timer)
            timer = null
            left.style.display = 'block'
            right.style.display = 'block'
        })
        // 1. 鼠标离开就隐藏两侧按钮
    focus.addEventListener('mouseleave', function() {

        left.style.display = 'none'
        right.style.display = 'none'
        timer = setInterval(function() {
            //手动调用点击事件
            right.click();
        }, 2000);
    })

    // 动态生成小圆圈
    console.log(ul.children.length);
    for (let i = 0; i < ul.children.length; i++) {
        // 创建li
        let li = this.document.createElement('li')
            // 把li插入到ol中
        ol.appendChild(li)
            // 记录当前小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index', i)
            // 4.小圆圈的排他思想，直接在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            // 干掉所有人，把所有li的current类名清除
            for (let i = 0; i < ol.children.length; i++) {
                ol.children[i].className = ''
            }
            // 只给当前点击的li设置current类名
            this.className = 'current'
            let index = this.getAttribute('index')
            num = index
            circle = index;

            // 5.点击小圆圈移动图片
            // ul 的移动距离，小圆圈的索引号乘以图片的宽度，注意是负值
            animate(ul, -index * focusWidth)
        })
    }

    ol.children[0].className = "current"



    let first = ul.children[0].cloneNode(true)
    ul.append(first)
        // 点击右侧按钮，图片滚动一张
    let num = 0;
    let circle = 0
        // 最后的节流阀
    let flag = true
    right.addEventListener('click', function() {
        if (flag) {
            flag = false
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0
            }
            num++
            animate(ul, -num * focusWidth, () => {
                flag = !flag
            })
            circle++
            if (circle == ol.children.length) {
                circle = 0
            }
            changeCurrent()
        }

    })
    left.addEventListener('click', function() {
        if (flag) {
            flag = false

            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';


            }
            num--
            animate(ul, -num * focusWidth, () => {
                flag = !flag
            })
            circle--

            if (circle < 0) {
                circle = ol.children.length - 1
            }
            changeCurrent()

        }
    })


    let timer = this.setInterval(function() {
        right.click()
    }, 2000)

    function changeCurrent() {
        for (let i = 0; i < ol.children.length; i++) {
            ol.children[i].className = ''
        }
        ol.children[circle].className = 'current'
    }
})