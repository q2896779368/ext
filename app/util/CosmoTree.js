Ext.define('Cosmo.util.CosmoTree',{
    extend: 'Ext.tree.Panel',

    alias: "widget.cosmotree",

    alternateClassName: ['Cosmo.util.CosmoTree','Cosmo.CosmoTree'],

    mixins:[ 'Cosmo.util.TreeFilter']
});