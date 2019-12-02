/**
 * 常量
 */
Ext.define('Cosmo.util.Const',{

    singleton:true,

    alternateClassName:['Cosmo.Const','Const'],

    /** 当前活动页对象 */
    PAGE_OBJECT: 'pageObject',

    /** 当前活动页JSON数据对象 */
    PAGE_JSON_OBJECT: 'pageJsonObject',

    /** #符号 */
    POUND: '#',

    /** tabTop_符号 */
    TOP: 'tabTop_',

    /** tabLeft_符号 */
    LEFT: 'tabLeft_',

    /** 资源文件后缀名 */
    RESOURCE_SUFFIX: '.dds',

    /** 默认编辑区页面 */
    DEFAULT_TAB: 'defaultTab',

    /** 我的模板文件后缀名 */
    TEMPLATE_SUFFIX: '.template',

    /** 编辑区内层DIV扩展名 */
    _BODY: '-body',

    /** 框选类型*/
    // 相交选中
    INTERSEC: 'intersecSelect',
    // 包含选中
    INCLOUD: 'incloudSelect',

    /** 组件类型 */
    // 按钮
    BUTTON: 'button',
    // 日历
    CALENDAR: 'calendar',
    // 复选框
    CHECK_BOX: 'checkbox',
    // 交叉表
    CROSS_TABLE: 'crossTable',
    // 创建组
    GROUP: 'group',
    // Iframe框架
    IFRAME: 'iframe',
    // 图片
    IMG: 'img',
    // 文本框
    INPUT: 'input',
    // 标签
    LABEL: 'label',
    // 链接
    LINK: 'link',
    // 分页工具条
    PAGE: 'page',
    // 面板
    PANEL: 'panel',
    // 单选框
    RADIO: 'radio',
    // 矩形
    RECTANGLE: 'rectangle',
    // 下拉框
    SELECT: 'select',
    // 列表框
    SELECT_TABLE: 'selectTable',
    // 选项卡
    TABS: 'tabs',
    // 列表
    TABLE: 'table',
    // 多行文本框
    TEXT: 'text',
    // 水平线
    TRANSVERSE: 'transverse',
    // 树
    TREE: 'tree',
    // 垂直线
    VERTICAL: 'vertical',

    /** 标尺 */
    RULER_TOP:'background: url(resources/images/center/mxr_top.jpg); height: 14px; width: 10000px; top: 0px; left: -3px; position: absolute; z-index: 8000',
    RULER_LEFT:'background: url(resources/images/center/mxr_left.jpg) no-repeat; height: 10000px; width: 14px; position: absolute; top: 14px; left: 0px; z-index: 8000',
});
