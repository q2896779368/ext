/**
 * 右侧面板
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.right.Right', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightpanel',
    requires: [
        "Cosmo.view.main.maintapbar.mainbody.right.property.RightProperty",
        'Cosmo.view.main.maintapbar.mainbody.right.RightElement'
    ],
    defaults: {
        layout: "fit",
        autoScroll: true,
        header: false,
        collapsible: true,
        titleCollapse: false,
        border: true
    },

    /** 子模块 */
    items: [{
        border: false,
        header: true,
        collapsed:true, // 默认收缩
        title: '属性',
        id: 'rightProperty',
        region: "south",
        xtype: 'rightproperty',
        bodyStyle: "overflow-y:scroll",
        height: '53%'
    }, {
        region: "center",
        xtype: 'rightelement'
    }]
});
