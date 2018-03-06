drop database if exists lymall;
create database lymall;

use database lymall;

drop table if exists category;
create table category(
    id          int             not null auto_increment comment '分类编号',
    name        varchar(50)     not null comment '分类名称',
    primary key(id)
)engine=innodb default charset=utf8 comment '商品分类';

drop table if exists products;
create table products(
    id          int             not null auto_increment comment '商品编号',
    name        varchar(200)    not null comment '商品名称',
    cover       int             not null comment '商品封面（用于列表显示）',
    images      varchar(100)    not null comment '商品相册，如23,34,24',
    status      int             not null comment '商品状态：0-下架，1-上架',
    price       int             not null comment '商品价格',
    content     text            not null comment '商品详情',
    primary key(id)
)engine=innodb default charset=utf8 comment '商品表';

drop table if exists product_images;
create table product_images(
    id          int             not null auto_increment comment '图片编号',
    url         varchar(300)    not null comment '图片存储路径',
    mime        varchar(30)     not null comment '文件MIME类型',
    primary key(id)
)engine=innodb default charset=utf8 comment '商品图片库';

drop table if exists product_category;
create table product_category(
    id          int             not null auto_increment comment '编号',
    product_id  int             not null comment '商品编号',
    category_id int             not null comment '所属分类',
    constraint foreign key(product_id) references products(id) on delete cascade,
    constraint foreign key(category_id) references category(id) on delete cascade,
    primary key(id)
)engine=innodb default charset=utf8 comment '商品分类信息';

drop table if exists product_property;
create table product_property(
    id          int             not null auto_increment comment '商品属性编号',
    name        varchar(200)    not null comment '属性名称',
    product_id  int             not null comment '所属商品',
    constraint foreign key(product_id) references products(id) on delete cascade,
    primary key(id)
)engine=innodb default charset=utf8 comment '商品属性';

drop table if exists product_property_value;
create table product_property_value(
    id          int             not null auto_increment comment '商品属性值编号',
    name        varchar(50)     not null comment '属性值名称',
    property_id int             not null comment '所属属性',
    product_id  int             not null comment '所属商品',
    constraint foreign key(property_id) references product_property(id) on delete cascade,
    primary key(id)
)engine=innodb default charset=utf8 comment '商品属性值';

drop table if exists product_stock;
create table product_stock(
    id          int             not null auto_increment comment '库存编号',
    stock_count int             not null comment '库存量',
    product_id  int             not null comment '所属商品',
    primary key(id),
    constraint foreign key(product_id) references products(id) on delete cascade
)engine=innodb default charset=utf8 comment '商品库存';

drop table if exists product_stock_detail;
create table product_stock_detail(
    id          int             not null auto_increment comment '编号',
    stock_id    int             not null comment '库存商品编号',
    ppv_id      int             not null comment '商品属性值',
    constraint foreign key(stock_id) references product_stock(id) on delete cascade,
    constraint foreign key(ppv_id) references product_property_value(id) on delete cascde,
    primary key(id)
)engine=innodb default charset=utf8 comment '商品库存细节';