/**
 * 应用程序主视图
 * 由app.js中"mainView"属性指定，自动应用"viewport"组件自适应窗口
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.Mainbody', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Mainbodypanel',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.left.Left',
        'Cosmo.view.main.maintapbar.mainbody.top.TopToolbar',
        'Cosmo.view.main.maintapbar.mainbody.center.Center',
        'Cosmo.view.main.maintapbar.mainbody.MainbodyController',
        'Cosmo.view.main.maintapbar.mainbody.right.Right'
    ],

    id: 'Mainbody',
    defaults: {
        split: {size: 2},
        border: false,
        titleAlign: 'left',
        collapsible: true,
        hideCollapseTool: false,
        titleCollapse: true
    },
    // 配置控制器
    controller: 'Mainbodypanel',

    // 配置视图模型
    viewModel: 'main',

    // 布局
    layout: 'border',

    // 子模块
    items: [{                       // 顶部区域
        id: 'topRegion',
        region: "north",
        xtype: 'topToolbar',
        height: 32,
        split: false
    }, {
        //中间区域
        header: false,
        id: "CenterRegion",
        region: "center",
        xtype: 'centerpanel',
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        }
    }, {                            // 左侧区域
        id: 'leftresource',
        title: '资源/文件',
        height: '100%',
        xtype: 'Left',
        region: 'west',
        width: 260,
        maxWidth: 500,
        tools: [
            {tooltip: '查找', iconCls: 'search', handler: 'onSearch'},
            {tooltip: '新建文件', iconCls: 'model', handler: 'onFile'},
            {tooltip: '新建文件夹', iconCls: 'folder', handler: 'onFolder'}
        ]
    }, {                            //右侧侧区域
        id: 'rightRegion',
        title: '操作',
        header: false,
        region: "east",
        xtype: 'rightpanel',
        layout: {
            type: 'border',         //垂直分布
            align: 'stretch'        //拉伸使其充满整个容器
        },
        width: 320,
        maxWidth: 320,
        minWidth: 300
    }],
    listeners: {
        render: 'FileSelection'

    }
});
