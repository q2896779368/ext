Ext.define('Cosmo.view.main.maintapbar.mainbody.right.property.RightPropertyController', {
    extend: 'Ext.app.ViewController',
    /** 控制器别名 */
    alias: 'controller.rightproperty',
    iconEvent: null,             // 定义panel属性页面
    field: null,
    requires: ['Cosmo.view.main.maintapbar.mainbody.right.property.RightPropertyControllerData'],
    parameterType: 'panel',      // 定义类型数据参数
    templatePanel: null,         // 右侧属性模板
    tabName: null,               // 切换tab name
    eventKey: '',                // 下拉组建k值
    loadContent: null,           // 加载内容加载路径配置
    childTabName: [],            // 标签页xml数据
    subPage: null,               // 子页面对象
    fildUrlPath: '',             // 选中文件的路径
    fileType: '',                // 选中文件的类型
    nextLevel: null,             //下一级

    /** 动态变化右侧属性面板 */
    createRightProperty: function (cell, state) {
        var me = this;
        // 有属性值则 展开属性面板
        Ext.getCmp('rightProperty').expand();
        // 区分元件默认运行方式
        me.differentiateElement(cell)
        // 屏幕分辨率改变元件改变高度
        Ext.getCmp('rightElement').getController().ratioResize();

        var propertyGroups = me.getProperty(cell);
        // 获取到的属性拥有length可用于遍历，也有对象的keyvalue形式的值，可以直接取
        // 绘制右侧属性页面
        // state=true 则是页面属性
        if (state) {
            // setTimeout(function () {
            me.pagePropertiesPanel(cell);
            // }, 0);
        } else {
            me.drawPropertiesPanel(propertyGroups, cell);
        }
    },

    /** 创建页面模板属性 */
    pagePropertiesPanel: function (cell) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            value = '',
            spacing = ' ',
            asterisk = '*',
            question = '*';

        if (Ext.getCmp('topPanel')) {
            if (Ext.getCmp('topPanel').ownerCt) {
                Ext.getCmp('topPanel').ownerCt.destroy();
            }
        }

        // 初始化page
        me.InitializeObject(page)

        // cron选项数据
        var pageData = Ext.create('Cosmo.view.main.maintapbar.mainbody.right.property.RightPropertyControllerData').config.data;
        // cron表达式
        var createFrequencyItem = Ext.create('Ext.form.FieldSet', {
            border: false,
            id: 'createFrequencyItem',
            items: [{
                bodyStyle: false,
                style: 'margin-top: 20px;',
                items: [{
                    id: 'cronSelect',
                    cls: 'timerSelect selectComboHour',
                    style: 'float: left;',
                    xtype: 'combo',
                    fieldLabel: "每",
                    labelSeparator: '',
                    labelWidth: 60,
                    labelAlign: 'right',
                    store: {
                        field: ['value', 'text'],
                        data: [{value: 'hours', text: '时'},
                            {value: 'day', text: '天'},
                            {value: 'week', text: '周'},
                            {value: 'month', text: '月'},
                            {value: 'year', text: '年'}]
                    },
                    valueField: 'value',
                    displayField: 'text',
                    value: 'hours',
                    editable: false,
                    listeners: {
                        render: function (_this) {
                            // 数据
                            var hourStore = Ext.create('Ext.data.Store', {
                                    field: pageData.hours[0].field,
                                    data: pageData.hours[0].data
                                }),
                                dayStore = Ext.create('Ext.data.Store', {
                                    field: pageData.day[0].field,
                                    data: pageData.day[0].data
                                }),
                                weekStore = Ext.create('Ext.data.Store', {
                                    field: pageData.week[0].field,
                                    data: pageData.week[0].data
                                }),
                                monthStore = Ext.create('Ext.data.Store', {
                                    field: pageData.month[0].field,
                                    data: pageData.month[0].data
                                }),
                                yearsStore = Ext.create('Ext.data.Store', {
                                    field: pageData.year[0].field,
                                    data: pageData.year[0].data
                                });
                            Ext.getCmp('monthTime').setStore(yearsStore);
                            Ext.getCmp('weekTime').setStore(weekStore);
                            Ext.getCmp('dayTime').setStore(monthStore);
                            Ext.getCmp('hourTime').setStore(dayStore);
                            Ext.getCmp('minuteTime').setStore(hourStore);

                        },
                        select: function (combo, record) {
                            Ext.getCmp('minuteTime').hide();
                            Ext.getCmp('monthTime').hide();
                            Ext.getCmp('weekTime').hide();
                            Ext.getCmp('dayTime').hide();
                            Ext.getCmp('hourTime').hide();
                            Ext.getCmp('monadHour').hide();
                            Ext.getCmp('monadWeek').hide();
                            Ext.getCmp('monadMonth').hide();
                            Ext.getCmp('monadYear').hide();

                            // 选择对应的时区
                            switch (record.data.value) {
                                case 'hours':
                                    me.cronVlue('hours');
                                    Ext.getCmp('minuteTime').show();
                                    page.coordinator.frequencyObject.recordCron = 'hours';
                                    break;
                                case 'day':
                                    me.cronVlue('day');
                                    Ext.getCmp('hourTime').show();
                                    Ext.getCmp('minuteTime').show();
                                    Ext.getCmp('monadHour').show();
                                    page.coordinator.frequencyObject.recordCron = 'day';
                                    break;
                                case 'week':
                                    me.cronVlue('week');
                                    Ext.getCmp('weekTime').show()
                                    Ext.getCmp('hourTime').show()
                                    Ext.getCmp('minuteTime').show()
                                    Ext.getCmp('monadHour').show();
                                    Ext.getCmp('monadWeek').show();
                                    page.coordinator.frequencyObject.recordCron = 'week';
                                    break;
                                case 'month':
                                    me.cronVlue('month');
                                    Ext.getCmp('dayTime').show()
                                    Ext.getCmp('hourTime').show()
                                    Ext.getCmp('minuteTime').show()
                                    Ext.getCmp('monadHour').show();
                                    Ext.getCmp('monadMonth').show();
                                    page.coordinator.frequencyObject.recordCron = 'month';
                                    break;
                                case 'year':
                                    me.cronVlue('year');
                                    Ext.getCmp('monthTime').show();
                                    Ext.getCmp('dayTime').show()
                                    Ext.getCmp('hourTime').show()
                                    Ext.getCmp('minuteTime').show()
                                    Ext.getCmp('monadHour').show();
                                    Ext.getCmp('monadYear').show();
                                    Ext.getCmp('monadMonth').show();
                                    page.coordinator.frequencyObject.recordCron = 'year';
                                    break;
                            }
                            // 文件是否是最新的
                            Ext.getCmp('centerEdit').getController().newFiled();
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:4px;margin-left: 1px;margin-right: 2px;',
                    value: ' '
                }, {
                    style: 'float: left;',
                    xtype: 'combo',
                    id: 'monthTime',
                    cls: 'selectComboMonth',
                    labelAlign: 'right',
                    valueField: 'value',
                    displayField: 'text',
                    value: '',
                    editable: false,
                    listeners: {
                        select: function (combo, record) {
                            // 判断月的天数
                            var getCountDaysLenght = me.getCountDays(combo.value);
                            // 动态计算每月多少天
                            monthStore = Ext.create('Ext.data.Store', {
                                field: pageData.month[0].field.slice(0, getCountDaysLenght),
                                data: pageData.month[0].data.slice(0, getCountDaysLenght)
                            });
                            Ext.getCmp('dayTime').setStore(monthStore);
                            var hours = page.coordinator.frequencyObject.hours,
                                day = page.coordinator.frequencyObject.day,
                                month = page.coordinator.frequencyObject.month;
                            page.coordinator.frequencyObject.year = combo.value;
                            page.coordinator.frequency = hours + ' ' + day + ' ' + month + ' ' + combo.value + spacing + '*';
                        },
                        afterrender: function (_this) {
                            if (page.coordinator.frequencyObject.year == '*') {
                                _this.setValue('0')
                            } else {
                                _this.setValue(page.coordinator.frequencyObject.year)
                            }
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:2px;margin-left: 1px;margin-right: 2px;',
                    id: 'monadYear',
                    value: ' '
                }, {
                    style: 'float: left;',
                    xtype: 'combo',
                    id: 'weekTime',
                    cls: 'selectComboWeek',
                    labelAlign: 'right',
                    valueField: 'value',
                    displayField: 'text',
                    value: '',
                    editable: false,
                    listeners: {
                        select: function (combo, record) {
                            var hours = page.coordinator.frequencyObject.hours,
                                day = page.coordinator.frequencyObject.day;

                            page.coordinator.frequencyObject.week = combo.value;
                            page.coordinator.frequency = hours + ' ' + day + ' ' + '*' + ' ' + '*' + ' ' + combo.value;
                        },
                        afterrender: function (_this) {
                            if (page.coordinator.frequencyObject.week == '*') {
                                _this.setValue('0');
                            } else {
                                _this.setValue(page.coordinator.frequencyObject.week)
                            }
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:2px;margin-left: 1px;margin-right: 2px;',
                    id: 'monadWeek',
                    value: ' '
                }, {
                    style: 'float: left;',
                    xtype: 'combo',
                    cls: 'selectCombo selectComboHour',
                    id: 'dayTime',
                    labelAlign: 'right',
                    valueField: 'value',
                    displayField: 'text',
                    value: '',
                    editable: false,
                    listeners: {
                        select: function (combo, record) {
                            var hours = page.coordinator.frequencyObject.hours,
                                day = page.coordinator.frequencyObject.day;

                            page.coordinator.frequencyObject.month = combo.value;
                            page.coordinator.frequency = hours + ' ' + day + ' ' + combo.value + ' ' + '*' + ' ' + '*';
                        },
                        afterrender: function (_this) {
                            if (page.coordinator.frequencyObject.month === '*') {
                                _this.setValue('0')
                            } else {
                                _this.setValue(page.coordinator.frequencyObject.month)
                            }
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:10px;margin-left: 1px;margin-right: 5px;',
                    id: 'monadMonth',
                    value: '日'
                }, {
                    style: 'float: left;',
                    xtype: 'combo',
                    cls: 'selectCombo selectComboHour',
                    labelSeparator: '',
                    id: 'hourTime',
                    valueField: 'value',
                    displayField: 'text',
                    value: '',
                    editable: false,
                    listeners: {
                        select: function (combo, record) {
                            var hours = page.coordinator.frequencyObject.hours;

                            page.coordinator.frequencyObject.day = combo.value;
                            page.coordinator.frequency = hours + ' ' + combo.value + ' ' + '*' + ' ' + '*' + ' ' + '*';
                        },
                        afterrender: function (_this) {
                            _this.setValue(page.coordinator.frequencyObject.day)
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:10px;margin-left: 1px;margin-right: 2px;',
                    id: 'monadHour',
                    value: '时'
                }, {
                    style: 'float: left;margin-left: 2px;',
                    xtype: 'combo',
                    cls: 'selectCombo selectComboHour',
                    labelSeparator: '',
                    id: 'minuteTime',
                    valueField: 'value',
                    displayField: 'text',
                    value: '',
                    editable: false,
                    listeners: {
                        select: function (combo, record) {
                            page.coordinator.frequencyObject.hours = combo.value;
                            page.coordinator.frequency = combo.value + ' ' + '*' + ' ' + '*' + ' ' + '*' + ' ' + '*';
                        },
                        afterrender: function (_this) {
                            _this.setValue(page.coordinator.frequencyObject.hours)
                        }
                    }
                }, {
                    xtype: 'displayfield',
                    style: 'float: left;width:10px;margin-left: 1px;',
                    value: '分'
                }]
            }],
            listeners: {
                afterrender: function () {
                    Ext.getCmp('monthTime').hide();
                    Ext.getCmp('weekTime').hide();
                    Ext.getCmp('dayTime').hide();
                    Ext.getCmp('hourTime').hide();
                    Ext.getCmp('monadHour').hide();
                    Ext.getCmp('monadWeek').hide();
                    Ext.getCmp('monadMonth').hide();
                    Ext.getCmp('monadYear').hide();

                    // 回显上次选项
                    me.recordCron(page.coordinator.frequencyObject.recordCron, page, Ext.getCmp('cronSelect'));
                }
            }
        });
        // 日期控件 createDateFieldStart
        var createDateFieldStart = Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            modelValidation: false,
            items: [{
                xtype: 'datefield', // 日期控件
                cls: 'datefieldStyleTime',
                style: 'argin-bottom:10px;float: left;',
                format: 'Y-m-d',
                fieldLabel: '开始',
                value: "2019-10-8",
                labelWidth: 40,
                labelAlign: 'right',
                emptyText: '--请选择--',
                name: 'from_date',
                listeners: {
                    change: function (_this) {
                        page.coordinator.dateFieldStart = _this.getValue();
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldStart != undefined) {
                            _this.setValue(new Date(page.coordinator.dateFieldStart))
                        }
                    }
                }
            }, {
                cls: 'datefieldStyle_end createPageStyleimg',
                xtype: 'numberfield',
                name: 'time',
                style: 'float: left;margin-left: 10px;',
                value: '',
                emptyText: "时",
                minValue: 0,
                maxValue: 23,
                listeners: {
                    change: function (_this) {
                        var value = _this.getValue();
                        value = me.filtrationTime(value);
                        page.coordinator.dateFieldStartTimeHours = value;
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldStartTimeHours != undefined) {
                            _this.setValue(page.coordinator.dateFieldStartTimeHours)
                        }
                    }
                }
            }, {
                cls: 'datefieldStyle_end createPageStyleimg',
                xtype: 'numberfield',
                name: 'time',
                fieldLabel: ':',
                labelWidth: 1,
                style: 'float: left;',
                value: '',
                emptyText: "分",
                minValue: 0,
                maxValue: 59,
                listeners: {
                    change: function (_this) {
                        var value = _this.getValue();
                        value = me.filtrationTime(value)
                        _this.setValue(value)
                        page.coordinator.dateFieldStartTimeMinutes = value;
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldStartTimeMinutes != undefined) {
                            _this.setValue(page.coordinator.dateFieldStartTimeMinutes)
                        }
                    }
                }
            }]
        });
        // 日期控件 createDateFieldEnd
        var createDateFieldEnd = Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            modelValidation: false,
            style: 'margin-top: 4px;',
            items: [{
                xtype: 'datefield', // 日期控件
                cls: 'datefieldStyleTime',
                style: 'margin-bottom:10px;float: left;',
                format: 'Y-m-d',
                fieldLabel: '结束',
                value: '',
                labelWidth: 40,
                labelAlign: 'right',
                emptyText: '--请选择--',
                name: 'from_date',
                listeners: {
                    change: function (_this) {
                        page.coordinator.dateFieldEnd = _this.getValue();
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldEnd != undefined) {
                            _this.setValue(new Date(page.coordinator.dateFieldEnd))
                        }
                    }
                }
            }, {
                cls: 'datefieldStyle_end createPageStyleimg',
                xtype: 'numberfield',
                name: 'time',
                style: 'float: left;margin-left: 10px;',
                labelWidth: 10,
                value: '',
                emptyText: '时',
                minValue: 0,
                maxValue: 23,
                listeners: {
                    change: function (_this) {
                        var value = _this.getValue();
                        value = me.filtrationTime(value);
                        page.coordinator.dateFieldEndTimeHours = value;
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldEndTimeHours != undefined) {
                            _this.setValue(page.coordinator.dateFieldEndTimeHours)
                        }
                    }
                }
            }, {
                cls: 'datefieldStyle_end createPageStyleimg',
                xtype: 'numberfield',
                name: 'time',
                fieldLabel: ':',
                labelWidth: 1,
                style: 'float: left;',
                value: '',
                emptyText: '分',
                minValue: 0,
                maxValue: 59,
                listeners: {
                    change: function (_this) {
                        var value = _this.getValue();
                        value = me.filtrationTime(value);
                        page.coordinator.dateFieldEndTimeMinutes = value;
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.dateFieldEndTimeMinutes != undefined) {
                            _this.setValue(page.coordinator.dateFieldEndTimeMinutes);
                        }
                    }
                }
            }]
        });
        // 时区 timezone
        var createTimezone = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                xtype: 'textfield',
                reference: 'states',
                publishes: 'value',
                labelWidth: 60,
                fieldLabel: '时区',
                emptyText: '请选择时区',
                labelAlign: 'right',
                value: '中国标准时间',
                readOnly: true,
                cls: 'createPageStyle',
                tooltip: '不可编辑',
                tooltipType: 'title',
                listeners: {
                    afterrender: function (_this) {
                        page.coordinator.timezone = 'GMT+0800';
                    }
                }
            }]
        });
        // 超时时间 timeout
        var createTimeout = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                cls: 'createPageStyle createPageStyleimg',
                xtype: 'numberfield',
                name: '超时时间',
                fieldLabel: '超时时间',
                labelAlign: 'right',
                labelWidth: 60,
                value: -1,
                minValue: -1,
                maxValue: 100000000,
                listeners: {
                    change: function (_this) {
                        page.coordinator.timeout = _this.getValue();

                    },
                    afterrender: function (_this) {
                        if (page.coordinator.timeout != undefined) {
                            _this.setValue(page.coordinator.timeout);
                        }
                    }
                }
            }]
        });
        // concurrency:并发数
        var createConcurrency = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                cls: 'createPageStyle createPageStyleimg',
                xtype: 'numberfield',
                name: '并发数',
                fieldLabel: '并发数',
                labelAlign: 'right',
                labelWidth: 60,
                value: 1,
                emptyText: "并发数",
                minValue: 0,
                maxValue: 100000000,
                listeners: {
                    change: function (_this) {
                        page.coordinator.concurrency = _this.getValue();
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        if (page.coordinator.concurrency != undefined) {
                            _this.setValue(page.coordinator.concurrency);
                        }
                    }
                }
            }]
        });
        // execution  执行次序
        var createExecution = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: '执行次序' + ':',
                label: '执行次序',
                value: 'FIFO',
                labelAlign: 'right',
                emptyText: '请填写执行次序',
                labelWidth: 60,
                labelSeparator: '',
                enableKeyEvents: true,
                cls: 'textfieldinput createPageStyle',
                listeners: {
                    change: function (_this) {
                        page.coordinator.execution = _this.getValue();
                        // 文件是否是最新的
                        // Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this) {
                        page.coordinator.execution = _this.getValue();
                        if (page.coordinator.execution != undefined) {
                            _this.setValue(page.coordinator.execution);
                        }
                    }
                }
            }]
        });
        // configuration:配置
        var createConfiguration = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                cls: 'createPageStyle',
                xtype: 'textfield',
                fieldLabel: '配置' + ':',
                label: '配置',
                value: '',
                labelWidth: 60,
                labelAlign: 'right',
                emptyText: '配置',
                readOnly: true,
                labelSeparator: '',
                enableKeyEvents: true
            }, {
                labelAlign: 'left',
                cls: 'configurationInputSet',
                items: [
                    new Ext.Button({
                        text: '...',
                        tooltip: '添加',
                        tooltipType: 'title',
                        style: 'background:rgba(74,144,226,1);border-radius:2px;',
                        handler: function () {
                            // 选中数组
                            var checkoutAll = [];
                            if (Ext.getCmp('createPopout')) {
                                Ext.getCmp('createPopout').destroy();
                            }
                            // 弹框
                            var createPopout = Ext.create('Ext.window.Window', {
                                bodyPadding: 10,
                                width: 600,
                                height: 400,
                                id: 'createPopout',
                                title: '配置',
                                style: 'background:#fff !important',
                                renderTo: Ext.getBody()
                            }).show();


                            // 定义列
                            var columns = [{
                                xtype: 'rownumberer'
                            }, {
                                header: 'name',
                                dataIndex: 'name',
                                width: 80,
                                editor: {
                                    allowBlank: true
                                }
                            }, {
                                header: 'value',
                                dataIndex: 'value',
                                width: 112,
                                style: 'width:100px !important',
                                editor: {
                                    allowBlank: true
                                }
                            }];
                            // 定义数据
                            var copyData = [];
                            // 如果有默认属性先读取默认值
                            if (page.coordinator.configuration != undefined) {
                                copyData = page.coordinator.configuration;
                                copyData = JSON.parse(copyData);
                            }
                            Ext.create('Ext.data.Store', {
                                storeId: 'setStore',
                                fields: ['name', 'value'],
                                data: copyData || []
                            });
                            //创建表格
                            var grid = new Ext.grid.GridPanel({
                                width: 550,
                                autoHeight: true,
                                store: Ext.data.StoreManager.lookup('setStore'),
                                id: 'GridPanelSet',
                                columns: columns, // 显示列
                                sortableColumns: false, // 取消排序
                                sortable: false,
                                stripeRows: true, // 斑马线效果
                                selType: 'checkboxmodel', // 复选框
                                fields: ['name', 'value'],
                                forceFit: true,
                                plugins: [
                                    Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1 // 设置单击单元格编辑
                                    })
                                ],
                                listeners: {},
                                tbar: [{
                                    text: '添加一行',
                                    handler: function (_this) {
                                        var rec = {name: '', value: ''},
                                            GridPanelSetPanel = Ext.getCmp('GridPanelSet');
                                        // 插入数据
                                        GridPanelSetPanel.store.insert(grid.store.getCount(), rec);
                                        GridPanelSetPanel.getSelectionModel().store.config.data.push(rec);
                                    }
                                }, '-', {
                                    text: '删除',
                                    handler: function () {
                                        var records = Ext.getCmp('GridPanelSet').getSelectionModel().getSelection();
                                        Ext.each(records, function (record) {
                                            // 先通过ajax从后台删除数据，删除成功后再从页面删除数据
                                            Ext.getCmp('GridPanelSet').store.remove(record);
                                            // 删除数据
                                            var newDataArr = Ext.getCmp('GridPanelSet').getSelectionModel().store.config.data
                                            for (var i = 0; i < records.length; i++) {
                                                for (var j = 0; j < newDataArr.length; j++) {
                                                    if (records[i].data.id.split('-')[1] == newDataArr[j].id.split('-')[1]) {
                                                        newDataArr.splice(j, 1)
                                                    }
                                                }
                                            }
                                            // 保存
                                            var newDataSet = [],
                                                data = Ext.getCmp('GridPanelSet').getSelectionModel().store.sorters.$sortable.items
                                            for (var i = 0; i < data.length; i++) {
                                                var objectSet = {}
                                                if (data[i].data.name && data[i].data.value) {
                                                    objectSet.name = data[i].data.name;
                                                    objectSet.value = data[i].data.value;
                                                    newDataSet.push(objectSet);
                                                }
                                            }
                                            newDataSet = JSON.stringify(newDataSet);
                                            // 存值
                                            page.coordinator.configuration = newDataSet;
                                            // 文件是否是最新的
                                            //Ext.getCmp('centerEdit').getController().newFiled();
                                        })
                                    }
                                }, '-', {
                                    text: '保存',
                                    handler: function (_this) {
                                        var newDataSet = [],
                                            data = Ext.getCmp('GridPanelSet').getSelectionModel().store.sorters.$sortable.items;
                                        for (var i = 0; i < data.length; i++) {
                                            var objectSet = {}
                                            if (data[i].data.name && data[i].data.value) {
                                                objectSet.name = data[i].data.name;
                                                objectSet.value = data[i].data.value;
                                                newDataSet.push(objectSet);
                                            }
                                        }
                                        newDataSet = JSON.stringify(newDataSet);
                                        // 存值
                                        page.coordinator.configuration = newDataSet;
                                        // 更新面板数据
                                        Ext.getCmp('createPopout').destroy();
                                        // 文件是否是最新的
                                        // Ext.getCmp('centerEdit').getController().newFiled();
                                    }
                                }]
                            });
                            Ext.getCmp('createPopout').add(grid);
                        }
                    })
                ]
            }]
        });

        // 创建基础面板
        var panel = new Ext.create('Ext.form.Panel', {
            defaultType: 'textfield',
            border: false,
            id: 'topPanel',
            bodyStyle: 'padding:12px 0px;box-sizing: border-box;padding-bottom:20px;',
            autoScroll: false,
            items: [createFrequencyItem, createDateFieldStart, createDateFieldEnd,
                createTimezone, createTimeout, createConcurrency, createExecution,
                createConfiguration],
        });

        me.templatePanel = Ext.create('Ext.panel.Panel', {
            overflowY: true,
            overflowX: false,
            autoScroll: false,
            items: [panel],
            listeners: {
                afterrender: function () {
                    setTimeout(function () {
                        $('#rightProperty-body>div>div>div').niceScroll({
                            'cursorborder': '1px solid rgb(197, 197, 197)',
                            'cursorcolor': 'rgb(197, 197, 197)',
                            'autohidemode': 'leave'
                        });
                    }, 0)
                }
            }
        });

        Ext.getCmp('rightProperty').add(me.templatePanel);
        // 删除多余的头
        if (me.templatePanel.header) {
            me.templatePanel.header.destroy();
        }
        if ($('#rightProperty-body>div>div>div').getNiceScroll()) {
            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
        } else {
            $('#rightProperty-body>div>div>div').css('overflow-y', 'auto!important');
            $('#rightProperty-body>div>div>div').niceScroll({
                'cursorborder': '1px solid #526472',
                'cursorcolor': '#526372',
                'autohidemode': 'leave',
                'horizrailenabled': false
            })
        }
        // 屏幕分辨率改变元件改变高度
        Ext.getCmp('rightElement').getController().ratioResize();
    },

    /** 创建模板 */
    drawPropertiesPanel: function (propertyGroups, cell) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT);
        if (me.templatePanel) me.templatePanel.destroy();
        me.tabName = propertyGroups;
        if (Ext.getCmp('topPanel')) {
            Ext.getCmp('topPanel').destroy();
        }

        // 创建基础面板
        var panel = new Ext.create('Ext.form.Panel', {
            defaultType: 'textfield',
            border: false,
            id: 'topPanel',
            bodyStyle: 'padding:12px 0px;box-sizing: border-box;padding-bottom:20px;',
            autoScroll: false,
            listeners: {}
        });
        if (!cell) {
            return false;
        }

        me.templatePanel = Ext.create('Ext.panel.Panel', {
            id: cell.id,
            overflowY: true,
            overflowX: false,
            autoScroll: false,
            items: [panel],
            listeners: {
                afterrender: function () {
                    setTimeout(function () {
                        $('#' + cell.id + '-body').niceScroll({
                            'cursorborder': '1px solid rgb(197, 197, 197)',
                            'cursorcolor': 'rgb(197, 197, 197)',
                            'autohidemode': 'leave'
                        });
                    }, 0)
                }
            }
        });
        if (!me.tabName.length) return;
        me.tabName.forEach(function (childTabName) {
            if (childTabName.name) {
                // 创建每一个选项
                var formPanel = Ext.create('Ext.form.FieldSet', {
                    title: childTabName.name,
                    cls: 'properties',
                    columnWidth: 1,
                    margin: 0,
                    padding: 0,
                    defaultType: 'panel',
                    border: false,
                    collapsible: true,
                    collapsed: false,
                    defaults: {anchor: '100%'},
                    layout: 'anchor',
                    items: [],
                    listeners: {
                        resize: function () {
                            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                        }
                    }
                });
                // 创建自有属性
                childTabName.properties.forEach(function (childEach) {
                    formPanel.add(me.filterType(childEach));
                })
                panel.add(formPanel);
            } else {
                // 创建公共属性
                childTabName.properties.forEach(function (childCommon) {
                        // 添加多用例
                        panel.add(me.filterType(childCommon));
                        if (childCommon.id == 'event') {
                            panel.add(me.createEvent(childCommon))
                        }
                    }
                );
            }
        });
        Ext.getCmp('rightProperty').add(me.templatePanel);
        // 删除多余的头
        if (me.templatePanel.header) {
            me.templatePanel.header.destroy();
        }
        if ($('#rightProperty-body>div>div>div').getNiceScroll()) {
            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
        } else {
            $('#rightProperty-body>div>div>div').css('overflow-y', 'auto!important');
            $('#rightProperty-body>div>div>div').niceScroll({
                'cursorborder': '1px solid #526472',
                'cursorcolor': '#526372',
                'autohidemode': 'leave',
                'horizrailenabled': false
            })
        }
    },

    /** 组件定位 */
    componentLocation: function (page) {
        var graph = page.activeGraph,
            // 获取画布元素的集合
            cells = graph.getDefaultParent().children;
        $('#' + page.id + '-body').getNiceScroll(0).resize();           // 刷新滚动条
        $('#' + page.id + '-body').getNiceScroll(0).doScrollLeft(1600); // x
        $('#' + page.id + '-body').getNiceScroll(0).doScrollTop(1600);  // y
    },

    /** 时间格式转化年月日 */
    transTime: function (time) {
        time = new Date(time);
        if (time.toString() !== 'Invalid Date') {
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return time.getFullYear() + '-' + tf(time.getMonth() + 1) + '-' + tf(time.getDate())
        } else {
            return false;
        }
    },

    /** 时间格式转化 时分秒拼接字符串 */
    transTimeHoursMS: function (time) {
        time = new Date(time);
        if (time.toString() !== 'Invalid Date') {
            var hours = time.getHours();
            var tf = function (i) {
                return (i < 10 ? '0' : '') + i
            };
            return tf(time.getHours()) + ':' + tf(time.getMinutes()) + '+0800'
        } else {
            return false;
        }
    },

    /** 过滤时间 */
    filtrationTime: function (i) {
        return (i < 10 ? '0' : '') + i
    },

    /** 计算每个月的天数 */
    getCountDays: function (val) {
        var curDate = new Date();
        //  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1
        curDate.setMonth(val);
        // 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
        curDate.setDate(0);
        // 返回当月的天数
        return curDate.getDate();

    },

    /** 记录cron选择日recordCron */
    recordCron: function (type, page, _this) {
        var me = this;
        switch (type) {
            case 'hours':
                me.cronVlue('hours');
                Ext.getCmp('minuteTime').show();
                page.coordinator.frequencyObject.recordCron = 'hours';
                _this.setValue(page.coordinator.frequencyObject.recordCron);
                break;
            case 'day':
                me.cronVlue('day');
                Ext.getCmp('hourTime').show();
                Ext.getCmp('minuteTime').show();
                Ext.getCmp('monadHour').show();
                page.coordinator.frequencyObject.recordCron = 'day';
                _this.setValue(page.coordinator.frequencyObject.recordCron);
                break;
            case 'week':
                me.cronVlue('week');
                Ext.getCmp('weekTime').show();
                Ext.getCmp('hourTime').show();
                Ext.getCmp('minuteTime').show();
                Ext.getCmp('monadHour').show();
                Ext.getCmp('monadWeek').show();
                page.coordinator.frequencyObject.recordCron = 'week';
                _this.setValue(page.coordinator.frequencyObject.recordCron);
                break;
            case 'month':
                me.cronVlue('month');
                Ext.getCmp('dayTime').show();
                Ext.getCmp('hourTime').show();
                Ext.getCmp('minuteTime').show();
                Ext.getCmp('monadHour').show();
                Ext.getCmp('monadMonth').show();
                page.coordinator.frequencyObject.recordCron = 'month';
                _this.setValue(page.coordinator.frequencyObject.recordCron);
                break;
            case 'year':
                me.cronVlue('year');
                Ext.getCmp('monthTime').show();
                Ext.getCmp('dayTime').show();
                Ext.getCmp('hourTime').show();
                Ext.getCmp('minuteTime').show();
                Ext.getCmp('monadHour').show();
                Ext.getCmp('monadYear').show();
                Ext.getCmp('monadMonth').show();
                page.coordinator.frequencyObject.recordCron = 'year';
                _this.setValue(page.coordinator.frequencyObject.recordCron);
                break;
        }
    },

    /** cron 表达式赋值*/
    cronVlue: function (type, value) {
        var page = Map.get(Const.PAGE_OBJECT),
            hours = page.coordinator.frequencyObject.hours,
            day = page.coordinator.frequencyObject.day,
            week = page.coordinator.frequencyObject.week,
            month = page.coordinator.frequencyObject.month,
            year = page.coordinator.frequencyObject.year;

        switch (type) {
            case 'hours':
                page.coordinator.frequency = hours + ' ' + '*' + ' ' + '*' + ' ' + '*' + ' ' + '*';
                break;
            case 'day':
                page.coordinator.frequency = hours + ' ' + day + ' ' + '*' + ' ' + '*' + ' ' + '*';
                break;
            case 'week':
                page.coordinator.frequency = hours + ' ' + day + ' ' + '*' + ' ' + '*' + ' ' + week;
                break;
            case 'month':
                page.coordinator.frequency = hours + ' ' + day + ' ' + month + ' ' + '*' + ' ' + '*';
                break;
            case 'year':
                page.coordinator.frequency = hours + ' ' + day + ' ' + month + ' ' + year + ' ' + '*';
                break;
        }
    },

    /** pege对象 初始化值 */
    InitializeObject: function (page) {
        //  初始化 coordinator对象
        if (!page.coordinator) {
            page.coordinator = {}
        }
        // 初始化：流程名
        if (page.coordinator.name == undefined || page.coordinator.name == '') {
            page.coordinator.name = page.name;
        }
        // 初始化：cron
        if (page.coordinator.frequencyObject == undefined) {
            page.coordinator.frequencyObject = {};
            page.coordinator.frequencyObject.hours = '0';
            page.coordinator.frequencyObject.day = '0';
            page.coordinator.frequencyObject.month = '*';
            page.coordinator.frequencyObject.week = '*';
            page.coordinator.frequencyObject.year = '*';
            page.coordinator.frequencyObject.recordCron = '';
        }
        // 初始化 时 分
        if (page.coordinator.dateFieldStartTimeHours == undefined) {
            page.coordinator.dateFieldStartTimeHours = '00';
        }
        if (page.coordinator.dateFieldStartTimeMinutes == undefined) {
            page.coordinator.dateFieldStartTimeMinutes = '00';
        }
        if (page.coordinator.dateFieldEndTimeHours == undefined) {
            page.coordinator.dateFieldEndTimeHours = '00';
        }
        if (page.coordinator.dateFieldEndTimeMinutes == undefined) {
            page.coordinator.dateFieldEndTimeMinutes = '00';
        }
    },

    /** 获取并更新当前属性 */
    getProperty: function (cell) {
        if (!cell || !Ext.getStore('Data').findRecord('id', cell.style)) return {};
        // 获取新的XML
        var propertyGroups = Ext.clone(Ext.getStore('Data').findRecord('id', new RegExp('^' + cell.style + '$'), 0, true).data.propertyGroups);
        // 获取当前对象
        var options = cell.value.attributes;
        // 替换XML的值
        for (var li = 0; li < propertyGroups.length; li++) {
            var groupsLength = propertyGroups[li].properties.length;
            for (var lc = 0; lc < groupsLength; lc++) {
                var groupsProperty = propertyGroups[li].properties[lc];
                for (var lm = 0; lm < options.length; lm++) {
                    var proProperty = options[lm];
                    if (groupsProperty.id === proProperty.name) {
                        // 当name没有值的时候去与label同步  当label没有值的时候去与name同步
                        if (proProperty.name == 'name') {
                            if (proProperty.nodeValue == '')
                                proProperty.nodeValue = cell.getAttribute('label');
                            else
                                cell.setAttribute('label', proProperty.nodeValue);
                        }
                        groupsProperty.defaultValue = proProperty.nodeValue;
                    }
                }
            }
        }
        return propertyGroups;
    },

    /** 单处理表格列 */
    tableRow: function (properties) {
        var page = Map.get(Const.PAGE_OBJECT),
            // 判断是新建还是已存在
            obj = {};
        page.activeCmp.property.subProperties = properties;
        for (var i = 0; i < properties.length; i++) {
            obj[properties[i].id] = properties[i].defaultValue;
        }
        // 添加条件格式属性
        obj["style"] = [];

        // 添加编辑列属性
        obj["edit"] = Cmp.editCol;

        // 钻取结构模板
        obj["formatter"] = Cmp.tableDrill;

        page.activeCmp.property.subProperty = obj;
    },

    /** 根据类型创建属性框 */
    filterType: function (eachItem) {
        var me = this;
        var displayType = eachItem.displayType;
        switch (displayType) {
            case "combo":
                return me.createCombo(eachItem);
            case "checkbox":
                return me.createCheckBox(eachItem);
            case "defined":
                return me.createDefined(eachItem);
            case "textfield":
                return me.createTextField(eachItem);
            case "textfield_top":
                return me.createTextFieldTop(eachItem);
            case "textfield_input":
                return me.createTextFieldTnput(eachItem);
            case "textarea":
                return me.createTextField(eachItem);
            case "dropList":
                return me.createDropList(eachItem);
            case "displayfield":
                return me.createDisplayField(eachItem);
            case "creatTextArea":
                return me.creatTextArea(eachItem);
            case "textfield_path":
                return me.createField(eachItem);
            case 'textfield_path_add':
                return me.createFieldPaaAdd(eachItem); // 动态参数
            case 'textfield_path_addDynamic':
                return me.createFieldPaaAddDynamic(eachItem); // 静态参数
            case 'textfield_set':
                return me.createConfiGuration(eachItem);
            case 'mainTitle':
                return me.mainTitle(eachItem);
            case 'cellId':
                return me.createFieldCellid(eachItem);
        }
    },

    /** 主要属性 */
    mainTitle: function (eachItem) {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            editor = page.activeEditor,
            model = graph.getModel(),
            cell = graph.getSelectionCell();
        return Ext.create('Ext.panel.Panel', {
            title: eachItem.name,
            xtype: 'panel',
            cls: 'titleFize',
            header: {
                height: 24,
                style: 'background: none;font-size:12px;text-align:center;margin-bottom: 24px;text-indent: 12px;padding-top:10px;',
                border: false
            },
            listeners: {
                afterrender: function (_this, e) {
                    // 更改图标
                    if (eachItem.tip == 'Hive' || eachItem.tip == 'SparkPython' || eachItem.tip == 'SparkScala' || eachItem.tip == 'Shell') {
                        if (cell.getAttribute('displayTaggle') == "false" && eachItem.name == '主要参数') {
                            _this.hide()
                        }
                    }
                }
            }
        })
    },

    /** 回显cell id */
    createFieldCellid: function (eachItem) {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            editor = page.activeEditor,
            model = graph.getModel(),
            cell = graph.getSelectionCell(),
            cellId,
            nameId = eachItem.name + ':';
        // 获取组件id
        if (cell) {
            cellId = cell.id
        }
        // 添加组件模板类型
        if (cell.style == 'Hive' || cell.style == 'SparkPython' || cell.style == 'SparkScala' || cell.style == 'Shell' || cell.style === 'Flink') {
            cell.setAttribute('pattern', 'run')
        }
        return Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            modelValidation: false,
            style: 'margin-top: 4px;',
            items: [{
                xtype: 'panel',
                value: cellId,
                style: "margin-bottom:10px;margin-top:20px",
                html: '<div>' +
                    '<span id="copy_title">' + nameId + '</span>' +
                    '<input  readonly="readonly" type="text" id="copy"  value="' + cellId + '" />' +
                    '<img id="copyImg" alt="复制" src="resources/images/right/copyTile.svg" />' +
                    '</div>',
                listeners: {
                    afterrender: function () {
                        $('#copyImg').click(function () {
                            var e = document.getElementById("copy");
                            e.select(); // 选择对象
                            document.execCommand("Copy"); // 执行浏览器复制命令
                            Ext.Msg.alert('提示', '内容复制成功！', Ext.emptyFn);
                        })
                    }
                }
            }]
        });
    },

    /** 创建路径 */
    createField: function (eachItem) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            leftresource = Ext.getCmp('leftresource').getController(), // 弹框
            pathVale = "", parameterDip = [],
            readOnly = true;
        // 判断是创建 或 删除
        if (eachItem.id == 'mindelprepare' || eachItem.id == 'mincreatprepare') {
            readOnly = false;
        }
        if (eachItem.name == '创建目录' || eachItem.name == '创建文件') {
            readOnly = false;
        }
        return Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            modelValidation: false,
            style: 'margin-top: 4px;',
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: '',
                itemId: eachItem.id,
                style: "margin-bottom:10px",
                emptyText: eachItem.tip,
                readOnly: readOnly,
                hideMode: 'display',
                labelAlign: 'right',
                id: eachItem.id,
                labelWidth: 90,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                value: eachItem.defaultValue,
                listeners: {
                    change: function (_this, e) {
                        // 更新cell属性
                        if (_this.itemId === 'label') {
                            cell.setAttribute('name', _this.getValue());
                        } else if (_this.itemId === 'name') {
                            cell.setAttribute('label', _this.getValue());
                        }
                        var storeValue = Ext.getCmp(eachItem.id).ownerCt.items.items,
                            storeValueArr = [];
                        storeValueArr.push(storeValue[0].lastValue);
                        for (var i = 0; i < storeValue.length; i++) {
                            if (i > 2) {
                                if (storeValue[i].items.items[0].lastValue != '') {
                                    storeValueArr.push(storeValue[i].items.items[0].lastValue)
                                }
                            }
                        }
                        // 跟新值
                        cell.setAttribute(eachItem.id, storeValueArr);
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    }
                }
            }, {
                labelAlign: 'left',
                xtype: 'button',
                width: "20",
                text: '...',
                cls: 'urlCreatInputPath',
                tooltip: '修改',
                style: "background:rgba(74,144,226,1);border-radius:2px;margin:0px 0 0 0px;",
                listeners: {
                    click: function (_this, e) {
                        //  弹框路径
                        if (eachItem.id == 'path') {
                            var openWindow = Ext.create('Ext.window.Window', {
                                title: '请选路径：',
                                height: 360,
                                width: 300,
                                layout: 'fit',
                                items: [{
                                    xtype: 'treepanel',
                                    useArrows: true,                // 节点展开+，-图标全部改为小三角
                                    expanded: true,                 // 默认展开
                                    region: 'west',
                                    width: '50%',
                                    /** 资源树（数据集） */
                                    store: {
                                        root: {                     // 根节点配置
                                            id: "2000", // 根节点ID
                                            expanded: true, // 默认展开
                                            text: "Dip"
                                        },
                                        proxy: {                    // 访问代理
                                            type: 'ajax',           // 类型异步
                                            api: {
                                                read: window.baseURL + 'dip/getDipTree'
                                            }
                                        }
                                    },
                                    /** 监听器 */
                                    listeners: {
                                        itemclick: function (node, record, item, index, e, eOpts) {
                                            var me = this,
                                                pathNameArr = [], filePath = '';

                                            // 递归获取文件路径
                                            function getNodePath(record) {
                                                if (record == null) {
                                                    return false;
                                                }
                                                var obj = record.data;
                                                if (obj.type && !obj.root) { //并且不是根 节点
                                                    pathNameArr.push(obj.type);
                                                }
                                                if (record.parentNode) {
                                                    parentNode1 = record.parentNode;
                                                    getNodePath(parentNode1);
                                                } else {
                                                    return;
                                                }
                                            }

                                            getNodePath(record.parentNode);
                                            if (pathNameArr.length > 0) {
                                                for (var i = pathNameArr.length - 1; i >= 0; i--) {
                                                    filePath += '/' + pathNameArr[i];
                                                }
                                            }
                                            // 创建DIP的对象。
                                            var DIPObj,
                                                graph = page.activeGraph,
                                                cell = graph.getSelectionCell();

                                            // 如果选中的是否叶子节点
                                            if (record.data.leaf) {
                                                DIPObj = {
                                                    id: record.data.id,
                                                    filePath: filePath + '/' + record.data.type,
                                                    cellId: cell.id
                                                };
                                                parameterDip.push(DIPObj);
                                            }
                                        }
                                    }
                                }],
                                buttons: [{
                                    text: '确定',
                                    handler: function () {
                                        var me = this;
                                        graph = page.activeGraph;
                                        cell = graph.getSelectionCell();
                                        if (parameterDip != '') {
                                            for (var i = 0; i < parameterDip.length; i++) {
                                                if (cell.id == parameterDip[i].cellId) {
                                                    Ext.getCmp('path').setValue(parameterDip[i].filePath);
                                                    Ext.getCmp('nodeId').setValue(parameterDip[i].id);
                                                    // 更新cell属性
                                                    cell.setAttribute("path", parameterDip[i].filePath);
                                                    cell.setAttribute("nodeId", parameterDip[i].id);
                                                }
                                            }
                                        }
                                        openWindow.hide();
                                    }
                                }, {
                                    text: '取消',
                                    handler: function (data) {
                                        openWindow.hide();
                                    }
                                }]
                            }).show();
                        } else {
                            var loadUrl = {
                                serverPath: '',
                                jumpPath: '',
                                groupMod: {},
                                radio: false,
                                btnName: 'formReference'
                            };
                            if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                            me.loadUrl(loadUrl, "property", _this.previousSibling());
                        }

                    },
                    afterrender: function (_this, e) {
                        if (cell.getAttribute('displayTaggle') == "false" && eachItem.id == 'mainpath') {
                            _this.ownerCt.hide()
                        }
                    }
                }
            }]
        });
    },

    /** 创建文体 选择文件框 可以多个文本添加删除 静态参数 */
    createFieldPaaAdd: function (eachItem) {
        var me = this,
            sqheight = '',
            readOnly = false,
            labelAlign = 'right',
            selectData = [],
            resize = false,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            value = "";
        if (eachItem.defaultValue != 'cosmonull') {
            value = eachItem.defaultValue;
        }
        if (eachItem.defaultValue.length > 0) {
            value = storeValueArr = eachItem.defaultValue.split(',')[0];
        }
        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            id: eachItem.id + 'Parent',
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: value,
                itemId: eachItem.id,
                id: eachItem.id,
                readOnly: readOnly,
                labelAlign: labelAlign,
                emptyText: eachItem.tip,
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                style: 'border-radius: 10px;',
                listeners: {
                    change: function (_this, e) {
                        me.newProperties(eachItem);
                    }
                }
            }, {
                labelAlign: 'center',
                xtype: 'button',
                width: '18',
                text: '...',
                cls: 'urlCreatInputSet',
                style: "background:rgba(74,144,226,1);border-radius:2px;color",
                tooltip: '修改',
                listeners: {
                    click: function (_this, e) {
                        // 弹框路径
                        var loadUrl = {
                            serverPath: '',
                            jumpPath: '',
                            groupMod: {},
                            radio: false,
                            btnName: 'formReference'
                        };
                        if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                        me.loadUrl(loadUrl, "property", _this.previousSibling());
                    }
                }
            }, {
                text: "+",
                labelAlign: 'left',
                cls: 'urlCreatInputadd',
                items: [
                    new Ext.Button({
                        text: '+',
                        tooltip: '修改',
                        tooltipType: 'title',
                        style: "background:rgba(74,144,226,1);border-radius:2px;color",
                        handler: function () {
                            // 添加组件
                            var filedadd = Ext.create('Ext.form.Panel', {
                                border: false,
                                cls: 'inputss',
                                style: 'margin-top: 8px;',
                                items: [{
                                    height: sqheight,
                                    xtype: 'textfield',
                                    fieldLabel: eachItem.name + ':',
                                    label: eachItem.name,
                                    value: '',
                                    readOnly: readOnly,
                                    labelAlign: labelAlign,
                                    labelWidth: 80,
                                    labelSeparator: '',                          // 去掉laebl中的冒号
                                    enableKeyEvents: true,
                                    listeners: {
                                        change: function (_this, e) {
                                            // 更新cell属性
                                            me.newProperties(eachItem);
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        },
                                        keyup: function (_this, e) {
                                            me.newProperties(eachItem);
                                        }
                                    }
                                }, {
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: '18',
                                    text: '...',
                                    cls: 'urlCreatInputSet',
                                    tooltip: '修改',
                                    style: 'background:rgba(74,144,226,1);border-radius:2px;color',
                                    listeners: {
                                        click: function (_this, e) {
                                            // 弹框路径 参数
                                            var loadUrl = {
                                                serverPath: '',
                                                jumpPath: '',
                                                groupMod: {},
                                                radio: false,
                                                btnName: 'formReference'
                                            };
                                            if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                                            me.loadUrl(loadUrl, "property", _this.previousSibling());
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        }
                                    }
                                }, {
                                    text: '-',
                                    labelAlign: 'left',
                                    cls: 'urlCreatInputItem',
                                    width: 18,
                                    tooltip: '删除',
                                    tooltipType: 'title',
                                    xtype: 'button',
                                    style: 'background:rgba(74,144,226,1);border-radius:2px;color',
                                    handler: function () {
                                        filedadd.destroy();
                                        // 更新cell属性
                                        me.newProperties(eachItem);
                                        $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                        // 文件是否是最新的
                                        Ext.getCmp('centerEdit').getController().newFiled();
                                    }
                                }]
                            })
                            // 添加组件
                            Ext.getCmp(eachItem.id + 'Parent').add(filedadd);
                            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                        }
                    })
                ]
            }],
            listeners: {
                afterrender: function () {
                    var storeValueArr = [];
                    if (eachItem.defaultValue == '') {
                        return false;
                    }
                    storeValueArr = eachItem.defaultValue.split(',');
                    for (var i = 0; i < storeValueArr.length; i++) {
                        if (i > 0) {
                            var filedadd = Ext.create('Ext.form.Panel', {
                                border: false,
                                width: '200',
                                cls: 'inputss',
                                style: 'margin-top: 8px;',
                                items: [{
                                    height: sqheight,
                                    xtype: 'textfield',
                                    fieldLabel: eachItem.name + ':',
                                    label: eachItem.name,
                                    value: storeValueArr[i],
                                    readOnly: readOnly,
                                    labelAlign: labelAlign,
                                    labelWidth: 80,
                                    labelSeparator: '',                          // 去掉laebl中的冒号
                                    enableKeyEvents: true,
                                    listeners: {
                                        change: function (_this, e) {
                                            // 更新cell属性
                                            me.newProperties(eachItem);
                                        }
                                    }
                                }, {
                                    text: '...',
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: 60,
                                    tooltip: '修改',
                                    cls: 'urlCreatInputSet',
                                    listeners: {
                                        click: function (_this, e) {
                                            // 弹框路径
                                            var loadUrl = {
                                                serverPath: '',
                                                jumpPath: '',
                                                groupMod: {},
                                                radio: false,
                                                btnName: 'formReference'
                                            };
                                            if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                                            me.loadUrl(loadUrl, "property", _this.previousSibling());
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        }
                                    }
                                }, {
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: 18,
                                    text: '-',
                                    cls: 'urlCreatInputItem',
                                    tooltip: '删除',
                                    listeners: {
                                        click: function (_this, e) {
                                            _this.ownerCt.destroy();
                                            // 更新cell属性
                                            me.newProperties(eachItem)
                                            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        }
                                    }
                                }]
                            })
                            // 添加
                            Ext.getCmp(eachItem.id + 'Parent').add(filedadd);
                        }
                    }
                }
            }
        });
        return fileText;
    },

    /** 创建文体 选择文件框 可以多个文本添加删除 动态参数 */
    createFieldPaaAddDynamic: function (eachItem) {
        var me = this,
            sqheight = "",
            readOnly = false,
            labelAlign = 'right',
            selectData = [],
            resize = false,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            value = '';

        if (eachItem.defaultValue != "cosmonull") {
            value = eachItem.defaultValue
        }
        if (eachItem.defaultValue.length > 0) {
            value = storeValueArr = eachItem.defaultValue.split(',')[0];
        }
        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            id: eachItem.id + 'Parent',
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: value,
                itemId: eachItem.id,
                id: eachItem.id,
                readOnly: readOnly,
                labelAlign: labelAlign,
                emptyText: eachItem.tip,
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                style: 'border-radius: 10px;',
                listeners: {
                    change: function (_this, e) {
                        me.newProperties(eachItem);
                    }
                }
            }, {
                labelAlign: 'center',
                xtype: 'button',
                width: "18",
                text: '',
                cls: 'urlCreatInputSetWidth',
                style: 'background:rgba(74,144,226,1);border-radius:2px;color',
                tooltip: '修改',
                listeners: {
                    click: function (_this, e) {
                        // 弹框路径
                        var loadUrl = {
                            serverPath: '',
                            jumpPath: '',
                            groupMod: {},
                            radio: false,
                            btnName: 'formReference'
                        };
                        if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                        me.loadUrl(loadUrl, "property", _this.previousSibling());
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    }
                }
            }, {
                text: '+',
                labelAlign: 'left',
                cls: 'urlCreatInputSet',
                items: [
                    new Ext.Button({
                        text: '+',
                        tooltip: '修改',
                        tooltipType: 'title',
                        style: 'background:rgba(74,144,226,1);border-radius:2px;color',
                        handler: function () {
                            // 添加组件
                            var filedadd = Ext.create('Ext.form.Panel', {
                                border: false,
                                cls: 'inputss',
                                style: 'margin-top: 8px;',
                                items: [{
                                    height: sqheight,
                                    xtype: 'textfield',
                                    fieldLabel: eachItem.name + ':',
                                    label: eachItem.name,
                                    value: '',
                                    readOnly: readOnly,
                                    labelAlign: labelAlign,
                                    labelWidth: 80,
                                    labelSeparator: '',                          // 去掉laebl中的冒号
                                    enableKeyEvents: true,
                                    listeners: {
                                        change: function (_this, e) {
                                            // 更新cell属性
                                            me.newProperties(eachItem);
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        },
                                        keyup: function (_this, e) {
                                            me.newProperties(eachItem);
                                        }
                                    }
                                }, {
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: "18",
                                    text: '',
                                    cls: 'urlCreatInputSetWidth',
                                    tooltip: '修改',
                                    style: "background:rgba(74,144,226,1);border-radius:2px;color",
                                    listeners: {
                                        click: function (_this, e) {
                                            // 弹框路径 参数
                                            var loadUrl = {
                                                serverPath: '',
                                                jumpPath: '',
                                                groupMod: {},
                                                radio: false,
                                                btnName: 'formReference'
                                            };
                                            if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                                            me.loadUrl(loadUrl, "property", _this.previousSibling());
                                        }
                                    }
                                }, {
                                    text: '-',
                                    labelAlign: 'left',
                                    cls: 'urlCreatInputSet',
                                    width: 18,
                                    tooltip: '删除',
                                    tooltipType: 'title',
                                    xtype: 'button',
                                    style: "background:rgba(74,144,226,1);border-radius:2px;color",
                                    handler: function () {
                                        filedadd.destroy();
                                        // 更新cell属性
                                        me.newProperties(eachItem)
                                        $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                        // 文件是否是最新的
                                        Ext.getCmp('centerEdit').getController().newFiled();
                                    }
                                }]
                            })
                            // 添加
                            Ext.getCmp(eachItem.id + 'Parent').add(filedadd);
                            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                        }
                    })
                ]
            }],
            listeners: {
                afterrender: function () {
                    var storeValueArr = [];
                    if (eachItem.defaultValue == '') {
                        return false;
                    }
                    storeValueArr = eachItem.defaultValue.split(',')
                    for (var i = 0; i < storeValueArr.length; i++) {
                        if (i > 0) {
                            var filedadd = Ext.create('Ext.form.Panel', {
                                border: false,
                                width: '200',
                                cls: 'inputss',
                                style: 'margin-top: 8px;',
                                items: [{
                                    xtype: 'textfield',
                                    fieldLabel: eachItem.name + ':',
                                    label: eachItem.name,
                                    value: storeValueArr[i],
                                    readOnly: readOnly,
                                    labelAlign: labelAlign,
                                    labelWidth: 80,
                                    labelSeparator: '',                          // 去掉laebl中的冒号
                                    enableKeyEvents: true,
                                    listeners: {
                                        change: function (_this, e) {
                                            // 更新cell属性
                                            me.newProperties(eachItem);
                                        }
                                    }
                                }, {
                                    text: '',
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: 60,
                                    tooltip: '修改',
                                    cls: 'urlCreatInputSetWidth',
                                    listeners: {
                                        click: function (_this, e) {
                                            // 弹框路径
                                            var loadUrl = {
                                                serverPath: '',
                                                jumpPath: '',
                                                groupMod: {},
                                                radio: false,
                                                btnName: 'formReference'
                                            };
                                            if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                                            me.loadUrl(loadUrl, "property", _this.previousSibling());
                                        }
                                    }
                                }, {
                                    labelAlign: 'left',
                                    xtype: 'button',
                                    width: 18,
                                    text: '-',
                                    cls: 'urlCreatInputSet',
                                    tooltip: '删除',
                                    listeners: {
                                        click: function (_this, e) {
                                            _this.ownerCt.destroy();
                                            // 更新cell属性
                                            me.newProperties(eachItem)
                                            $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        }
                                    }
                                }]
                            })
                            // 添加
                            Ext.getCmp(eachItem.id + 'Parent').add(filedadd);
                        }
                    }
                }
            }
        });
        return fileText;
    },

    /** 更新属性 多个文件 */
    newProperties: function (eachItem) {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            storeValue = Ext.getCmp(eachItem.id + 'Parent').items.items,
            storeValueArr = [];

        storeValueArr.push(storeValue[0].lastValue);
        for (var i = 0; i < storeValue.length; i++) {
            if (i > 2) {
                if (storeValue[i].items.items[0].lastValue != '') {
                    storeValueArr.push(storeValue[i].items.items[0].lastValue);
                }
            }
        }
        // 跟新值
        cell.setAttribute(eachItem.id, storeValueArr);
    },

    /** 跟新属性 page页面多个属性 */
    createNewProperties: function () {
        var page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            storeValue = Ext.getCmp('createDynamicParams').items.items,
            storeValueArr = [];

        storeValueArr.push(storeValue[0].lastValue);
        for (var i = 0; i < storeValue.length; i++) {
            if (i > 1) {
                if (storeValue[i].items.items[0].lastValue != '') {
                    storeValueArr.push(storeValue[i].items.items[0].lastValue);
                }
            }
        }
        // 跟新值
        page.coordinator.dynamicParams = storeValueArr;
    },

    /** 创建配置框 */
    createConfiGuration: function (eachItem) {
        var me = this,
            resize = false,
            newData = [],
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell();

        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            id: eachItem.id + 'parens',
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: '',
                itemId: eachItem.id,
                id: eachItem.id,
                readOnly: false,
                emptyText: eachItem.tip,
                labelAlign: 'right',
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true
            }, {
                labelAlign: 'left',
                cls: 'urlCreatInputSet',
                items: [
                    new Ext.Button({
                        text: '...',
                        tooltip: '添加',
                        tooltipType: 'title',
                        style: "background:rgba(74,144,226,1);border-radius:2px;",
                        handler: function () {
                            // 选中数组
                            var checkoutAll = [];
                            if (Ext.getCmp('createPopout')) {
                                Ext.getCmp('createPopout').destroy();
                            }

                            // 弹框
                            var createPopout = Ext.create('Ext.window.Window', {
                                bodyPadding: 10,
                                width: 600,
                                height: 400,
                                id: 'createPopout',
                                title: '配置',
                                style: 'background:#fff !important',
                                renderTo: Ext.getBody()
                            }).show();
                            // 编辑函数
                            var editFn = function (grid, rowIndex, colIndex) {
                                var loadUrl = {
                                    serverPath: '',
                                    jumpPath: '',
                                    groupMod: {},
                                    radio: false,
                                    btnName: 'formReference'
                                };
                                if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                                var GridPanelSetPanel = Ext.getCmp('GridPanelSet');
                                GridPanelSetPanel.store.reload();
                                var paramsData = [GridPanelSetPanel.getSelectionModel().store.config.data[rowIndex], GridPanelSetPanel];
                                me.loadUrl(loadUrl, "property", paramsData);
                            };

                            // 定义列
                            var columns = [{
                                xtype: 'rownumberer'
                            }, {
                                header: 'name',
                                dataIndex: 'name',
                                width: 80,
                                editor: {
                                    allowBlank: true
                                }
                            }, {
                                header: 'value',
                                dataIndex: 'value',
                                width: 112,
                                style: 'width:100px !important',
                                editor: {
                                    allowBlank: true
                                }
                            }];
                            if (cell.style == "Flink") {
                                // 定义列
                                var columns = [{
                                    xtype: 'rownumberer'
                                }, {
                                    header: 'name',
                                    dataIndex: 'name',
                                    flex: 1,
                                    editor: {
                                        allowBlank: true
                                    }
                                }, {
                                    header: 'value',
                                    dataIndex: 'value',
                                    flex: 1,
                                    editor: {
                                        allowBlank: true
                                    }
                                }, {
                                    text: '操作', dataIndex: 'operation', width: 60, align: 'center', menuDisabled: true,
                                    xtype: 'actioncolumn',
                                    flex: 1,
                                    items: [{
                                        iconCls: 'cosmo_icon mon_delete model', // 指定图标
                                        tooltip: '编辑',
                                        text: '编辑',
                                        style: 'margin:5px',
                                        handler: editFn
                                    }]
                                }];

                            }

                            // 定义数据
                            var copyData = [];
                            // 如果有默认属性先读取默认值
                            if (eachItem.value) {
                                copyData = eachItem.value;
                            }
                            if (cell.getAttribute(eachItem.id)) {
                                copyData = JSON.parse(cell.getAttribute(eachItem.id));
                            }
                            Ext.create('Ext.data.Store', {
                                storeId: 'setStore',
                                fields: ['name', 'value',],
                                data: copyData || []
                            });
                            // 创建表格
                            var grid = new Ext.grid.GridPanel({
                                width: 550,
                                autoHeight: true,
                                store: Ext.data.StoreManager.lookup('setStore'),
                                id: 'GridPanelSet',
                                columns: columns,         // 显示列
                                sortableColumns: false,   // 取消排序
                                sortable: false,
                                stripeRows: true,         // 斑马线效果
                                selType: 'checkboxmodel', // 复选框
                                fields: ['name', 'value'],
                                forceFit: true,
                                plugins: [
                                    Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1   // 设置单击单元格编辑
                                    })
                                ],
                                listeners: {},
                                tbar: [{
                                    text: '添加一行',
                                    handler: function (_this) {
                                        var rec = {name: '', value: ''},
                                            GridPanelSetPanel = Ext.getCmp('GridPanelSet');
                                        GridPanelSetPanel.store.insert(grid.store.getCount(), rec);
                                        GridPanelSetPanel.getSelectionModel().store.config.data.push(rec);
                                    }
                                }, '-', {
                                    text: '删除',
                                    handler: function () {
                                        var records = Ext.getCmp('GridPanelSet').getSelectionModel().getSelection();
                                        Ext.each(records, function (record) {
                                            // 先通过ajax从后台删除数据，删除成功后再从页面删除数据
                                            Ext.getCmp('GridPanelSet').store.remove(record);
                                            // 删除数据
                                            var newDataArr = Ext.getCmp('GridPanelSet').getSelectionModel().store.config.data
                                            for (var i = 0; i < records.length; i++) {
                                                for (var j = 0; j < newDataArr.length; j++) {
                                                    if (records[i].data.id.split('-')[1] == newDataArr[j].id.split('-')[1]) {
                                                        newDataArr.splice(j, 1)
                                                    }
                                                }
                                            }
                                            // 保存
                                            var newDataSet = [],
                                                data = Ext.getCmp('GridPanelSet').getSelectionModel().store.sorters.$sortable.items
                                            for (var i = 0; i < data.length; i++) {
                                                var objectSet = {}
                                                if (data[i].data.name && data[i].data.value) {
                                                    objectSet.name = data[i].data.name;
                                                    objectSet.value = data[i].data.value;
                                                    newDataSet.push(objectSet);
                                                }
                                            }
                                            newDataSet = JSON.stringify(newDataSet);
                                            // 存值
                                            cell.setAttribute(eachItem.id, newDataSet);
                                            // 文件是否是最新的
                                            Ext.getCmp('centerEdit').getController().newFiled();
                                        })
                                    }
                                }, '-', {
                                    text: '保存',
                                    handler: function (_this) {
                                        var newDataSet = [],
                                            data = Ext.getCmp('GridPanelSet').getSelectionModel().store.sorters.$sortable.items;
                                        for (var i = 0; i < data.length; i++) {
                                            var objectSet = {}
                                            if (data[i].data.name && data[i].data.value) {
                                                objectSet.name = data[i].data.name;
                                                objectSet.value = data[i].data.value;
                                                newDataSet.push(objectSet);
                                            }
                                        }
                                        newDataSet = JSON.stringify(newDataSet);
                                        // 存值
                                        cell.setAttribute(eachItem.id, newDataSet);
                                        // 更新面板数据
                                        Ext.getCmp('createPopout').destroy();
                                        // 文件是否是最新的
                                        Ext.getCmp('centerEdit').getController().newFiled();

                                    }
                                }]
                            });
                            Ext.getCmp('createPopout').add(grid);
                        }
                    })
                ]
            }]
        });
        return fileText;
    },

    /** 创建下拉组件 */
    createCombo: function (eachItem) {
        var me = this,
            labelAlign = 'right';
        if (eachItem.id == "cls") {
            //去除重复的类名
            var oldComboData = Ext.getCmp('centerTool').getController().comboData,
                newComboData = [];// 新数组
            for (var i = 0; i < oldComboData.length; i++) {
                var flag = true;
                for (var j = 0; j < newComboData.length; j++) {
                    if (oldComboData[i].key == newComboData[j].key) {
                        flag = false;
                    }
                }
                if (flag) newComboData.push(oldComboData[i]);
            }
            var comboStore = Ext.create('Ext.data.Store', {
                fields: ['key', 'value'],
                data: newComboData
            });
        } else {
            var comboStore = new Ext.data.SimpleStore({
                fields: ['key', 'value'],
                data: eachItem.value
            });
        }

        return Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            items: [{
                xtype: "combo",
                labelAlign: labelAlign,
                labelWidth: 80,
                labelSeparator: '',                    // 去掉laebl中的冒号
                bodyPadding: '0px',
                bodyStyle: 'border:none!important;margin:0px;',
                itemId: eachItem.id,
                style: 'padding: 0 9px;',
                width: '93%',
                border: false,
                store: comboStore,
                queryMode: 'local',
                fieldLabel: eachItem.name + ':',
                triggerAction: 'all',
                lazyRender: true,
                selectOnFocus: true,
                allowBlank: true,
                mode: 'local',
                typeAhead: false,
                editable: true,        //不加搜索改为false
                emptyText: '请选择',
                forceSelection: true,
                valueField: 'key', // option.value
                displayField: 'value', // option.text
                value: eachItem.defaultValue,
                listeners: {
                    select: function (dom, newVal, oldVal) {
                        var page = Map.get(Const.PAGE_OBJECT),
                            graph = page.activeGraph,
                            cell = graph.getSelectionCell();
                        // 更新cell属性
                        cell.setAttribute(dom.itemId, dom.getValue());
                    }
                }
            }]
        })
    },

    /** 创建分组名称下拉框方法 */
    createGroupCombo: function (eachItem) {
        var me = this,
            labelAlign = 'right',
            page = Map.get(Const.PAGE_OBJECT);

        if (jQuery.isEmptyObject(page.store)) {
            page.store = {
                fields: ['group'],
                data: []
            };
            if (!jQuery.isEmptyObject(page.group)) {
                for (var group in page.group) {
                    page.store.data.push({group: group});
                }
            }
        }

        return Ext.create('Ext.form.FieldSet', {
            border: false,
            margin: 0,
            padding: 0,
            items: [{
                xtype: "combo",
                labelAlign: labelAlign,
                labelWidth: 80,
                labelSeparator: '',                    // 去掉laebl中的冒号
                bodyPadding: '0px',
                bodyStyle: 'border:none!important;margin:0px;',
                itemId: eachItem.id,
                style: 'padding: 0 9px;',
                width: '93%',
                border: false,
                store: page.store,
                queryMode: 'local',
                fieldLabel: eachItem.name + ':',
                triggerAction: 'all',
                lazyRender: true,
                allowBlank: true,
                mode: 'local',
                typeAhead: false,
                editable: true,
                emptyText: '分组名称',
                forceSelection: true,
                valueField: 'group',
                displayField: 'group',
                value: eachItem.defaultValue,
                listeners: {
                    afterrender: function (obj) {
                        obj.tip = Ext.create('Ext.tip.ToolTip', {
                            target: obj.getEl().getAttribute('id'),
                            trackMouse: true,
                            html: me.tooltipStyle(eachItem.tip)
                        });
                    },
                    change: function (dom, newVal, oldVal) {
                        me.changeCombo(oldVal, newVal, dom.itemId);
                        if (newVal) {
                            if (!page.group[newVal] || page.group[newVal].length < 0)
                                page.group[newVal] = [];
                            if (page.group[newVal].length > 0) {
                                if (page.activeCmp.type != page.group[newVal][0].type) {
                                    Ext.Msg.show({
                                        title: '警告',
                                        msg: '元件类型不符合当前分组类型，请选择相同类型的元件加入此分组！',
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR      //注意此处为ERROR
                                    });
                                    this.setValue('');
                                    this.getEl().focus();
                                    return false;
                                }
                            }
                            // 当前分组已有不添加
                            if (jQuery.inArray({group: newVal, id: page.activeCmp.id}, page.store.data) < 0) {
                                for (var obj in page.group) {
                                    page.group[obj].forEach(function (o, i) {
                                        if (o.id === page.activeCmp.id) page.group[obj].splice(i, 1);
                                    });
                                }
                                page.group[newVal].push({
                                    group: newVal,
                                    id: page.activeCmp.id,
                                    type: page.activeCmp.type
                                });
                            }
                            page.items[page.activeCmp.id].property.group = newVal;
                        } else {
                            for (var obj in page.group) {
                                page.group[obj].forEach(function (o, i) {
                                    if (o.id === page.activeCmp.id) page.group[obj].splice(i, 1);
                                });
                            }
                            page.items[page.activeCmp.id].property.group = '';
                        }
                        // 刷新元素
                        Ext.getCmp('pageElement').getController().loadElement();
                    },
                    select: function (dom, key) {
                        if (dom.itemId == 'event' && key.data.value != '更多事件>>>') {
                            var newVal = key.data.key,
                                title = key.data.value;
                            me.eventKey = key.data.key
                            this.setValue(" ");
                            this.setEmptyText("更多事件>>>");
                            // 清空原配置项
                            me.eventCon = {};
                            me.eventPage(newVal, title);
                        }
                    },
                    blur: function (_this, event, eOpts) {
                        if (_this.lastQuery) {
                            if (!_this.getStore().findRecord('group', _this.lastQuery)) {
                                page.store.data.push({group: _this.lastQuery});
                                _this.setStore(page.store);
                                _this.setValue(_this.lastQuery);
                            }
                        } else {
                            for (var obj in page.group) {
                                page.group[obj].forEach(function (o, i) {
                                    if (o.id === page.activeCmp.id) page.group[obj].splice(i, 1);
                                });
                            }
                            _this.lastQuery = '';
                        }
                    }
                }
            }]
        })
    },

    /** textarea随输入文字高度变化 */
    autoTextarea: function f(elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
            isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
            addEvent = function (type, callback) {
                elem.addEventListener ?
                    elem.addEventListener(type, callback, false) :
                    elem.attachEvent('on' + type, callback);
            },
            getStyle = elem.currentStyle ? function (name) {
                var val = elem.currentStyle[name];
                if (name === 'height' && val.search(/px/i) !== 1) {
                    var rect = elem.getBoundingClientRect();
                    return rect.bottom - rect.top -
                        parseFloat(getStyle('paddingTop')) -
                        parseFloat(getStyle('paddingBottom')) + 'px';
                }
                return val;
            } : function (name) {
                return getComputedStyle(elem, null)[name];
            },
            minHeight = parseFloat(getStyle('height'));
        elem.style.resize = 'none';
        var change = function () {
            var scrollTop, height,
                padding = 0,
                style = elem.style;
            if (elem._length === elem.value.length) return;
            elem._length = elem.value.length;
            if (!isFirefox && !isOpera) {
                padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
            }
            scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            elem.style.height = minHeight + 'px';
            if (elem.scrollHeight > minHeight) {
                if (maxHeight && elem.scrollHeight > maxHeight) {
                    height = maxHeight - padding;
                    style.overflowY = 'auto';
                } else {
                    height = elem.scrollHeight - padding;
                    style.overflowY = 'hidden';
                }
                style.height = height + extra + 'px';
                scrollTop += parseInt(style.height) - elem.currHeight;
                document.body.scrollTop = scrollTop;
                document.documentElement.scrollTop = scrollTop;
                elem.currHeight = parseInt(style.height);
            }
        };
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
    },

    /** 创建复选框组件 */
    createCheckBox: function (eachItem) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            value = '';
        if (eachItem.defaultValue != "cosmonull") {
            value = eachItem.defaultValue;
        }
        // 默认 子流程是否启用配置传递 fasle
        if (cell.getAttribute(eachItem.id) === undefined && eachItem.id === 'isPropagateConfig') {
            cell.setAttribute(eachItem.id, true);
            value = 'true';
        }
        return Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                width: '93%',
                style: 'padding-left: 60px',
                xtype: eachItem.displayType,
                itemId: eachItem.id,
                boxLabel: eachItem.name,
                labelAlign: '',
                id: eachItem.id,
                label: eachItem.name,
                value: value,
                cls: "rightCheckbox",
                listeners: {
                    change: function (dom, newVal, oldVal) {
                        // 设置属性到cell上
                        cell.setAttribute(dom.itemId, newVal);
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this, e) {
                        if (cell.getAttribute('displayTaggleFlink') == "false") {
                            if (eachItem.id == 'isFlowStart') {
                                _this.hide();
                            }
                        }
                    }
                }
            }]
        });
    },

    /** 当displayType=defined时创建该组件 */
    createDefined: function (eachItem) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            labelAlign = 'right',
            value = '',
            serverPath = '',
            item = {};
        if (page.items && page.items[graph.getSelectionCell().id]) item = page.items[graph.getSelectionCell().id];
        if (item && item.formReference) {
            if (typeof item.formReference == 'string') {
                serverPath = JSON.parse(item.formReference).serverPath;
            } else if (typeof item == 'object') {
                serverPath = item.formReference.serverPath;
            }
        }
        if (eachItem.defaultValue != 'cosmonull') {
            value = eachItem.id == 'formReference' ? serverPath : eachItem.defaultValue;
        }
        if (eachItem.id == 'conditionExpression') value = graph.getSelectionCell().getAttribute('conditionExpression', '').replace(/^(\$\{)/, '').replace(/\}$/, '');
        var field = Ext.create('Ext.form.FieldSet', {
            border: false,
            layout: 'column',
            style: 'width:93%;padding: 0 9px;',
            bodyStyle: 'padding: 0 9px;',
            border: false,
            items: [{
                xtype: 'textfield',
                columnWidth: ".825",
                fieldLabel: eachItem.name + ':',
                labelWidth: 80,
                labelAlign: labelAlign,
                value: value,
                itemId: eachItem.id,
                cls: "loadUrl",
                labelSeparator: '',
                readOnly: true,
                id: 'dbpath' + eachItem.id,
                listeners: {
                    change: function (node, value) {
                        eachItem.defaultValue = value;
                    }
                }
            }, {
                xtype: 'button',
                columnWidth: '.1',
                text: '...',
                style: 'line-height: 12px;height: 22px;',
                cls: 'loadUrlButton ',
                handler: function () {
                    var page = Map.get(Const.PAGE_OBJECT),
                        graph = page.activeGraph,
                        cell = graph.getSelectionCell();

                    function loadRrlFun(name) {
                        var loadUrl = {
                            serverPath: '',
                            jumpPath: '',
                            groupMod: {},
                            radio: false,
                            btnName: name
                        };
                        if (page.items && page.items[cell.id] && page.items[cell.id].formReference) loadUrl = page.items[cell.id].formReference;
                        if (typeof loadUrl == 'string') loadUrl = JSON.parse(loadUrl);
                        me.loadUrl(loadUrl, "property", eachItem);
                    }

                    if (page.activeGraph.getSelectionCell()) {
                        switch (eachItem.id) {
                            case "dueDate":
                                me.timerWindow();
                                break;
                            default:
                                loadRrlFun(eachItem.id)
                        }
                    }
                },
                change: function () {
                    // 文件是否是最新的
                    Ext.getCmp('centerEdit').getController().newFiled();
                }
            }]
        });
        return field;
    },

    /** 当displayType=textfield时创建该组件 */
    createTextField: function (eachItem) {
        var me = this,
            readOnly = false,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            labelAlign = 'right',
            resize = false,
            value = '';

        if (eachItem.id == 'nodeId' || eachItem.id == 'appPath') {
            readOnly = true;
        }

        if (eachItem.defaultValue != 'cosmonull') {
            value = eachItem.defaultValue

        }
        if (eachItem.id == 'appPath') {
            // 判断存值
            var nodeSubfileArrs = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.node.memo;
            if (nodeSubfileArrs != '') {
                cell.setAttribute('noidArr', nodeSubfileArrs)
            }
            // 文件路径
            if (eachItem.defaultValue.length > 0) {
                value = eachItem.defaultValue;
                cell.setAttribute(eachItem.id, value);
            } else {
                value = Ext.getCmp('leftresource').getController().getView().getSelectionModel().getSelection()[0].data.node.path;
                cell.setAttribute(eachItem.id, value);
            }

        }
        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: value,
                itemId: eachItem.id,
                id: eachItem.id,
                readOnly: readOnly,
                emptyText: eachItem.tip,
                labelAlign: labelAlign,
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                listeners: {
                    keyup: function (_this, e) {
                        // 更新cell属性
                        cell.setAttribute(_this.itemId, _this.getValue());
                        if (_this.itemId == 'label') {
                            cell.setAttribute('name', _this.getValue());
                        } else if (_this.itemId == 'name') {
                            cell.setAttribute('label', _this.getValue());
                        }
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    change: function (_this) {
                        // 更新cell属性
                        cell.setAttribute(_this.itemId, _this.getValue());
                        if (_this.itemId == 'ComName') {
                            cell.setAttribute('label', _this.getValue());
                        }
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    },
                    afterrender: function (_this, e) {
                        if (cell.getAttribute('displayTaggleFlink') == "false") {
                            if (eachItem.id == 'yarnContainerCount' || eachItem.id == 'jobManagerRam' || eachItem.id == 'taskManagerRam') {
                                _this.ownerCt.hide();
                            }
                        }
                    },
                    blur: function () {
                        graph.refresh(cell);
                    }
                }
            }]
        });
        return fileText;
    },

    createTextFieldTop: function (eachItem) {
        var me = this,
            readOnly = false,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell();

        if (eachItem.id == 'nodeId') {
            readOnly = true;
        }
        var labelAlign = 'right',
            resize = false,
            value = '';

        if (eachItem.defaultValue != 'cosmonull') {
            value = eachItem.defaultValue;
        }
        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                xtype: 'panel',
                html: eachItem.name,
                style: 'width:150px;margin-left:60px'
            }, {
                width: '210px',
                xtype: 'textfield',
                fieldLabel: '',
                label: '',
                value: value,
                itemId: eachItem.id,
                id: eachItem.id,
                readOnly: readOnly,
                labelAlign: labelAlign,
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                listeners: {
                    keyup: function (_this, e) {
                        // 更新cell属性
                        cell.setAttribute(_this.itemId, _this.getValue());
                        if (_this.itemId == 'label') {
                            cell.setAttribute('name', _this.getValue());
                        } else if (_this.itemId == 'name') {
                            cell.setAttribute('label', _this.getValue());
                        }
                    },
                    afterrender: function (_this, e) {
                        if (cell.getAttribute('displayTaggleFlink') == 'false') {
                            if (eachItem.id == 'yarnContainerCount' || eachItem.id == 'jobManagerRam' || eachItem.id == 'taskManagerRam') {
                                _this.ownerCt.hide();
                            }

                        }
                    }
                }
            }]
        });
        return fileText;
    },

    /** 当displayType=textfield时创建该组件 */
    createTextFieldTnput: function (eachItem) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            graph = page.activeGraph,
            cell = graph.getSelectionCell(),
            value = '';

        if (eachItem.defaultValue != 'cosmonull') {
            value = eachItem.defaultValue;
        }
        var fileText = Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                xtype: 'textfield',
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: value,
                itemId: eachItem.id,
                id: eachItem.id,
                emptyText: eachItem.tip,
                labelAlign: 'right',
                labelWidth: 80,
                labelSeparator: '',                          // 去掉laebl中的冒号
                enableKeyEvents: true,
                cls: 'textfieldinput',
                listeners: {
                    keyup: function (_this, e) {
                        // 更新cell属性
                        cell.setAttribute(_this.itemId, _this.getValue());
                        if (_this.itemId == 'label') {
                            cell.setAttribute('name', _this.getValue());
                        } else if (_this.itemId == 'name') {
                            cell.setAttribute('label', _this.getValue());
                        }
                        // 文件是否是最新的
                        Ext.getCmp('centerEdit').getController().newFiled();
                    }
                }
            }]
        });
        return fileText;
    },

    /** 创建多行文本框 */
    creatTextArea: function (eachItem) {
        var me = this;
        return Ext.create('Ext.form.FieldSet', {
            border: false,
            id: eachItem.id,
            overflowX: 'hidden',
            margin: 0,
            bodyStyle: 'background:rgba(245,245,245,1);overflow:auto;overflow-x: hidden;',
            padding: 0,
            cls: 'textareaStyle',
            html: "<div style='vertical-align: top;overflow-x: hidden;margin-bottom: 10px;'>" +
                "<span class='textareaClassSapn' >" + eachItem.name + ':' + "</span>" +
                "<textarea class='textareaClass'  id='" + eachItem.id + "' cols='17' rows='1'>" + eachItem.defaultValue + "</textarea>" +
                "</div>",
            listeners: {
                render: function () {
                    $("#topPanel-body").css("height", "100% !important");
                },
                afterrender: function (eachItem) {
                    var page = Map.get(Const.PAGE_OBJECT),
                        graph = page.activeGraph,
                        cell = graph.getSelectionCell(),
                        isRight = false,
                        area = document.getElementById(eachItem.id);

                    $(".textareaClass").on("keyup", function (e) {
                        e.stopPropagation();
                        cell.setAttribute($(this).attr("id"), $(this).val());
                        // textarea 高度随内容多少改变
                        me.autoTextarea(this);
                        $('#rightProperty-body>div>div>div').getNiceScroll().resize();
                    })

                    area.onmousedown = function (event) {
                        event = window.event || event;
                        if (event.button == 2) {
                            isRight = true;
                        }
                    };

                    area.onpaste = function () {
                        if (isRight == true) {
                            setTimeout(function () {
                                cell.setAttribute(eachItem.id, $('.textareaClass').val());
                            }, 100)
                        }
                    }
                }
            }
        })
    },

    /** 当displayType=displayField时创建该组件 */
    createDisplayField: function (eachItem) {
        var me = this,
            readOnly = false,
            page = Map.get(Const.PAGE_OBJECT);

        if (eachItem.id == 'marking') {
            eachItem.defaultValue = page.activeCmp.marking;
        }
        if (eachItem.id == 'cmpType') {
            readOnly = true;
        }
        return Ext.create('Ext.form.FieldSet', {
            border: false,
            items: [{
                width: '93%',
                xtype: eachItem.displayType,
                fieldLabel: eachItem.name + ':',
                label: eachItem.name,
                value: eachItem.defaultValue,
                itemId: eachItem.id,
                readOnly: readOnly,
                labelAlign: 'right',
                labelWidth: 80,
                labelSeparator: '',                           // 去掉laebl中的冒号
                listeners: {}
            }],
            listeners: {
                afterrender: function (obj) {
                    obj.tip = Ext.create('Ext.tip.ToolTip', {
                        target: obj.getEl().getAttribute("id"),
                        trackMouse: true,
                        html: me.tooltipStyle(eachItem.tip)
                    });
                }
            }
        });
    },

    /** 表单引用 */
    loadUrl: function (loadUrl, type, dome) {
        var me = this,
            page = Map.get(Const.PAGE_OBJECT),
            loadMask = '', //遮罩层
            serverPath = loadUrl.serverPath,
            urlParam = '';

        if (serverPath.indexOf('objpath') != -1 && serverPath.indexOf('http') == -1) {
            if (serverPath.indexOf('&ParamPair=') != -1) {
                loadUrl.jumpPath = serverPath.split('&ParamPair=')[0].replace('objpath=', '');
                urlParam = serverPath.split('&ParamPair=')[1];
            } else {
                // 不带参数
                loadUrl.jumpPath = serverPath.replace('objpath=', '');
            }
        } else {
            loadUrl.jumpPath = '';
        }
        if (urlParam.indexOf('@@') == -1) {
            loadUrl.groupMod.param0 = {
                name: urlParam.split('==')[0],
                value: urlParam.split('==')[1]
            };
        } else {
            var splitParam = urlParam.split('@@')
            for (var c = 0; c < splitParam.length; c++) {
                loadUrl.groupMod['param' + c] = {
                    name: splitParam[c].split('==')[0],
                    value: splitParam[c].split('==')[1]
                }
            }
        }
        // 拿到本弹窗配置项
        var recordPath, cellPath = [],
            recordId, loadUrlWindow;
        me.loadContent = Ext.clone(loadUrl);
        if (Ext.getCmp('loadUrl') == null || Ext.getCmp('loadUrl') == undefined) {
            loadUrlWindow = Ext.create('Ext.window.Window', {
                title: '选择文件路径',
                id: 'loadUrl',
                width: '1000px',
                height: '600px',
                closable: true,
                modal: true, //显示遮罩
                autoScroll: false,
                layout: 'fit',
                header: {
                    height: 22,
                    style: 'padding:1px 5px;background-image: linear-gradient(-180deg, #eee 0%, #ddd 100%);border-radius:5px 5px 0px 0px;',
                    border: false
                },
                items: [{
                    xtype: 'panel',
                    layout: 'border',
                    id: 'maskLoad',
                    autoScroll: false,
                    items: [{
                        id: 'treeUrl',
                        cls: 'treeUrlAlert',
                        xtype: 'treepanel',
                        useArrows: true,                // 节点展开+，-图标全部改为小三角
                        expanded: true,                 // 默认展开
                        region: 'west',
                        width: '20%',
                        autoScroll: true,
                        style: 'background: #fff;',
                        /** 资源树（数据集） */
                        store: {
                            storeId: 'Resources',       // 数据集ID
                            root: {                     // 根节点配置
                                id: '/',                // 根节点ID
                                expanded: true,         // 默认展开
                                text: '/'      // 根节点名称
                            },
                            proxy: {                    // 访问代理
                                type: 'ajax',           // 类型异步
                                api: {
                                    read: window.baseURL + 'hdfs/getDirectoryFromHdfs'
                                }
                            }
                        },
                        /** 监听器 */
                        listeners: {
                            render: function () {
                                $('#treeUrl-body>div').niceScroll({
                                    autohidemode: 'leave',
                                    cursorborder: '0px solid rgb(197, 197, 197)',
                                    cursorcolor: 'rgb(197, 197, 197)'
                                });
                            },
                            itemdblclick: function (node, record) {
                                var treeID = record.data.id;
                                Ext.getCmp('zhang').setValue(treeID)
                                // 获取数据
                                me.getData(treeID, dome) //
                            },
                            itemclick: function (node, record) {
                                var page = Map.get(Const.PAGE_OBJECT),
                                    graph = page.activeGraph,
                                    cell = graph.getSelectionCell();
                                recordPathArr = {
                                    path: record.data.id,
                                    cellId: cell.id,
                                    btnName: me.loadContent.btnName
                                };
                                cellPath.push(recordPathArr)
                            }
                        }
                    }, {
                        layout: {
                            type: 'border',         //垂直分布
                            align: 'stretch'        //拉伸使其充满整个容器
                        },
                        region: 'west',
                        width: '80%',
                        height: '90%',
                        border: false,
                        bodyBorder: false,
                        id: 'parameterListId',
                        style: 'margin-left: 2px;border-left: 1px solid #b5afaf;',
                        items: [{
                            region: 'center',
                            layout: {
                                type: 'border',         //垂直分布
                                align: 'stretch',
                                height: 30,
                                width: '100%'       //拉伸使其充满整个容器
                            },
                            border: false,
                            bodyBorder: false,
                            items: [{
                                xtype: 'panel',
                                region: 'north',
                                height: 40,
                                border: false,
                                bodyBorder: false,
                                items: [
                                    new Ext.form.FieldSet({
                                            border: false,
                                            id: "fieldSetHeader",
                                            bodyBorder: false,
                                            style: 'margin-top:10px;height:40px;',
                                            items: [{
                                                fieldLabel: '文件路径',
                                                labelAlign: 'right',
                                                xtype: 'textfield',
                                                labelWidth: 54,
                                                id: 'zhang',
                                                width: '55%',
                                                height: 22,
                                                value: '/',
                                                style: 'float: left;',
                                                listeners: {
                                                    afterRender: function () {
                                                        $('#zhang').keypress(function (e) {
                                                            var key = window.event ? e.keyCode : e.which;
                                                            if (key.toString() == '13') {
                                                                recordId = Ext.getCmp('zhang').value;
                                                                me.getData(recordId, dome)
                                                            }
                                                        });
                                                    }
                                                }
                                            }, {
                                                xtype: 'button',
                                                width: '4%',
                                                iconCls: 'searchFile',
                                                style: 'float:left;margin-right:0px;border: none;background: none;margin-left: 64px;\n' +
                                                    '    margin-top: 2px;\n' +
                                                    '    position: absolute;\n' +
                                                    '    z-index: 1;',
                                                handler: function () {
                                                    if (Ext.getCmp("searchAlert").value == '') {
                                                        Ext.Msg.alert('提示', '搜索内容不能为空', Ext.emptyFn);
                                                        return false;
                                                    }
                                                    me.getData(id, dome, true)
                                                }
                                            }, {
                                                xtype: 'button',
                                                text: '返回',
                                                width: '60px',
                                                id: 'goBack',
                                                tooltip: '返回',
                                                style: 'float:right;',
                                                handler: function () {
                                                    var pathUrl = Ext.getCmp('zhang').value,
                                                        newPathUrl = '',
                                                        oldPathUrl = '';
                                                    oldPathUrl = pathUrl;
                                                    if (pathUrl) {
                                                        pathUrl = pathUrl.split('/')
                                                        pathUrl.pop();
                                                        for (var i = 0; i < pathUrl.length; i++) {
                                                            newPathUrl += pathUrl[i] + '/'
                                                        }
                                                    }
                                                    if (oldPathUrl != '/' && oldPathUrl.length > 0) {
                                                        // 下一级 id
                                                        me.nextLevel = oldPathUrl;
                                                    }
                                                    if (newPathUrl.length == 0) {
                                                        return false;
                                                    }
                                                    var setValue = newPathUrl
                                                    setValue = setValue.substring(0, setValue.length - 1)
                                                    if (setValue == '') {
                                                        setValue = '/'
                                                    }
                                                    // 按钮启用
                                                    Ext.getCmp('zhang').setValue(setValue)
                                                    me.getData(setValue, dome)
                                                }
                                            }, {
                                                xtype: 'textfield',
                                                width: '20%',
                                                height: 22,
                                                id: "searchAlert",
                                                value: '',
                                                style: 'float:right;margin-right: 20px;',
                                                emptyText: '搜索...',
                                                listeners: {
                                                    afterRender: function () {
                                                        $("#searchAlert").keypress(function (e) {
                                                            var key = window.event ? e.keyCode : e.which;
                                                            if (key.toString() == '13') {
                                                                if (Ext.getCmp("searchAlert").value == '') {
                                                                    Ext.Msg.alert('提示', '搜索内容不能为空', Ext.emptyFn);
                                                                    return false;
                                                                }
                                                                me.getData(id, dome, true)
                                                            }
                                                        });
                                                    }
                                                }
                                            }]
                                        }
                                    )]

                            }, {
                                xtype: 'panel',
                                region: 'center',
                                id: 'rightcenter',
                                layout: 'fit',
                                border: false,
                                bodyBorder: false,
                                listeners: {
                                    afterrender: function () {
                                        setTimeout(function () {
                                            me.getData(Ext.getCmp('zhang').getValue(), dome)
                                        }, 0)
                                    }
                                }
                            }]
                        }, {
                            xtype: 'panel',
                            region: 'south',
                            border: false,
                            bodyBorder: false,
                            height: 50,
                            style: '',
                            cls: 'Hdfsbottom',
                            items: [{
                                xtype: "button",
                                text: '选择',
                                width: 73,
                                height: 30,
                                cls: 'btnHover',
                                style: 'background:rgba(74,144,226,1);float: left;margin-left: 20px;border-radius:6px;',
                                handler: function () {
                                    var page = Map.get(Const.PAGE_OBJECT),
                                        graph = page.activeGraph,
                                        cell = graph.getSelectionCell();
                                    if (!(me.fildUrlPath)) {
                                        Ext.Msg.alert('提示', '请选择文件', Ext.emptyFn);
                                        return false;
                                    }
                                    //赋值给框
                                    if (dome[0] && dome[1]) {
                                        dome[0].value = me.fildUrlPath
                                        dome[1].store.reload();
                                    } else {
                                        dome.setValue(me.fildUrlPath);
                                    }
                                    me.fildUrlPath = ''
                                    me.fileType = ''
                                    if (Ext.getCmp('loadUrl')) {
                                        Ext.getCmp('loadUrl').destroy()
                                    }
                                }
                            }, {
                                xtype: 'button',
                                text: '新建文件夹',
                                width: 130,
                                height: 30,
                                cls: 'btnHover',
                                style: 'background:rgba(74,144,226,1);float: left;margin-left: 20px;border-radius:6px;',
                                handler: function () {
                                    Ext.QuickTips.init();
                                    Ext.form.Field.prototype.msgTarget = 'side';
                                    var fp = new Ext.FormPanel({
                                        id: 'fpform',
                                        fileUpload: true,
                                        frame: true,
                                        title: '',
                                        autoHeight: true,
                                        bodyStyle: 'padding: 10px 10px 0 10px;height:100%',
                                        labelWidth: 50,
                                        items: [{
                                            xtype: 'textfield',
                                            emptyText: '请命名一个文件夹',
                                            fieldLabel: '文件夹',
                                            labelAlign: 'left',
                                            id: 'txtname',
                                            name: 'txtname',
                                            style: 'margin-top: 20px;width:530px !important;'
                                        }],
                                        buttons: [{
                                            text: '确定',
                                            width: '76px',
                                            height: '26px',
                                            border: false,
                                            style: 'background:rgba(74,144,226,1);border-radius:2px;padding:0px',
                                            handler: function () {
                                                recordPath = Ext.getCmp('zhang').getValue();
                                                var fileEl = Ext.getCmp('txtname').getValue(),
                                                    fd = new FormData(),
                                                    filedir = recordPath + '/' + fileEl;
                                                fd.append('filedir', filedir);
                                                if (fp.getForm().isValid()) {
                                                    Ext.Ajax.request({
                                                        method: 'POST',
                                                        url: window.baseURL + 'hdfs/mkdir',
                                                        useDefaultXhrHeader: false,
                                                        rawData: fd,
                                                        // new FormData数据类型 需要设置Content-Type为空
                                                        headers: {'Content-Type': null},
                                                        success: function (response, opts) {
                                                            var data = Ext.decode(response.responseText);
                                                            var resultList = data.message;
                                                            if (response.code == 0) {
                                                                Ext.Msg.alert('提示', resultList);
                                                            } else {
                                                                Ext.Msg.alert('提示', resultList);
                                                            }

                                                            Ext.getCmp('newFile').destroy();
                                                            // 刷新数据
                                                            me.getData(recordPath, dome);
                                                        },
                                                        failure: function (response, opts) {
                                                            Ext.Msg.alert('提示', '新建hdfs文件夹失败！', Ext.emptyFn);
                                                            Ext.getCmp('newFile').destroy();
                                                        }
                                                    });
                                                }
                                            }
                                        }, {
                                            text: '取消',
                                            width: '76px',
                                            height: '26px',
                                            border: false,
                                            style: 'background:rgba(74,144,226,1);border-radius:2px;padding:0px;color:#fff !important',
                                            handler: function () {
                                                fp.getForm().reset();
                                                Ext.getCmp('newFile').destroy();
                                            }
                                        }]
                                    });
                                    // 窗体
                                    var win = new Ext.Window({
                                        id: 'newFile',
                                        title: '新建文件夹',
                                        width: 565,
                                        height: 165,
                                        resizable: true,
                                        modal: true,
                                        closable: true,
                                        buttonAlign: 'center',
                                        items: fp
                                    });
                                    win.show();
                                }
                            }, {
                                xtype: 'button',
                                text: '上传文件',
                                width: 130,
                                height: 30,
                                cls: 'btnHover',
                                style: 'background:rgba(74,144,226,1);right: 40px;position: absolute;border:1px solid rgba(229,229,229,1);border-radius:6px',
                                handler: function () {
                                    Ext.QuickTips.init();
                                    Ext.form.Field.prototype.msgTarget = 'side';
                                    var fp = new Ext.FormPanel({
                                        id: 'fpform',
                                        fileUpload: true,
                                        frame: true,
                                        title: '',
                                        autoHeight: true,
                                        bodyStyle: 'padding: 10px 10px 0 10px;',
                                        labelWidth: 50,
                                        width: '100%',
                                        height: '100%',
                                        items: [{
                                            xtype: 'fileuploadfield',
                                            emptyText: '请选择一个文件',
                                            fieldLabel: '文件',
                                            id: 'file-path',
                                            name: 'file-path',
                                            buttonText: "浏览",
                                            style: 'margin-top: 20px;width:530px !important;color:#000 !important;'
                                        }],
                                        buttons: [{
                                            text: '确定',
                                            width: '76px',
                                            height: '26px',
                                            border: false,
                                            style: "background:rgba(74,144,226,1);border-radius:2px;padding:0px",
                                            handler: function () {
                                                recordPath = Ext.getCmp('zhang').getValue();
                                                var fileEl = Ext.getCmp('file-path').fileInputEl.dom,
                                                    fileE10 = fileEl.files[0],
                                                    fd = new FormData(),
                                                    destPath = recordPath + '/';
                                                fd.append('destPath', destPath);
                                                fd.append('upload', fileEl.files[0]);
                                                if (fp.getForm().isValid()) {
                                                    Ext.Ajax.request({
                                                        async: false,
                                                        method: 'POST',
                                                        url: window.baseURL + 'hdfs/copyFileToHDFS',
                                                        useDefaultXhrHeader: false,
                                                        rawData: fd,
                                                        headers: {'Content-Type': null},
                                                        success: function (response, opts) {
                                                            var data = Ext.decode(response.responseText),
                                                                resultList = data.message;
                                                            Ext.Msg.alert('提示', resultList, Ext.emptyFn);
                                                            Ext.getCmp('fileUpload').destroy();
                                                            // 刷新数据
                                                            me.getData(recordPath, dome)
                                                        },
                                                        failure: function (response, opts) {
                                                            Ext.Msg.alert('提示', '本地文件上传到hdfs失败！', Ext.emptyFn);
                                                            Ext.getCmp('fileUpload').destroy();
                                                        }
                                                    });
                                                }
                                            }
                                        }, {
                                            text: '取消',
                                            width: '76px',
                                            height: '26px',
                                            border: false,
                                            style: 'background:rgba(74,144,226,1);border-radius:2px;padding:0px',
                                            handler: function () {
                                                fp.getForm().reset();
                                                Ext.getCmp('fileUpload').destroy();
                                            }
                                        }]
                                    });
                                    //窗体
                                    var win = new Ext.Window({
                                        id: 'fileUpload',
                                        title: '文件上传',
                                        width: 565,
                                        height: 165,
                                        resizable: true,
                                        modal: true,
                                        closable: true,
                                        buttonAlign: 'center',
                                        items: fp
                                    });
                                    win.show();
                                }
                            }]
                        }]
                    }]
                }],
                listeners: {
                    "render": function () {
                        $('#loadUrl .x-tree-view').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            autohidemode: 'leave'
                        });
                    },
                    afterRender: function () {
                        loadMask = new Ext.LoadMask(Ext.getCmp('maskLoad'), {
                            removeMask: false,
                            hideMode: 'display',
                            useMsg: false
                        });
                        if (me.loadContent.serverPath.indexOf('http') != -1) {
                            loadMask.show();
                        }
                    }
                }
            }).show();


        }
    },

    /** 文件列表获取数据 */
    getData: function (id, dome, status) {
        var me = this,
            recordId,
            // 遮罩层
            loadMask = new Ext.LoadMask(Ext.getCmp('rightcenter'), {
                msg: "正在加载文件资源...",
                hideMode: 'display',
            });
        loadMask.show();
        if (status) {
            Ext.Ajax.request({
                method: 'POST',
                url: window.baseURL + "hdfs/files",
                params:
                    {
                        path: Ext.getCmp('zhang').value,
                        parameter: Ext.getCmp('searchAlert').value
                    },
                success: function (response, opts) {
                    var dataMag = Ext.decode(response.responseText);
                    recordId = dataMag.data;
                    me.dataView(recordId, dome, loadMask);
                }
            })
        } else {
            Ext.Ajax.request({
                async: false,
                method: 'get',
                url: window.baseURL + 'hdfs/getDirectoryFromHdfs',
                defaultPostHeader: 'application/json;charset=utf-8',
                params: {node: id || '/'},
                success: function (response, opts) {
                    recordId = Ext.decode(response.responseText);
                    me.dataView(recordId, dome, loadMask)
                },
            })
        }
    },

    /** 文件列表赋值渲染 */
    dataView: function (data, dome, loadMask) {
        var me = this;
        if (Ext.getCmp('GridPanelTable')) {
            Ext.getCmp('GridPanelTable').destroy()
        }
        var GridPanel = Ext.create('Ext.panel.Panel', {
            title: '文件表',
            header: false,
            layout: 'fit',
            id: 'GridPanelTable',
            xtype: 'panel',
            items: {
                cls: 'dataviewId',
                xtype: 'dataview',
                reference: 'dataview',
                plugins: {
                    ptype: 'ux-animated-dataview'
                },
                data: data,
                itemSelector: 'div.dataview-multisort-item',
                // 渲染数据
                tpl: [
                    '<tpl for=".">',
                    '<div title="{name}" class="dataview-multisort-item">',
                    '<img src="resources/images/right/{leaf}.png" />',
                    '<span style="display: none;">{id}</span>',
                    '<p style="display: none;">{leaf}</p>',
                    '<h3 >{name}</h3>',
                    '</div>',
                    '</tpl>'
                ],
                listeners: {
                    afterrender: function () {
                        // 单击
                        $('.dataview-multisort-item').click(function (e) {
                            e.stopPropagation();
                            $('.dataview-multisort-item').removeClass('dataview-multisort-item-active')
                            $(this).addClass('dataview-multisort-item-active')
                            // 选中文件的值
                            me.fildUrlPath = $(this).find('span').text()
                            Ext.getCmp('zhang').setValue($(this).find('span').text())
                        })
                        // 双击
                        $('.dataview-multisort-item').dblclick(function () {
                            // 文件类型
                            if ($(this).find('p').text() == 'true') {
                                return false
                            }
                            Ext.getCmp('zhang').setValue($(this).find('span').text())
                            me.getData($(this).find('span').text(), dome)
                            me.fildUrlPath = ''
                            // 展开左侧树
                            /*var treeController = Ext.getCmp('loadUrl');
                            treeController.expandTo($(this).find('span').text());*/
                        })
                        // 点击空白处
                        $('.dataviewId').click(function () {
                            $('.dataview-multisort-item').removeClass('dataview-multisort-item-active');
                            me.fildUrlPath = ''
                        })
                        // 滚动条
                        $('#GridPanelTable-bodyWrap').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            horizrailenabled: false,
                            autohidemode: 'leave'
                        });
                        $('#GridPanelTable-body').niceScroll({
                            cursorborder: '1px solid #c5c5c5',
                            cursorcolor: '#c5c5c5',
                            horizrailenabled: false,
                            autohidemode: 'leave'
                        });
                        loadMask.hide();
                    }
                }
            }
        });
        if (Ext.getCmp('rightcenter')) {
            Ext.getCmp('rightcenter').add(GridPanel);
        }
    },

    /** 区分组件运行模式默认方法 */
    differentiateElement: function (cell) {
        if (!cell) {
            return false;
        }
        if (cell.style === 'Flink') {
            cell.setAttribute('flinkMode', 'yarn');
        }
    }
});
