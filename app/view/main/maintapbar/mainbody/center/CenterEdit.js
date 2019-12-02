/**
 * 中间编辑区视图
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.center.CenterEdit', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.centeredit',

    /** 配置控制器 */
    controller: 'centerEdit',
    id:'centerEditModel',
    cls:'topBarTitle',
    plain: true,        // 去除TabBar的背景
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.center.CenterEditController'
    ],
    // layout: 'fit',
    /** 子模块默认设置，子模块单独设置的会覆盖此默认配置 */
    defaults: {
        layout: 'fit',
        autoScroll: false
    },

    /** 子模块 */
    items: [],

    /** 监听器 */
    listeners: {
        tabchange: 'onTabChange'
    }
});
