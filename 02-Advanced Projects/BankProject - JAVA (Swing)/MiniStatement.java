import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;

public class MiniStatement extends JFrame implements ActionListener {
    
    JButton b1; // Exit button
    JLabel l1;  // Label to display transaction history

    // Constructor to initialize and build the mini statement window
    MiniStatement(String pin) {
        super("Mini Statement"); // Set the window title
        getContentPane().setBackground(Color.WHITE); // Set background color
        setSize(400, 600); // Set window size
        setLocation(20, 20); // Set window position on screen
        
        l1 = new JLabel(); // Label to display transaction records
        add(l1);
        
        // Bank title label
        JLabel l2 = new JLabel("UETIANS Bank");
        l2.setBounds(150, 20, 100, 20);
        add(l2);
        
        // Label to display masked card number
        JLabel l3 = new JLabel();
        l3.setBounds(20, 80, 300, 20);
        add(l3);
        
        // Label to display final balance
        JLabel l4 = new JLabel();
        l4.setBounds(20, 400, 300, 20);
        add(l4);
        
        // Fetch and display card number from database (masked)
        try {
            Conn c = new Conn(); // Database connection
            ResultSet rs = c.s.executeQuery("SELECT * FROM login WHERE pin = '" + pin + "'");
            while (rs.next()) {
                // Show first 4 and last 4 digits, mask the rest
                l3.setText("Card Number: " + rs.getString("cardno").substring(0, 4) + 
                    "XXXXXXXX" + rs.getString("cardno").substring(12));
            }
        } catch (Exception e) {
            // Silent catch (not recommended—should log)
        }

        // Fetch and display transaction history & calculate balance
        try {
            int balance = 0;
            Conn c1 = new Conn(); // Another DB connection
            ResultSet rs = c1.s.executeQuery("SELECT * FROM bank WHERE pin = '" + pin + "'");
            
            while (rs.next()) {
                // Append each transaction to the label using HTML for formatting
                l1.setText(l1.getText() + "<html>" + rs.getString("date") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    rs.getString("type") + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
                    rs.getString("amount") + "<br><br><html>");

                // Update balance based on type of transaction
                if (rs.getString("type").equals("Deposit")) {
                    balance += Integer.parseInt(rs.getString("amount"));
                } else {
                    balance -= Integer.parseInt(rs.getString("amount"));
                }
            }
            // Display final balance
            l4.setText("Your total Balance is Rs " + balance);
        } catch (Exception e) {
            e.printStackTrace(); // Print error details
        }

        // Layout settings and button creation
        setLayout(null);
        b1 = new JButton("Exit"); // Create exit button
        add(b1);
        b1.addActionListener(this); // Add action listener to close window
        
        // Set bounds for transaction label and exit button
        l1.setBounds(20, 140, 400, 200);
        b1.setBounds(125, 500, 150, 30);
    }

    // Handle button click event
    public void actionPerformed(ActionEvent ae) {
        this.setVisible(false); // Close the window
    }

    // Main method to run the GUI
    public static void main(String[] args) {
        new MiniStatement("").setVisible(true); // Launch mini statement GUI
    }
}