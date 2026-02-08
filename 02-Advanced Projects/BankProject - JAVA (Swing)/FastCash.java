// FastCash.java - Handles quick withdrawal functionality in the ATM interface

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;
import java.util.Date;

public class FastCash extends JFrame implements ActionListener {

    JLabel l1;                          // Instruction label
    JButton b1, b2, b3, b4, b5, b6, b7; // Buttons for predefined amounts and back
    String pin;                         // Stores user's PIN

    // Constructor to set up the Fast Cash window
    FastCash(String pin) {
        this.pin = pin;

        // Load and resize background image to match window
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/atm.jpg"));
        Image i2 = i1.getImage().getScaledInstance(960, 700, Image.SCALE_SMOOTH); // Resize to fit window
        ImageIcon i3 = new ImageIcon(i2);
        JLabel background = new JLabel(i3);
        background.setBounds(0, 0, 960, 700);
        setLayout(null);
        add(background);

        // Title label
        l1 = new JLabel("SELECT WITHDRAWAL AMOUNT");
        l1.setForeground(Color.WHITE);
        l1.setFont(new Font("System", Font.BOLD, 16));
        l1.setBounds(230, 200, 300, 75);
        background.add(l1);

        // Define buttons for quick withdrawal options
        b1 = new JButton("Rs 100");
        b2 = new JButton("Rs 500");
        b3 = new JButton("Rs 1000");
        b4 = new JButton("Rs 2000");
        b5 = new JButton("Rs 5000");
        b6 = new JButton("Rs 10000");
        b7 = new JButton("BACK");

        // Position buttons in two columns
        int x1 = 200, x2 = 360, y = 260, gap = 45;

        b1.setBounds(x1, y, 150, 30);
        b2.setBounds(x2, y, 160, 30);
        b3.setBounds(x1, y + gap, 150, 30);
        b4.setBounds(x2, y + gap, 160, 30);
        b5.setBounds(x1, y + 2 * gap, 150, 30);
        b6.setBounds(x2, y + 2 * gap, 160, 30);
        b7.setBounds(270, y + 3 * gap + 10, 160, 20); // Back button

        // Add buttons to background
        background.add(b1);
        background.add(b2);
        background.add(b3);
        background.add(b4);
        background.add(b5);
        background.add(b6);
        background.add(b7);

        // Add action listeners to buttons
        b1.addActionListener(this);
        b2.addActionListener(this);
        b3.addActionListener(this);
        b4.addActionListener(this);
        b5.addActionListener(this);
        b6.addActionListener(this);
        b7.addActionListener(this);

        // Window properties
        setTitle("Fast Cash");
        setSize(960, 700);
        setLocationRelativeTo(null);                      // Center the window
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);   // Exit app on close
        setResizable(false);                              // Disable resizing
        setVisible(true);
    }

    // Handle button click events
    public void actionPerformed(ActionEvent ae) {
        try {
            // Extract withdrawal amount from button label (e.g., "Rs 500" -> "500")
            String amount = ((JButton) ae.getSource()).getText().substring(3);
            Conn c = new Conn(); // Create DB connection

            // Fetch transaction history for this PIN to calculate balance
            ResultSet rs = c.s.executeQuery("select * from bank where pin = '" + pin + "'");
            int balance = 0;

            while (rs.next()) {
                if (rs.getString("type").equals("Deposit")) {
                    balance += Integer.parseInt(rs.getString("amount"));
                } else {
                    balance -= Integer.parseInt(rs.getString("amount"));
                }
            }

            // If back button is pressed
            if (ae.getSource() == b7) {
                setVisible(false);
                new Transactions(pin).setVisible(true);
                return;
            }

            // Check for sufficient balance
            if (balance < Integer.parseInt(amount)) {
                JOptionPane.showMessageDialog(null, "Insufficient Balance");
                return;
            }

            // Perform withdrawal and insert into database
            Date date = new Date();
            c.s.executeUpdate("insert into bank values('" + pin + "', '" + date + "', 'Withdrawl', '" + amount + "')");
            JOptionPane.showMessageDialog(null, "Rs. " + amount + " Debited Successfully");

            // Redirect to Transactions screen
            setVisible(false);
            new Transactions(pin).setVisible(true);

        } catch (Exception e) {
            e.printStackTrace(); // Print any exceptions for debugging
        }
    }

    // Main method to test the screen independently
    public static void main(String[] args) {
        new FastCash("").setVisible(true);
    }
}
