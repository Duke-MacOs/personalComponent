// (function () {
    function DateTimePicker (target) {
        this.init(target);
        // 渲染模板
        this.render();
        // 设置日历数据
        // this.setData();
        // this. bind();
        
    }

    DateTimePicker.prototype = {
        init: function (target) {
            this.date = new Date();
            this.target = document.getElementById(target);
        },
        setData: function () {
            // 获取上个月的new Date对象
            // function getPreDate() {
            //     let preMonth = (_month === 0) ? 11 : _month - 1,
            //         preYear = (_month === 0) ? _year - 1 : _year,
            //         preDate = new Date(preYear, preMonth, 0);

            //     return preDate;
            // }
            // 获取下个月的new Date对象
            function getNextDate() {
                let nextMonth = (_month === 11) ? 0 : _month + 1,
                    nextYear = (_month === 11) ? _year + 1 : _year,
                    nextDate = new Date(nextYear, nextMonth, 0);

                return nextDate;
            }
            // 计算Date对象当前月有多少天
            function getMonthLength(date) {
                return new Date(date.getYear(), date.getMonth(), 0).getDate();
            }
            var _date = this.date,
                _year = _date.getYear(),
                _month = _date.getMonth(),
                _day = _date.getDate(),
                _week = _date.getDay(),
                _firstDay = new Date(_year, _month, 1),
                _lastDay = new Date(_year, _month, getMonthLength(_date));
                arr = [],

            for (let i = _firstDay.getDay(), ii = 0; i > ii; i--) {
                arr.push({type: 'pre-month', date: new Date(_firstDay - 1000*60*60*24*i)});
            }

            for (let i = 0, ii = getMonthLength(_date); i < ii; i++) {
                arr.push({type: 'cur-month', date: i + 1});
            }

            for (let i = 0, ii = 6 - _lastDay.getDay(); i < ii; i++) {
                arr.push({type: 'next-month', date: })
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