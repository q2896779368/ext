/**
 * 右侧元素、参数视图
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.right.RightElement', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightelement',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.right.RightElementController',
        'Cosmo.view.main.maintapbar.mainbody.left.Component'
    ],

    /** 配置控制器 */
    controller: 'rightElement',

    id: 'rightElement',

    scrollable: false,
    autoScroll: false,

    /** 子模块默认设置，子模块单独设置的会覆盖此默认配置 */
    defaults: {
        layout: 'fit',
        titleAlign: 'center',
        border: false,
        autoScroll: true,
        collapsible: false,
        split: false,
    },

    /** 子模块 */
    items: [{
        title: '元件库',
        height: '40%',
        id: "leftComponent",
        xtype: 'leftcomponent',
        collapsible: false,
        region: 'center',
        split: false,
        tools: [{
            tooltip: '查找',
            iconCls: 'search',
            handler: 'onSearch'
        }],
        titlePosition: 3,
        listeners: {
            resize: 'ratioResize'
        },
    }]
})
