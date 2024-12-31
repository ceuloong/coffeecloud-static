/*
 Navicat Premium Dump SQL

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80401 (8.4.1)
 Source Host           : localhost:3306
 Source Schema         : fil_db

 Target Server Type    : MySQL
 Target Server Version : 80401 (8.4.1)
 File Encoding         : 65001

 Date: 30/12/2024 11:11:39
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for block
-- ----------------------------
DROP TABLE IF EXISTS `block`;
CREATE TABLE `block` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `height` bigint DEFAULT NULL,
  `node` varchar(255) DEFAULT NULL,
  `block_time` datetime DEFAULT NULL COMMENT '区块时间',
  `node_from` varchar(255) DEFAULT NULL,
  `node_to` varchar(255) DEFAULT NULL,
  `message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '区块哈希',
  `reward_value` decimal(20,8) DEFAULT NULL,
  `msg_count` int DEFAULT NULL COMMENT '消息数',
  `block_size` bigint DEFAULT NULL COMMENT '区块大小',
  `status` int DEFAULT NULL COMMENT '1正常   2孤块',
  `create_time` datetime DEFAULT NULL COMMENT '记录的创建时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_block_height_node` (`height`,`node`) COMMENT '节点和高度唯一索引'
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
