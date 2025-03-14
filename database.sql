-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 14, 2025 at 05:32 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `im_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `Brand_ID` int(11) NOT NULL,
  `Brand_Name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `Customer_ID` int(11) NOT NULL,
  `Customer_Name` varchar(100) NOT NULL,
  `Customer_PhoneNo` varchar(15) DEFAULT NULL,
  `Customer_Address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `Employee_ID` int(11) NOT NULL,
  `Employee_Name` varchar(100) NOT NULL,
  `Employee_Gender` enum('Male','Female','Other') DEFAULT NULL,
  `Employee_DOB` date DEFAULT NULL,
  `Employee_Address` varchar(255) DEFAULT NULL,
  `Employee_ContactNo` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`Employee_ID`, `Employee_Name`, `Employee_Gender`, `Employee_DOB`, `Employee_Address`, `Employee_ContactNo`) VALUES
(1, 'Admin Admin', 'Male', '2025-02-14', 'Matina Crossing', '+63900000000');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Product_ID` int(11) NOT NULL,
  `Product_Name` varchar(100) NOT NULL,
  `Brand_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productvariant`
--

CREATE TABLE `productvariant` (
  `Bar_Code` varchar(50) NOT NULL,
  `Product_ID` int(11) DEFAULT NULL,
  `Unit_Weight` decimal(10,2) DEFAULT NULL,
  `Unit_Size` varchar(50) DEFAULT NULL,
  `Unit_Price` decimal(10,2) DEFAULT NULL,
  `Inventory_Quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `remarks`
--

CREATE TABLE `remarks` (
  `Remarks_ID` int(11) NOT NULL,
  `Remarks` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `Sales_ID` int(11) NOT NULL,
  `Customer_ID` int(11) DEFAULT NULL,
  `Employee_ID` int(11) DEFAULT NULL,
  `Sales_Date` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `salesdetails`
--

CREATE TABLE `salesdetails` (
  `Sales_ID` int(11) NOT NULL,
  `Bar_Code` varchar(50) DEFAULT NULL,
  `Unit_Price` decimal(10,2) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Subtotal` decimal(10,2) GENERATED ALWAYS AS (`Quantity` * `Unit_Price`) STORED,
  `Status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `stockoutsupply`
--

CREATE TABLE `stockoutsupply` (
  `StockOut_ID` int(11) NOT NULL,
  `SupplyDetail_ID` int(11) DEFAULT NULL,
  `Employee_ID` int(11) DEFAULT NULL,
  `Remarks_ID` int(11) DEFAULT NULL,
  `StockOut_Date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `Supplier_ID` int(11) NOT NULL,
  `Supplier_Name` varchar(100) NOT NULL,
  `Supplier_Email` varchar(100) DEFAULT NULL,
  `Supplier_Address` varchar(255) DEFAULT NULL,
  `Supplier_ContactNo` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supply`
--

CREATE TABLE `supply` (
  `Supply_ID` int(11) NOT NULL,
  `Supplier_ID` int(11) DEFAULT NULL,
  `Employee_ID` int(11) DEFAULT NULL,
  `Supply_Date` datetime NOT NULL DEFAULT current_timestamp(),
  `Status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `supplydetails`
--

CREATE TABLE `supplydetails` (
  `SupplyDetail_ID` int(11) NOT NULL,
  `Supply_ID` int(11) DEFAULT NULL,
  `Bar_Code` varchar(50) DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `Unit_Price` decimal(10,2) DEFAULT NULL,
  `Expiry` date DEFAULT NULL,
  `Subtotal` decimal(10,2) GENERATED ALWAYS AS (`Quantity` * `Unit_Price`) STORED,
  `Status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Employee_ID` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(256) NOT NULL,
  `Role` enum('admin','cashier','stockman') NOT NULL,
  `User_DateReg` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Employee_ID`, `Username`, `Password`, `Role`, `User_DateReg`) VALUES
(1, 'admin', '$2b$10$clZ5pVRM/OA/QsRIBw3Q/Out22Xd6ayrY4a0t8k81IRxr7IsACewi', 'admin', '2025-02-28 17:37:40');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`Brand_ID`),
  ADD UNIQUE KEY `Brand_Name` (`Brand_Name`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`Customer_ID`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`Employee_ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Product_ID`),
  ADD UNIQUE KEY `Product_Name` (`Product_Name`),
  ADD KEY `Brand_ID` (`Brand_ID`);

--
-- Indexes for table `productvariant`
--
ALTER TABLE `productvariant`
  ADD PRIMARY KEY (`Bar_Code`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- Indexes for table `remarks`
--
ALTER TABLE `remarks`
  ADD PRIMARY KEY (`Remarks_ID`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`Sales_ID`),
  ADD KEY `Customer_ID` (`Customer_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `salesdetails`
--
ALTER TABLE `salesdetails`
  ADD PRIMARY KEY (`Sales_ID`) USING BTREE,
  ADD KEY `Bar_Code` (`Bar_Code`);

--
-- Indexes for table `stockoutsupply`
--
ALTER TABLE `stockoutsupply`
  ADD PRIMARY KEY (`StockOut_ID`),
  ADD UNIQUE KEY `SupplyDetail_ID` (`SupplyDetail_ID`) USING BTREE,
  ADD KEY `Remarks_ID` (`Remarks_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`Supplier_ID`);

--
-- Indexes for table `supply`
--
ALTER TABLE `supply`
  ADD PRIMARY KEY (`Supply_ID`),
  ADD KEY `Supplier_ID` (`Supplier_ID`),
  ADD KEY `Employee_ID` (`Employee_ID`);

--
-- Indexes for table `supplydetails`
--
ALTER TABLE `supplydetails`
  ADD PRIMARY KEY (`SupplyDetail_ID`),
  ADD KEY `Supply_ID` (`Supply_ID`),
  ADD KEY `supplydetails_ibfk_3` (`Bar_Code`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Employee_ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `Brand_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `Customer_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `Employee_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Product_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `remarks`
--
ALTER TABLE `remarks`
  MODIFY `Remarks_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `Sales_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `stockoutsupply`
--
ALTER TABLE `stockoutsupply`
  MODIFY `StockOut_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `Supplier_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supply`
--
ALTER TABLE `supply`
  MODIFY `Supply_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `supplydetails`
--
ALTER TABLE `supplydetails`
  MODIFY `SupplyDetail_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`Brand_ID`) REFERENCES `brand` (`Brand_ID`) ON DELETE SET NULL;

--
-- Constraints for table `productvariant`
--
ALTER TABLE `productvariant`
  ADD CONSTRAINT `productvariant_ibfk_1` FOREIGN KEY (`Product_ID`) REFERENCES `product` (`Product_ID`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`Customer_ID`) REFERENCES `customer` (`Customer_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE SET NULL;

--
-- Constraints for table `salesdetails`
--
ALTER TABLE `salesdetails`
  ADD CONSTRAINT `salesdetails_ibfk_1` FOREIGN KEY (`Sales_ID`) REFERENCES `sales` (`Sales_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `salesdetails_ibfk_2` FOREIGN KEY (`Bar_Code`) REFERENCES `productvariant` (`Bar_Code`) ON DELETE SET NULL;

--
-- Constraints for table `stockoutsupply`
--
ALTER TABLE `stockoutsupply`
  ADD CONSTRAINT `stockoutsupply_ibfk_1` FOREIGN KEY (`SupplyDetail_ID`) REFERENCES `supplydetails` (`SupplyDetail_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `stockoutsupply_ibfk_2` FOREIGN KEY (`Remarks_ID`) REFERENCES `remarks` (`Remarks_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `stockoutsupply_ibfk_3` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE SET NULL;

--
-- Constraints for table `supply`
--
ALTER TABLE `supply`
  ADD CONSTRAINT `supply_ibfk_1` FOREIGN KEY (`Supplier_ID`) REFERENCES `supplier` (`Supplier_ID`) ON DELETE SET NULL,
  ADD CONSTRAINT `supply_ibfk_2` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE SET NULL;

--
-- Constraints for table `supplydetails`
--
ALTER TABLE `supplydetails`
  ADD CONSTRAINT `supplydetails_ibfk_1` FOREIGN KEY (`Supply_ID`) REFERENCES `supply` (`Supply_ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `supplydetails_ibfk_2` FOREIGN KEY (`Bar_Code`) REFERENCES `productvariant` (`Bar_Code`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`Employee_ID`) REFERENCES `employee` (`Employee_ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
