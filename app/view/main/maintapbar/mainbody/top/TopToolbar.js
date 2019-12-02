/**
 * 顶部工具栏
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.top.TopToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.topToolbar',
    id: 'topToolbar',
    /** 配置控制器 */
    controller: 'topToolbar',
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.top.TopToolbarController'
    ],

    /** 子模块 */
    items: [{
        text: "项目",
        iconCls: "cosmo_icon cosmo_icon_open",
        id: 'topObject',
        menu: {
            items: [{
                text: '新建项目',
                iconCls: 'cosmo_icon_createFile',
                listeners: {
                    click: 'onNewProject'
                }
            }, {
                text: '打开项目',
                iconCls: 'cosmo_icon_createFlod',
                listeners: {
                    click: 'openProject'
                }
            }, {
                text: '导入项目',
                iconCls: 'cosmo_icon_importProjectico',
                listeners: {
                    click: 'importProject'
                }
            }]
        }
    }, {
        text: "新建",
        id: 'addFile',
        disabled: true,
        iconCls: 'cosmo_icon_createFile',
        listeners: {
            click: 'onNewFile'
        }
    }, {
        text: "打开",
        id: 'openObjectPage',
        iconCls: "cosmo_icon cosmo_icon_open",
        disabled: true,
        listeners: {
            click: 'onOpen'
        }
    }, {
        text: "保存",
        iconCls: "cosmo_icon cosmo_icon_save",
        disabled: true,
        listeners: {
            click: 'onSave'
        }
    }, {
        text: "另存",
        iconCls: "cosmo_icon cosmo_icon_saveAs",
        id: 'onSaveAs',
        disabled: true,
        listeners: {
            click: 'onSaveAs'
        }
    }, "-", {
        tooltip: '复制',
        iconCls: "cosmo_icon cosmo_icon_copy",
        disabled: true,
        listeners: {
            click: 'onCopy'
        }
    }, {
        tooltip: '剪切',
        disabled: true,
        iconCls: "cosmo_icon cosmo_icon_cut",
        listeners: {
            click: 'onCut'
        }
    }, {
        tooltip: '粘贴',
        iconCls: "cosmo_icon cosmo_icon_paste",
        disabled: true,
        listeners: {
            click: 'onPaste'
        }
    }, {
        tooltip: '撤销',
        iconCls: "Arrowturnleft",
        disabled: true,
        listeners: {
            click: 'onBack'
        }
    }, {
        tooltip: '重做',
        iconCls: "Arrowturnright",
        disabled: true,
        listeners: {
            click: 'onProgress'
        }
    }, "-", {
        tooltip: '左对齐',
        iconCls: 'cosmo_icon_align',
        disabled: true,
        listeners: {
            click: 'onAlignLeft'
        }
    }, {
        tooltip: '左右居中',
        iconCls: 'cosmo_icon_align_leftRight',
        disabled: true,
        listeners: {
            click: 'onAlignLRCenter'
        }
    }, {
        tooltip: '右对齐',
        iconCls: 'cosmo_icon_align_right',
        disabled: true,
        listeners: {
            click: 'onAlignRight'
        }
    }, '-', {
        tooltip: '顶部对齐',
        iconCls: 'cosmo_icon_align_top',
        disabled: true,
        listeners: {
            click: 'onAlignTop'
        }
    }, {
        tooltip: '上下居中',
        iconCls: 'cosmo_icon_align_topDown',
        disabled: true,
        listeners: {
            click: 'onAlignTBCenter'
        }
    }, {
        tooltip: '底部对齐',
        iconCls: 'cosmo_icon_align_bottom',
        disabled: true,
        listeners: {
            click: 'onAlignBottom'
        }
    }, "-", {
        tooltip: "垂直分布",
        iconCls: "cosmo_icon_distribution_horizontal",
        disabled: true,
        listeners: {
            click: 'onHeight'
        }
    }, {
        tooltip: "水平分布",
        iconCls: "cosmo_icon_distribution_vertical",
        disabled: true,
        listeners: {
            click: 'onWidth'
        }
    }, "-", {
        tooltip: '置顶',
        iconCls: "cosmo_icon cosmo_icon_top",
        disabled: true,
        listeners: {
            click: 'onTop'
        }
    }, {
        tooltip: '置底',
        iconCls: "cosmo_icon cosmo_icon_bottom",
        disabled: true,
        listeners: {
            click: 'onBottom'
        }
    }, "-", {
        id: 'selectAllCells',
        tooltip: '全选/反选',
        iconCls: "cosmo_icon cosmo_icon_select2",
        disabled: true,
        listeners: {
            click: 'onSelectAll'
        }
    }, {
        id: 'but-oper',
        text: '启动',
        disabled: true,
        menu: {
            items: [{
                text: '执行任务',
                iconCls: 'cosmo_icon_createFile',
                listeners: {
                    click: 'executeText'
                }
            }, {
                text: '调度任务',
                iconCls: 'cosmo_icon_createFlod',
                listeners: {
                    click: 'dispatcherTask'
                }
            }]
        }
    }, "->", {
        id: 'but-help',
        tooltip: '帮助',
        iconCls: "x-fa fa-question-circle",
        listeners: {
            click: 'onQuestion',
            afterrender: function (_this) {
                _this.setDisabled(true)
            }
        }
    }]
});
