CREATE DATABASE  IF NOT EXISTS `adi` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `adi`;
-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: adi
-- ------------------------------------------------------
-- Server version	5.5.57-0+deb8u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `audios`
--

DROP TABLE IF EXISTS `audios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `audios` (
  `audio_id` int(11) NOT NULL AUTO_INCREMENT,
  `audio_feed` int(11) NOT NULL,
  `audio_author` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_origlink` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_title` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_content` text CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_url` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_guid` varchar(500) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `audio_pubdate` datetime NOT NULL,
  `audio_fetchdate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`audio_id`),
  KEY `fk_audios_feed_idx` (`audio_feed`),
  CONSTRAINT `fk_audios_feed` FOREIGN KEY (`audio_feed`) REFERENCES `feeds` (`feed_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1953 DEFAULT CHARSET=utf8 COMMENT='Audios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `feeds`
--

DROP TABLE IF EXISTS `feeds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feeds` (
  `feed_id` int(11) NOT NULL AUTO_INCREMENT,
  `feed_title` varchar(300) COLLATE utf8_spanish_ci NOT NULL,
  `feed_description` text COLLATE utf8_spanish_ci,
  `feed_author` varchar(200) COLLATE utf8_spanish_ci DEFAULT NULL,
  `feed_image` varchar(500) COLLATE utf8_spanish_ci DEFAULT NULL,
  `feed_web_url` varchar(500) CHARACTER SET utf8 NOT NULL,
  `feed_xml_url` varchar(500) CHARACTER SET utf8 NOT NULL,
  `feed_last_guid` varchar(500) CHARACTER SET utf8 NOT NULL,
  `feed_last_fetch` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`feed_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Feeds de audios';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `listen`
--

DROP TABLE IF EXISTS `listen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `listen` (
  `listen_id` int(11) NOT NULL AUTO_INCREMENT,
  `listen_user_id` int(11) NOT NULL,
  `listen_audio_id` int(11) NOT NULL,
  `listen_status` enum('pending','inprogress') COLLATE utf8_spanish_ci NOT NULL,
  `listen_time` double NOT NULL,
  PRIMARY KEY (`listen_user_id`,`listen_audio_id`),
  UNIQUE KEY `listen_id_UNIQUE` (`listen_id`),
  KEY `fk_listen_audio_idx` (`listen_audio_id`),
  CONSTRAINT `fk_listen_audios` FOREIGN KEY (`listen_audio_id`) REFERENCES `audios` (`audio_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_listen_users` FOREIGN KEY (`listen_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de escuchas';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `suscriptions`
--

DROP TABLE IF EXISTS `suscriptions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suscriptions` (
  `sub_id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_user_id` int(11) NOT NULL,
  `sub_feed_id` int(11) NOT NULL,
  `sub_feed_rename` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  PRIMARY KEY (`sub_id`),
  KEY `fk_suscriptions_users_idx` (`sub_user_id`),
  KEY `fk_suscriptions_feeds_idx` (`sub_feed_id`),
  CONSTRAINT `fk_suscriptions_feeds` FOREIGN KEY (`sub_feed_id`) REFERENCES `feeds` (`feed_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_suscriptions_users` FOREIGN KEY (`sub_user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de suscripciones';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `user_pass` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `user_set_playRate` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user_set_theme` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`,`user_email`),
  UNIQUE KEY `user_login_UNIQUE` (`user_email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci COMMENT='Tabla de usuarios de la aplicación';
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
