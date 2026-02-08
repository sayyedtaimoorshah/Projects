// Conn.java - Handles database connection for the Bank Management System

import java.sql.*;  // Import JDBC package for database operations

public class Conn {
    Connection c; // Connection object to establish connection with database
    Statement s;  // Statement object to execute SQL queries

    // Constructor to initialize database connection
    public Conn() {
        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection to the MySQL database named 'bankmanagementsystem'
            // Replace "root" with your DB username and "ifconfig" with your DB password
            c = DriverManager.getConnection("jdbc:mysql:///bankmanagementsystem", "root", "ifconfig");

            // Create a Statement object to run SQL queries
            s = c.createStatement();

        } catch (Exception e) {
            // Print error if connection fails
            System.out.println(e);
        }
    }
}
