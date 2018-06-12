;(function($) {
    function Tabs(id, options) {
        this.options;
        this.eleId = id;
        this.eleTitles = $('#' + this.eleId).find('.cz-tabs-title a');
        this.eleItems = $('#' + this.eleId).find('.cz-tabs-item');
        
        this.init(options).bind();
    }
    
    Tabs.prototype.init = function(options) {
        
        // 设置默认参数
        this.options = $.extend({
            triggerType: 'click',
            effect: 'default', // 轮播效果，默认没有
            invoke: 1,   // 默认展示第一个
            auto: false,    // 自动轮播
        }, options)
        return this;
    }

    Tabs.prototype.bind = function() {
        console.log(this.eleTitles);
        console.log(this.eleItems);
        var self = this;
        this.eleTitles.bind('click', function() {
            self.invoke($(self).parent());
        })
    }

    Tabs.prototype.invoke = function(currentEle) {
        currentEle.addClass('active').siblings().removeClass('active');
    }

    $.fn.czTabsInit = function(options) {
        return new Tabs(this[0].id, options);
    };
})(jQuery)

var t = $('#test').czTabsInit();
console.log(t)