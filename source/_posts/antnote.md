---
title: Ant笔记
category: 语法
tags:
  - ant
  - linux
  - 编译
  - android
---

condition
----

### 1. istrue isfalse:断言 真 假

```xml
<project name="testCondition">
    <target name="test">
        <condition property="scondition">
            <istrue value="true"/>                    
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>
```
### 2、逻辑运算
#### 2.1、not 逻辑非  

```xml
<project name="testCondition">
    <target name="test">
        <condition property="scondition">
            ＜not>
                <istrue value="true"/>                    
            </not>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>
```
#### 2.2、and 逻辑与
```xml
<project name="testCondition">
    <target name="test">
        <condition property="scondition">
            ＜and>
                <istrue value="true"/>
                <istrue value="false"/>                    
            </and>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>
```

> 2.3、or 逻辑或 xor异或 (语法上与and类似)

### 3、available 是否可用
```xml
<project name="testCondition">
    <path id="all.test.classes">         
         <pathelement location="bin"/>
     </path>
    <target name="test">
        <condition property="scondition">
            <!--在指定的classpath路径下是否存在资源 TestTest.class-->
            <available resource="TestTest.class">
                <classpath refid="all.test.classes" />        
            </available>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>
```
### 4、isset 指定属性是否存在
```xml
<project name="testCondition">
    <!--属性也可以通过ant参数-D来设置-->
    <property name="name" value="this is name"/>    
    <target name="test">
        <condition property="scondition">
            <!--如果属性name不存在则返回false-->
            <isset property="name"/>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>
```
### 5、equals 是否相等
```xml
<project name="testCondition">
    <!--属性也可以通过ant参数-D来设置-->
    <property name="name" value="this is name"/>    
    <target name="test">
        <condition property="scondition">
            <!--如果arg1的值与arg2的值相等返回true，否则为false-->
            <equals arg1="${name}" arg2="this is name"/>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>    
```
### 6、filesmatch 比较文件
```xml
<project name="testCondition">        
    <target name="test">
        <condition property="scondition">
            <!--如果file1所代表的文件与file2所代表的文件相等返回true，否则为false-->
            <filesmatch file1="testfile1.txt" file2="testfile2.txt"/>
        </condition>
        <antcall target="isTrue"></antcall>
        <antcall target="isFalse"></antcall>        
    </target>
    <target name="isTrue" if="scondition">
        <echo>is ture</echo>
    </target>
    <target name="isFalse" unless="scondition">
        <echo>is false</echo>
    </target>
</project>    
```

时间
----

### 系统自带时间
```xml
<tstamp/>
<!--以下的几个属性是系统自带的,初始了tstamp之后,它们就有值了-->
<echo message="System:"/>
<echo message="DSTAMP = ${DSTAMP}"/>
<echo message="TSTAMP = ${TSTAMP}"/>
<echo message="TODAY = ${TODAY}"/>
```
 
### 自定义时间

```xml
<tstamp prefix="my">
    <format property="day" pattern="yyyy-MM-dd"/>
    <format property="time" pattern="HH:mm:ss"/>
    <format property="dt" pattern="yyyy-MM-dd HH:mm:ss.SSS"/>
</tstamp>
<target name="show">
    <antcall target="default"/>
    <echo message="-------------------------------------"/>
    <echo message="Mine:"/>
    <echo message="my.time = ${my.time}"/>
    <echo message="my.day = ${my.day}"/>
    <echo message="my.dt = ${my.dt}"/>
</target> 
```