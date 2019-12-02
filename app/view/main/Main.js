/**
 * 应用程序主视图
 * 由app.js中"mainView"属性指定，自动应用"viewport"组件自适应窗口
 */
Ext.define('Cosmo.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.layout.container.*',
        'Cosmo.view.main.MainModel',
        'Cosmo.view.main.maintop.MainTop',                      //主视图切换
        'Cosmo.view.main.maintapbar.Maintapbar',
        'Cosmo.view.main.MainController'
    ],

    id: 'appMain',

    /** 配置控制器 */
    controller: 'main',
    /** 配置视图模型 */
    viewModel: 'main',
    border: false,
    /** 布局 */
    layout: 'border',
    /** 子模块 */
    items: [{                       //头部---Topbar
        header: false,
        region: "north",
        xtype: 'MainTop',
        border: false,
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        }
    }, {                            // 视图区---Mainbody
        header: false,
        region: "center",
        xtype: 'Mainbody',
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        }
    }]
});
