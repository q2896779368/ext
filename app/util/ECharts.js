/**
 *  ECharts工具类
 */
Ext.define('Cosmo.util.ECharts', {

    // 单例
    singleton: true,
    // 实例名
    alternateClassName: ['Cosmo.ECharts', 'ECharts'],

    resize: function (id) {
        // 获取Echarts组件实例并改变图表尺寸
        echarts.getInstanceByDom(document.getElementById(id)).resize();
    },

    /**
     * 初始化ECharts
     *
     * 说明：如果已经有对应实例会移除旧的实例重新初始化ECharts
     */
    init: function (id, option, notMerge, lazyUpdate, silent) {
        // 获取Echarts组件实例
        var me = echarts.getInstanceByDom(document.getElementById(id));
        // 销毁Echarts组件实例
        if (me) me.dispose();
        // 重新初始化echarts
        me = echarts.init(document.getElementById(id));
        // 使用刚指定的配置项和数据显示图表
        me.setOption(option, notMerge, lazyUpdate, silent);
        return me;
    },

    /** 获取chart实例对象 */
    chart: function (id) {
        // 获取Echarts组件实例
        var me = echarts.getInstanceByDom(document.getElementById(id));
        // 销毁Echarts组件实例
        if (me) me.dispose();
        // 重新初始化echarts
        return echarts.init(document.getElementById(id));
    },

    /**
     * 刷新ECharts实例的配置项
     *
     * option       图表的配置项和数据，具体见ECharts配置项手册
     * notMerge     可选，是否不跟之前设置的option进行合并，默认为false，即合并
     * lazyUpdate   可选，在设置完option后是否不立即更新图表，默认为false，即立即更新
     * silent       可选，阻止调用 setOption 时抛出事件，默认为false，即抛出事件
     */
    parse: function (id, option, notMerge, lazyUpdate, silent) {
        // 配置项为空或不是JSON对象返回false
        if (!option || typeof option !== 'string' || !this.isJSON(option)) return false;

        // 初始化可选参数
        if (!notMerge) notMerge = false;
        if (!lazyUpdate) lazyUpdate = false;
        if (!silent) silent = false;
        // 获取组件实例
        var me = echarts.getInstanceByDom(document.getElementById(id));

        // 如果未获取到初始化
        if (!me) me = echarts.init(document.getElementById(id));

        // 刷新ECharts
        try {
            me.setOption(JSON.parse(option), notMerge, lazyUpdate, silent);
            return true;
        } catch (e) {
            return false;
        }
    },
    refresh: function (id, option, notMerge, lazyUpdate, silent) {
        // 配置项为空或不是JSON对象返回false
        if (!option || typeof option !== 'object') return false;

        // 初始化可选参数
        if (!notMerge) notMerge = false;
        if (!lazyUpdate) lazyUpdate = false;
        if (!silent) silent = false;
        // 获取组件实例
        var me = echarts.getInstanceByDom(document.getElementById(id));

        // 如果未获取到初始化
        if (!me) me = echarts.init(document.getElementById(id));

        // 刷新ECharts
        try {
            me.setOption(option, notMerge, lazyUpdate, silent);
            return true;
        } catch (e) {
            return false;
        }
    },

    /** 判断是否JSON数据 */
    isJSON: function (code) {
        if (typeof code === 'string') {
            try {
                var obj = JSON.parse(code);
                if (typeof obj === 'object' && obj) {
                    return true;
                } else {
                    return false;
                }
            } catch (e) {
                return false;
            }
        }
    },

    /** 错误信息 */
    error: function () {
        return '<span style="color: #c15252">编辑器内容有误！</span>';
    },

    /** 成功信息 */
    success: function (start) {
        var end = new Date(),   // 程序计时的月从0开始取值后+1
            month = end.getMonth() + 1,
            chinaTime = end.getFullYear() + "年" + month + "月" + end.getDate() + "日  " + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds(),
            msg = '<span style="color: #82cec4">' + chinaTime + '　　图表已生成，' + (end - start) + '毫秒</span>';

        return msg;
    },

    // format time to string
    formatTime: function (time) {
        var digits = [time.getHours(), time.getMinutes(), time.getSeconds()];
        var timeStr = '';
        for (var i = 0, len = digits.length; i < len; ++i) {
            timeStr += (digits[i] < 10 ? '0' : '') + digits[i];
            if (i < len - 1) {
                timeStr += ':';
            }
        }
        return timeStr;
    },

    // show log info in code-info panel
    // type should be 'info', 'warn', 'error'
    log: function (text, type) {

        // log time
        var timeStr = formatTime(new Date());

        if (type !== 'warn' && type !== 'error') {
            type = 'info';
        }

        $('#code-info').html(
            '<span class="code-info-time">' + timeStr + '</span>' +
            '<span class="code-info-type-' + type + '">' + text + '</span>'
        );
    }
});
