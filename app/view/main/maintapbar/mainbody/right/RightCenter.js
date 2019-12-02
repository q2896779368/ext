/**
 * 中间编辑区视图
 */
Ext.define('Cosmo.view.main.right.RightCenter', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.rightcenter',

    requires:[
        'Cosmo.view.main.right.RightCenterController'
    ],

    /** 配置控制器 */
    controller: 'rightCenter',

    // plain: true,        // 去除TabBar的背景
    layout: 'fit',
    /** 子模块默认设置，子模块单独设置的会覆盖此默认配置 */
    defaults: {
        // layout: 'fit',
        autoScroll: false
    },

    /** 子模块 */
    items: [],

    /** 监听器 */
    listeners: {
        tabchange: 'onTabChange'
    }
});
