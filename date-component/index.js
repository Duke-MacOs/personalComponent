// (function () {
    function DateTimePicker (target) {
        this.init(target);
        // 渲染模板
        this.render();
        // 设置日历数据
        this.setData();
        // this. bind();
        
    }

    DateTimePicker.prototype = {
        init: function (target) {
            this.date = new Date();
            this.target = document.getElementById(target);
        },
        setData: function () {
            console.log(this.date)
            // 获取当前第一天的Date对象
            function getFirstDay(date) {
                return new Date(date.getTime() - (date.getDate() - 1)*1000*60*60*24);
            }
            // 获取当前最后一天的Date对象
            function getLastDay(date) {
                return new Date(date.getTime() + 1000*60*60*24*(getMonthLength(date) - date.getDate()));
            }
            // 计算Date对象当前月有多少天
            function getMonthLength(date) {
                return new Date(date.getYear(), date.getMonth(), 0).getDate();
            }
            var _date = this.date,
                _year = _date.getYear(),
                _month = _date.getMonth(),
                _firstDay = getFirstDay(_date), // 当前日期的第一天
                _lastDay = getLastDay(_date),  // 当前日期最后一天
                arr = [];

            for(let i = _firstDay.getDay(), ii = 0; i > ii; i--) {
                arr.push({type: 'pre-month', date: new Date(_firstDay - 1000*60*60*24*i)});
            }

            for(let i = 1, ii = getMonthLength(_date), length = arr.length; i <= ii; i++) {
                if(length) {
                    let last = arr[length - 1].date;
                    arr.push({type: 'cur-month', date: new Date(last.getTime() + 1000*60*60*24*i)});
                }else {
                    arr.push({type: 'cur-month', date: new Date(_firstDay.getTime() + 1000*60*60*24*(i - 1))});
                }
                
            }

            for(let i = 1, ii = 6 - _lastDay.getDay(); i <= ii; i++) {
                arr.push({type: 'next-month', date: new Date(_lastDay.getTime() + 1000*60*60*24*i)})
            }

        },
        render: function () {
            this.dataComplate = document.createElement("div");
            this.dataComplate.className = "date-time-picker";
            var tpl = `  <div class="header">
                            <span class="pre caret-left"></span>
                            <span class="header-date">2016年7月</span>
                            <span class="next caret-right"></span>
                        </div>

                        <table class="panel">
                            <thead>
                                <tr>
                                    <th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>`;
            this.dataComplate.innerHTML = tpl;
            
            document.getElementsByTagName('body')[0].appendChild(this.dataComplate);
        },
        bind: function () {

        }
    }
// })();