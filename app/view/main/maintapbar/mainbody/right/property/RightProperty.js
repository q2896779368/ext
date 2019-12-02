Ext.define("Cosmo.view.main.maintapbar.mainbody.right.property.RightProperty", {
    extend: "Ext.panel.Panel",
    alias: "widget.rightproperty",
    requires: [
        'Cosmo.view.main.maintapbar.mainbody.right.property.RightPropertyController',
    ],
    defaults: {
        autoScroll: true,
    },
    controller: "rightproperty",
});