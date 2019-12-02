/**
 * 元件视图控制器
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.left.ComponentController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.leftComponent',

    requires: [
        'Cosmo.Map',
        'Ext.ux.form.SearchField'
    ],

    // 组件拖拽对象数组
    dragArray: [],
    // 组件ID数组
    idArray: [],

    /** 元件库渲染事件 */
    onRender: function (container) {
        var me = this,
            Data = Ext.getStore("Data"),
            Components = Ext.getStore("Components"),
            template = me.myTemplate();
        // 对模板进行编译,速度比较快.
        template.compile();

        // 加载中提示
        if (Ext.getCmp('componentGroup')) {
            var loadMask = new Ext.LoadMask(Ext.getCmp('componentGroup'), {
                removeMask: false,
                hideMode: 'display',
                msg: '加载中，请稍候...'
            });
            loadMask.show();
        }

        // 加载元件库
        
        Components.load(function (records) {
            var cmpArray = new Array();     // 模板数组
            me.idArray = new Array();       // 组件ID数组
            me.nameArray = new Array();     // 组件名称数组
            me.styleArray = new Array();    // 组件类型数组

            // 拼装模板数据
            records.forEach(function (record) {
                cmpArray.push(record.data);
                record.data.components.forEach(function (component) {
                    Data.add(component);
                    me.idArray.push(component.id);
                    me.nameArray.push(component.name);
                    me.styleArray.push(component.style);
                })
            });
            // 模板数据
            var data = {
                id: 'componentTableId',
                componentGroups: cmpArray
            };

            if (container && container.body) {
                // 更新元件库
                container.body.update(template.applyTemplate(data));
                // 元件组绑定点击事件
                me.bindClickEvent();
                // 元件绑定拖拽事件
                me.bindDragEvent();
                // 元件组件第一个组件展开
                me.bindExpanded()
            }
            // 销毁加载中提示
            if (loadMask) loadMask.destroy();

            // 元件库加载完成标识
            Ext.getCmp('leftresource').getController().cmpFlag = 1;
            // me.ratioResize()
        });

        // 元件库Header绑定点击事件
        me.bindHeaderClick();
    },

    /** 元件库Header绑定点击事件 */
    bindHeaderClick: function () {
        // 点击切换全屏/还原
        $('#leftComponent_header').on('click', function (e) {
            if (e.target.className.indexOf('search') >= 0 || e.target.className.indexOf('manage') >= 0) return;
            // Ext.getCmp('leftComponent').toggleCollapse();
        });
    },

    /** 元件组绑定点击事件 */
    bindClickEvent: function () {
        $(".VerticalMenu>div>div:first-child").click(function () {
            if ($(this).children("i.fa-angle-right").attr("leng") != "s") {
                $(this).children("i.fa-angle-right").attr("leng", "s");
                $(this).children("i.fa-angle-right").css({"transform": "rotate(90deg)", "color": "#172C44"});

            } else {
                $(this).children("i.fa-angle-right").attr("leng", "");
                $(this).children("i.fa-angle-right").css({"transform": "rotate(0deg)", "color": "#172C44"});
            }
            $(this).next().slideToggle(300);
            setTimeout(function () {
                $('.VerticalMenu').getNiceScroll().resize();
            },400)
        });
        $('.VerticalMenu').niceScroll({
            enablekeyboard: false,
            cursorborder: '1px solid #c5c5c5',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            preservenativescrolling: false
        });
    },

    /** 元件组件第一个组件展开 */
    bindExpanded:function(){
        $(".VerticalMenu>div>div:first-child").eq(0).children("i.fa-angle-right").attr("leng", "s");
        $(".VerticalMenu>div>div:first-child").eq(0).children("i.fa-angle-right").css({"transform": "rotate(90deg)", "color": "#172C44"});
        $(".VerticalMenu>div>div:first-child").eq(0).next().css('display','block');
        $('.VerticalMenu').niceScroll({
            enablekeyboard: false,
            cursorborder: '1px solid #c5c5c5',
            cursorcolor: '#c5c5c5',
            autohidemode: 'leave',
            preservenativescrolling: false
        });
            $('.VerticalMenu').getNiceScroll().resize();
    },

    /** 元件绑定拖拽事件 */
    bindDragEvent: function () {
        var me = this;
        for (var i = 0; i < me.idArray.length; i++) {
            var a = new Ext.dd.DragSource(me.idArray[i], {
                ddGroup: 'cmpDdGroup',
                type: me.idArray[i],
                onBeforeDrag: function (data, e) {
                    data.node = {};
                    data.node.attributes = {};
                    data.node.attributes.type = this.type;
                },
                onDrag: function () {
                    // 移除元件库滚动条
                    if ($('.VerticalMenu').getNiceScroll()) {
                        $('.VerticalMenu').getNiceScroll().remove();
                        $('.VerticalMenu').css('overflow-y', 'hidden');
                    }
                },
                onEndDrag: function () {
                    // 添加元件库滚动条
                    $('.VerticalMenu').css('overflow-y', 'scroll');
                    $('.VerticalMenu').niceScroll({
                        enablekeyboard: false,
                        cursorborder: '1px solid #c5c5c5',
                        cursorcolor: '#c5c5c5',
                        autohidemode: 'leave',
                        preservenativescrolling: false
                    });
                }
            });
            me.dragArray.push(a)
        }
    },

    /** 查找元件 */
    onSearch: function () {
        var me = this,
            cmpOptionField = Ext.getCmp('cmpOptionField'),
            tplSearchField = Ext.getCmp('cmpSearchField');
        if (tplSearchField) {
            Ext.getCmp("cmpSearchField").setValue('');
            me.fuzzySearch("", "change");
            tplSearchField.destroy();
        } else {
            if (cmpOptionField) cmpOptionField.destroy();
            me.getView().addDocked({
                id: 'cmpSearchField',
                xtype: 'textfield',
                value: '',
                listeners: {
                    added: function (_this, container, pos, eOpts) {
                        _this.triggers.bar.hide();
                    },
                    change: function (_this, newValue, oldValue, eOpts) {
                        if (newValue) {
                            _this.triggers.bar.show();
                        } else {
                            _this.triggers.bar.hide();
                        }
                    }
                },
                triggers: {
                    bar: {
                        cls: 'x-fa fa-close',
                        handler: function () {
                            Ext.getCmp("cmpSearchField").setValue('');
                            me.fuzzySearch("", "change");
                        }
                    },
                    search: {
                        cls: 'x-fa fa-search leftSearchBtn',
                        handler: function () {
                            // 模糊查询
                            var value = Ext.getCmp("cmpSearchField").getValue();
                            if (value) me.fuzzySearch(value, "change")
                        }
                    }
                }
            });
        }
    },

    /** 选项 */
    onOption: function () {
        var me = this,
            cmpSearchField = Ext.getCmp('cmpSearchField'),
            cmpOptionField = Ext.getCmp('cmpOptionField');
        if (cmpOptionField) {
            cmpOptionField.destroy();
        } else {
            if (cmpSearchField) cmpSearchField.destroy();
            var store = Ext.create('Ext.data.Store', {
                fields: ['abbr', 'name'],
                data: [
                    {"abbr": "", "name": "全部元件"},
                    {"abbr": "basic", "name": "基本元件"},
                    /*{"abbr": "form", "name": "表单元件"},
                    {"abbr": "chart", "name": "插件-图表"},
                    {"abbr": "AK", "name": "插件-仪表"},
                    {"abbr": "map", "name": "插件-地图"},*/
                    {"abbr": "AK", "name": "ECharts"},
                    {"abbr": "AK", "name": "D3"},
                    {"abbr": "AK", "name": "电气图"},
                    {"abbr": "AK", "name": "组织结构图"},
                    /*{"abbr": "AK", "name": "甘特图"},*/
                    /*{"abbr": "AZ", "name": "更多"}*/
                ]
            });
            me.getView().addDocked({
                id: 'cmpOptionField',
                xtype: 'combobox',
                store: store,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'abbr',
                emptyText: '全部元件',
                listeners: {
                    select: function (node, record) {
                        var value = record.get("name")
                        me.fuzzySearch(value, "select");
                    }
                }
            });
        }
    },

    /** 判断组件属性是否展开 */
    isModuleCollapsible: function(){
        var rightPropertyCollapsible=Ext.getCmp('rightProperty').collapsed;
        // false表示展开
        if(rightPropertyCollapsible == false){
            // 屏幕分辨率改变元件改变高度
            setTimeout(function () {
                Ext.getCmp('rightElement').getController().ratioResize();
                $('.VerticalMenu').niceScroll({
                    enablekeyboard: false,
                    cursorborder: '1px solid #c5c5c5',
                    cursorcolor: '#c5c5c5',
                    autohidemode: 'leave',
                    preservenativescrolling: false
                });
                $('.VerticalMenu').getNiceScroll().resize();
            },500)
        }
    },

    /**模糊查询*/
    fuzzySearch: function (value, type) {
        var me = this;
        var myMask = new Ext.LoadMask(Ext.getCmp('leftComponent'), {
            removeMask: false,
            hideMode: 'display',
            msg: '加载中，请稍候...',
        });
        myMask.show();

        var container = Ext.getCmp("componentGroup");
        var Data = Ext.getStore("Data");

        Data.removeAll()

        container.body.update("");
        me.dragArray.forEach(function (i) {
            i.destroy()
        })
        // 元件库数据集
        var Components = Ext.getStore("Components");
        Components.load(function (records, operation, success) {
            // 模板数组
            var cmpArray = new Array();
            // 组件ID数组
            me.idArray = new Array();

            // 循环数据集
            records.forEach(function (record) {
                // 查找元件
                if (type == "change") {
                    // 元件组
                    var components = Ext.clone(record.data.components);
                    // 清空元件组
                    record.data.components.length = 0;
                    components.forEach(function (com) {
                        if (com.name.indexOf(value) != -1) {
                            record.data.components.push(com)
                        }
                    })
                    if (record.data.components.length || !value) {
                        cmpArray.push(record.data);
                    }
                    record.data.components.forEach(function (component) {
                        Data.add(component);
                        me.idArray.push(component.id);
                    })
                }
                // 下拉查找组件
                if (type == "select") {
                    if (record.data.name == value || value == "全部元件") {
                        cmpArray.push(record.data);
                        record.data.components.forEach(function (component) {
                            Data.add(component);
                            me.idArray.push(component.id);

                        })
                    }
                }
            });
            // 模板数据
            var data = {
                id: 'componentTableId',
                componentGroups: cmpArray
            };
            var template = me.myTemplate()
            // 对模板进行编译,速度比较快.
            template.compile();
            // 更新元件库
            if (container && container.body) {
                container.body.update(template.applyTemplate(data));

                // 元件组绑定点击事件
                me.bindClickEvent();

                // 元件组件第一个组件展开
                me.bindExpanded()

                // 元件绑定拖拽事件
                me.bindDragEvent(me.idArray);

                //判断属性是否展开
                me.isModuleCollapsible()

            }
        })

        var time = setTimeout(function () {
            myMask.destroy();

            clearTimeout(time);
        }, 200);
    },

    /**元件模板*/
    myTemplate: function () {
        return new Ext.XTemplate(
            '<div class="VerticalMenu" width="100%">',
            '<tpl for="componentGroups">',
            '<div>',
            '<tpl if="xindex == 0">',
            '<div><i class="fa fa-angle-right fa-lg"></i><span>{name}</span></div>',
            '<tpl else>',
            '<div><i class="fa fa-angle-right fa-lg"></i><span>{name}</span></div>',
            '</tpl>',
            '<div class="displayXzTpl" name="xz">',
            '<table  style="font-size:12px;width:100%;" id="{id}" >',
            '<tr>',
            '<tpl for="components">',
            '<tpl if="xindex % 3==1">',
            '<tpl if="name.indexOf(\'人\') != -1">',
            '</tpl>',
            '</tr>',
            '<tr>',
            '</tpl>',
            '<td class="wrapCmp" style="width:90px!important;display:inline-block;text-align:center;background-color:#F1F1F1;" id="{id}">',
            '<table style="display:inline;width:30%;">',
            '<tr><td align="center">' +
            '<div style="font-size:36px;width: 36px; height:36px;background-repeat: no-repeat;background-size:contain;" class="{iconCls}"></div></td></tr>',
            '<tr style="height:15px;"><td align="center" valign="top" style="white-space:nowrap">{name}</td></tr>',
            '<tr style="height:10px;"></tr>',
            '</table>',
            '</td>',
            '</tpl>',
            '</table>',
            '</div>',
            '</div>',
            '</tpl>',
            '</div>'
        );
    }
});