drop database if exists lymall;
create database lymall;

use database lymall;

drop table if exists shop;
create table shop(
    id          int             not null auto_increment comment '商店编号',
    name        varchar(50)     not null comment '商店名称',
    primary key(id)
)engine=innodb default charset=utf8 comment '商店信息表';

drop table if exists category;
create table category(
    id          int             not null auto_increment comment '分类编号',
    name        varchar(50)     not null comment '分类名称',
    shop_id     int             not null comment '所属商店',
    primary key(id),
    constraint foreign key(shop_id) references shop(id) on delete cascade
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

drop table if exists shop_cart;
create table shop_cart(
    id              int             not null auto_increment comment '主键编号',
    open_id         varchar(100)    not null comment '微信用户openid',
    product_id      int             not null comment '产品编号',
    product_name    varchar(100)    not null comment '产品名称',
    count           int             not null comment '商品数量',
    image           varchar(200)    not null comment '产品图片', 
    price           int             not null comment '产品价格',
    ppv_brief       varchar(100)    not null comment '规格描述',
    ppv_ids         varchar(100)    not null comment '规格编号列表',
    stock_id        int             not null comment '库存单品编号',
    shop_id         varchar(36)     not null comment '所属商店编号',
    primary key(id),
    index(open_id),
    constraint foreign key(product_id) references products(id) on delete cascade
)engine=innodb default charset=utf8 comment '购物车信息';

drop table if exists user_address;
create table user_address(
    id              int             not null auto_increment comment '主键编号',
    contact         varchar(50)     not null comment '收件人',
    mobile          varchar(20)     not null comment '收件人电话',
    province        varchar(50)     not null comment '省份',
    province_id     int             not null comment '省份编码',
    city            varchar(50)     not null comment '城市',
    city_id         int             not null comment '城市编码'
    district        varchar(50)     not null comment '区县',
    district_id     int             not null comment '区/县编码',
    detail_address  varchar(200)    not null comment '详细地址',
    post_code       char(6)         not null comment '邮政编码',
    is_default      tinyint(1)      not null comment '是否默认',
    open_id         varchar(100)    not null comment '用户openid',
    primary key(id),
    index(open_id)
)engine=innodb default charset=utf8 comment '用户收货地址';

drop table if exists orders;
create table orders(
    id              int             not null auto_increment comment '订单编号',
    shop_id         varchar(36)     not null comment '所属商店',
    open_id         varchar(100)    not null comment '用户编号',
    goods_count     int             not null comment '商品数量',
    total_price     int             not null comment '订单总价',
    payment         int             not null comment '实付金额',
    remark          varchar(300)    not null comment '备注',
    create_time     datetime        not null comment '创建时间',
    status          int             not null comment '订单状态：1-已创建，2-已取消，3-已付款',
    primary key(id),
    index(shop_id,open_id),
    index(shop_id,create_time)
)engine=innodb default charset=utf8 comment '订单信息表';

drop table if exists order_goods;
create table order_goods(
    id              int             not null auto_increment comment '主键编号',
    product_id      int             not null comment '产品编号',
    product_name    varchar(100)    not null comment '产品名称',
    count           int             not null comment '商品数量',
    image           varchar(200)    not null comment '产品图片', 
    price           int             not null comment '产品价格',
    ppv_brief       varchar(100)    not null comment '规格描述',
    ppv_ids         varchar(100)    not null comment '规格编号列表',
    order_id        int             not null comment '所属订单编号',
    primary key(id),
    constraint foreign key(order_id) references orders(id) on delete cascade
)engine=innodb default charset=utf8 comment '订单商品信息';