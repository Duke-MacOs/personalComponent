function DateTimePicker (target) {
    this.init(target);
    // 渲染模板
    this.renderHeader();
    // 设置日历数据
    this.setData();
    // 渲染日历数据
    this.renderData();
    // 绑定事件
    this. bind();
    
}

DateTimePicker.prototype = {
    init: function (t) {
        var target = t || 'body';
        // 目标Input对象
        this.target = document.getElementById(target);
        this.targetParent = this.target.parentNode;
        // 新构建dateTimePickerId
        this.dateTimePickerId;
        // showData: 展示模板Date对象； currentDate: 当前选中Date对象
        this.showData;
        this.showDate = this.currentDate = (this.target.getAttribute('value') !== '') ? this.target.getAttribute('value') : new Date();
        // datetimepicker 模板
        this.dataComplate;
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
            var _date = new Date(date - 0);
            _date.setUTCMonth(date.getUTCMonth() + 1);
            _date.setUTCDate(1);
            return new Date(_date - 0 - 1000*60*60*24).getDate();
        }
        // 判断是否是input内日期
        function selectCurrentDate(date) {
            return date.getFullYear() === this.currentDate.getFullYear() && date.getMonth() === this.currentDate.getMonth() && date.getDate() === this.currentDate.getDate();
        }

        var _date = this.showDate,
            _year = _date.getYear(),
            _month = _date.getMonth(),
            _firstDay = getFirstDay(_date), // 当前日期的第一天
            _lastDay = getLastDay(_date),  // 当前日期最后一天
            arr = [];   // 存放数据的数组
        // 上个月数据放入数组
        for(let i = _firstDay.getDay(), ii = 0; i > ii; i--) {
            arr.push({type: 'pre-month', date: new Date(_firstDay - 1000*60*60*24*i)});
        }

        // 当前月数据放入数组
        for(let i = 1, ii = getMonthLength(_date), length = arr.length; i <= ii; i++) {
            var date,
                type;
            if(length) {
                let last = arr[length - 1].date;
                date = new Date(last - 0 + 1000*60*60*24*i);
                type = selectCurrentDate.call(this, date) ? 'cur-month cur-date' : 'cur-month'; 
                arr.push({type: type, date: date});
            }else {
                date = new Date(_firstDay-0 + 1000*60*60*24*(i - 1));
                type = selectCurrentDate.call(this, date) ? 'cur-month cur-date' : 'cur-month'; 
                arr.push({type: type, date: date});
            }
            
        }

        // 下个月数据放入数组
        for(let i = 1, ii = 6 - _lastDay.getDay(); i <= ii; i++) {
            arr.push({type: 'next-month', date: new Date(_lastDay-0 + 1000*60*60*24*i)})
        }
        this.showData = [...arr];
    },
    renderHeader: function () {
        this.dataComplate = document.createElement("div");
        this.dataComplate.setAttribute('id', this.target.id + '_DateTimePicker');
        this.dateTimePickerId = this.target.id + '_DateTimePicker';
        this.dataComplate.className = "date-time-picker";
        var tpl = `  <div class="header">
                        <span class="pre caret-left"></span>
                        <span class="header-date">` + this.showDate.getFullYear() + "年" + [Number(this.showDate.getMonth())+1] + `月</span>
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
        
        // document.getElementsByTagName('body')[0].appendChild(this.dataComplate);
        this.targetParent.appendChild(this.dataComplate);
    },
    renderData() {
        var _data = this.showData,
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
    cleanRender() {
        this.targetParent.removeChild(this.dataComplate);
        
    },
    refresh() {
        this.cleanRender()
        // 渲染模板
        this.renderHeader();
        // 设置日历数据
        this.setData();
        // 渲染日历数据
        this.renderData();
        this.bind();
    },
    moveMonth(date, dir) {
        if (!dir) return date;
        // Date 是Object类型，需要新增实例
        var new_date = new Date(this.showDate.valueOf()),
            day = new_date.getUTCDate(),
            month = new_date.getUTCMonth(),
            // 获取移动绝对值
            msg = Math.abs(dir),
            new_month, test; 
        dir = dir > 0 ? 1 : -1;

        if (msg === 1) {
            test = dir === -1 
            ? function () {
                // 确保当前日期为需被转换日期
                // eg: 2018-03-31 => -1 => 2018-03-03, 需要转换成2018-02-28
                return new_date.getUTCMonth() === month;
            } 
            : function () {
                // 确保当前日期为需被转换日期
                // eg: 2018-03-31 => +1 => 2018-05-01, 需要转换成2018-04-30
                return new_date.getUTCMonth() !== new_month;
            }
            new_month = month + dir;
            new_date.setUTCMonth(new_month);

            if (new_month < 0 || new_month > 11)
              new_month = (new_month + 12) % 12;
            
        }else {
            for (var i = 0; i < msg; i++) {
                new_date = this.moveMonth(new_date, dir);
                new_month = new_date.getUTCMonth();
                new_date.setUTCDate(day);
                test = function () {
                  return new_month != new_date.getUTCMonth();
                };
            }
        }

        while (test()) {
            new_date.setUTCDate(--day);
            new_date.setUTCMonth(new_month);
        }

        return new_date;

    },
    bind: function () {
        var self = this,
            preMonth = document.querySelector("#" + this.dateTimePickerId + " .header .pre"),
            nextMonth = document.querySelector("#" + this.dateTimePickerId + " .header .next");

        preMonth.addEventListener("click", function () {
            self.showDate = self.moveMonth.call(self, this.showDate, -1);
            self.refresh.call(self);
        });

        nextMonth.addEventListener("click", function () {
            self.showDate = self.moveMonth.call(self, this.showDate, 1);
            self.refresh.call(self);
        });




    }
}
