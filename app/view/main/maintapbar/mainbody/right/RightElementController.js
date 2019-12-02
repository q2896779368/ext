/**
 * 右侧元素、参数控制器
 */
Ext.define('Cosmo.view.main.maintapbar.mainbody.right.RightElementController', {
    extend: 'Ext.app.ViewController',

    /** 控制器别名 */
    alias: 'controller.rightElement',

    /** 屏幕分辨率改变元件改变高度*/
    ratioResize: function(value){
        var ratioResize=window.innerHeight/window.outerHeight;
        $('.VerticalMenu').css('height',((window.outerHeight - 114)*0.46)*ratioResize+20+'px');
        $('.VerticalMenu').getNiceScroll().resize();
    },

    /** 元件收缩全部展示*/
     ratioResizeShrink: function () {
        $('.VerticalMenu').css('height',window.outerHeight - 114+'px');
        $('.VerticalMenu').getNiceScroll().resize();
    }
});
