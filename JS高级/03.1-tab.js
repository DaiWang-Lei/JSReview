window.addEventListener('load', function() {
    let that
    class Tab {
        constructor(id) {
                that = this
                this.main = document.querySelector(id)
                this.add = this.main.querySelector('.tabadd')
                this.ul = this.main.querySelector('.firstnav ul:first-child')
                this.fsection = this.main.querySelector('.tabscon')
                this.init()
            }
            // 0. 初始化
            // 页面一加载，就绑定点击事件
        init() {
                this.updateNode()
                this.add.addEventListener('click', this.addTab)
                for (let i = 0; i < this.lis.length; i++) {
                    this.lis[i].index = i
                    this.lis[i].addEventListener('click', this.toggleTab)
                    this.del[i].addEventListener('click', this.delTab)
                    this.edit[i].addEventListener('dblclick', this.editTab)
                    this.sections[i].addEventListener('dblclick', this.editTab)


                }
            }
            // 0.1. 清除类
        clearClass() {
                for (let i = 0; i < this.lis.length; i++) {
                    this.lis[i].className = ''
                    this.sections[i].className = ''
                }
            }
            // 0.2.获取所有的节点
        updateNode() {
                this.lis = this.main.querySelectorAll('li')
                this.sections = this.main.querySelectorAll('section')
                this.del = this.main.querySelectorAll('.icon-guanbi')
                this.edit = this.main.querySelectorAll('.firstnav li span:first-child')
            }
            // 1.切换功能
        toggleTab() {
                that.clearClass()
                this.className = 'liactive'
                that.sections[this.index].className = 'conactive'
            }
            // 2.删除功能
        delTab(e) {
                e.stopPropagation(); //阻止冒泡，防止触发li的切换点击事件
                let index = this.parentNode.index
                console.log(index);
                that.lis[index].remove() //remove()方法可以删除指定元素
                that.sections[index].remove()
                that.init();
                // 如果我们删除的不是选定状态的li，就让原来的选定状态保持不变
                if (document.querySelector('.liactive')) return;
                // 当我们删除了选中状态的这个li的时候，就让他的前一个li处于选定状态
                index--
                // 手动调用的点击事件，不需要鼠标触发
                that.lis[index] && that.lis[index].click();
                // index >= 0 ? that.lis[index].click() : ''
            }
            // 3.添加功能
        addTab() {
                that.clearClass()
                let random = Math.random()
                let li = '<li class="liactive"><span> 新添加的 </span><span class="iconfont icon-guanbi"></span> </li>'
                let section = `<section class="conactive">测试${random}</section>`
                that.ul.insertAdjacentHTML('beforeend', li)
                that.fsection.insertAdjacentHTML('beforeend', section)
                that.init()

            }
            // 4.修改功能
        editTab() {
            let str = this.innerHTML
            window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty()
            console.log(55);
            this.innerHTML = '<input type="text"/>'
            let ipt = this.children[0]
            ipt.value = str
            ipt.select() // 文本框里的文字处于选定状态
            ipt.onblur = function() {
                this.parentNode.innerHTML = this.value
            }
            ipt.onkeyup = function(e) {
                e.keyCode === 13 ? this.blur() : null
            }

        }

    }
    let tab = new Tab('#tab')

})