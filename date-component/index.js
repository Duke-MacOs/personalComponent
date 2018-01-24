// (function () {
    function DateTimePicker (target) {
        this.init(target);
        // 渲染模板
        this.renderHeader();
        // 设置日历数据
        this.setData();
        // 渲染日历数据
        this.renderData();
        // this. bind();
        
    }

    DateTimePicker.prototype = {
        init: function (target) {
            this.date = new Date();
            this.target = document.getElementById(target);
        },
        setData: function () {
            // 获取当前第一天的Date对象
            function getFirstDay(date) {
                return new Date(date-0 - (date.getDate() - 1)*1000*60*60*24);
            }
            // 获取当前最后一天的Date对象
            function getLastDay(date) {
                return new Date(date-0 + 1000*60*60*24*(getMonthLength(date) - date.getDate()));
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

            // 上个月数据放入数组
            for(let i = _firstDay.getDay(), ii = 0; i > ii; i--) {
                arr.push({type: 'pre-month', date: new Date(_firstDay - 1000*60*60*24*i)});
            }

            // 当前月数据放入数组
            for(let i = 1, ii = getMonthLength(_date), length = arr.length; i <= ii; i++) {
                if(length) {
                    let last = arr[length - 1].date;
                    arr.push({type: 'cur-month', date: new Date(last-0 + 1000*60*60*24*i)});
                }else {
                    arr.push({type: 'cur-month', date: new Date(_firstDay-0 + 1000*60*60*24*(i - 1))});
                }
                
            }

            // 下个月数据放入数组
            for(let i = 1, ii = 6 - _lastDay.getDay(); i <= ii; i++) {
                arr.push({type: 'next-month', date: new Date(_lastDay-0 + 1000*60*60*24*i)})
            }

            this.data = [...arr];
        },
        renderHeader: function () {
            this.dataComplate = document.createElement("div");
            this.dataComplate.setAttribute('id', this.target.id + '_DateTimePicker');
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
                        </table>`;
            this.dataComplate.innerHTML = tpl;
            
            document.getElementsByTagName('body')[0].appendChild(this.dataComplate);
        },
        renderData() {
            var _data = this.data,
                dateComplate = document.createElement("tbody"), // 创建tbody元素
                dateTimePickerId = this.target.id + '_DateTimePicker', // 获取datetimepicker HTMLElement对象
                str = '<tr>';

            // 拼接日期显示字符串
            for (let val of _data.entries()) {
                let [index, {type, date}] = val;
                if (index % 7 === 0 && index !== 0) {
                    str += '</tr><tr>'+
                            '<td class="'+ type + '">'+ date.getDate() +'</td>';
                          
                }else {
                    str +=  '<td class="'+ type + '">'+ date.getDate() +'</td>';
                }
            }
            dateComplate.innerHTML = str;

            // 找到当前datetimepicker table元素
            var table = document.querySelector('#' + dateTimePickerId + ' table');
            table.appendChild(dateComplate);
           
        },
        bind: function () {

        }
    }
// })();