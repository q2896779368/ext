/**
 * 中间面板
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.center.Center', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.centerpanel',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.center.CenterEdit'
    ],

    split: {size: 2},
    /** 子模块默认设置，子模块单独设置的会覆盖此默认配置 */
    defaults: {
        layout: 'fit',
        autoScroll: true,
        collapsible: true,
        titleCollapse: true,
        border: true
    },

    /** 子模块 */
    items: [{
        id: 'centerEdit',
        region: "center",
        bodyStyle: 'background: #FFFFFF url(resources/images/center/home.png) no-repeat center !important',
        header: false,
        style: 'margin-top:1px',
        xtype: 'centeredit'
    }]
});
