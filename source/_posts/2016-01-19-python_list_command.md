---

title: python 数组list笔记
category: 语法
---

###P数组类型：

1. list 数组，初始化后可以通过特定方法动态增加元素。<br>
定义方式：`arr = [元素]`

2. Tuple 元组，一旦定义后，其元素个数是不能再改变的。<br>
定义方式：`arr = (元素)`

3. Dictionary 字典， 即是Hash数组。<br>
定义方式：`arr = {元素k:v}`

###使用方法和技巧：

####list

> 初始化

```py
a = [1,2,[1,2,3]]
arr = []
```

> 删除数组元素

```py
del arr[0]
del arr[0, 2]
newarr = arr[0, 2]
```

> 遍历数组：

```py
for k, v in enumerate(arr):
print k, v
```

> 增加元素：

```py
arr.append('aaa')
arr[0].append('aaa')#二维
arr.insert(n, 值)#插入
arr += [数组元素]
```

> 数组转字符串

```py
test=' '.join(list)
```

> 数组去重，并排序

```py
test=list(set(list))
```

###Tuple 元组

> Tuple 是不可变 list，一旦创建了一个 tuple 就不能以任何方式改变它。

```py
t = ("a", "b", "c", "d", "e") #[1] 用小括号包围来定义
t[0] #[2] 直接列出某下标的元素
'a'
t[-1] #[3] 负数表示，从后面倒数的索引 -1 为倒数第一个， 0是顺数第一个
'example'
t[1:3] #[4] 这里 1:3 是 i>=1 and i<3 的区间
('b', 'mpilgrim')
```

####Tuple 没有的方法：
+ 不能向 tuple 增加元素，没有 append 、 extend 、insert 等方法。
+ 不能从 tuple 删除元素，没有 remove 或 pop 方法。
+ 不能在 tuple 中查找元素，没有 index 方法（index是查找而不是索引，索引直接用下标即可，如：t[0]）。

####使用 tuple 的好处：

+ Tuple 比 list 操作速度快。如果您定义了一个值的常量集, 并且唯一要用它做的是不断地遍历它, 请使用 tuple 代替 list。
+ 如果对不需要修改的数据进行 “写保护”, 可以使代码更安全。使用 tuple 而不是 list 如同拥有一个隐含的 assert 语句, 说明这一数据是常量。如果必须要改变这些值, 则需要执行 tuple 到 list 的转换 (需要使用一个特殊的函数)。
+ 还记得我说过 dictionary keys 可以是字符串, 整数和 “其它几种类型”吗? Tuples 就是这些类型之一。 Tuples 可以在 dictionary 中被用做 key, 但是 list 不行。实际上, 事情要比这更复杂。Dictionary key 必须是不可变的。Tuple 本身是不可改变的, 但是如果您有一个 list 的 tuple, 那就认为是可变的了， 用做 dictionary key 就是不安全的。只有字符串, 整数或其它对 dictionary 安全的 tuple 才可以用作 dictionary key。

__Tuple 可以转换成 list， 反之亦然。__

互相转换方式为：

```py
t = list( t )
arr = tuple( arr )
```

###Dictionary (哈希数组)词典数组

> Dictionary 的用法比较简单，它可以存储任意值，并允许是不同类型的值，下面实例来说明：

下面例子中 a 是整数， b 是字符串, c 是数组，这个例子充分说明哈希数组的适用性。

```py
dict_arr = {'a': 100, 'b':'boy', 'c':['o', 'p', 'q']}
#可以直接增加一个元素，如果同名，则会改变原来的key的元素的值
dict_arr['d'] = 'dog'
#输出所有的key
print dict_arr.keys()
#输出所有的value
print dict_arr.values()
#遍历数组
import types
for k in dict_arr:
v = dict_arr.get(k)
if type(v) is types.ListType: #如果数据是list类型，继续遍历
print k, '---'
for kk, vv in enumerate(v):
print kk, vv
print '---'
else:
print dict_arr.get(k)
```
