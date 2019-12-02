/**
 * 应用程序类
 * 类实例由app.js调用Ext.application()方法创建,主要负责处理应用程序启动和初始化的细节
 */
Ext.define('Cosmo.Application', {
    extend: 'Ext.app.Application',

    name: 'Cosmo',

    quickTips: false,

    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    /** 预加载全局/共享存储 */
    stores: [
        // 元件库Store(数据集)
        'Components',
        'Data'
    ],

    /** 页面加载完成后执行（类似于jQuery的ready方法和ExtJs的onReady方法） */
    launch: function () {

        // 修复Ext.util.Format的defaultValue方法BUG
        Ext.util.Format.defaultValue = function (value, defaultValue) {
            return Ext.isEmpty(value) ? defaultValue : value;
        };

        // 日期常用格式化格式
        Ext.Date.patterns = {
            ISO8601Long: "Y-m-d H:i:s",
            ISO8601Short: "Y-m-d",
            ShortDate: "n/j/Y",
            LongDate: "l, F d, Y",
            FullDateTime: "l, F d, Y g:i:s A",
            MonthDay: "F d",
            ShortTime: "g:i A",
            LongTime: "g:i:s A",
            SortableDateTime: "Y-m-d\\TH:i:s",
            UniversalSortableDateTime: "Y-m-d H:i:sO",
            YearMonth: "F, Y"
        };

        // 获取URL中Hash值
        var hash = location.hash.toString();
        // 主界面切换
        if (hash && hash.indexOf('manager') > 0) {
            this.setMainView('Cosmo.view.main.Manager');
        } else {
            this.setMainView('Cosmo.view.main.Main');

            // MxGraph BPMN 图形注册
            var request = mxUtils.load('resources/plugin/mxgraph/bpmn/bpmn.xml'),
                root = request.getDocumentElement(),
                shape = root.firstChild,
                packageName = root.getAttribute("name");
            while (shape != null) {
                if (shape.nodeType == mxConstants.NODETYPE_ELEMENT) {
                    var name = shape.getAttribute('name').toLocaleLowerCase();
                    // 格式化shape图形名称
                    var shapeName = packageName + "." + name.replace(/ /g, '_');
                    mxStencilRegistry.addStencil(shapeName, new mxStencil(shape));
                }
                shape = shape.nextSibling;
            }
        }

        function getCookie(cookieName) {
            var cookieValue = "";
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = cookies[i].split("=");
                    if (cookie[0].trim() == cookieName.trim()) {
                        cookieValue = cookie[1].trim();
                        break;
                    }
                }
            }
            return cookieValue;
        }

        // 重写ajax加header
        Ext.define('Ext.Ajax', {
            extend: 'Ext.data.Connection',
            singleton: true,
            autoAbort: false,
            request: function (options) {
                options = options || {};
                options.headers = options.headers || {};
                options.headers.Authorization = "bearer " + localStorage.getItem("access_token")
                options.headers['X-XSRF-TOKEN'] = getCookie("XSRF-TOKEN");
                // 原件库数据请求头部设置
                if (options.url.indexOf('component/list') > -1) {
                    options.headers['Content-Type'] = 'application/json;charset=UTF-8'
                }
                var me = this,
                    requestOptions, request;
                if (me.fireEvent('beforerequest', me, options) !== false) {
                    requestOptions = me.setOptions(options, options.scope || Ext.global);
                    request = me.createRequest(options, requestOptions);
                    return request.start(requestOptions.data);
                }
                Ext.callback(options.callback, options.scope, [
                    options,
                    undefined,
                    undefined
                ]);
                failure
                return Ext.Deferred.rejected([
                    options,
                    undefined,
                    undefined
                ]);
            },

        });

        window.ajaxFlag = true;
        Ext.Ajax.on('requestexception', function (conn, response, options, eOpts) {
            if (response.status == 401 || response.status == 403) {
                if (window.ajaxFlag) {

                    // alert("会话过期，请您重新登录！");
                    window.ajaxFlag = false;
                }
                window.location.href = 'cac/logout.html'
            }
        })

        // 监听右侧属性折叠
        function rightPropertyCollapse() {
            // 屏幕分辨率改变元件改变高度
            Ext.getCmp('rightElement').getController().ratioResizeShrink();
        }

        Ext.onReady(function () {
            var rightProperty = Ext.getCmp('rightProperty');//获取fieldSet元素
            if (document.body.clientHeight != 'undifend') {
                rightProperty.on('collapse', rightPropertyCollapse);//添加收缩监听事件
            }

        })
    },

    /** 应用程序脚本文件发生改变时提示重新加载页面 */
    onAppUpdate: function () {
        Ext.Msg.confirm('提示', '应用现在有更新，是否重新加载？',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
