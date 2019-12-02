/**
 * 资源视图
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.left.Left', {
    extend: 'Cosmo.util.CosmoTree',
    alias: 'widget.Left',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.left.LeftController'
    ],

    /** 配置控制器 */
    controller: 'LeftController',
    defaults: {
        border: false,
        collapseMode: 'header',
        titleCollapse: false,
        hideCollapseTool: false,
    },
    useArrows: true,                // 节点展开+，-图标全部改为小三角
    expanded: true,                 // 默认展开
    rootVisible: true,
    /** 资源树（数据集） */
    store: {
        storeId: 'Resources',        // 数据集ID
        root: {                     // 根节点配置
            id: '4',                // 根节点ID
            expanded: true,         // 默认展开
            leaf: true,
            text: '请打开或新建一个项目'  // 根节点名称
        },
        proxy: {                    // 访问代理
            type: 'ajax',           // 类型异步
            api: {
                read: window.baseURL + 'catalog/tree?type=dds'
            }
        }
    },
    viewConfig: {
        plugins: {
            ptype: 'treeviewdragdrop',
            ddGroup: 'cmpDdGroup',
            enableDrop: false,
            appendOnly: true,
            sortOnDrop: true,
            containerScroll: true
        },
    },
    /** 监听器 */
    listeners: {
        render: 'onRender',
        resize: 'onResize',
        itemexpand: 'onItemexpand',
        itemcollapse: 'onItemcollapse',
        itemdblclick: 'onItemdblclick',
        beforecellcontextmenu: 'onBeforecellcontextmenu',
        itemmousedown:'onitemmousedown',
    }
});
