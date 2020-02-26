数据定义:
---
* 创建模式TEST并在其中定义一个表TAB1
<pre>
 创建模式的用户必须拥有数据库管理员权限
 CREATE SCHEMA TEST AUTHORIZATION ZHANG
 CRATE TABLE TAB1(COL SMALLINT,
                  COL2 INT,
                  COL3 NUMERIC,
                  COL4 DECIMAL
 );
</pre>

* 删除模式
<pre>
语法: DROP SCHEMA <模式名><CASCADE|RESTRICT>
cascade级联:表示删除模式的同时该模式中的所有数据对象全部删除
restrict限制: 表示模式下如果定义了数据库对象,则拒绝该删除语句执行
实例:
DROP SCHEMA TEST CASCADE
</pre>

* 基本表的定义，删除，修改
<pre>
定义表的两种写法:
1, 列级完整性约束条件
CREATE TABLE student(
    sno char(9) PRIMARY KEY,
    sname char(200) UNIQUE,
    sdept char(20)
);
2, 表集完整性约束条件
CREATE TABLE sc(
    sno char(9),
    cno char(4),
    grade smallint,
    PRIMARY KEY (sno, cno),
    FOREIGN KEY(sno) REFERENCE student(sno),
    FOREIGN KEY(cno) REFERENCE course(cno)
);
</pre>