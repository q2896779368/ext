Ext.define('Cosmo.view.main.maintapbar.mainbody.center.CenterEditData', {
    extend:'Ext.data.SimpleStore',
    data: {
        left: [
            [{
                title: '聚合类操作函数', concnet: [
                    {titles: 'appx_median([DISTINCT|ALL] T col)', concnent: '说明: 一个聚合函数，返回的值大约是输入值集中值的中位数（中点）。'},
                    {
                        titles: 'avg([DISTINCT|ALL] col)',
                        concnent: '说明: 一个聚合函数，它返回一组数字的平均值。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给AVG的所有值都为NULL，则AVG返回NULL。'
                    },
                    {titles: 'count([DISTINCT|ALL] col)', concnent: '说明: 一个聚合函数，它返回行数或非NULL行数。'},
                    {
                        titles: 'max([DISTINCT | ALL] T col)',
                        concnent: '说明: 一个聚合函数，它从一组数字中返回最大值。与MIN功能相反。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MAX的所有值都为NULL，则MAX返回NULL。'
                    },
                    {
                        titles: 'min([DISTINCT | ALL] T col)',
                        concnent: '说明: 一个聚合函数，它从一组数字中返回最小值。与MAX功能相反。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MIN的所有值都为NULL，则MIN返回NULL。'
                    },
                    {
                        titles: 'sum([DISTINCT | ALL] col)',
                        concnent: '说明: 一个返回一组数字之和的聚合函数。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MIN的所有值都为NULL，则SUM返回NULL。'
                    },
                    {
                        titles: 'group_concat([ALL] col [, separator])',
                        concnent: '说明: 一个聚合函数，它返回一个字符串，表示为结果集的每一行连接在一起的参数值。如果指定了可选的分隔符字符串，则在每对连接值之间添加分隔符。默认分隔符是逗号后跟空格。'
                    },
                    {
                        titles: 'ndv([DISTINCT | ALL] col)',
                        concnent: '说明: 一个聚合函数，返回一个类似于COUNT（DISTINCT col）结果的近似值，即“不同值的数量”。它比COUNT和DISTINCT的组合快得多，并且使用恒定的内存量，因此对于具有高基数的列而言，内存密集度较低。'
                    },
                    {titles: 'stddev([DISTINCT | ALL] col)', concnent: '说明: 返回组中数字列的标准偏差。'},
                    {titles: 'stddev_pop([DISTINCT | ALL] col)', concnent: '说明: 返回组中数字列的总体标准差。'},
                    {titles: 'stddev_samp([DISTINCT | ALL] col)', concnent: '说明: 返回组中数字列的无偏样本标准差。'},
                    {
                        titles: 'variance([DISTINCT | ALL] col)',
                        concnent: '说明: 一个聚合函数，返回一组数字的方差。这是一个数学属性，表示值与均值分开的距离。返回值可以为零（如果输入是单个值，或一组相同的值），否则为正数。'
                    },
                    {
                        titles: 'variance_pop([DISTINCT | ALL] col)',
                        concnent: '说明: 一个聚合函数，返回一组数字的总体方差。这是一个数学属性，表示值与均值分开的距离。返回值可以为零（如果输入是单个值，或一组相同的值），否则为正数。'
                    },
                    {
                        titles: 'variance_samp([DISTINCT | ALL] col)',
                        concnent: '说明: 一个聚合函数，返回一组数字的样本方差。这是一个数学属性，表示值与均值分开的距离。返回值可以为零（如果输入是单个值，或一组相同的值），否则为正数。'
                    },
                    {titles: 'var_pop(col)', concnent: '说明: 返回组中数字列的方差。'},
                    {titles: 'var_samp(col)', concnent: '说明: 返回组中数字列的无偏样本方差。'}
                ]
            }],
            [{
                title: '分析类操作函数', concnet: [
                    {
                        titles: 'cume_dist（T expr）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '说明: 返回值的累积分布。结果集中每行的值大于0且小于或等于1。'
                    },
                    {
                        titles: 'dense_rank（）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '说明:返回从1开始的升序整数序列。输出序列为ORDER BY表达式的重复值生成重复的整数。'
                    },
                    {
                        titles: 'first_value（expr）OVER（[partition_by_clause] order_by_clause [window_clause]）',
                        concnent: '    说明:从窗口的第一行返回表达式值。如果输入表达式为NULL，则返回值为NULL。'
                    },
                    {
                        titles: 'lag（expr [，offset] [，default]）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:此函数使用前一行的列值返回表达式的值。您指定一个整数偏移量，它指定行位置在当前行之前的某些行数。表达式参数中的任何列引用都引用该前一行的列值。'
                    },
                    {
                        titles: 'last_value（expr）OVER（[partition_by_clause] order_by_clause [window_clause]）',
                        concnent: '    说明:返回窗口最后一行的表达式值。如果输入表达式为NULL，则返回值为NULL。'
                    },
                    {
                        titles: 'lead（expr [，offset] [，default]）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '说明:此函数使用以下行中的列值返回表达式的值。您指定一个整数偏移量，它指定行位置在当前行之后的某些行数。表达式参数中的任何列引用都引用该后一行中的列值。'
                    },
                    {
                        titles: 'ntile（T expr [，T offset ...]）',
                        concnent: '    说明:返回与每行关联的“桶号”，介于1和表达式的值之间。例如，创建100个存储桶会将最低1％的值放入第一个存储桶中，而创建10个存储桶会将最低10％的值放入第一个存储桶中。每个分区可以具有不同数量的桶。'
                    },
                    {
                        titles: 'percent_rank（T expr）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:计算一组行中每行的等级，以百分比表示。如果rank是RANK（）函数中同一行的值（从1到分区组中的总行数），则PERCENT_RANK（）值计算为（rank-1）/（rows_in_group-1） 。如果分区组中只有一个项目，则其PERCENT_RANK（）值为0.需要ORDER BY子句。PARTITION BY子句是可选的。不允许使用window子句。'
                    },
                    {
                        titles: 'rank（）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:返回从1开始的升序整数序列。输出序列为ORDER BY表达式的重复值生成重复的整数。在为“绑定”输入值生成重复输出值之后，该函数将序列增加绑定值的数量。'
                    },
                    {
                        titles: 'row_number（）OVER（[partition_by_clause] )',
                        concnent: '    说明:返回从1开始的整数递增序列。为PARTITIONED BY子句生成的每个组启动序列。输出序列包括重复输入值的不同值。因此，无论重复的输入值如何，序列都不会包含任何重复或间隙。'
                    }
                ]
            }],
            [{
                title: '位运算类操作函数', concnet: [
                    {
                        titles: 'bitand(Ta, T b)',
                        concnent: '    说明:返回一个整数值，表示在两个参数中设置为1的位。如果参数具有不同的大小，则较小的参数将提升为较大的类型。'
                    },
                    {titles: 'bitnot(T a)', concnent: '    说明:反转输入参数的所有位。'},
                    {
                        titles: 'bitor(T a, T b)',
                        concnent: '    说明:返回一个整数值，表示在任一参数中设置为1的位。如果参数具有不同的大小，则较小的参数将提升为较大的类型。'
                    },
                    {
                        titles: 'bitxor(T a, T b)',
                        concnent: '    说明:返回一个整数值，表示在一个但不是两个参数中设置为1的位。如果参数具有不同的大小，则较小的参数将提升为较大的类型。'
                    },
                    {
                        titles: 'countset(T a [, INT b])',
                        concnent: '    说明:默认情况下，返回指定整数值中的1位数。如果可选的第二个参数设置为零，则返回0位数。'
                    },
                    {
                        titles: 'getbit(T a, INT b)',
                        concnent: '说明:返回表示指定位置的位的0或1。位置从右到左编号，从零开始。位置参数（b）不能是负数。'
                    },
                    {
                        titles: 'rotateleft(T a, INT b)',
                        concnent: '    说明:旋转指定位数左侧的整数值。由于最高有效位取自原始值，如果它是1位，则将其“旋转”回最低有效位。因此，最终值与原始值具有相同的1位数，仅在不同的位置。在计算机科学术语中，这种操作是“循环移位”。'
                    },
                    {
                        titles: 'setbit(T a, INT b [, INT c])',
                        concnent: '    说明:默认情况下，如果尚未将指定位置（b）的位更改为1。如果可选的第三个参数设置为零，则指定的位将设置为0。'
                    },
                    {
                        titles: 'shiftleft(T a, INT b)',
                        concnent: '    说明:将指定位数左移的整数值移位。由于最高有效位取自原始值，因此将其丢弃，最低有效位变为0.在计算机科学术语中，此操作是“逻辑转换”。'
                    },
                    {
                        titles: 'shiftright(T a, INT b)',
                        concnent: '    说明:将整数值向右移动指定的位数。当最低有效位从原始值中取出时，它被丢弃并且最高有效位变为0.在计算机科学术语中，该操作是“逻辑移位”。'
                    }
                ]
            }],
            [{
                title: '条件类操作函数', concnet: [
                    {titles: 'coalesce(T v1, T v2, ...)', concnent: '    说明:返回非NULL的第一个指定参数，如果所有参数都为NULL，则返回NULL。'},
                    {
                        titles: 'decode(T expression, T search1, T result1 [, T search2, T result2 ...] [, T default] )',
                        concnent: '    说明:将表达式与一个或多个可能的值进行比较，并在找到匹配项时返回相应的结果。'
                    },
                    {
                        titles: 'if(BOOLEAN condition, T ifTrue, T ifFalseOrNull)',
                        concnent: '    说明:测试表达式并根据结果是true，false还是NULL返回相应的结果。'
                    },
                    {
                        titles: 'ifnull(T a, T ifNotNull)',
                        concnent: '    说明:isnull（）函数的别名，具有相同的行为。简化使用Impala的供应商扩展来移植SQL。'
                    },
                    {
                        titles: 'isfalse(BOOLEAN condition)',
                        concnent: '    说明:测试布尔表达式是否为false。如果是，则返回true。如果参数为NULL，则返回false。与isnottrue（）相同，除了它返回NULL参数的相反值。'
                    },
                    {
                        titles: 'isnotfalse(BOOLEAN condition)',
                        concnent: '    说明:测试布尔表达式是否为false（即，为true或NULL）。如果是，则返回true。如果参数为NULL，则返回true。与istrue（）相同，除了它返回NULL参数的相反值。'
                    },
                    {
                        titles: 'isnottrue(BOOLEAN condition)',
                        concnent: '    说明:测试布尔表达式是否为true（即false或NULL）。如果是，则返回true。如果参数为NULL，则返回true。与isfalse（）相同，除了它返回NULL参数的相反值。'
                    },
                    {
                        titles: 'isnull(T a, T ifNotNull)',
                        concnent: '    说明:测试表达式是否为NULL，如果不是则返回表达式结果值。如果第一个参数为NULL，则返回第二个参数。'
                    },
                    {
                        titles: 'istrue(BOOLEAN condition)',
                        concnent: '    说明:测试布尔表达式是否为真。如果是，则返回true。如果参数为NULL，则返回false。与isnotfalse（）相同，除了它返回NULL参数的相反值。'
                    },
                    {
                        titles: 'nonnullvalue(T expression)',
                        concnent: '    说明:测试表达式（任何类型）是否为NULL。如果是，则返回false。与nullvalue（）相反。'
                    },
                    {
                        titles: 'nullif(T expr1, T expr2)',
                        concnent: '    说明:如果两个指定的参数相等，则返回NULL。如果指定的参数不相等，则返回expr1的值。表达式的数据类型必须兼容。您不能为expr1使用计算结果为NULL的表达式; 这样，您可以将NULL的返回值与NULL的参数值区分开来，该值永远不会与expr2匹配。'
                    },
                    {titles: 'nullifzero(T numeric_expr)', concnent: '    说明:如果数值表达式求值为0，则返回NULL，否则返回表达式的结果。'},
                    {
                        titles: 'nullvalue(T expression)',
                        concnent: '    说明:测试表达式（任何类型）是否为NULL。如果是，则返回true。与nonnullvalue（）相反。'
                    },
                    {
                        titles: 'nvl(T a, T ifNotNull)',
                        concnent: '    说明:isnull（）函数的别名。测试表达式是否为NULL，如果不是则返回表达式结果值。如果第一个参数为NULL，则返回第二个参数。相当于Oracle数据库中的nvl（）函数或来自MySQL的ifnull（）函数。'
                    },
                    {titles: 'zeroifnull(T numeric_expr)', concnent: '    说明:如果数值表达式求值为NULL，则返回0，否则返回表达式的结果。'},
                ]
            }],
            [{
                title: '日期类操作函数', concnet: [
                    {titles: 'add_months(TIMESTAMP date, BIGINT|INT months)', concnent: '    说明:返回指定的日期和时间加上一些月份。'},
                    {
                        titles: 'adddate(TIMESTAMP startdate, BIGINT|INT days)',
                        concnent: '    说明:向TIMESTAMP值添加指定的天数。与date_add（）类似，但以实际的TIMESTAMP值开头，而不是转换为TIMESTAMP的字符串。'
                    },
                    {titles: 'current_timestamp()', concnent: '    说明:now（）函数的别名。'},
                    {
                        titles: 'date_add(TIMESTAMP startdate, INT days), date_add(TIMESTAMP startdate, interval_expression)',
                        concnent: '    说明:向TIMESTAMP值添加指定的天数。第一个参数可以是一个字符串，如果它使用识别的格式，它将自动转换为TIMESTAMP。使用INTERVAL表达式作为第二个参数，您可以使用其他单位（如周，年，小时，秒等）计算增量值。'
                    },
                    {
                        titles: 'date_part(STRING unit, TIMESTAMP timestamp)',
                        concnent: '    说明:与EXTRACT（）类似，参数顺序颠倒过来。支持与EXTRACT（）相同的日期和时间单位。用于与包含供应商扩展的SQL代码兼容。'
                    },
                    {
                        titles: 'date_sub(TIMESTAMP startdate, INT days), date_sub(TIMESTAMP startdate, interval_expression)',
                        concnent: '    说明:从TIMESTAMP值中减去指定的天数。第一个参数可以是一个字符串，如果它使用识别的格式，它将自动转换为TIMESTAMP。使用INTERVAL表达式作为第二个参数，您可以使用其他单位（如周，年，小时，秒等）计算增量值。'
                    },
                    {
                        titles: 'datediff(TIMESTAMP enddate, TIMESTAMP startdate)',
                        concnent: '    说明:返回两个TIMESTAMP值之间的天数。'
                    },
                    {
                        titles: 'day(TIMESTAMP date)',
                        concnent: '    说明:返回TIMESTAMP的日期部分中的日期字段。该值代表该月的日期，因此在没有31天的情况下，在1-31或更少的范围内。'
                    },
                    {
                        titles: 'dayname(TIMESTAMP date)',
                        concnent: '    说明:从TIMESTAMP值返回day字段，转换为与该日期名称对应的字符串。返回值的范围是“星期日”到“星期六”。用于生成报告的查询，作为调用dayofweek（）并使用CASE表达式将该数字返回值转换为字符串的替代方法。'
                    },
                    {
                        titles: 'dayofmonth(TIMESTAMP date)',
                        concnent: '    说明:返回TIMESTAMP的日期部分中的日期字段。该值代表该月的日期，因此在没有31天的情况下，在1-31或更少的范围内。'
                    },
                    {
                        titles: 'dayofweek(TIMESTAMP date)',
                        concnent: '    说明:返回TIMESTAMP的日期部分中的day字段，对应于星期几。返回值的范围是1（星期日）到7（星期六）。'
                    },
                    {
                        titles: 'dayofyear(TIMESTAMP date)',
                        concnent: '    说明:返回TIMESTAMP值的day字段，对应于一年中的某一天。返回值范围为1（1月1日）至366（闰年的12月31日）。'
                    },
                    {
                        titles: 'days_add(TIMESTAMP startdate, BIGINT|INT days)',
                        concnent: '    说明:向TIMESTAMP值添加指定的天数。与date_add（）类似，但以实际的TIMESTAMP值开头，而不是转换为TIMESTAMP的字符串。'
                    },
                    {
                        titles: 'days_sub(TIMESTAMP startdate, BIGINT|INT days)',
                        concnent: '    说明:从TIMESTAMP值中减去指定的天数。与date_sub（）类似，但以实际的TIMESTAMP值而不是转换为TIMESTAMP的字符串开头。'
                    },
                    {
                        titles: 'extract(TIMESTAMP date, STRING unit), extract(STRING unit FROM TIMESTAMP date)',
                        concnent: '    说明:从TIMESTAMP值返回数字日期或时间字段之一。'
                    },
                    {
                        titles: 'from_timestamp(TIMESTAMP val, STRING format)',
                        concnent: '    说明:将指定的时间戳转换为具有给定格式的字符串。示例：from_timestamp（cast（\'1999-01-01 10:10:10\'作为时间戳），\'yyyy-MM-dd\'）“结果”1999-01-01“'
                    },
                    {
                        titles: 'from_unixtime(BIGINT unixtime [, STRING format])',
                        concnent: '    说明:将Unix纪元到指定时间的秒数转换为本地时区的字符串。'
                    },
                    {
                        titles: 'from_utc_timestamp(TIMESTAMP date, STRING timezone)',
                        concnent: '    说明:将指定的UTC时间戳值转换为指定时区的适当值。'
                    },
                    {titles: 'hour(TIMESTAMP date)', concnent: '    说明:返回TIMESTAMP字段的小时字段。'},
                    {titles: 'hours_add(TIMESTAMP date, BIGINT|INT hours)', concnent: '    说明:返回指定的日期和时间加上一些小时数。'},
                    {titles: 'hours_sub(TIMESTAMP date, BIGINT|INT hours)', concnent: '    说明:返回指定的日期和时间减去一些小时数。'},
                    {
                        titles: 'int_months_between(TIMESTAMP newer, TIMESTAMP older)',
                        concnent: '    说明:返回两个TIMESTAMP值的日期部分之间的月份数，作为仅表示通过的完整月份的INT。'
                    },
                    {
                        titles: 'microseconds_add(TIMESTAMP date, BIGINT|INT microseconds)',
                        concnent: '    说明:返回指定的日期和时间加上一些微秒。'
                    },
                    {
                        titles: 'microseconds_sub(TIMESTAMP date, BIGINT|INT microseconds)',
                        concnent: '    说明:返回指定的日期和时间减去一些微秒。'
                    },
                    {titles: 'milliseconds(TIMESTAMP date)', concnent: '    说明:返回TIMESTAMP值的毫秒部分。'},
                    {
                        titles: 'milliseconds_add(TIMESTAMP date, BIGINT|INT milliseconds)',
                        concnent: '    说明:返回指定的日期和时间加上一些毫秒数。'
                    },
                    {
                        titles: 'milliseconds_sub(TIMESTAMP date, BIGINT|INT milliseconds)',
                        concnent: '    说明:返回指定的日期和时间减去一些毫秒数。'
                    },
                    {titles: 'minute(TIMESTAMP date)', concnent: '    说明:从TIMESTAMP值返回分钟字段。'},
                    {
                        titles: 'minutes_add(TIMESTAMP date, BIGINT|INT minutes)',
                        concnent: '    说明:返回指定的日期和时间加上一些分钟数。'
                    },
                    {
                        titles: 'minutes_sub(TIMESTAMP date, BIGINT|INT minutes)',
                        concnent: '    说明:返回指定的日期和时间减去一些分钟数。'
                    },
                    {titles: 'month(TIMESTAMP date)', concnent: '    说明:从TIMESTAMP的日期部分返回month字段，表示为整数。'},
                    {titles: 'months_add(TIMESTAMP date, BIGINT|INT months)', concnent: '    说明:返回指定的日期和时间加上一些月份。'},
                    {
                        titles: 'months_between(TIMESTAMP newer, TIMESTAMP older)',
                        concnent: '    说明:返回两个TIMESTAMP值的日期部分之间的月数。除了日期之间的整月之外，还可以包含表示额外天数的小数部分。通过将天数差除以31（无论月份）来计算分数分量。'
                    },
                    {titles: 'months_sub(TIMESTAMP date, BIGINT|INT months)', concnent: '    说明:返回指定的日期和时间减去某些月份。'},
                    {
                        titles: 'nanoseconds_add(TIMESTAMP date, BIGINT|INT nanoseconds)',
                        concnent: '    说明:返回指定的日期和时间加上一些纳秒数。'
                    },
                    {
                        titles: 'nanoseconds_sub(TIMESTAMP date, BIGINT|INT nanoseconds)',
                        concnent: '    说明:返回指定的日期和时间减去一些纳秒数。'
                    },
                    {titles: 'now()', concnent: '    说明:返回当前日期和时间（在本地时区中）作为时间戳值。'},
                    {titles: 'second(TIMESTAMP date)', concnent: '    说明:返回TIMESTAMP值的第二个字段。'},
                    {
                        titles: 'seconds_add(TIMESTAMP date, BIGINT|INT seconds)',
                        concnent: '    说明:返回指定的日期和时间加上一些秒数。'
                    },
                    {
                        titles: 'seconds_sub(TIMESTAMP date, BIGINT|INT seconds)',
                        concnent: '    说明:返回指定的日期和时间减去一些秒数。'
                    },
                    {
                        titles: 'subdate(TIMESTAMP startdate, BIGINT|INT days)',
                        concnent: '    说明:从TIMESTAMP值中减去指定的天数。与date_sub（）类似，但以实际的TIMESTAMP值而不是转换为TIMESTAMP的字符串开头。'
                    },
                    {titles: 'timeofday()', concnent: '    说明:根据本地系统的时间（包括任何时区指定）返回当前日期和时间的字符串表示形式。'},
                    {
                        titles: 'timestamp_cmp(TIMESTAMP t1, TIMESTAMP t2)',
                        concnent: '    说明:测试一个TIMESTAMP值是否比另一个TIMESTAMP更新，更早或相同。返回-1,0,1或NULL。'
                    },
                    {titles: 'to_date(TIMESTAMP date)', concnent: '    说明:从时间戳值返回日期字段的字符串表示形式。'},
                    {
                        titles: 'to_timestamp([STRING val, STRING format]|[BIGINT val])',
                        concnent: '    说明:将bigint（来自Unix纪元的增量）或具有指定格式的字符串转换为时间戳。示例：to_timestamp（\'1970-01-01 00:00:00\'，\'yyyy-MM-dd HH：mm：ss\'）。'
                    },
                    {
                        titles: 'to_utc_timestamp(TIMESTAMP date, STRING timezone)',
                        concnent: '    说明:将指定时区中的指定时间戳值转换为UTC时区的相应值。'
                    },
                    {
                        titles: 'trunc(TIMESTAMP date, STRING unit)',
                        concnent: '    说明:剥离字段并可选地舍入TIMESTAMP值。单位参数值区分大小写。此参数字符串可以是以下之一：SYYYY，YYYY，YEAR，SYEAR，YYY，YY，Y：Year。问：季度。MONTH，MON，MM，RM：月。WW，W：一周中的同一天和该月的第一天。DDD，DD，J：日。DAY，DY，D：一周的开始日。（不一定是当天。）HH，HH12，HH24：小时。截断到小时的TIMESTAMP值始终以24小时表示法表示，即使对于HH12参数字符串也是如此。MI：分钟。'
                    },
                    {
                        titles: 'unix_timestamp([STRING datetime [, STRING format]]|[TIMESTAMP datetime])',
                        concnent: '    说明:返回一个整数值，表示当前日期和时间，作为Unix纪元的增量，或者从表示为TIMESTAMP或STRING的指定日期和时间值转换。'
                    },
                    {titles: 'weekofyear(TIMESTAMP date)', concnent: '    说明:从TIMESTAMP的日期部分返回相应的周（1-53）。'},
                    {titles: 'weeks_add(TIMESTAMP date, BIGINT|INT weeks)', concnent: '    说明:返回指定的日期和时间加上一些周数。'},
                    {titles: 'weeks_sub(TIMESTAMP date, BIGINT|INT weeks)', concnent: '    说明:返回指定的日期和时间减去一些周数。'},
                    {titles: 'year(TIMESTAMP date)', concnent: '    说明:从TIMESTAMP的日期部分返回year字段。'},
                    {titles: 'years_add(TIMESTAMP date, BIGINT|INT years)', concnent: '    说明:返回指定的日期和时间加上一些年份。'},
                    {titles: 'years_sub(TIMESTAMP date, BIGINT|INT years)', concnent: '说明:返回指定的日期和时间减去某些年份。'},
                ]
            }],
            [{
                title: '数学计算类操作函数', concnet: [
                    {
                        titles: 'abs(T a)',
                        concnent: '    说明:返回参数的绝对值。使用此功能可确保所有返回值均为正值。这与positive（）函数不同，后者返回其参数不变（即使参数为负数）。'
                    },
                    {titles: 'acos(DOUBLE a)', concnent: '    说明:返回参数的反余弦。'},
                    {titles: 'asin(DOUBLE a)', concnent: '    说明:返回参数的反正弦值。'},
                    {titles: 'atan(DOUBLE a)', concnent: '    说明:返回参数的反正切值。'},
                    {titles: 'atan2(DOUBLE a, DOUBLE b)', concnent: '    说明:返回两个参数的反正切值，参数的符号用于确定结果的象限。'},
                    {titles: 'bin(BIGINT a)', concnent: '    说明:返回整数值的二进制表示形式，即0和1位的字符串。'},
                    {titles: 'ceil(T a)', concnent: '    说明:返回大于或等于参数的最小整数。'},
                    {titles: 'ceiling(T a)', concnent: '    说明:返回大于或等于参数的最小整数。'},
                    {
                        titles: 'conv(T a, INT from_base, INT to_base)',
                        concnent: '    说明:返回特定基数中整数值的字符串表示形式。输入值可以是字符串，例如将十六进制数（如fce2）转换为十进制数。要将返回值用作数字（例如，在转换为基数10时），请使用CAST（）转换为适当的类型。'
                    },
                    {titles: 'cos(DOUBLE a)', concnent: '    说明:返回参数的余弦值。'},
                    {titles: 'cosh(DOUBLE a)', concnent: '    说明:返回参数的双曲余弦值。'},
                    {titles: 'cot(DOUBLE a)', concnent: '    说明:返回参数的余切值。'},
                    {titles: 'dceil(T a)', concnent: '    说明:返回大于或等于参数的最小整数。'},
                    {titles: 'degrees(DOUBLE a)', concnent: '    说明:将参数值从弧度转换为度数。'},
                    {titles: 'dexp(DOUBLE a)', concnent: '    说明:返回提升到参数幂的数学常数e。'},
                    {titles: 'dfloor(T a)', concnent: '    说明:返回小于或等于参数的最大整数。'},
                    {titles: 'dlog1(DOUBLE a)', concnent: '    说明:返回参数的自然对数。'},
                    {titles: 'dpow(DOUBLE a, DOUBLE p)', concnent: '    说明:返回引发第二个参数幂的第一个参数。'},
                    {
                        titles: 'dround(DOUBLE a [, INT d]), round(DECIMAL val, INT d)',
                        concnent: '    说明:舍入浮点值。默认情况下（使用单个参数），舍入到最接近的整数。以.5结尾的值向上舍入为正数，向下舍入为负数（即，远离零）。可选的第二个参数指定小数点后要保留的位数; 大于零的值会产生一个浮点返回值四舍五入到小数点右边所请求的位数。'
                    },
                    {titles: 'dsqrt(DOUBLE a)', concnent: '    说明:返回参数的平方根。'},
                    {
                        titles: 'dtrunc(T a, [NUMBER b])',
                        concnent: '说明:从数值中删除部分或全部小数位。如果没有参数，则删除所有小数位，保留整数值。可选参数指定要包含在返回值中的小数位数，并且仅适用于参数类型为DECIMAL。truncate（）和dtrunc（）是同一函数的别名。'
                    },
                    {titles: 'e()', concnent: '说明:返回数学常数e。'},
                    {titles: 'exp(DOUBLE a)', concnent: '    说明:返回提升到参数幂的数学常数e。'},
                    {
                        titles: 'factorial(T a)',
                        concnent: '    说明:计算整数值的阶乘。它适用于任何整数类型。你可以使用factorial（）函数或者！运营商。阶乘为0为1.同样，factorial（）函数为任何负值返回1。输入参数的最大正值为20; 值21或更大会溢出BIGINT的范围并导致错误。'
                    },
                    {titles: 'floor(T<DOUBLE|DECIMAL> a)', concnent: '    说明:返回小于或等于参数的最大整数。'},
                    {titles: 'fmod(DOUBLE a, DOUBLE b), fmod(FLOAT a, FLOAT b)', concnent: '    说明:返回数字的模数。'},
                    {titles: 'fpow(DOUBLE a, DOUBLE p)', concnent: '    说明:返回引发第二个参数幂的第一个参数。'},
                    {titles: 'fnv_hash(T a)', concnent: '    说明:返回从输入参数派生的一致64位值，以便在应用程序中实现散列逻辑。'},
                    {titles: 'greatest(T a1, T a2, ...)', concnent: '    说明:返回表达式列表中的最大值。'},
                    {titles: 'hex(T a)', concnent: '    说明:返回整数值的十六进制表示形式，或字符串中字符的十六进制表示形式。'},
                    {titles: 'is_inf(DOUBLE a)', concnent: '    说明:测试一个值是否等于特殊值“inf”，表示无穷大。'},
                    {titles: 'is_nan(DOUBLE A)', concnent: '    说明:测试值是否等于特殊值“NaN”，表示“不是数字”。'},
                    {titles: 'least(T a1, T a2, ...)', concnent: '    说明:返回表达式列表中的最小值。'},
                    {titles: 'ln(DOUBLE a)', concnent: '    说明:返回参数的自然对数。'},
                    {titles: 'log(DOUBLE base, DOUBLE a)', concnent: '    说明:返回指定基数的第二个参数的对数。'},
                    {titles: 'log10(DOUBLE a)', concnent: '    说明:返回基数10的参数的对数。'},
                    {titles: 'log2(DOUBLE a)', concnent: '    说明:返回基数2的参数的对数。'},
                    {titles: 'max_bigint()', concnent: '    说明:返回关联的整数类型的最大值。'},
                    {titles: 'MAX_INT()', concnent: '    说明:返回关联的整数类型的最大值。'},
                    {titles: 'max_smallint()', concnent: '    说明:返回关联的整数类型的最大值。'},
                    {titles: 'max_tinyint()', concnent: '说明:返回关联的整数类型的最大值。'},
                    {titles: 'min_bigint()', concnent: '    说明:返回关联的整数类型的最小值（负数）。'},
                    {titles: 'min_int()', concnent: '    说明:返回关联的整数类型的最小值（负数）。'},
                    {titles: 'min_smallint()', concnent: '    说明:返回关联的整数类型的最小值（负数）。'},
                    {titles: 'min_tinyint()', concnent: '    说明:返回关联的整数类型的最小值（负数）。'},
                    {
                        titles: 'mod(T a, T b)',
                        concnent: '    说明:返回数字的模数。相当于％算术运算符。适用于任何大小的整数类型，任何大小的浮点类型，以及具有任何精度和比例的DECIMAL。'
                    },
                    {titles: 'negative(T a)', concnent: '    说明:返回符号反转的参数; 如果参数已经为负，则返回正值。'},
                    {titles: 'pi()', concnent: '    说明:返回常量pi。'},
                    {titles: 'pmod(T<DOUBLE|INT> a, T b)', concnent: '    说明:返回数字的正模数。'},
                    {titles: 'positive(T a)', concnent: '    说明:返回原始参数不变（即使参数为负数）。'},
                    {titles: 'pow(DOUBLE a, DOUBLE p)', concnent: '    说明:返回引发第二个参数幂的第一个参数。'},
                    {titles: 'power(DOUBLE a, DOUBLE p)', concnent: '    说明:返回引发第二个参数幂的第一个参数。'},
                    {
                        titles: 'precision(numeric_expression)',
                        concnent: '    说明:计算将参数表达式的类型表示为DECIMAL值所需的精度（小数位数）。'
                    },
                    {
                        titles: 'quotient(BIGINT numerator, BIGINT denominator), quotient(DOUBLE numerator, DOUBLE denominator)',
                        concnent: '    说明:返回第一个参数除以第二个参数，丢弃任何小数部分。避免像/ SQL运算符一样促进DOUBLE的参数。'
                    },
                    {titles: 'radians(DOUBLE a)', concnent: '    说明:将参数值从度转换为弧度。'},
                    {titles: 'rand([INT seed])', concnent: '    说明:返回0到1之间的随机值。使用种子参数调用rand（）后，它会根据种子值生成一致的随机序列。'},
                    {
                        titles: 'random([INT seed])',
                        concnent: '    说明:返回0到1之间的随机值。使用种子参数调用rand（）后，它会根据种子值生成一致的随机序列。'
                    },
                    {
                        titles: 'round(DOUBLE a [, INT d]), round(DECIMAL val, INT d)',
                        concnent: '    说明:舍入浮点值。默认情况下（使用单个参数），舍入到最接近的整数。以.5结尾的值向上舍入为正数，向下舍入为负数（即，远离零）。可选的第二个参数指定小数点后要保留的位数; 大于零的值会产生一个浮点返回值四舍五入到小数点右边所请求的位数。'
                    },
                    {
                        titles: 'scale(numeric_expression)',
                        concnent: '    说明:计算将参数表达式的类型表示为DECIMAL值所需的比例（小数点右侧的小数位数）。'
                    },
                    {titles: 'sign(DOUBLE a)', concnent: '    说明:返回-1,0或1以指示参数值的有符号。'},
                    {titles: 'sin(DOUBLE a)', concnent: '    说明:返回参数的正弦值。'},
                    {titles: 'sinh(DOUBLE a)', concnent: '    说明:返回参数的双曲正弦值。'},
                    {titles: 'sqrt(DOUBLE a)', concnent: '    说明:返回参数的平方根。'},
                    {titles: 'tan(DOUBLE a)', concnent: '    说明:返回参数的正切值。'},
                    {titles: 'tanh(DOUBLE a)', concnent: '    说明:返回参数的正切值。'},
                    {
                        titles: 'truncate(T<DOUBLE|DECIMAL> a, [NUMBER b])',
                        concnent: '    说明:从数值中删除部分或全部小数位。如果没有参数，则删除所有小数位，保留整数值。可选参数指定要包含在返回值中的小数位数，并且仅适用于参数类型为DECIMAL。truncate（）和dtrunc（）是同一函数的别名。'
                    },
                    {titles: 'unhex(STRING a)', concnent: '    说明:返回一个字符串，其ASCII值对应于参数中的十六进制数字对。'},
                ]
            }],
            [{
                title: '杂项类函数', concnet: [
                    {
                        titles: 'current_database()',
                        concnent: '    说明:返回会话当前正在使用的数据库，如果未选择任何数据库，则为default;或者会话通过USE语句或impalad -d选项切换到的任何数据库'
                    },
                    {titles: 'effective_user()', concnent: '    说明:通常返回与user（）相同的值，除非启用了委托，在这种情况下，它返回委派用户的ID。'},
                    {
                        titles: 'pid()',
                        concnent: '    说明:返回会话连接到的impalad守护程序的进程ID。您可以在低级别调试期间使用它，发出跟踪，显示参数等等的impalad进程的Linux命令。'
                    },
                    {
                        titles: 'user()',
                        concnent: '    说明:返回连接到impalad守护程序的Linux用户的用户名。在没有任何FROM子句的查询中，通常称为单次，以了解授权设置在安全上下文中的应用方式; 一旦知道登录的用户名，就可以检查用户所属的组，并从组列表中通过授权策略文件检查这些组可用的角色。在Impala 2.0及更高版本中，用户（ ）在Kerberized环境中返回完整的Kerberos主体字符串，例如user@example.com。'
                    },
                    {titles: 'uuid()', concnent: '    说明:返回通用唯一标识符，128位值，编码为字符串，其中十六进制数字组由短划线分隔。'},
                ]
            }],
            [{
                title: '字符串操作类函数', concnet: [
                    {titles: 'ascii(STRING str)', concnent: '    说明:返回参数的第一个字符的数字ASCII代码。'},
                    {
                        titles: 'btrim(STRING str [, STRING chars_to_trim])',
                        concnent: '    说明:从STRING值的开头和结尾删除一个或多个字符的所有实例。默认情况下，仅删除空格。如果指定了非NULL可选的第二个参数，则该函数将从字符串的开头和结尾删除该第二个参数中出现的所有字符。'
                    },
                    {titles: 'char_length(STRING a)', concnent: '    说明:返回参数字符串的字符长度。length（）函数的别名。'},
                    {titles: 'character_length(STRING a)', concnent: '    说明:返回参数字符串的字符长度。length（）函数的别名。'},
                    {
                        titles: 'chr(INT character_code)',
                        concnent: '    说明:返回由十进制代码点值指定的字符。结果字符的解释和显示取决于您的系统区域设置。由于仅保证对ASCII范围内的值一致处理Impala字符串值，因此仅对与ASCII字符对应的值使用此函数。特别是，大于255的参数值返回空字符串。'
                    },
                    {titles: 'concat(STRING a, STRING b...)', concnent: '    说明:返回表示连接在一起的所有参数值的单个字符串。'},
                    {
                        titles: 'concat_ws(STRING sep, STRING a, STRING b...)',
                        concnent: '    说明:返回一个字符串，表示连接在一起的第二个和后续参数值，由指定的分隔符分隔。'
                    },
                    {
                        titles: 'find_in_set(STRING str, STRING strList)',
                        concnent: '    说明:返回以逗号分隔的字符串中第一次出现的指定字符串的位置（从1开始）。如果任一参数为NULL，则返回NULL;如果未找到搜索字符串，则返回0;如果搜索字符串包含逗号，则返回0。'
                    },
                    {
                        titles: 'group_concat(STRING s [, STRING sep])',
                        concnent: '    说明:返回一个字符串，表示为结果集的每一行连接在一起的参数值。如果指定了可选的分隔符字符串，则在每对连接值之间添加分隔符。'
                    },
                    {titles: 'initcap(STRING str)', concnent: '    说明:返回首字母大写的输入字符串。'},
                    {
                        titles: 'instr(STRING str, STRING substr [, BIGINT position [, BIGINT occurrence]])',
                        concnent: '    说明:返回较长字符串中第一次出现的子字符串的位置（从1开始）。可选的第三个和第四个参数允许您查找从左侧开始的第一个实例以外的子字符串的实例。'
                    },
                    {titles: 'length(STRING a)', concnent: '    说明:返回参数字符串的字符长度。'},
                    {
                        titles: 'locate(STRING substr, STRING str[, INT pos])',
                        concnent: '    说明:返回较长字符串中第一次出现的子字符串的位置（从1开始），可选地在特定位置之后。'
                    },
                    {titles: 'lower(STRING a)', concnent: '    说明:返回转换为全小写的参数字符串。'},
                    {titles: 'lcase(STRING a)', concnent: '    说明:返回转换为全小写的参数字符串。'},
                    {
                        titles: 'lpad(STRING str, INT len, STRING pad)',
                        concnent: '    说明:根据第一个参数字符串返回指定长度的字符串。如果指定的字符串太短，则会在左侧填充填充字符串中重复的字符序列。如果指定的字符串太长，则会在右侧截断。'
                    },
                    {titles: 'ltrim(STRING a)', concnent: '    说明:返回从左侧删除任何前导空格的参数字符串。'},
                    {
                        titles: 'parse_url(STRING urlString, STRING partToExtract [, STRING keyToExtract])',
                        concnent: '    说明:返回与指定部分对应的URL部分。part参数可以是\'PROTOCOL\'，\'HOST\'，\'PATH\'，\'REF\'，\'AUTHORITY\'，\'FILE\'，\'USERINFO\'或\'QUERY\'。这些文字值需要大写。请求URL的QUERY部分时，您可以选择指定一个键，以便仅从查询字符串中的键值对中检索关联值。'
                    },
                    {
                        titles: 'regexp_extract(STRING subject, STRING pattern, INT index)',
                        concnent: '    说明:基于正则表达式模式从字符串返回指定的（）组。组0指的是整个提取的字符串，而组1,2，依此类推指的是第一个，第二个等等（...）部分。'
                    },
                    {
                        titles: 'regexp_like(STRING source, STRING pattern [, STRING options])',
                        concnent: '    说明:返回true或false以指示源字符串是否包含模式给出的正则表达式中的任何位置。可选的第三个参数由更改匹配方式的字母标志组成，例如i用于不区分大小写的匹配。'
                    },
                    {
                        titles: 'regexp_replace(STRING initial, STRING pattern, STRING replacement)',
                        concnent: '    说明:返回初始参数，其中正则表达式模式由最终参数字符串替换。'
                    },
                    {titles: 'repeat(STRING str, INT n)', concnent: '    说明:返回重复指定次数的参数字符串。'},
                    {titles: 'reverse(STRING a)', concnent: '    说明:返回带有相反顺序字符的参数字符串。'},
                    {
                        titles: 'rpad(STRING str, INT len, STRING pad)',
                        concnent: '    说明:根据第一个参数字符串返回指定长度的字符串。如果指定的字符串太短，则在右侧填充，并使用填充字符串中重复的字符序列。如果指定的字符串太长，则会在右侧截断。'
                    },
                    {titles: 'rtrim(STRING a)', concnent: '    说明:返回从右侧删除任何尾随空格的参数字符串。'},
                    {titles: 'space(INT n)', concnent: '    说明:返回指定数量的空格的连接字符串。重复的简写（\'\'，n）。'},
                    {
                        titles: 'split_part(STRING source, STRING delimiter, BIGINT n)',
                        concnent: '    说明:返回分隔字符串中的第n个字段。字段从1开始编号。分隔符可以包含多个字符，而不仅仅是单个字符。分隔符的所有匹配都是完全匹配的，而不是使用任何正则表达式模式。'
                    },
                    {
                        titles: 'strleft(STRING a, INT num_chars)',
                        concnent: '    说明:返回字符串最左边的字符。用2个参数调用substr（）的简写。'
                    },
                    {
                        titles: 'strright(STRING a, INT num_chars)',
                        concnent: '    说明:返回字符串最右边的字符。用2个参数调用substr（）的简写。'
                    },
                    {
                        titles: 'substr(STRING a, INT start [, INT len])',
                        concnent: '    说明:返回从指定点开始的字符串部分，可选地具有指定的最大长度。字符串中的字符从1开始编制索引。'
                    },
                    {
                        titles: 'substring(STRING a, INT start [, INT len])',
                        concnent: '    说明:返回从指定点开始的字符串部分，可选地具有指定的最大长度。字符串中的字符从1开始编制索引。'
                    },
                    {
                        titles: 'translate(STRING input, STRING from, STRING to)',
                        concnent: '    说明:返回输入字符串，其中一组字符由另一组字符替换。'
                    },
                    {titles: 'trim(STRING a)', concnent: '    说明:返回删除了前导和尾随空格的输入字符串。与通过ltrim（）和rtrim（）传递字符串相同。'},
                    {titles: 'upper(STRING a)', concnent: '    说明:返回转换为全大写的参数字符串。'},
                    {titles: 'ucase(STRING a)', concnent: '    说明:返回转换为全大写的参数字符串。'},
                ]
            }],
            [{
                title: '类型转换类函数', concnet: [
                    {
                        titles: 'cast(a as T)',
                        concnent: '    说明:将表达式expr的结果转换为类型T.例如，cast（\'1\'作为BIGINT）将字符串\'1\'转换为其整数表示。如果转换不成功，则返回null。如果强制转换（expr为boolean）Hive为非空字符串返回true。'
                    },
                    {
                        titles: 'typeof(T a)',
                        concnent: '    说明:返回与表达式对应的数据类型的名称。对于具有额外属性的类型，例如CHAR和VARCHAR的长度，或DECIMAL的精度和比例，包括该类型的完整规范。'
                    },
                ]
            }],
        ],
        right: [
            [{
                title: '聚合类操作函数', concnet: [
                    {titles: 'appx_median([DISTINCT|ALL] T col)', concnent: '说明: 一个聚合函数，返回的值大约是输入值集中值的中位数（中点）。'},
                    {
                        titles: 'avg([DISTINCT|ALL] col)',
                        concnent: '说明: 一个聚合函数，它返回一组数字的平均值。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给AVG的所有值都为NULL，则AVG返回NULL。'
                    },
                    {titles: 'count([DISTINCT|ALL] col)', concnent: '说明: 一个聚合函数，它返回行数或非NULL行数。'},
                    {
                        titles: 'max([DISTINCT | ALL] T col)',
                        concnent: '说明: 一个聚合函数，它从一组数字中返回最大值。与MIN功能相反。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MAX的所有值都为NULL，则MAX返回NULL。'
                    },
                    {
                        titles: 'min([DISTINCT | ALL] T col)',
                        concnent: '说明: 一个聚合函数，它从一组数字中返回最小值。与MAX功能相反。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MIN的所有值都为NULL，则MIN返回NULL。'
                    },
                    {
                        titles: 'sum([DISTINCT | ALL] col)',
                        concnent: '说明: 一个返回一组数字之和的聚合函数。它的单个参数可以是数字列，也可以是应用于列值的函数或表达式的数值结果。将忽略指定列的NULL值的行。如果表为空，或者提供给MIN的所有值都为NULL，则SUM返回NULL。'
                    },
                    {
                        titles: 'group_concat([ALL] col [, separator])',
                        concnent: '说明: 一个聚合函数，它返回一个字符串，表示为结果集的每一行连接在一起的参数值。如果指定了可选的分隔符字符串，则在每对连接值之间添加分隔符。默认分隔符是逗号后跟空格。'
                    },
                    {
                        titles: 'ndv([DISTINCT | ALL] col)',
                        concnent: '说明: 一个聚合函数，返回一个类似于COUNT（DISTINCT col）结果的近似值，即“不同值的数量”。它比COUNT和DISTINCT的组合快得多，并且使用恒定的内存量，因此对于具有高基数的列而言，内存密集度较低。'
                    },
                    {titles: 'stddev([DISTINCT | ALL] col)', concnent: '说明: 返回组中数字列的标准偏差。'},
                    {
                        titles: 'percentile_approx(DOUBLE col, p, [, B]), array<DOUBLE> percentile_approx(DOUBLE col, array(p1 [, p2]...), [, B])',
                        concnent: '    说明:返回组中数字列（包括浮点类型）的近似第p个百分位数（或百分位数p1，p2，..）。B参数以内存为代价控制近似精度。较高的值会产生更好的近似值，默认值为10,000。当col中的不同值的数量小于B时，这给出了精确的百分位值。'
                    },
                    {titles: 'variance(col)', concnent: '    说明:返回组中数字列的方差。'},
                    {titles: 'var_pop(col)', concnent: '    说明:返回组中数字列的方差。'},
                    {titles: 'var_samp(col)', concnent: '    说明:返回组中数字列的无偏样本方差。'},
                    {titles: 'regr_avgx(T independent, T dependent)', concnent: '    说明:相当于avg（依赖）。截至Hive 2.2.0。'},
                    {titles: 'regr_avgy(T independent, T dependent)', concnent: '    说明:相当于avg（依赖）。截至Hive 2.2.0。'},
                    {
                        titles: 'regr_count(T independent, T dependent)',
                        concnent: '    说明:返回用于拟合线性回归线的非空对的数量。截至Hive 2.2.0。'
                    },
                    {
                        titles: 'regr_intercept(T independent, T dependent)',
                        concnent: '    说明:返回线性回归线的y轴截距，即方程式中的b值= a * independent + b。截至Hive 2.2.0。'
                    },
                    {titles: 'regr_r2(T independent, T dependent)', concnent: '    说明:返回回归的确定系数。截至Hive 2.2.0。'},
                    {
                        titles: 'regr_slope(T independent, T dependent)',
                        concnent: '    说明:返回线性回归线的斜率，即方程式中的a值= a * independent + b。截至Hive 2.2.0。'
                    },
                    {
                        titles: 'regr_sxx(T independent, T dependent)',
                        concnent: '    说明:等效于regr_count（独立，依赖）* var_pop（依赖）。截至Hive 2.2.0。'
                    },
                    {
                        titles: 'regr_sxy(T independent, T dependent)',
                        concnent: '    说明:相当于regr_count（独立，依赖）* covar_pop（独立，依赖）。截至Hive 2.2.0。'
                    },
                    {
                        titles: 'regr_syy(T independent, T dependent)',
                        concnent: '    说明:相当于regr_count（独立，依赖）* var_pop（独立）。截至Hive 2.2.0。'
                    },
                ]
            }],
            [{
                title: '分析类操作函数', concnet: [
                    {
                        titles: 'dense_rank（）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:返回从1开始的升序整数序列。输出序列为ORDER BY表达式的重复值生成重复的整数。'
                    },
                    {
                        titles: 'first_value（expr）OVER（[partition_by_clause] order_by_clause [window_clause]）',
                        concnent: '    说明:从窗口的第一行返回表达式值。如果输入表达式为NULL，则返回值为NULL。'
                    },
                    {
                        titles: 'lag（expr [，offset] [，default]）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:此函数使用前一行的列值返回表达式的值。您指定一个整数偏移量，它指定行位置在当前行之前的某些行数。表达式参数中的任何列引用都引用该前一行的列值。'
                    },
                    {
                        titles: 'last_value（expr）OVER（[partition_by_clause] order_by_clause [window_clause]）',
                        concnent: '    说明:返回窗口最后一行的表达式值。如果输入表达式为NULL，则返回值为NULL。'
                    },
                    {
                        titles: 'lead（expr [，offset] [，default]）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:此函数使用以下行中的列值返回表达式的值。您指定一个整数偏移量，它指定行位置在当前行之后的某些行数。表达式参数中的任何列引用都引用该后一行中的列值。'
                    },
                    {
                        titles: 'rank（）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:返回从1开始的升序整数序列。输出序列为ORDER BY表达式的重复值生成重复的整数。在为“绑定”输入值生成重复输出值之后，该函数将序列增加绑定值的数量。'
                    },
                    {
                        titles: 'row_number（）OVER（[partition_by_clause] order_by_clause）',
                        concnent: '    说明:返回从1开始的整数递增序列。为PARTITIONED BY子句生成的每个组启动序列。输出序列包括重复输入值的不同值。因此，无论重复的输入值如何，序列都不会包含任何重复或间隙。'
                    },
                ]
            }],
            [{
                title: '汇集类操作函数', concnet: [
                    {titles: 'array_contains(Array<T> a, val)', concnent: '说明:如果数组包含值，则返回TRUE。'},
                    {titles: 'array<K.V> map_keys(Map<K.V> a)', concnent: '    说明:返回包含输入映射键的无序数组。'},
                    {titles: 'array<K.V> map_values(Map<K.V> a)', concnent: '    说明:返回包含输入映射值的无序数组。'},
                    {titles: 'size(Map<K.V>|Array<T> a)', concnent: '    说明:返回地图或数组类型中的元素数。'},
                    {titles: 'sort_array(Array<T> a)', concnent: '    说明:根据数组元素的自然顺序按升序对输入数组进行排序并返回它。'},
                ]
            }],
            [{
                title: '综合类操作函数', concnet: [
                    {titles: 'array(val1, val2, ...)', concnent: '    说明:使用给定元素创建数组。'},
                    {titles: 'create_union(tag, val1, val2, ...)', concnent: '    说明:使用tag参数指向的值创建联合类型。'},
                    {titles: 'map(key1, value1, ...)', concnent: '    说明:使用给定的键/值对创建地图。'},
                    {titles: 'named_struct(name1, val1, ...)', concnent: '    说明:使用给定的字段名称和值创建结构。'},
                    {titles: 'struct(val1, val2, ...)', concnent: '    说明:使用给定的字段值创建结构。结构字段名称为col1，col2，....'},
                ]
            }],
            [{
                title: '条件类操作函数', concnet: [
                    {
                        titles: 'assert_true(BOOLEAN condition)',
                        concnent: '    说明:如果\'condition\'不为真，则抛出异常，否则返回null（从Hive 0.8.0开始）。例如，选择assert_true（2 <1）。'
                    },
                    {titles: 'coalesce(T v1, T v2, ...)', concnent: '    说明:返回第一个不为NULL的v，如果所有v都为NULL，则返回NULL。'},
                    {
                        titles: 'if(BOOLEAN testCondition, T valueTrue, T valueFalseOrNull)',
                        concnent: '    说明:当testCondition为true时返回valueTrue，否则返回valueFalseOrNull。'
                    },
                    {titles: 'isnotnull(a)', concnent: '    说明:如果a不为NULL则返回true，否则返回false。'},
                    {titles: 'nullif(a, b)', concnent: '    说明:如果a为NULL则返回true，否则返回false。'},
                    {
                        titles: 'nvl(T value, T default_value)',
                        concnent: '    说明:如果value为null则返回默认值，否则返回value（从Hive 0.11开始）。'
                    }
                ]
            }],
            [{
                title: '日期类操作函数', concnet: [
                    {
                        titles: 'add_months(DATE|STRING|TIMESTAMP start_date, INT num_months)',
                        concnent: '    说明:返回start_date之后的num_months日期（从Hive 1.1.0开始）。start_date是字符串，日期或时间戳。num_months是一个整数。start_date的时间部分被忽略。如果start_date是该月的最后一天，或者结果月份的天数少于start_date的day组件，则结果是结果月份的最后一天。否则，结果与start_date具有相同的日期组件。'
                    },
                    {
                        titles: 'current_date',
                        concnent: '    说明:返回查询评估开始时的当前日期（从Hive 1.2.0开始）。同一查询中current_date的所有调用都返回相同的值。'
                    },
                    {
                        titles: 'current_timestamp()',
                        concnent: '    说明:返回查询评估开始时的当前时间戳（从Hive 1.2.0开始）。同一查询中的current_timestamp的所有调用都返回相同的值。'
                    },
                    {
                        titles: 'datediff(STRING enddate, STRING startdate)',
                        concnent: '    说明:返回从startdate到enddate的天数：datediff（\'2009-03-01\'，\'2009-02-27\'）= 2。'
                    },
                    {
                        titles: 'date_add(DATE startdate, INT days)',
                        concnent: '    说明:添加开始日期的天数：date_add（\'2008-12-31\'，1）=\'2009-01-01\'。T = pre 2.1.0：STRING，2.1.0 on：DATE'
                    },
                    {
                        titles: 'date_format(DATE|TIMESTAMP|STRING ts, STRING fmt)',
                        concnent: '    说明:将日期/时间戳/字符串转换为字符串值，格式为日期格式fmt（从Hive 1.2.0开始）指定的格式。支持的格式是Java SimpleDateFormat格式 - https://docs.oracle.com/javase/7/docs/api/java/text/SimpleDateFormat.html。第二个参数fmt应该是常量。示例：date_format（\'2015-04-08\'，\'y\'）=\'2015\'。'
                    },
                    {
                        titles: 'date_sub(DATE startdate, INT days)',
                        concnent: '    说明:减去开始日期的天数：date_sub（\'2008-12-31\'，1）=\'2008-12-30\'。T = pre 2.1.0：STRING，2.1.0 on：DATE'
                    },
                    {
                        titles: 'day(STRING date)',
                        concnent: '    说明:返回日期或时间戳字符串的日期部分：day（\'1970-11-01 00:00:00\'）= 1，day（\'1970-11-01\'）= 1。'
                    },
                    {
                        titles: 'dayofmonth(STRING date)',
                        concnent: '    说明:返回日期或时间戳字符串的日期部分：dayofmonth（\'1970-11-01 00:00:00\'）= 1，dayofmonth（\'1970-11-01\'）= 1。'
                    },
                    {
                        titles: 'extract(field FROM source)',
                        concnent: '    说明:从源（从Hive 2.2.0开始）检索诸如天或小时的字段。源必须是日期，时间戳，间隔或可以转换为日期或时间戳的字符串。支持的字段包括：day，dayofweek，hour，minute，month，quarter，second，week和year。'
                    },
                    {
                        titles: 'from_unixtime(BIGINT unixtime [, STRING format])',
                        concnent: '    说明:将时间字符串格式为yyyy-MM-dd HH：mm：ss转换为Unix时间戳（以秒为单位），使用默认时区和默认语言环境，如果失败则返回0：unix_timestamp（\'2009-03-20 11:30:01 \'）= 1237573801'
                    },
                    {
                        titles: 'from_utc_timestamp(T a, STRING timezone)',
                        concnent: '    说明:假设给定的时间戳是UTC并转换为给定的时区（从Hive 0.8.0开始）。例如，from_utc_timestamp（\'1970-01-01 08:00:00\'，\'PST\'）返回1970-01-01 00:00:00'
                    },
                    {
                        titles: 'hour(STRING date)',
                        concnent: '    说明:返回时间戳的小时：小时（\'2009-07-30 12:58:59\'）= 12，小时（\'12：58：59\'）= 12。'
                    },
                    {
                        titles: 'last_day(STRING date)',
                        concnent: '    说明:返回日期所属月份的最后一天（从Hive 1.1.0开始）。date是格式为\'yyyy-MM-dd HH：mm：ss\'或\'yyyy-MM-dd\'的字符串。日期的时间部分被忽略。'
                    },
                    {titles: 'minute(STRING date)', concnent: '    说明:返回时间戳的分钟。'},
                    {
                        titles: 'month(STRING date)',
                        concnent: '    说明:返回日期或时间戳字符串的月份部分：月份（\'1970-11-01 00:00:00\'）= 11，月份（\'1970-11-01\'）= 11。'
                    },
                    {
                        titles: 'months_between(DATE|TIMESTAMP|STRING date1, DATE|TIMESTAMP|STRING date2)',
                        concnent: '    说明:返回date1和date2之间的月数（从Hive 1.2.0开始）。如果date1晚于date2，则结果为正。如果date1早于date2，则结果为负数。如果date1和date2是该月的同一天或两个月的最后几天，则结果始终为整数。否则，UDF将根据31天的月份计算结果的小数部分，并考虑时间组件date1和date2的差异。date1和date2类型可以是\'yyyy-MM-dd\'或\'yyyy-MM-dd HH：mm：ss\'格式的日期，时间戳或字符串。结果四舍五入到小数点后8位。示例：months_between（\'1997-02-28 10:30:00\'，\'1996-10-30\'）= 3.94959677'
                    },
                    {
                        titles: 'next_day(STRING start_date, STRING day_of_week)',
                        concnent: '    说明:返回晚于start_date的第一个日期，并命名为day_of_week（从Hive 1.2.0开始）。start_date是一个字符串/日期/时间戳。day_of_week是一周中的2个字母，3个字母或全名（例如，Mo，星期二，星期五）。start_date的时间部分被忽略。示例：next_day（\'2015-01-14\'，\'TU\'）= 2015-01-20。'
                    },
                    {
                        titles: 'quarter(DATE|TIMESTAMP|STRING a)',
                        concnent: '    说明:返回1到4范围内的日期，时间戳或字符串的一年中的季度。示例：quarter（\'2015-04-08\'）= 2。'
                    },
                    {titles: 'second(STRING date)', concnent: '    说明:返回时间戳的第二个。'},
                    {
                        titles: 'to_date(STRING timestamp)',
                        concnent: '    说明:返回时间戳字符串的日期部分，例如to_date（\'1970-01-01 00:00:00\'）。T = pre 2.1.0：STRING 2.1.0 on：DATE'
                    },
                    {
                        titles: 'to_utc_timestamp(T a, STRING timezone)\t',
                        concnent: '    说明:假设给定时间戳在给定时区内并转换为UTC（从Hive 0.8.0开始）。例如，to_utc_timestamp（\'1970-01-01 00:00:00\'，\'PST\'）返回1970-01-01 08:00:00。'
                    },
                    {
                        titles: 'trunc(STRING date, STRING format)',
                        concnent: '    说明:返回截断为格式指定单位的日期（从Hive 1.2.0开始）。支持的格式：MONTH / MON / MM，YEAR / YYYY / YY。示例：trunc（\'2015-03-17\'，\'MM\'）= 2015-03-01。'
                    },
                    {
                        titles: 'unix_timestamp([STRING date [, STRING pattern]])',
                        concnent: '    说明:将给定模式的时间字符串转换为Unix时间戳（以秒为单位），如果失败则返回0：unix_timestamp（\'2009-03-20\'，\'yyyy-MM-dd\'）= 1237532400。'
                    },
                    {
                        titles: 'weekofyear(STRING date)',
                        concnent: '    说明:返回时间戳字符串的周数：weekofyear（\'1970-11-01 00:00:00\'）= 44，weekofyear（\'1970-11-01\'）= 44。'
                    },
                    {
                        titles: 'year(STRING date)',
                        concnent: '    说明:返回日期或时间戳字符串的年份部分：年（\'1970-01-01 00:00:00\'）= 1970，年（\'1970-01-01\'）= 1970'
                    }
                ]
            }],
            [{
                title: '数学计算类操作函数', concnet: [
                    {titles: 'abs(DOUBLE a)', concnent: '    说明:返回绝对值。'},
                    {titles: 'acos(DECIMAL|DOUBLE a)', concnent: '    说明:返回if -1 <= a <= 1的反余弦，否则返回NULL。'},
                    {titles: 'asin(DECIMAL|DOUBLE a)', concnent: '    说明:返回if -1 <= a <= 1的反正弦，否则返回NULL。'},
                    {titles: 'atan(DECIMAL|DOUBLE a)', concnent: '    说明:返回a的反正切值。'},
                    {titles: 'bin(BIGINT a)', concnent: '    说明:以二进制格式返回数字'},
                    {
                        titles: 'bround(DOUBLE a [, INT decimals])',
                        concnent: '    说明:返回使用HALF_EVEN舍入模式的带圆角的BIGINT值，带有可选的小数位d。'
                    },
                    {titles: 'cbft(DOUBLE a)', concnent: '    说明:返回double值的多维数据集根。'},
                    {titles: 'ceil(DOUBLE a)', concnent: '    说明:返回等于或大于a的最小BIGINT值。'},
                    {titles: 'ceiling(DOUBLE a)', concnent: '    说明:返回等于或大于a的最小BIGINT值。'},
                    {
                        titles: 'conv( a, INT from_base, INT to_base)',
                        concnent: '    说明:将数字从给定的基数转换为另一个'
                    },
                    {titles: 'cos(DECIMAL|DOUBLE a)', concnent: '    说明:返回a的余弦值（a以弧度表示）。'},
                    {titles: 'degrees(DECIMAL|DOUBLE a)', concnent: '    说明:将a的值从弧度转换为度。'},
                    {titles: 'e()', concnent: '    说明:返回e的值。'},
                    {titles: 'exp(DECIMAL|DOUBLE a)', concnent: '    说明:返回e ^ a，其中e是自然对数的基数。'},
                    {titles: 'factorial(INT a)', concnent: '    说明:返回a的阶乘。有效a是[0..20]。'},
                    {titles: 'floor(DOUBLE a)', concnent: '    说明:返回等于或小于a的最大BIGINT值。'},
                    {
                        titles: 'greatest(T a1, T a2, ...)',
                        concnent: '    说明:返回值列表的最大值。修复了当一个或多个参数为NULL时返回NULL，并且严格类型限制放宽，与“>”运算符一致。'
                    },
                    {
                        titles: 'hex(BIGINT|BINARY|STRING a)',
                        concnent: '    说明:如果参数是INT或二进制，则十六进制将数字作为十六进制格式的STRING返回。否则，如果数字是STRING，它会将每个字符转换为十六进制表示形式并返回结果STRING。'
                    },
                    {
                        titles: 'least(T a1, T a2, ...)',
                        concnent: '    说明:返回值列表的最小值。修复了当一个或多个参数为NULL时返回NULL，并且严格类型限制放宽，与“<”运算符一致。'
                    },
                    {titles: 'ln(DECIMAL|DOUBLE a)', concnent: '    说明:返回参数a的自然对数'},
                    {titles: 'log(DECIMAL|DOUBLE base, DECIMAL|DOUBLE a)', concnent: '    说明:返回参数a的基本对数。'},
                    {titles: 'log10(DECIMAL|DOUBLE a)', concnent: '    说明:返回参数a的以10为底的对数。'},
                    {titles: 'log2(DECIMAL|DOUBLE a)', concnent: '    说明:返回参数a的base-2对数。'},
                    {titles: 'negative(T<DOUBLE|INT> a)', concnent: '    说明:返回-a。'},
                    {titles: 'pi()', concnent: '    说明:返回pi的值。'},
                    {titles: 'pmod(T<DOUBLE|INT> a, T b)', concnent: '    说明:返回mod b的正值'},
                    {titles: 'positive(T<DOUBLE|INT> a)', concnent: '    说明:返回一个。'},
                    {titles: 'pow(DOUBLE a, DOUBLE p)', concnent: '    说明:返回一个^ p'},
                    {titles: 'power(DOUBLE a, DOUBLE p)', concnent: '    说明:返回一个^ p'},
                    {titles: 'radians(DECIMAL|DOUBLE a)', concnent: '    说明:将a的值从度转换为弧度。'},
                    {titles: 'rand([INT seed])', concnent: '    说明:返回从0到1均匀分布的随机数（从行到行的变化）。指定种子将确保生成的随机数序列是确定性的。'},
                    {
                        titles: 'round(DOUBLE a [, INT d])',
                        concnent: '    说明:返回从0到1均匀分布的随机数（从行到行的变化）。指定种子将确保生成的随机数序列是确定性的。'
                    },
                    {
                        titles: 'shiftleft(T<BIGINT|INT|SMALLINT|TINYINT> a, INT b)',
                        concnent: '    说明:按位左移。将位置向左移位。返回tinyint，smallint和int的int。返回bigint的bigint a。'
                    },
                    {
                        titles: 'shiftright(T<BIGINT|INT|SMALLINT|TINYINT> a, INT b)',
                        concnent: '    说明:按位右移。将位置向右移动。返回tinyint，smallint和int的int。返回bigint的bigint a。'
                    },
                    {
                        titles: 'shiftrightunsigned(T<BIGINT|INT|SMALLINT|TINYINT> a, INT b)',
                        concnent: '    说明:按位无符号右移。将位置向右移动。返回tinyint，smallint和int的int。返回bigint的bigint a。'
                    },
                    {
                        titles: 'sign(T<DOUBLE|INT> a)',
                        concnent: '    说明:返回a的符号为\'1.0\'（如果a为正）或\'-1.0\'（如果a为负），否则为\'0.0\'。十进制版本返回INT而不是DOUBLE。'
                    },
                    {titles: 'sin(DECIMAL|DOUBLE a)', concnent: '    说明:返回a的正弦（a以弧度表示）。'},
                    {titles: 'sqrt(DECIMAL|DOUBLE a)', concnent: '    说明:返回a的平方根'},
                    {titles: 'tan(DECIMAL|DOUBLE a)', concnent: '    说明:返回a的正切（a以弧度表示）。'},
                    {titles: 'unhex(STRING a)', concnent: '    说明:反转十六进制。将每对字符解释为十六进制数，并转换为数字的字节表示形式。'},
                    {
                        titles: 'width_bucket(NUMBER expr, NUMBER min_value, NUMBER max_value, INT num_buckets)',
                        concnent: '    说明:通过将expr映射到第i个同等大小的存储桶，返回0到num_buckets + 1之间的整数。通过将[min_value，max_value]除以相同大小的区域来制作桶。如果expr <min_value，则返回1，如果expr> max_value则返回num_buckets + 1。（从Hive 3.0.0开始）   '
                    }
                ]
            }],
            [{
                title: '杂项类操作函数', concnet: [
                    {
                        titles: 'aes_decrypt(BINARY input, STRING|BINARY key)',
                        concnent: '    说明:使用AES解密输入（从Hive 1.3.0开始）。可以使用128,192或256位的密钥长度。如果安装了Java Cryptography Extension（JCE）Unlimited Strength Jurisdiction Policy Files，则可以使用192和256位密钥。如果任一参数为NULL或密钥长度不是允许值之一，则返回值为NULL。示例：aes_decrypt（unbase64（\'y6Ss + zCYObpCbgfWfyNWTw ==\'），\'1234567890123456\'）=\'ABC\'。'
                    },
                    {
                        titles: 'aes_encrypt(STRING|BINARY input, STRING|BINARY key)',
                        concnent: '    说明:使用AES加密输入（从Hive 1.3.0开始）。可以使用128,192或256位的密钥长度。如果安装了Java Cryptography Extension（JCE）Unlimited Strength Jurisdiction Policy Files，则可以使用192和256位密钥。如果任一参数为NULL或密钥长度不是允许值之一，则返回值为NULL。示例：base64（aes_encrypt（\'ABC\'，\'1234567890123456\'））=\'y6Ss + zCYObpCbgfWfyNWTw ==\'。'
                    },
                    {
                        titles: 'crc32(STRING|BINARY a)',
                        concnent: '    说明:计算字符串或二进制参数的循环冗余校验值并返回bigint值（从Hive 1.3.0开始）。示例：crc32（\'ABC\'）= 2743272264。'
                    },
                    {titles: 'current_database()', concnent: '    说明:返回当前数据库名称（从Hive 0.13.0开始）。'},
                    {titles: 'current_user()', concnent: '    说明:返回当前用户名（从Hive 1.2.0开始）。'},
                    {
                        titles: 'get_json_object(STRING json, STRING jsonPath)',
                        concnent: '    说明:支持限制版本的JSONPath（$：Root对象，。：Child运算符，[]：数组的下标运算符，*：[]的通配符'
                    },
                    {titles: 'hash(a1[, a2...])', concnent: '    说明:返回参数的哈希值。（截至Hive 0.4。）'},
                    {
                        titles: 'java_method(class, method[, arg1[, arg2..]])',
                        concnent: '    说明:通过使用反射匹配参数签名来调用Java方法。（截至Hive 0.9.0。）'
                    },
                    {
                        titles: 'md5(STRING|BINARY a)',
                        concnent: '    说明:计算字符串或二进制文件的MD5 128位校验和（从Hive 1.3.0开始）。该值以32个十六进制数字的字符串形式返回，如果参数为NULL，则返回NULL。示例：md5（\'ABC\'）=\'902fbdd2b1df0c4f70b4a5d23525e932\'。'
                    },
                    {
                        titles: 'reflect(class, method[, arg1[, arg2..]])',
                        concnent: '    说明:通过使用反射匹配参数签名来调用Java方法。（截至Hive 0.7.0。）'
                    },
                    {
                        titles: 'sha(STRING|BINARY a)',
                        concnent: '    说明:计算字符串或二进制的SHA-1摘要，并将该值作为十六进制字符串返回（从Hive 1.3.0开始）。示例：sha1（\'ABC\'）=\'3c01bdbb26f358bab27f267924aa2c9a03fcfdb8\'。'
                    },
                    {
                        titles: 'sha1(STRING|BINARY a)',
                        concnent: '    说明:计算字符串或二进制的SHA-1摘要，并将该值作为十六进制字符串返回（从Hive 1.3.0开始）。示例：sha1（\'ABC\'）=\'3c01bdbb26f358bab27f267924aa2c9a03fcfdb8\'。'
                    },
                    {
                        titles: 'sha2(STRING|BINARY a, INT b)',
                        concnent: '    说明:计算SHA-2系列散列函数（SHA-224，SHA-256，SHA-384和SHA-512）（从Hive 1.3.0开始）。第一个参数是要散列的字符串或二进制文件。第二个参数表示结果的所需位长度，其值必须为224,256,384,512或0（相当于256）。从Java 8开始支持SHA-224。如果任一参数为NULL或散列长度不是允许值之一，则返回值为NULL。示例：sha2（\'ABC\'，256）=\'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78\'。'
                    },
                    {
                        titles: 'version()',
                        concnent: '    说明:返回Hive版本（从Hive 2.1.0开始）。该字符串包含2个字段，第一个是构建号，第二个是构建哈希。示例：“select version（）;” 可能会返回“2.1.0.2.5.0.0-1245 r027527b9c5ce1a3d7d0b6d2e6de2378fb0c39232”。实际结果取决于您的构建。'
                    },
                    {
                        titles: 'array<STRING> xpath(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_boolean(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_double(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_float(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_int(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_long(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_number(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_short(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    },
                    {
                        titles: 'xpath_string(STRING xml, STRING xpath)',
                        concnent: '    说明:UDF的xpath系列是JDK提供的Java XPath库javax.xml.xpath的包装器。该库基于XPath 1.0规范。'
                    }
                ]
            }],
            [{
                title: '字符串操作类函数', concnet: [
                    {titles: 'ascii(STRING str)', concnent: '    说明:返回str的第一个字符的数值。'},
                    {titles: 'base64(BINARY bin)', concnent: '    说明:将参数从二进制转换为基本64字符串（从Hive 0.12.0开始）。'},
                    {
                        titles: 'chr(BIGINT|DOUBLE a)',
                        concnent: '    说明:返回二进制等效于a的ASCII字符（从Hive 1.3.0和2.1.0开始）。如果a大于256，则结果等于chr（a％256）。示例：select chr（88）; 返回“X”。'
                    },
                    {
                        titles: 'char_length(STRING a)',
                        concnent: '    说明:返回str中包含的UTF-8字符数（从Hive 2.2.0开始）。这是character_length的简写。'
                    },
                    {
                        titles: 'character_length(STRING a)',
                        concnent: '    说明:返回str中包含的UTF-8字符数（从Hive 2.2.0开始）。函数char_length是此函数的简写。'
                    },
                    {
                        titles: 'concat(STRING|BINARY a, STRING|BINARY b...)',
                        concnent: '    说明:返回按顺序连接作为参数传入的字符串或字节所产生的字符串或字节。例如，concat（\'foo\'，\'bar\'）会产生\'foobar\'。请注意，此函数可以使用任意数量的输入字符串。'
                    },
                    {
                        titles: 'concat_ws(STRING sep, STRING a, STRING b...), concat_ws(STRING sep, Array<STRING>)',
                        concnent: '    说明:像concat（），但使用自定义分隔符SEP。'
                    },
                    {
                        titles: 'array<struct<STRING,DOUBLE>> context_ngrams(Array<Array<STRING>>, Array<STRING>, INT k, INT pf)',
                        concnent: '    说明:在给定一串“上下文”的情况下，从一组标记化句子返回top-k上下文N-gram。'
                    },
                    {
                        titles: 'decode(BINARY bin, STRING charset)',
                        concnent: '    说明:使用提供的字符集（\'US-ASCII\'，\'ISO-8859-1\'，\'UTF-8\'，\'UTF-16BE\'，\'UTF-16LE\'，\'UTF-）将第一个参数解码为String 16\' ）。如果任一参数为null，则结果也将为null。（截至Hive 0.12.0。）'
                    },
                    {
                        titles: 'elt(INT n, STRING str, STRING str1, ...])',
                        concnent: '    说明:返回索引号处的字符串。例如，elt（2，\'hello\'，\'world\'）返回\'world\'。如果N小于1或大于参数个数，则返回NULL。'
                    },
                    {
                        titles: 'encode(STRING src, STRING charset)',
                        concnent: '    说明:使用提供的字符集（\'US-ASCII\'，\'ISO-8859-1\'，\'UTF-8\'，\'UTF-16BE\'，\'UTF-16LE\'，\'UTF-）将第一个参数编码到BINARY中16\' ）。如果任一参数为null，则结果也将为null。（截至Hive 0.12.0。）'
                    },
                    {
                        titles: 'field(T val, T val1, ...])',
                        concnent: '    说明:返回val1，val2，val3，...列表中的val索引，如果未找到则返回0。例如，字段（\'world\'，\'say\'，\'hello\'，\'world\'）返回3.支持所有基本类型，使用str.equals（x）比较参数。如果val为NULL，则返回值为0。'
                    },
                    {
                        titles: 'find_in_set(STRING str, STRING strList)',
                        concnent: '    说明:返回strList中str的第一个出现位置，其中strList是逗号分隔的字符串。如果任一参数为null，则返回null。如果第一个参数包含任何逗号，则返回0。例如，find_in_set（\'ab\'，\'abc，b，ab，c，def\'）返回3。'
                    },
                    {
                        titles: 'format_number(NUMBER x, INT d)',
                        concnent: '    说明:将数字X格式化为\'＃，###，###。##\'等格式，舍入到D小数位，并将结果作为字符串返回。如果D为0，则结果没有小数点或小数部分。（从Hive 0.10.0开始;在Hive 0.14.0中修复了浮点类型的错误，在Hive 0.14.0中添加了十进制类型支持）'
                    },
                    {
                        titles: 'get_json_object(STRING json_string, STRING path)',
                        concnent: '    说明:基于指定的json路径从json字符串中提取json对象，并返回提取的json对象的json字符串。如果输入的json字符串无效，它将返回null。注意：json路径只能包含字符[0-9a-z_]，即没有大写或特殊字符。此外，键*不能以数字开头。*这是由于对Hive列名称的限制。'
                    },
                    {
                        titles: 'initcap(STRING a)',
                        concnent: '    说明:返回字符串，每个单词的第一个字母为大写，所有其他字母均为小写。单词由空格分隔。（截至Hive 1.1.0。）'
                    },
                    {
                        titles: 'instr(STRING str, STRING substr)',
                        concnent: '    说明:返回str中第一次出现substr的位置。如果任一参数为null，则返回null;如果在str中找不到substr，则返回0。请注意，这不是零基础。str中的第一个字符具有索引1。'
                    },
                    {
                        titles: 'in_file(STRING str, STRING filename)',
                        concnent: '    说明:如果字符串str在filename中显示为整行，则返回true。'
                    },
                    {titles: 'length(STRING a)', concnent: '    说明:返回字符串的长度。'},
                    {
                        titles: 'levenshtein(STRING a, STRING b)',
                        concnent: '    说明:返回两个字符串之间的Levenshtein距离（从Hive 1.2.0开始）。例如，levenshtein（\'kitten\'，\'sitting\'）导致3。'
                    },
                    {
                        titles: 'lcase(STRING a)',
                        concnent: '    说明:返回将B的所有字符转换为小写的字符串。例如，lcase（\'fOoBaR\'）导致\'foobar\'。'
                    },
                    {
                        titles: 'locate(STRING substr, STRING str [, INT pos])',
                        concnent: '    说明:返回位置pos后str中第一次出现substr的位置。'
                    },
                    {
                        titles: 'lower(STRING a)',
                        concnent: '    说明:返回将B的所有字符转换为小写的字符串。例如，lower（\'fOoBaR\'）会导致\'foobar\'。'
                    },
                    {titles: 'lpad(STRING str, INT len, STRING pad)', concnent: '    说明:返回str，左边填充pad，长度为len。'},
                    {
                        titles: 'ltrim(STRING a)',
                        concnent: '    说明:返回从A的开头（左侧）修剪空格所产生的字符串。例如，ltrim（\'foobar\'）导致\'foobar\'。'
                    },
                    {
                        titles: 'array<struct<STRING, DOUBLE>> ngrams(Array<Array<STRING>> a, INT n, INT k, INT pf)',
                        concnent: '    说明:从一组标记化句子返回前k个N-gram，例如句子（）UDAF返回的句子。'
                    },
                    {
                        titles: 'octet_length(STRING a)',
                        concnent: '    说明:返回以UTF-8编码保存字符串str所需的八位字节数（自Hive 2.2.0起）。注意，octet_length（str）可以大于character_length（str）。'
                    },
                    {
                        titles: 'parse_url(STRING urlString, STRING partToExtract [, STRING keyToExtract])',
                        concnent: '    说明:从URL返回指定的部分。partToExtract的有效值包括HOST，PATH，QUERY，REF，PROTOCOL，AUTHORITY，FILE和USERINFO。例如，parse_url（\'http://facebook.com/path1/p.php?k1=v1&k2=v2#Ref1\'，\'HOST\'）返回\'facebook.com\'。此外，通过提供密钥作为第三个参数，可以提取QUERY中特定键的值，例如，parse_url（\'http://facebook.com/path1/p.php?k1=v1&k2=v2#Ref1\'， \'QUERY\'，\'k1\'）返回\'v1\'。'
                    },
                    {
                        titles: 'printf(STRING format, Obj... args)',
                        concnent: '    说明:返回根据do printf样式格式字符串格式化的输入（从Hive 0.9.0开始）。'
                    },
                    {
                        titles: 'regexp_extract(STRING subject, STRING pattern, INT index)',
                        concnent: '    说明:返回使用模式提取的字符串。例如，regexp_extract（\'foothebar\'，\'foo（。*？）（bar）\'，2）返回\'bar\'。请注意，在使用预定义的字符类时需要注意：使用\'\\ s\'作为第二个参数将匹配字母s; \'\\\\ s\'是匹配空格等的必要条件.\'index\'参数是Java regex Matcher group（）方法索引。'
                    },
                    {titles: 'repeat(STRING str, INT n)', concnent: '    说明:重复n次。'},
                    {
                        titles: 'replace(STRING a, STRING old, STRING new)',
                        concnent: '    说明:返回字符串a，其中所有非重叠出现的old都替换为new（从Hive 1.3.0和2.1.0开始）。示例：select replace（“ababab”，“abab”，“Z”）; 返回“Zab”。'
                    },
                    {titles: 'reverse(STRING a)', concnent: '    说明:返回反转的字符串。'},
                    {titles: 'rpad(STRING str, INT len, STRING pad)', concnent: '    说明:返回str，右边填充pad，长度为len。'},
                    {
                        titles: 'rtrim(STRING a)',
                        concnent: '    说明:返回从A的末尾（右侧）修剪空格所产生的字符串。例如，rtrim（\'foobar\'）导致\'foobar\'。'
                    },
                    {
                        titles: 'array<array<STRING>> sentences(STRING str, STRING lang, STRING locale)',
                        concnent: '    说明:将一串自然语言文本标记为单词和句子，其中每个句子在适当的句子边界处被打破并作为单词数组返回。\'lang\'和\'locale\'是可选参数。例如，句子（\'你好！你好吗？\'）返回（（“你好”，“那里”），（“如何”，“是”，“你”））。'
                    },
                    {
                        titles: 'soundex(STRING a)',
                        concnent: '    说明:返回字符串的soundex代码（从Hive 1.2.0开始）。例如，soundex（\'Miller\'）导致M460。'
                    },
                    {titles: 'space(INT n)', concnent: '    说明:返回n个空格的字符串。'},
                    {titles: 'array<STRING> split(STRING str, STRING pat)', concnent: '    说明:拆分pat（pat是正则表达式）。'},
                    {
                        titles: 'map<STRING,STRING> str_to_map(STRING [, STRING delimiter1, STRING delimiter2])',
                        concnent: '    说明:使用两个分隔符将文本拆分为键值对。Delimiter1将文本分成KV对，Delimiter2分割每个KV对。对于delimiter1，默认分隔符为\'，\'，对于delimiter2，默认分隔符为\'=\'。'
                    },
                    {
                        titles: 'substr(STRING|BINARY A, INT start [, INT len])',
                        concnent: '    说明:返回A的字节数组的子字符串或切片，从起始位置开始，直到字符串A的结尾或可选长度为len。例如，substr（\'foobar\'，4）导致\'bar\''
                    },
                    {
                        titles: 'substring(STRING|BINARY a, INT start [, INT len])',
                        concnent: '    说明:返回A的字节数组的子字符串或切片，从起始位置开始，直到字符串A的结尾或可选长度为len。例如，substr（\'foobar\'，4）导致\'bar\''
                    },
                    {
                        titles: 'substring_index(STRING a, STRING delim, INT count)',
                        concnent: '    说明:在分隔符delim的计数出现之前返回字符串A的子字符串（从Hive 1.3.0开始）。如果count为正数，则返回最终分隔符左侧的所有内容（从左侧开始计算）。如果count为负数，则返回最终分隔符右侧的所有内容（从右侧开始计算）。在搜索delim时，Substring_index执行区分大小写的匹配。示例：substring_index（\'www.apache.org\'，\'。\'，2）=\'\'www.apache\'。'
                    },
                    {
                        titles: 'translate(STRING|CHAR|VARCHAR input, STRING|CHAR|VARCHAR from, STRING|CHAR|VARCHAR to)',
                        concnent: '    说明:通过将from字符串中的字符替换为to字符串中的相应字符来转换输入字符串。这类似于PostgreSQL中的translate函数。如果此UDF的任何参数为NULL，则结果也为NULL。（从Hive 0.10.0开始，对于字符串类型）从Hive 0.14.0开始添加Char / varchar支持。'
                    },
                    {
                        titles: 'trim(STRING a)',
                        concnent: '    说明:返回从A的两端修剪空格所产生的字符串。例如，trim（\'foobar\'）导致\'foobar\''
                    },
                    {
                        titles: 'ucase(STRING a)',
                        concnent: '    说明:返回将A的所有字符转换为大写字符所产生的字符串。例如，ucase（\'fOoBaR\'）导致\'FOOBAR\'。'
                    },
                    {titles: 'unbase64(STRING a)', concnent: '    说明:将参数从base 64字符串转换为BINARY。（截至Hive 0.12.0。）'},
                    {
                        titles: 'upper(STRING a)',
                        concnent: '    说明:返回将A的所有字符转换为大写字符所产生的字符串。例如，upper（\'fOoBaR\'）导致\'FOOBAR\'。'
                    }

                ]
            }],
            [{
                title: '数据脱敏类操作函数', concnet: [
                    {
                        titles: 'mask(STRING str [, STRING upper [, STRING lower [, STRING number]]])',
                        concnent: '    说明:返回str的掩码版本（从Hive 2.1.0开始）。默认情况下，大写字母转换为“X”，小写字母转换为“x”，数字转换为“n”。例如，掩码（“abcd-EFGH-8765-4321”）产生xxxx-XXXX-nnnn-nnnn。您可以通过提供其他参数来覆盖掩码中使用的字符：第二个参数控制大写字母的掩码字符，小写字母的第三个参数和数字的第四个参数。例如，掩码（“abcd-EFGH-8765-4321”，“U”，“l”，“＃”）产生llll-UUUU - #### - ####。'
                    },
                    {
                        titles: 'mask_last_n(STRING str [, INT n])',
                        concnent: '    说明:返回掩码版本的str，其中最后n个值被屏蔽（从Hive 2.1.0开始）。大写字母转换为“X”，小写字母转换为“x”，数字转换为“n”。例如，mask_last_n（“1234-5678-8765-4321”，4）产生1234-5678-8765-nnnn。'
                    },
                    {
                        titles: 'mask_last_n(STRING str [, INT n])',
                        concnent: '    说明:返回掩码版本的str，其中最后n个值被屏蔽（从Hive 2.1.0开始）。大写字母转换为“X”，小写字母转换为“x”，数字转换为“n”。例如，mask_last_n（“1234-5678-8765-4321”，4）产生1234-5678-8765-nnnn。'
                    },
                    {
                        titles: 'mask_show_first_n(STRING str [, INT n])',
                        concnent: '    说明:返回str的掩码版本，显示前n个字符未屏蔽（从Hive 2.1.0开始）。大写字母转换为“X”，小写字母转换为“x”，数字转换为“n”。例如，mask_show_first_n（“1234-5678-8765-4321”，4）导致1234-nnnn-nnnn-nnnn。'
                    },
                    {
                        titles: 'mask_show_last_n(STRING str [, INT n])',
                        concnent: '    说明:返回str的掩码版本，显示最后n个字符未屏蔽（从Hive 2.1.0开始）。大写字母转换为“X”，小写字母转换为“x”，数字转换为“n”。例如，mask_show_last_n（“1234-5678-8765-4321”，4）导致nnnn-nnnn-nnnn-4321。'
                    },
                    {
                        titles: 'mask_hash(STRING|CHAR|VARCHAR str)',
                        concnent: '    说明:返回基于str的散列值（从Hive 2.1.0开始）。散列是一致的，可用于跨表将加掩码值连接在一起。对于非字符串类型，此函数返回null。'
                    }

                ]
            }],
            [{
                title: '生成表类操作函数', concnet: [
                    {titles: 'inline(Array<Struct [, Struct]> a)', concnent: '    说明:将一组结构分解为表格。（截至Hive 0.10。）'},
                    {
                        titles: 'json_tuple(STRING jsonStr, STRING k1, STRING k2, ...)',
                        concnent: '    说明:在Hive 0.7中引入了一个新的json_tuple（）UDTF。它需要一组名称（键）和一个JSON字符串，并使用一个函数返回一个值元组。这比调用GET_JSON_OBJECT从单个JSON字符串中检索多个键要高效得多。'
                    },
                    {
                        titles: 'parse_url_tuple(STRING url, STRING p1, STRING p2, ...)',
                        concnent: '    说明:parse_url_tuple（）UDTF类似于parse_url（），但可以提取给定URL的多个部分，返回元组中的数据。可以通过在partToExtract参数后附加冒号和键来提取QUERY中特定键的值。'
                    },
                    {
                        titles: 'posexplode(ARRAY)',
                        concnent: '    说明:posexplode（）类似于explode，但它不是仅仅返回数组的元素，而是返回元素以及它在原始数组中的位置。'
                    },
                    {
                        titles: 'stack(INT n, v1, v2, ..., vk)',
                        concnent: '    说明:将v1，v2，...，vk分成n行。每行将有k / n列。n必须是常数。'
                    }
                ]
            }],
            [{
                title: '类型转换类函数', concnet: [
                    {titles: 'binary(BINARY|STRING a)', concnent: '    说明:将参数转换为二进制。'},
                    {
                        titles: 'cast(a as T)',
                        concnent: '    说明:将表达式expr的结果转换为类型T.例如，cast（\'1\'作为BIGINT）将字符串\'1\'转换为其整数表示。如果转换不成功，则返回null。如果强制转换（expr为boolean）Hive为非空字符串返回true。'
                    }
                ]
            }]
        ]
    }
})