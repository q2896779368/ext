/**
 * 中间编辑区视图控制器
 */
Ext.define('Cosmo.view.main.right.RightCenterController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.centerEdit',

    requires: ['Cosmo.Page', 'Cosmo.Const', 'Cosmo.ECharts'],

    /** 组件右键菜单 */
    contextmenu: null,

    /** 当前选中id */
    myId: null,

    /** 新建组件标志 */
    isNewItem: false,

    activeVal: "",

    /** 上一个活动组件（判断是否绘制右侧属性/样式页） */
    previousActiveId: "",

    /** 记录ctrl键 */
    key: 0,

    /** 页签Page对象 */
    cardPage: null,

    /** resises实例 */
    resizer: null,

    /** 关闭窗口前提示用户是否保存 */
    onBeforeClose: function (panel) {
        var page = Map.get(Const.PAGE_OBJECT),
            tabPanel = Ext.getCmp('centerEdit');
        tabPanel.setActiveTab(panel.id);
        if (Ext.getCmp(page.id) != undefined) {
            Ext.Msg.confirm('提示', '是否保存对"' + Ext.getCmp(page.id).title.replace(/\*$/, '') + '"的更改？',
                function (choice) {
                    if (choice === 'yes') {
                        Ext.getCmp('topRegion').getController().onSave();
                        Ext.getCmp(page.id).doClose();
                        return false;
                    } else if (choice == 'no') {
                        // 该弹窗不能阻塞执行，会走到下面的return false，所有在这调用doCLose关闭窗口，不用close是因为会走beforeclose
                        page.pagemenu = undefined;
                        page.history = {back: {}, forward: {}};
                        Ext.getCmp(page.id).doClose()
                    } else {
                        return false;
                    }
                }
            );
            return false;
        } else {
            Ext.Msg.confirm('提示', '是否保存对"' + tabPanel.setActiveTab(panel.id).config.title + '"的更改？',
                function (choice) {
                    if (choice === 'yes') {
                        Ext.getCmp('topRegion').getController().onSave();
                        // Ext.getCmp(page.id).doClose();
                        return false;
                    } else if (choice == 'no') {
                        // 该弹窗不能阻塞执行，会走到下面的return false，所有在这调用doCLose关闭窗口，不用close是因为会走beforeclose
                        page.pagemenu = undefined;
                        page.history = {back: {}, forward: {}};
                        Ext.getCmp(page.id).doClose()
                    } else {
                        return false;
                    }
                }
            );
            return false;
        }
        page.pagemenu = undefined
        return true;
    },

    /** 当前活动页ID */
    getActiveId: function () {
        return this.getView().getActiveTab().getId();
    },

    /** 当前活动页标题 */
    getActiveTitle: function () {
        return this.getView().getActiveTab().getTitle();
    },

    /** tab页增加显示文件  修改状态 */
    showTabChangeStatus: function (itemId, operation, groupType) {
        var tabPanel = Ext.getCmp('centerEdit'),
            page = Map.get(Const.PAGE_OBJECT);
        // 对有新操作的页签添加*提示
        if (page.history) {
            if (page.history.back) {
                if (!page.history.back || !page.history.back[page.id] || !page.history.back[page.id].length) {
                    if (tabPanel.getActiveTab().getTitle().indexOf('*') < 0)
                        tabPanel.getActiveTab().setTitle(tabPanel.getActiveTab().getTitle() + '*')
                }
            }
        } else {
            if (tabPanel.getActiveTab().getTitle().indexOf('*') < 0)
                tabPanel.getActiveTab().setTitle(tabPanel.getActiveTab().getTitle() + '*')
        }
    },

    /** 页签切换事件 */
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var me = this;
        $(window).keydown(function (e) {
            if (e.ctrlKey) {
                me.key = 1;
                $('#selectCmpDiv').css('z-index', 2);
                $('.groupDiv').css('z-index', 2);
            }
        }).keyup(function () {
            me.key = 0;
            $('#selectCmpDiv').css('z-index', 10000);
            $('.groupDiv').css('z-index', 10000);
        });
        //新页面id数组
        var newFileIdArray = Ext.getCmp('topRegion').getController().newFileIdArray;
        // 缓存（切换/打开）文件之前的Page对象
        if (oldCard && oldCard.id !== Const.DEFAULT_TAB) {
            var oldCardPage = Map.get(Const.PAGE_OBJECT);
            Map.put(oldCard.id, oldCardPage);
        }
        // 取得要切换的页签Page对象，如果没有表示打开新页签
        var newCardPage = Map.get(newCard.id);

        if (newCardPage) {                              // 切换到已有页签
            // 重新赋值页签id防止切换时页签id对应Page对象id紊乱
            newCardPage.id = me.getActiveId();
            Map.put(Const.PAGE_OBJECT, newCardPage);
            var resourceController = Ext.getCmp('leftresource').getController(),
                thisPage = Map.get(Const.PAGE_OBJECT);
            // 没有treeSource和双击的是打开过的文件时进行treeSource赋值，避免
            if (!thisPage.treeSource || (thisPage.treeSource.nodeId == resourceController.nodeId)) {
                thisPage.treeSource = {}
                thisPage.treeSource.nodeId = resourceController.nodeId;
                thisPage.treeSource.fileName = resourceController.fileName;
                thisPage.treeSource.serverPath = resourceController.serverPath;
                thisPage.treeSource.pId = resourceController.pId;
                thisPage.treeSource.selected = resourceController.selected;
            }

            // 标尺
            me.onRuler(newCardPage);

            // 拖拽
            me.moveCmp(me.getActiveId());
        } else {
            // 打开新页签
            var ref = Ext.create('Cosmo.util.Page');
            ref.id = newCard.id;
            Map.put(Const.PAGE_OBJECT, ref);
            var page = Map.get(Const.PAGE_OBJECT),
                resourceController = Ext.getCmp('leftresource').getController(),
                // 将保存用的信息存入page对象中
                flag = false;
            $(newFileIdArray).each(function (index, id) {
                if (id == page.id) flag = true;
            })
            page.treeSource = {};
            if (!flag) {
                page.treeSource.nodeId = resourceController.nodeId;
                page.treeSource.fileName = resourceController.fileName;
                page.treeSource.serverPath = resourceController.serverPath;
                page.treeSource.pId = resourceController.pId;
                page.treeSource.selected = resourceController.selected;
            } else {
                page.treeSource.nodeId = '';
                page.treeSource.fileName = '';
                page.treeSource.serverPath = '';
                page.treeSource.pId = '';
                page.treeSource.selected = '';
            }

            // 标尺、滚动条
            if (newCard.id !== Const.DEFAULT_TAB) {
                me.onRuler(newCard);
            }
            // 拖拽
            me.moveCmp(me.getActiveId());
        }
        // 当前page对象
        var page = Map.get(Const.PAGE_OBJECT);

        // 设置另存disabled
        if (page.treeSource && page.treeSource.nodeId) {
            Ext.getCmp('onSaveAs').setDisabled(false);
        } else {
            Ext.getCmp('onSaveAs').setDisabled(true);
        }
    },

    /** 标尺 */
    onRuler: function (newCard) {
        // 当前活动Tab面板Body的ID
        var activeTab = $("#" + this.getView().getActiveTab().body.id);
        // 添加滚动条
        this.onScroll(activeTab);
    },

    /** 滚动条 */
    onScroll: function (activeTab) {
        // 滚动条插件
        activeTab.niceScroll({
            enablekeyboard: false, // 不让nicescroll管理键盘事件
            cursorborder: '0px solid #526472',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            zindex: 9000,
            cursorborderradius: "4px"
        });
    },

    /** 根据落脚点获取当前目标物 */
    getTargetCell: function (graph, x, y) {
        var realX = x + graph.container.scrollLeft,
            realY = y + graph.container.scrollTop,
            cell = graph.getCellAt(realX, realY);
        return cell;
    },

    /** 绑定事件-拖放组件 */
    moveCmp: function (id) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT);

        if (!id) id = me.getActiveId();
        page.id = id;
        var editId = Const.POUND + id + Const._BODY,
            container = $('#' + id + '-body>div')[0];

        new Ext.dd.DropTarget(container, {
            ddGroup: 'cmpDdGroup',
            notifyOver: function (ddSource, e, data, ee) {
                var page = Map.get(Const.PAGE_OBJECT),
                    editor = page.activeEditor,
                    graph = page.activeGraph,
                    posX = parseInt(e.getX() - container.getBoundingClientRect().left),
                    posY = parseInt(e.getY() - container.getBoundingClientRect().top),
                    targetCell = me.getTargetCell(graph, posX, posY);
                if (targetCell && targetCell.type && targetCell.type == "subProcess") {
                    graph.allowdragIn = true;
                } else {
                    graph.allowdragIn = false;
                }
                // 图标改变为允许的默认操作，不加会导致拖入区域图标不变化
                return this.dropAllowed;
            },
            /** 在目标区域放置元件触发 */
            notifyDrop: function (ddSource, e, data, ee) {
                var resourceCtrl = Ext.getCmp('leftresource').getController(),
                    page = Map.get(Const.PAGE_OBJECT),
                    editor = page.activeEditor,
                    graph = page.activeGraph,
                    parent = graph.getDefaultParent(),
                    model = graph.getModel(),
                    posX = parseInt(e.getX() - container.getBoundingClientRect().left),
                    posY = parseInt(e.getY() - container.getBoundingClientRect().top);
                // 开启更新事务
                model.beginUpdate();
                try {
                    var targetCell = me.getTargetCell(graph, posX, posY),
                        v1 = model.cloneCell(editor.templates[ddSource.id]);
                    v1.id = ddSource.id + "-" + resourceCtrl.createCmpId();
                    resourceCtrl.items.push(v1.id.split('-')[1]);
                    v1.connectable = true;
                    v1.setVertex(true);
                    v1.geometry.x = posX;
                    v1.geometry.y = posY;
                    graph.addCell(v1, parent);
                    graph.setSelectionCell(v1);
                    Ext.getCmp('leftresource').getController().dragFlag = true;

                } finally {  // 结束更新事务
                    model.endUpdate();
                }
            }
        });
    }
});
