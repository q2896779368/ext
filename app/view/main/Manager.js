/**
 * 应用程序主视图
 * 由app.js中"mainView"属性指定，自动应用"viewport"组件自适应窗口
 */
Ext.define('Cosmo.view.main.Manager', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-manager',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Cosmo.view.main.ManagerController'
    ],

    id: 'appManager',

    /** 配置控制器 */
    controller: 'manager',

    /** 布局 */
    layout: 'border',

    /** 响应式布局 */
    responsiveConfig: {
        tall: {                     // 高>宽
            headerPosition: 'top'   // 显示在顶部
        },
        wide: {                     // 宽>高
            headerPosition: 'left'  // 显示在左侧
        }
    },

    /** 子模块默认设置，子模块单独设置的会覆盖此默认配置 */
    defaults: {
        split: {size: 2},
        border: false,
        titleAlign: 'left',
        collapsible: true,
        hideCollapseTool: false,
        titleCollapse: true
    },

    /** 子模块 */
    items: [{                       //中心区域
        header: false,
        region: "center",
        xtype: 'centerManagerPanel',
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        }
    }, {                            //左侧区域
        id: 'leftManagerRegion',
        title: '主菜单',
        region: "west",
        xtype: 'leftManagerMenu',
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        },
        width: 260,
        maxWidth: 260
    }]
});
