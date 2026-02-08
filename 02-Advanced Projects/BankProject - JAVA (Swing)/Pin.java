// Pin.java - Allows the user to change their ATM PIN

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;

public class Pin extends JFrame implements ActionListener {

    JPasswordField t1, t2;  // Password fields for new PIN and confirmation
    JButton b1, b2;         // Buttons: CHANGE and BACK
    JLabel l1, l2, l3;       // Labels for headings and field descriptions
    String pin;              // Current user PIN

    // Constructor
    Pin(String pin) {
        this.pin = pin;

        // ✅ Background image setup
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/atm.jpg"));
        Image i2 = i1.getImage().getScaledInstance(960, 700, Image.SCALE_DEFAULT); // Resize image to match frame
        ImageIcon i3 = new ImageIcon(i2);
        JLabel background = new JLabel(i3);
        background.setBounds(0, 0, 960, 700);
        add(background);

        // ✅ Main heading
        l1 = new JLabel("CHANGE YOUR PIN");
        l1.setFont(new Font("System", Font.BOLD, 22));
        l1.setForeground(Color.WHITE);
        l1.setBounds(230, 200, 300, 75); // Positioned in center-ish
        background.add(l1);

        // ✅ New PIN label
        l2 = new JLabel("New PIN:");
        l2.setFont(new Font("System", Font.BOLD, 16));
        l2.setForeground(Color.WHITE);
        l2.setBounds(210, 270, 150, 25);
        background.add(l2);

        // ✅ Re-enter new PIN label
        l3 = new JLabel("Re-Enter:");
        l3.setFont(new Font("System", Font.BOLD, 16));
        l3.setForeground(Color.WHITE);
        l3.setBounds(210, 320, 200, 25);
        background.add(l3);

        // ✅ Password input fields
        t1 = new JPasswordField();                        // Input for new PIN
        t1.setFont(new Font("Raleway", Font.BOLD, 20));
        t1.setBounds(320, 270, 180, 25);
        background.add(t1);

        t2 = new JPasswordField();                        // Input for confirming new PIN
        t2.setFont(new Font("Raleway", Font.BOLD, 20));
        t2.setBounds(320, 320, 180, 25);
        background.add(t2);

        // ✅ Buttons for user actions
        b1 = new JButton("CHANGE");  // Button to change PIN
        b2 = new JButton("BACK");    // Button to go back
        b1.setBounds(200, 360, 140, 45);
        b2.setBounds(360, 360, 140, 45);
        background.add(b1);
        background.add(b2);

        // Add action listeners for buttons
        b1.addActionListener(this);
        b2.addActionListener(this);

        // ✅ Frame configuration
        setLayout(null);
        setSize(960, 700);              // Set frame size
        setLocation(300, 100);          // Position frame on screen
        setVisible(true);               // Make frame visible
    }

    // ✅ Event handler for button clicks
    public void actionPerformed(ActionEvent ae) {
        try {
            String npin = t1.getText();  // Get new PIN
            String rpin = t2.getText();  // Get re-entered PIN

            // Check if both PINs match
            if (!npin.equals(rpin)) {
                JOptionPane.showMessageDialog(null, "Entered PIN does not match");
                return;
            }

            if (ae.getSource() == b1) {
                // ✅ Validate inputs
                if (npin.equals("")) {
                    JOptionPane.showMessageDialog(null, "Enter New PIN");
                    return;
                }
                if (rpin.equals("")) {
                    JOptionPane.showMessageDialog(null, "Re-Enter new PIN");
                    return;
                }

                // ✅ Update PIN in all related tables
                Conn c1 = new Conn();
                String q1 = "update bank set pin = '" + rpin + "' where pin = '" + pin + "'";
                String q2 = "update login set pin = '" + rpin + "' where pin = '" + pin + "'";
                String q3 = "update signup3 set pin = '" + rpin + "' where pin = '" + pin + "'";

                c1.s.executeUpdate(q1);
                c1.s.executeUpdate(q2);
                c1.s.executeUpdate(q3);

                JOptionPane.showMessageDialog(null, "PIN changed successfully");

                // ✅ Redirect to transactions screen with new PIN
                setVisible(false);
                new Transactions(rpin).setVisible(true);

            } else if (ae.getSource() == b2) {
                // ✅ Back button logic
                new Transactions(pin).setVisible(true);
                setVisible(false);
            }
        } catch (Exception e) {
            e.printStackTrace(); // Print error if any
        }
    }

    // ✅ Main method for testing this screen independently
    public static void main(String[] args) {
        new Pin("").setVisible(true);
    }
} 