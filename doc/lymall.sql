/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50627
Source Host           : localhost:3306
Source Database       : lymall

Target Server Type    : MYSQL
Target Server Version : 50627
File Encoding         : 65001

Date: 2018-03-28 13:52:57
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '分类编号',
  `name` varchar(50) NOT NULL COMMENT '分类名称',
  `shop_id` char(36) NOT NULL DEFAULT '0' COMMENT '商店编号',
  PRIMARY KEY (`id`),
  KEY `category_ibfk_1` (`shop_id`),
  CONSTRAINT `category_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='商品分类';

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '护肤', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `category` VALUES ('2', '彩妆', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `category` VALUES ('3', '香水', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `category` VALUES ('4', '包包', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `category` VALUES ('5', '首饰', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单编号',
  `shop_id` varchar(36) NOT NULL COMMENT '所属商店',
  `open_id` varchar(100) NOT NULL COMMENT '用户编号',
  `goods_count` int(11) NOT NULL COMMENT '商品数量',
  `goods_price` int(11) NOT NULL COMMENT '订单总价',
  `yun_price` int(11) NOT NULL COMMENT '运费',
  `payment` int(11) NOT NULL COMMENT '实付金额',
  `remark` varchar(300) NOT NULL COMMENT '备注',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(11) NOT NULL COMMENT '订单状态：1-待付款，2-待发货，3-待收货，4-已完成',
  `address` varchar(300) NOT NULL COMMENT '收件地址',
  `contact` varchar(50) NOT NULL COMMENT '联系人',
  `mobile` varchar(15) NOT NULL COMMENT '联系电话',
  `order_no` varchar(50) NOT NULL COMMENT '订单号',
  PRIMARY KEY (`id`),
  KEY `shop_id` (`shop_id`,`open_id`),
  KEY `shop_id_2` (`shop_id`,`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='订单信息表';

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('2', 'db2d59c0-1d52-421f-aa7d-a1f801f50280', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '6', '1200', '0', '1200', '', '2018-03-22 05:52:51', '1', '北京市丰台区  金隅大成时代写字楼', '辛祥', '13716972899', '1522026501');
INSERT INTO `orders` VALUES ('3', 'db2d59c0-1d52-421f-aa7d-a1f801f50280', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '1', '200', '0', '200', 'ad', '2018-03-23 03:11:19', '1', '北京市丰台区  金隅大成时代写字楼', '辛祥', '13716972899', '1522026502');
INSERT INTO `orders` VALUES ('4', 'db2d59c0-1d52-421f-aa7d-a1f801f50280', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '1', '200', '0', '200', '', '2018-03-26 01:08:28', '1', '北京市丰台区  金隅大成时代写字楼', '辛祥', '13716972899', '1522026508');
INSERT INTO `orders` VALUES ('5', 'db2d59c0-1d52-421f-aa7d-a1f801f50280', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '1', '200', '0', '200', '', '2018-03-26 01:10:29', '1', '北京市丰台区  金隅大成时代写字楼', '辛祥', '13716972899', '1522026628');
INSERT INTO `orders` VALUES ('6', 'db2d59c0-1d52-421f-aa7d-a1f801f50280', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '1', '200', '0', '200', '', '2018-03-26 09:48:05', '1', '北京市丰台区  金隅大成时代写字楼', '辛祥', '13716972899', '1522057684');

-- ----------------------------
-- Table structure for order_goods
-- ----------------------------
DROP TABLE IF EXISTS `order_goods`;
CREATE TABLE `order_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `product_id` int(11) NOT NULL COMMENT '产品编号',
  `product_name` varchar(100) NOT NULL COMMENT '产品名称',
  `count` int(11) NOT NULL COMMENT '商品数量',
  `image` varchar(200) NOT NULL COMMENT '产品图片',
  `price` int(11) NOT NULL COMMENT '产品价格',
  `ppv_brief` varchar(100) NOT NULL COMMENT '规格描述',
  `ppv_ids` varchar(100) NOT NULL COMMENT '规格编号列表',
  `order_id` int(11) NOT NULL COMMENT '所属订单编号',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_goods_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='订单商品信息';

-- ----------------------------
-- Records of order_goods
-- ----------------------------
INSERT INTO `order_goods` VALUES ('1', '5', '懒人面膜', '2', 'upload/1.jpg', '200', '', '', '2');
INSERT INTO `order_goods` VALUES ('2', '3', '懒人面霜', '4', 'upload/3.jpg', '200', '', '', '2');
INSERT INTO `order_goods` VALUES ('3', '5', '懒人面膜', '1', 'upload/1.jpg', '200', '', '', '3');
INSERT INTO `order_goods` VALUES ('4', '5', '懒人面膜', '1', 'upload/1.jpg', '200', '', '', '4');
INSERT INTO `order_goods` VALUES ('5', '7', '测试商品', '1', 'upload/1.jpg', '200', '', '', '5');
INSERT INTO `order_goods` VALUES ('6', '1', '贝因美', '1', 'upload/4.jpg', '200', '颜色:黑色 尺寸:XL ', '2,4,', '6');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品编号',
  `name` varchar(200) NOT NULL COMMENT '商品名称',
  `cover` int(11) NOT NULL COMMENT '商品封面（用于列表显示）',
  `images` varchar(100) NOT NULL COMMENT '商品相册，如23,34,24',
  `status` int(11) NOT NULL COMMENT '商品状态：0-下架，1-上架，2-推荐',
  `price` int(11) NOT NULL COMMENT '商品价格',
  `content` text NOT NULL COMMENT '商品详情',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商品表';

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES ('1', '贝因美', '4', '[1,2,3]', '2', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('2', '天气丹', '2', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('3', '懒人面霜', '3', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('4', 'Dior #004', '1', '[1,2,3]', '2', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('5', '懒人面膜', '1', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('6', '洗面奶', '1', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('7', '测试商品', '1', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('8', '测试商品', '1', '[1,2,3]', '2', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('9', '测试商品', '1', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');
INSERT INTO `products` VALUES ('10', '测试商品', '1', '[1,2,3]', '1', '200', '<div style=\"TEXT-ALIGN: center\"><img alt=\"\" id=\"4fff412ebc63415e9b21f4646113bddf \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3901/286/1140805141/96469/4611cd86/586b203fN961f03da.jpg\"><br><img alt=\"\" id=\"201d5dfc0b164fdca4f02ca59514e621 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3997/241/1147355348/82277/deac1b02/586b2040N73fc3b5c.jpg\"><br><img alt=\"\" id=\"cab567feecfb472aafbc3c1658f2baea \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3049/346/5308628388/65671/3d202642/586b2041Nfe3886b9.jpg\"><br><img alt=\"\" id=\"1aeef61a56f7419b801d94eb3bcac6b7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/135/5395852996/79673/8d6848/586b2041N1b269826.jpg\"><br><img alt=\"\" id=\"1b2f3e0dace24effbfda2785a9d23bf7 \" class=\"\" src=\"//img30.360buyimg.com/popWaterMark/jfs/t3055/141/5342297838/68116/1f3c3ffe/586b2042N9681a189.jpg\"><br></div>');

-- ----------------------------
-- Table structure for product_category
-- ----------------------------
DROP TABLE IF EXISTS `product_category`;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `product_id` int(11) NOT NULL COMMENT '商品编号',
  `category_id` int(11) NOT NULL COMMENT '所属分类',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `product_category_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_category_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='商品分类信息';

-- ----------------------------
-- Records of product_category
-- ----------------------------
INSERT INTO `product_category` VALUES ('1', '1', '1');
INSERT INTO `product_category` VALUES ('2', '1', '2');
INSERT INTO `product_category` VALUES ('3', '2', '1');
INSERT INTO `product_category` VALUES ('4', '3', '3');
INSERT INTO `product_category` VALUES ('5', '4', '4');
INSERT INTO `product_category` VALUES ('6', '3', '4');
INSERT INTO `product_category` VALUES ('7', '5', '2');
INSERT INTO `product_category` VALUES ('8', '5', '4');
INSERT INTO `product_category` VALUES ('9', '6', '2');
INSERT INTO `product_category` VALUES ('10', '7', '1');

-- ----------------------------
-- Table structure for product_images
-- ----------------------------
DROP TABLE IF EXISTS `product_images`;
CREATE TABLE `product_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '图片编号',
  `url` varchar(300) NOT NULL COMMENT '图片存储路径',
  `mime` varchar(30) NOT NULL COMMENT '文件MIME类型',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='商品图片库';

-- ----------------------------
-- Records of product_images
-- ----------------------------
INSERT INTO `product_images` VALUES ('1', 'upload/1.jpg', 'image/jpeg');
INSERT INTO `product_images` VALUES ('2', 'upload/2.jpg', 'image/jpeg');
INSERT INTO `product_images` VALUES ('3', 'upload/3.jpg', 'image/jpeg');
INSERT INTO `product_images` VALUES ('4', 'upload/4.jpg', 'image/jpeg');

-- ----------------------------
-- Table structure for product_property
-- ----------------------------
DROP TABLE IF EXISTS `product_property`;
CREATE TABLE `product_property` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品属性编号',
  `name` varchar(200) NOT NULL COMMENT '属性名称',
  `product_id` int(11) NOT NULL COMMENT '所属商品',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_property_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='商品属性';

-- ----------------------------
-- Records of product_property
-- ----------------------------
INSERT INTO `product_property` VALUES ('1', '颜色', '1');
INSERT INTO `product_property` VALUES ('2', '尺寸', '1');

-- ----------------------------
-- Table structure for product_property_value
-- ----------------------------
DROP TABLE IF EXISTS `product_property_value`;
CREATE TABLE `product_property_value` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品属性值编号',
  `name` varchar(50) NOT NULL COMMENT '属性值名称',
  `property_id` int(11) NOT NULL COMMENT '所属属性',
  `product_id` int(11) NOT NULL COMMENT '所属商品',
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `product_property_value_ibfk_1` FOREIGN KEY (`property_id`) REFERENCES `product_property` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='商品属性值';

-- ----------------------------
-- Records of product_property_value
-- ----------------------------
INSERT INTO `product_property_value` VALUES ('1', '红色', '1', '1');
INSERT INTO `product_property_value` VALUES ('2', '黑色', '1', '1');
INSERT INTO `product_property_value` VALUES ('3', 'XXL', '2', '1');
INSERT INTO `product_property_value` VALUES ('4', 'XL', '2', '1');

-- ----------------------------
-- Table structure for product_stock
-- ----------------------------
DROP TABLE IF EXISTS `product_stock`;
CREATE TABLE `product_stock` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '库存编号',
  `product_id` int(11) NOT NULL COMMENT '所属商品',
  `stock_count` int(11) NOT NULL COMMENT '库存量',
  `stock_detail` varchar(100) NOT NULL COMMENT '产品属性值构成',
  PRIMARY KEY (`id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_stock_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='商品库存';

-- ----------------------------
-- Records of product_stock
-- ----------------------------
INSERT INTO `product_stock` VALUES ('1', '1', '10', '[1,3]');

-- ----------------------------
-- Table structure for product_stock_detail
-- ----------------------------
DROP TABLE IF EXISTS `product_stock_detail`;
CREATE TABLE `product_stock_detail` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `stock_id` int(11) NOT NULL COMMENT '库存商品编号',
  `ppv_id` int(11) NOT NULL COMMENT '商品属性值',
  PRIMARY KEY (`id`),
  KEY `stock_id` (`stock_id`),
  KEY `ppv_id` (`ppv_id`),
  CONSTRAINT `product_stock_detail_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `product_stock` (`id`) ON DELETE CASCADE,
  CONSTRAINT `product_stock_detail_ibfk_2` FOREIGN KEY (`ppv_id`) REFERENCES `product_property_value` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='商品库存细节';

-- ----------------------------
-- Records of product_stock_detail
-- ----------------------------
INSERT INTO `product_stock_detail` VALUES ('1', '1', '1');
INSERT INTO `product_stock_detail` VALUES ('2', '1', '3');

-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` char(36) NOT NULL COMMENT '商店编号',
  `name` varchar(50) NOT NULL COMMENT '商店名称',
  `appid` varchar(100) NOT NULL COMMENT '小程序appid',
  `secret` varchar(100) NOT NULL COMMENT '小程序密钥',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商店信息表';

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('db2d59c0-1d52-421f-aa7d-a1f801f50280', '小艺美妆铺', 'wxdeeb117833e3f8da', '8e184d1763964f2d7413d3e684e6424d');

-- ----------------------------
-- Table structure for shop_cart
-- ----------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `open_id` varchar(100) NOT NULL COMMENT '微信用户openid',
  `product_id` int(11) NOT NULL COMMENT '产品编号',
  `product_name` varchar(100) NOT NULL COMMENT '产品名称',
  `count` int(11) NOT NULL COMMENT '商品数量',
  `image` varchar(200) NOT NULL COMMENT '产品图片',
  `price` int(11) NOT NULL COMMENT '产品价格',
  `ppv_brief` varchar(100) NOT NULL COMMENT '规格描述',
  `ppv_ids` varchar(100) NOT NULL COMMENT '规格编号列表',
  `stock_id` int(11) NOT NULL COMMENT '库存单品编号',
  `shop_id` varchar(36) NOT NULL COMMENT '所属商店编号',
  PRIMARY KEY (`id`),
  KEY `open_id` (`open_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `shop_cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='购物车信息';

-- ----------------------------
-- Records of shop_cart
-- ----------------------------
INSERT INTO `shop_cart` VALUES ('1', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '4', 'Dior #004', '4', 'upload/1.jpg', '200', '', '', '0', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `shop_cart` VALUES ('2', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '7', '测试商品', '1', 'upload/1.jpg', '200', '', '', '0', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `shop_cart` VALUES ('3', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '5', '懒人面膜', '3', 'upload/1.jpg', '200', '', '', '0', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');
INSERT INTO `shop_cart` VALUES ('4', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws', '1', '贝因美', '1', 'upload/4.jpg', '200', '颜色:红色 尺寸:XL ', '1,4,', '0', 'db2d59c0-1d52-421f-aa7d-a1f801f50280');

-- ----------------------------
-- Table structure for user_address
-- ----------------------------
DROP TABLE IF EXISTS `user_address`;
CREATE TABLE `user_address` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键编号',
  `contact` varchar(50) NOT NULL COMMENT '收件人',
  `mobile` varchar(20) NOT NULL COMMENT '收件人电话',
  `province` varchar(50) NOT NULL COMMENT '省份',
  `province_id` int(11) NOT NULL COMMENT '省份编码',
  `city` varchar(50) NOT NULL COMMENT '城市',
  `city_id` int(11) NOT NULL COMMENT '城市编码',
  `district` varchar(50) NOT NULL COMMENT '区县',
  `district_id` int(11) NOT NULL COMMENT '区/县编码',
  `detail_address` varchar(200) NOT NULL COMMENT '详细地址',
  `post_code` char(6) NOT NULL COMMENT '邮政编码',
  `is_default` tinyint(1) NOT NULL COMMENT '是否默认',
  `open_id` varchar(100) NOT NULL COMMENT '用户openid',
  PRIMARY KEY (`id`),
  KEY `open_id` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='用户收货地址';

-- ----------------------------
-- Records of user_address
-- ----------------------------
INSERT INTO `user_address` VALUES ('1', '辛祥', '13716972899', '北京市', '100000', '丰台区', '100011', '  ', '0', '金隅大成时代写字楼', '100141', '1', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws');
INSERT INTO `user_address` VALUES ('3', 'aaa', '122', '北京市', '110000', '丰台区', '110106', '', '0', 'aadfd阿道夫sdfd', '123455', '0', 'ooMKk5C8K5V1NlD5cFKy_jZu-Xws');
