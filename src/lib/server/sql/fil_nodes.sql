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

 Date: 24/12/2024 17:47:18
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for fil_nodes
-- ----------------------------
CREATE TABLE IF NOT EXISTS `fil_nodes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `node` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `msig_node` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `msg_count` bigint DEFAULT NULL,
  `sector_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `available_balance` decimal(20,8) DEFAULT NULL,
  `balance` decimal(20,8) DEFAULT NULL,
  `sector_pledge_balance` decimal(20,8) DEFAULT NULL,
  `vesting_funds` decimal(20,8) DEFAULT NULL,
  `height` bigint DEFAULT NULL,
  `last_time` datetime DEFAULT NULL,
  `last_hand_time` datetime DEFAULT NULL,
  `reward_value` decimal(20,8) DEFAULT NULL,
  `weighted_blocks` bigint DEFAULT NULL,
  `quality_adj_power` decimal(20,4) DEFAULT NULL COMMENT '当前算力',
  `power_unit` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `quality_power` decimal(20,4) DEFAULT NULL COMMENT '总算力',
  `raw_power` decimal(20,2) DEFAULT NULL COMMENT '原值算力',
  `power_point` decimal(10,3) DEFAULT NULL,
  `power_grade` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sector_size` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sector_status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `sector_total` bigint DEFAULT NULL,
  `sector_effective` bigint DEFAULT NULL,
  `sector_error` bigint DEFAULT NULL,
  `sector_recovering` bigint DEFAULT NULL,
  `control_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `control_balance` decimal(20,8) DEFAULT NULL,
  `status` bigint DEFAULT NULL,
  `type` bigint DEFAULT NULL,
  `blocks_mined24h` bigint DEFAULT NULL,
  `weighted_blocks_mined24h` bigint DEFAULT NULL,
  `total_rewards24h` decimal(20,8) DEFAULT NULL,
  `lucky_value24h` decimal(20,8) DEFAULT NULL,
  `quality_adj_power_delta24h` decimal(20,4) DEFAULT NULL,
  `blocks_mined7d` bigint DEFAULT NULL,
  `weighted_blocks_mined7d` bigint DEFAULT NULL,
  `total_rewards7d` decimal(20,8) DEFAULT NULL,
  `lucky_value7d` decimal(20,8) DEFAULT NULL,
  `quality_adj_power_delta7d` decimal(20,4) DEFAULT NULL,
  `blocks_mined30d` bigint DEFAULT NULL,
  `weighted_blocks_mined30d` bigint DEFAULT NULL,
  `total_rewards30d` decimal(20,8) DEFAULT NULL,
  `lucky_value30d` decimal(20,8) DEFAULT NULL,
  `quality_adj_power_delta30d` decimal(20,4) DEFAULT NULL,
  `distribute_point` decimal(20,3) DEFAULT NULL COMMENT '分成比例',
  `has_transfer` decimal(20,8) DEFAULT NULL,
  `has_real_distribute` decimal(20,8) DEFAULT NULL COMMENT '实际已分币数量',
  `address_to` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '分币地址',
  `last_distribute_time` datetime DEFAULT NULL,
  `deleted_at` datetime DEFAULT NULL COMMENT '删除时间',
  `created_at` datetime DEFAULT NULL COMMENT '添加记录时间',
  `updated_at` datetime DEFAULT NULL COMMENT '记录更新时间',
  `create_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `update_by` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_dis_sector_pledge_balance` decimal(20,8) DEFAULT NULL COMMENT '记录当前分币时的质押数量',
  `receive_amount` decimal(20,8) DEFAULT NULL,
  `burn_amount` decimal(20,8) DEFAULT NULL,
  `send_amount` decimal(20,8) DEFAULT NULL,
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `transfer_count` bigint DEFAULT NULL,
  `real_count` bigint DEFAULT NULL,
  `time_tag` bigint DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '名称',
  `dept_id` bigint DEFAULT '0',
  `mining_efficiency` decimal(20,8) DEFAULT NULL,
  `mining_efficiency7d` decimal(20,8) DEFAULT NULL,
  `mining_efficiency30d` decimal(20,8) DEFAULT NULL,
  `sync_status` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '节点同步状态，原值 sync ok',
  `beneficiary` varchar(45) DEFAULT NULL COMMENT '受益地址',
  `on_line` tinyint DEFAULT '0',
  `average_win_rate` decimal(20,4) DEFAULT '0.0000' COMMENT '周理论平均出块效率',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
