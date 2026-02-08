// ATM Transaction Interface - Displays options like Deposit, Withdraw, Fast Cash, etc.

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;

public class Transactions extends JFrame implements ActionListener {

    // UI components
    JLabel l1;
    JButton b1, b2, b3, b4, b5, b6, b7;
    String pin; // Stores user PIN for transaction reference

    // Constructor
    Transactions(String pin) {
        this.pin = pin;

        // Load and scale ATM background image
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/atm.jpg"));
        Image i2 = i1.getImage().getScaledInstance(960, 700, Image.SCALE_SMOOTH); // Smooth scaling
        ImageIcon i3 = new ImageIcon(i2);
        JLabel l2 = new JLabel(i3); // Background label
        setLayout(null); // Use absolute positioning
        l2.setBounds(0, 0, 960, 700); // Size matches frame
        add(l2); // Add background image to frame

        // Title label: instruction to user
        l1 = new JLabel("Please Select Your Transaction");
        l1.setForeground(Color.WHITE);
        l1.setFont(new Font("System", Font.BOLD, 16));
        l1.setBounds(230, 200, 300, 75); 
        l2.add(l1);

        // Initialize transaction buttons
        b1 = new JButton("DEPOSIT");
        b2 = new JButton("CASH WITHDRAWL");
        b3 = new JButton("FAST CASH");
        b4 = new JButton("MINI STATEMENT");
        b5 = new JButton("PIN CHANGE");
        b6 = new JButton("BALANCE ENQUIRY");
        b7 = new JButton("EXIT");

        // Set button bounds and add to background (first column - left side)
        b1.setBounds(195, 260, 130, 30);  // DEPOSIT
        l2.add(b1);

        b3.setBounds(195, 305, 130, 30);  // FAST CASH
        l2.add(b3);

        b5.setBounds(195, 350, 130, 30);  // PIN CHANGE
        l2.add(b5);

        // Set button bounds and add to background (second column - right side)
        b2.setBounds(360, 260, 160, 30);  // CASH WITHDRAWAL
        l2.add(b2);

        b4.setBounds(360, 305, 160, 30);  // MINI STATEMENT
        l2.add(b4);

        b6.setBounds(360, 350, 160, 30);  // BALANCE ENQUIRY
        l2.add(b6);

        // Exit button (centered below other options)
        b7.setBounds(270, 400, 160, 20);  // EXIT
        b1.setFont(new Font("System", Font.PLAIN, 12)); // Adjust font size for consistency
        l2.add(b7);

        // Attach action listeners to buttons
        b1.addActionListener(this);
        b2.addActionListener(this);
        b3.addActionListener(this);
        b4.addActionListener(this);
        b5.addActionListener(this);
        b6.addActionListener(this);
        b7.addActionListener(this);

        // Frame settings
        setTitle("ATM Transactions");
        setSize(960, 700);                 // Set frame size
        setLocationRelativeTo(null);       // Center the window
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE); 
        setResizable(false);               // Prevent resizing
        setVisible(true);                  // Make frame visible
    }

    // Event handling for button clicks
    public void actionPerformed(ActionEvent ae) {
        if (ae.getSource() == b1) {
            setVisible(false);
            new Deposit(pin).setVisible(true); // Open Deposit window
        } else if (ae.getSource() == b2) {
            setVisible(false);
            new Withdrawl(pin).setVisible(true); // Open Withdrawal window
        } else if (ae.getSource() == b3) {
            setVisible(false);
            new FastCash(pin).setVisible(true); // Open Fast Cash window
        } else if (ae.getSource() == b4) {
            new MiniStatement(pin).setVisible(true); // Show Mini Statement in new window
        } else if (ae.getSource() == b5) {
            setVisible(false);
            new Pin(pin).setVisible(true); // Open PIN Change window
        } else if (ae.getSource() == b6) {
            setVisible(false);
            new BalanceEnquiry(pin).setVisible(true); // Open Balance Enquiry window
        } else if (ae.getSource() == b7) {
            System.exit(0); // Exit the application
        }
    }

    // Main method to run the application
    public static void main(String[] args) {
        new Transactions("").setVisible(true);
    }
}
