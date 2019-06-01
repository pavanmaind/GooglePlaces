CREATE DATABASE  IF NOT EXISTS `tsd_corp` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `tsd_corp`;
-- MySQL dump 10.13  Distrib 8.0.13, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: tsd_corp
-- ------------------------------------------------------
-- Server version	5.7.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `places_data`
--

DROP TABLE IF EXISTS `places_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `places_data` (
  `place_id` varchar(200) NOT NULL,
  `id` varchar(200) DEFAULT NULL,
  `description` text,
  `main_text` text,
  `secondary_text` text,
  `types` text,
  `formatted_address` text,
  `formatted_phone_number` varchar(500) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `lng` varchar(100) DEFAULT NULL,
  `name` text,
  `rating` double DEFAULT NULL,
  `searchString` text,
  `searchedCount` int(11) DEFAULT '1',
  `preferredCount` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `places_data`
--

LOCK TABLES `places_data` WRITE;
/*!40000 ALTER TABLE `places_data` DISABLE KEYS */;
INSERT INTO `places_data` VALUES ('ChIJT3x0WME53DsRGRvnGDM6s2Y','584772a3cccfe861a0a16f8f2ce5ac4054aa14a0','Hotel Taj, Nagde Road, Badgaun Balhe, Yeola, Nashik, Maharashtra, India','Hotel Taj','Nagde Road, Badgaun Balhe, Yeola, Nashik, Maharashtra, India','[\"lodging\",\"point_of_interest\",\"establishment\"]',NULL,NULL,NULL,NULL,NULL,NULL,'hotel taj nashik',2,0,'2019-06-01 18:10:57','2019-06-01 18:29:17'),('ChIJB5GQUFg13DsRVInD8wrSpTw','262ba15b67c29d77f8b0608d8e18b8fa53c058c8','Hotel taj, Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India','Hotel taj','Kolgaon - Rui Road, Rui, Nashik, Maharashtra, India','[\"restaurant\",\"food\",\"point_of_interest\",\"establishment\"]',NULL,NULL,NULL,NULL,NULL,NULL,'hotel taj nashik',2,0,'2019-06-01 18:10:57','2019-06-01 18:29:17'),('ChIJI_BqgrWZ3jsRMSe4RDAIEmw','9ae3c30edb37e52c5a888b1219fa2fc9c9d8e847','Hotel Taj Darbar, Old Agra Road, Golden Nagar, Malegaon, Nashik, Maharashtra, India','Hotel Taj Darbar','Old Agra Road, Golden Nagar, Malegaon, Nashik, Maharashtra, India','[\"restaurant\",\"food\",\"store\",\"point_of_interest\",\"establishment\"]','Old Agra Rd, Golden Nagar, Malegaon, Maharashtra 423203, India','088052 35890','20.556549','74.5433796','Hotel Taj Darbar',3.5,'hotel taj nashik',2,3,'2019-06-01 18:10:57','2019-06-01 18:29:24'),('ChIJq96_Emwa3jsR0UiHDiSpigM','68f530ff39a1849b44e69a75837eff91d0477086','Taj Hotel, Surgana, Nashik, Maharashtra, India','Taj Hotel','Surgana, Nashik, Maharashtra, India','[\"lodging\",\"point_of_interest\",\"establishment\"]',NULL,NULL,NULL,NULL,NULL,NULL,'hotel taj nashik',2,0,'2019-06-01 18:10:57','2019-06-01 18:29:17');
/*!40000 ALTER TABLE `places_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `fullName` varchar(60) DEFAULT NULL,
  `emailId` varchar(60) DEFAULT NULL,
  `passwordHash` varchar(500) DEFAULT NULL,
  `createdDate` datetime DEFAULT NULL,
  `isDeleted` tinyint(4) DEFAULT '0',
  `secretKey` varchar(500) DEFAULT NULL,
  `updatedDate` datetime DEFAULT NULL,
  `createdBy` int(11) DEFAULT NULL,
  `updatedBy` int(11) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `emailId_UNIQUE` (`emailId`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (53,'Pavan Maind','pavanm@winjit.com','e2c860a5435d48460eb9174a2b43a0ff7edf0a177a26e32066f010a36faef052','2019-05-31 16:15:55',0,'qr2uv3a1jq72c6r4nddy',NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'tsd_corp'
--
/*!50003 DROP PROCEDURE IF EXISTS `SignupUser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `SignupUser`( p_fullName varchar(500), p_email_id varchar(500), p_password_hash varchar(500), p_secret_key varchar(500), p_request_by int(11))
BEGIN
  DECLARE ip_NewUserID INT ;

IF ( SELECT EXISTS (SELECT 1 FROM users WHERE emailId = p_email_id and isDeleted = 0) )
  THEN
  SELECT 1 as IsOldRecord;

ELSE
      
		-- INSERT NEW USER
		 INSERT INTO users
			   (fullName, emailId, passwordHash, secretKey, createdDate, createdBy)
		 VALUES
		  (p_fullName, p_email_id, p_password_hash, p_secret_key, NOW(), p_request_by);
		-- GET PRIMARY KEY OF NEW ADDED RECORD
		 SET ip_NewUserID = LAST_INSERT_ID();


		-- RETURN RECORD
		SELECT 
			userId,
            fullName,
			emailId
		FROM
			users
		WHERE
			userId = ip_NewUserID;

END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-01 19:24:23
