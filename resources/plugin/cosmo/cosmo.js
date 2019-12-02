(function (global) {
    global.cosmo = global.cosmo || {};

    global.cosmo.data = function (params) {
        function getData(viewData){
            if(params.name && viewData.dataSource[params.name]){
                var sql = window.Ext?Ext.getCmp('rightData').getController().sqlAnalysis(viewData.dataSource[params.name].sql,viewData):sqlAnalysis(viewData.dataSource[params.name].sql,viewData);
                var key = viewData.dataSource[params.name].connection;
            }else if(params.sql && params.key){
                var sql = window.Ext?Ext.getCmp('rightData').getController().sqlAnalysis(params.sql, viewData):sqlAnalysis(params.sql, viewData);
                var key = params.key;
            }
            if(sql && key){
                var response = [];
                if(typeof params.async != 'boolean') params.async = false;
                $.ajax({
                    async: params.async,
                    type: 'post',
                    url: 'data/select',
                    data: {
                        dbKey: key,
                        sql: sql
                    },
                    success: function (res) {
                        if (res.success) {
                            response = res.items;
                        }
                    }
                });
                return response;
            }else {
                return [];
            }
        }
        if(window.viewData){
            return getData(window.viewData);
        }else if(window.Ext){
            var viewData = Map.get(Const.PAGE_OBJECT);
            return getData(viewData);
        }else {
            return [];
        }
    }
})(window);