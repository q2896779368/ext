/**
 * 元件视图
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.left.Component', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.leftcomponent',

    /** 配置控制器 */
    controller: 'leftComponent',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.left.ComponentController'
    ],
    items: [{
        xtype: 'panel',
        id: 'componentGroup',
        /** 监听器 */
        listeners: {
            render: 'onRender'
        }
    }],
});
