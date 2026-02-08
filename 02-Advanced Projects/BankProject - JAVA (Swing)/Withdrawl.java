// Withdrawl.java - Handles cash withdrawal functionality in the ATM system

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.Date;
import java.sql.*;

public class Withdrawl extends JFrame implements ActionListener {

    // UI Components
    JTextField t1;
    JButton b1, b2;
    JLabel l1, l2;
    String pin; // Stores user PIN for database operations

    // Constructor
    Withdrawl(String pin) {
        this.pin = pin;

        // Load and scale background image to match Transactions screen
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/atm.jpg"));
        Image i2 = i1.getImage().getScaledInstance(960, 700, Image.SCALE_SMOOTH); // Consistent image size
        ImageIcon i3 = new ImageIcon(i2);
        JLabel background = new JLabel(i3);
        background.setBounds(0, 0, 960, 700); // Set background bounds
        setLayout(null);
        add(background);

        // Title: Maximum limit warning
        l1 = new JLabel("MAXIMUM WITHDRAWAL IS RS.10,000");
        l1.setForeground(Color.WHITE);
        l1.setFont(new Font("System", Font.BOLD, 16));
        l1.setBounds(200, 230, 400, 25);
        background.add(l1);

        // Instruction to enter withdrawal amount
        l2 = new JLabel("PLEASE ENTER YOUR AMOUNT");
        l2.setForeground(Color.WHITE);
        l2.setFont(new Font("System", Font.BOLD, 16));
        l2.setBounds(200, 270, 400, 25);
        background.add(l2);

        // Input field for amount
        t1 = new JTextField();
        t1.setFont(new Font("Raleway", Font.BOLD, 22));
        t1.setBounds(200, 310, 320, 30);
        background.add(t1);

        // "Withdraw" button
        b1 = new JButton("WITHDRAW");
        b1.setBounds(200, 360, 130, 30);
        background.add(b1);

        // "Back" button
        b2 = new JButton("BACK");
        b2.setBounds(360, 360, 160, 30);
        background.add(b2);

        // Attach event listeners
        b1.addActionListener(this);
        b2.addActionListener(this);

        // Window settings
        setTitle("Withdraw");
        setSize(960, 700);                      // Match transaction screen size
        setLocationRelativeTo(null);            // Center on screen
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);                    // Fixed window size
        setVisible(true);                       // Show the frame
    }

    // Handle button click events
    public void actionPerformed(ActionEvent ae) {
        try {
            String amount = t1.getText(); // Get entered amount
            Date date = new Date();       // Get current date

            if (ae.getSource() == b1) { // If "Withdraw" button clicked
                if (amount.equals("")) {
                    JOptionPane.showMessageDialog(null, "Please enter the amount to withdraw.");
                } else {
                    Conn c1 = new Conn(); // Create DB connection
                    ResultSet rs = c1.s.executeQuery("SELECT * FROM bank WHERE pin = '" + pin + "'");
                    int balance = 0;

                    // Calculate current balance
                    while (rs.next()) {
                        if (rs.getString("type").equals("Deposit")) {
                            balance += Integer.parseInt(rs.getString("amount"));
                        } else {
                            balance -= Integer.parseInt(rs.getString("amount"));
                        }
                    }

                    // Check for sufficient balance
                    if (balance < Integer.parseInt(amount)) {
                        JOptionPane.showMessageDialog(null, "Insufficient Balance");
                        return;
                    }

                    // Insert withdrawal record into database
                    c1.s.executeUpdate("INSERT INTO bank VALUES('" + pin + "', '" + date + "', 'Withdrawl', '" + amount + "')");

                    // Show success message and redirect
                    JOptionPane.showMessageDialog(null, "Rs. " + amount + " Debited Successfully");
                    setVisible(false);
                    new Transactions(pin).setVisible(true);
                }

            } else if (ae.getSource() == b2) { // If "Back" button clicked
                setVisible(false);
                new Transactions(pin).setVisible(true); // Return to Transactions screen
            }

        } catch (Exception e) {
            e.printStackTrace(); // Log any errors
        }
    }

    // Main method for testing
    public static void main(String[] args) {
        new Withdrawl("").setVisible(true);
    }
}
