// Deposit.java - Handles deposit transactions in the ATM interface

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.util.*;

public class Deposit extends JFrame implements ActionListener {

    JTextField t1;          // Input field for deposit amount
    JButton b1, b2;         // Buttons for Deposit and Back actions
    JLabel l1;              // Instruction label
    String pin;             // Stores the user's PIN

    // Constructor to set up the deposit interface
    Deposit(String pin) {
        this.pin = pin;

        // Load and scale background image
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/atm.jpg"));
        Image i2 = i1.getImage().getScaledInstance(960, 700, Image.SCALE_SMOOTH); // Maintain UI consistency
        ImageIcon i3 = new ImageIcon(i2);
        JLabel background = new JLabel(i3);
        background.setBounds(0, 0, 960, 700);
        setLayout(null);
        add(background);

        // Instruction label to guide the user
        l1 = new JLabel("ENTER AMOUNT YOU WANT TO DEPOSIT");
        l1.setForeground(Color.WHITE);
        l1.setFont(new Font("System", Font.BOLD, 16));
        l1.setBounds(200, 250, 400, 35);
        background.add(l1);

        // Text field for entering deposit amount
        t1 = new JTextField();
        t1.setFont(new Font("Raleway", Font.BOLD, 22));
        t1.setBounds(200, 300, 320, 30);
        background.add(t1);

        // Deposit button - to confirm and process the deposit
        b1 = new JButton("DEPOSIT");
        b1.setBounds(200, 360, 130, 30);
        background.add(b1);

        // Back button - to return to the Transactions screen
        b2 = new JButton("BACK");
        b2.setBounds(360, 360, 160, 30);
        background.add(b2);

        // Add action listeners to buttons
        b1.addActionListener(this);
        b2.addActionListener(this);

        // Window settings
        setTitle("Deposit");
        setSize(960, 700);               // Match Transactions window size
        setLocationRelativeTo(null);     // Center window on screen
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setResizable(false);             // Fixed size for uniform UI
        setVisible(true);
    }

    // Handles button click actions
    public void actionPerformed(ActionEvent ae) {
        try {
            String amount = t1.getText();        // Get entered amount
            Date date = new Date();              // Get current date

            if (ae.getSource() == b1) {          // If DEPOSIT button is clicked
                if (amount.equals("")) {
                    JOptionPane.showMessageDialog(null, "Please enter the amount to deposit.");
                } else {
                    Conn c1 = new Conn();        // Create DB connection
                    // Insert deposit record into the 'bank' table
                    c1.s.executeUpdate("insert into bank values('" + pin + "', '" + date + "', 'Deposit', '" + amount + "')");
                    JOptionPane.showMessageDialog(null, "Rs. " + amount + " Deposited Successfully");
                    setVisible(false);
                    new Transactions(pin).setVisible(true);  // Redirect to Transactions screen
                }
            } else if (ae.getSource() == b2) {   // If BACK button is clicked
                setVisible(false);
                new Transactions(pin).setVisible(true);      // Redirect to Transactions screen
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print error for debugging
        }
    }

    // Main method for testing this screen independently
    public static void main(String[] args) {
        new Deposit("").setVisible(true);
    }
}
