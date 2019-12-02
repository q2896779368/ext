/**
 * 编辑区域当前活动页签Page对象
 */
Ext.define('Cosmo.util.Page', {

    alternateClassName: ['Cosmo.Page', 'Page'],

    requires: ['Cosmo.Map'],

    /** 构造函数 */
    constructor: function () {
        var _config = {
            // 版本号
            version: '0.0.1-RELEASE',
            //组件标识名称计数，使用后加1
            showCount: 1,

            // 属性
            id: '',
            name: '',
            type: '',
            fileType: '0',
            title: 'Design',
            textAlign: '',
            left: '',
            right: '',

            // 页面样式
            style: {},
            // 页面属性
            property: {},

            param: [],
            // 自定义参数列表（一维数组-存对象）
            params: [],
            // 元件参数
            cellParam: {},

            // 共享区参数
            importCsa: [],

            // cell属性
            items: {},

            // 在设计页面中当前被选中的对象
            activeCmp: null,

            // 在设计页面中当前被选中的页签MxGraph对象实例
            activeGraph: null,

            // 页面转换成的xml字符串
            graphXml: ''
        };

        for (var property in _config) {
            var val = _config[property];
            this[property] = val;
        }
        return this;
    }
});
