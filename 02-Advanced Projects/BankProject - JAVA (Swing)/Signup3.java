// Import necessary packages
import java.awt.*;                 // For GUI components
import java.awt.event.*;           // For handling events
import javax.swing.*;              // For Swing components
import java.sql.*;                 // For database interaction
import java.util.*;                // For utilities like Random

public class Signup3 extends JFrame implements ActionListener {
    
    // GUI Components
    JLabel l1, l2, l3, l4, l5, l6, l7, l8, l9, l10, l11, l12;
    JRadioButton r1, r2, r3, r4;
    JButton b1, b2;
    JCheckBox c1, c2, c3, c4, c5, c6, c7;
    String formno;

    // Constructor to initialize and build the form
    Signup3(String formno) {
        this.formno = formno;
        setTitle("NEW ACCOUNT APPLICATION FORM - PAGE 3");

        // Set layout for the frame
        setLayout(new BorderLayout());
        JPanel mainPanel = new JPanel();
        mainPanel.setLayout(null);
        mainPanel.setBackground(Color.WHITE);
        
        // Logo
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/logo.jpg"));
        Image i2 = i1.getImage().getScaledInstance(80, 80, Image.SCALE_DEFAULT);
        ImageIcon i3 = new ImageIcon(i2);
        JLabel l14 = new JLabel(i3);
        l14.setBounds(150, 10, 80, 80);
        mainPanel.add(l14);
        
        // Page title
        l1 = new JLabel("Page 3: Account Details");
        l1.setFont(new Font("Raleway", Font.BOLD, 22));
        l1.setBounds(280, 30, 400, 40);
        mainPanel.add(l1);
        
        // Display form number
        l11 = new JLabel("Form No:");
        l11.setFont(new Font("Raleway", Font.BOLD, 14));
        l11.setBounds(650, 10, 70, 30);
        mainPanel.add(l11);
        
        l12 = new JLabel(formno);
        l12.setFont(new Font("Raleway", Font.BOLD, 14));
        l12.setBounds(720, 10, 100, 30);
        mainPanel.add(l12);
        
        // Account type options
        l2 = new JLabel("Account Type:");
        l2.setFont(new Font("Raleway", Font.BOLD, 18));
        l2.setBounds(100, 100, 200, 30);
        mainPanel.add(l2);
        
        r1 = new JRadioButton("Saving Account");
        r2 = new JRadioButton("Fixed Deposit Account");
        r3 = new JRadioButton("Current Account");
        r4 = new JRadioButton("Recurring Deposit Account");

        // Set font, position, and background for radio buttons
        JRadioButton[] radios = {r1, r2, r3, r4};
        int[] xPos = {100, 350, 100, 350};
        int[] yPos = {140, 140, 180, 180};
        for (int i = 0; i < radios.length; i++) {
            radios[i].setFont(new Font("Raleway", Font.BOLD, 16));
            radios[i].setBackground(Color.WHITE);
            radios[i].setBounds(xPos[i], yPos[i], 250, 30);
            mainPanel.add(radios[i]);
        }

        // Group radio buttons to allow only one selection
        ButtonGroup groupgender = new ButtonGroup();
        groupgender.add(r1);
        groupgender.add(r2);
        groupgender.add(r3);
        groupgender.add(r4);
        
        // Card number label (static)
        l3 = new JLabel("Card Number:");
        l3.setFont(new Font("Raleway", Font.BOLD, 18));
        l3.setBounds(100, 230, 200, 30);
        mainPanel.add(l3);
        
        l4 = new JLabel("XXXX-XXXX-XXXX-4184");
        l4.setFont(new Font("Raleway", Font.BOLD, 18));
        l4.setBounds(300, 230, 250, 30);
        mainPanel.add(l4);
        
        l5 = new JLabel("(Your 16-digit Card number)");
        l5.setFont(new Font("Raleway", Font.BOLD, 12));
        l5.setBounds(100, 260, 200, 20);
        mainPanel.add(l5);
        
        l6 = new JLabel("It would appear on ATM Card/Cheque Book and Statements");
        l6.setFont(new Font("Raleway", Font.BOLD, 12));
        l6.setBounds(300, 260, 400, 20);
        mainPanel.add(l6);
        
        // PIN label (static)
        l7 = new JLabel("PIN:");
        l7.setFont(new Font("Raleway", Font.BOLD, 18));
        l7.setBounds(100, 300, 200, 30);
        mainPanel.add(l7);
        
        l8 = new JLabel("XXXX");
        l8.setFont(new Font("Raleway", Font.BOLD, 18));
        l8.setBounds(300, 300, 200, 30);
        mainPanel.add(l8);
        
        l9 = new JLabel("(4-digit password)");
        l9.setFont(new Font("Raleway", Font.BOLD, 12));
        l9.setBounds(100, 330, 200, 20);
        mainPanel.add(l9);
        
        // Services checkboxes
        l10 = new JLabel("Services Required:");
        l10.setFont(new Font("Raleway", Font.BOLD, 18));
        l10.setBounds(100, 370, 200, 30);
        mainPanel.add(l10);
        
        c1 = new JCheckBox("ATM CARD");
        c2 = new JCheckBox("Internet Banking");
        c3 = new JCheckBox("Mobile Banking");
        c4 = new JCheckBox("EMAIL Alerts");
        c5 = new JCheckBox("Cheque Book");
        c6 = new JCheckBox("E-Statement");

        JCheckBox[] checkboxes = {c1, c2, c3, c4, c5, c6};
        int[] xC = {100, 350, 100, 350, 100, 350};
        int[] yC = {410, 410, 450, 450, 490, 490};

        for (int i = 0; i < checkboxes.length; i++) {
            checkboxes[i].setBackground(Color.WHITE);
            checkboxes[i].setFont(new Font("Raleway", Font.BOLD, 16));
            checkboxes[i].setBounds(xC[i], yC[i], 200, 30);
            mainPanel.add(checkboxes[i]);
        }

        // Declaration checkbox
        c7 = new JCheckBox("I hereby declare that the above entered details are correct.", true);
        c7.setBackground(Color.WHITE);
        c7.setFont(new Font("Raleway", Font.BOLD, 12));
        c7.setBounds(100, 540, 500, 20);
        mainPanel.add(c7);
        
        // Panel for submit and cancel buttons
        JPanel buttonPanel = new JPanel();
        buttonPanel.setBackground(Color.WHITE);
        buttonPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 50, 20));
        
        b1 = new JButton("Submit");
        b2 = new JButton("Cancel");

        JButton[] buttons = {b1, b2};
        for (JButton btn : buttons) {
            btn.setFont(new Font("Raleway", Font.BOLD, 14));
            btn.setBackground(Color.BLACK);
            btn.setForeground(Color.black);
            btn.addActionListener(this);
            buttonPanel.add(btn);
        }

        // Add main panel and button panel to frame
        add(mainPanel, BorderLayout.CENTER);
        add(buttonPanel, BorderLayout.SOUTH);
        
        // Frame settings
        setSize(850, 700);                      // Set window size
        setLocationRelativeTo(null);            // Center the frame on screen
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setVisible(true);                       // Show frame
    }

    // Event handler for button clicks
    public void actionPerformed(ActionEvent ae) {
        String atype = null;

        // Determine selected account type
        if (r1.isSelected()) atype = "Saving Account";
        else if (r2.isSelected()) atype = "Fixed Deposit Account";
        else if (r3.isSelected()) atype = "Current Account";
        else if (r4.isSelected()) atype = "Recurring Deposit Account";
        
        // Generate random card number and PIN
        Random ran = new Random();
        long first7 = (ran.nextLong() % 90000000L) + 5040936000000000L;
        String cardno = "" + Math.abs(first7);
        long first3 = (ran.nextLong() % 9000L) + 1000L;
        String pin = "" + Math.abs(first3);
        
        // Get selected services
        String facility = "";
        if (c1.isSelected()) facility += " ATM Card";
        if (c2.isSelected()) facility += " Internet Banking";
        if (c3.isSelected()) facility += " Mobile Banking";
        if (c4.isSelected()) facility += " EMAIL Alerts";
        if (c5.isSelected()) facility += " Cheque Book";
        if (c6.isSelected()) facility += " E-Statement";
        
        try {
            if (ae.getSource() == b1) {  // Submit button
                if (atype == null) {
                    JOptionPane.showMessageDialog(null, "Please select an account type!");
                } else {
                    // Insert data into database
                    Conn c1 = new Conn();
                    String q1 = "INSERT INTO signupthree VALUES('" + formno + "','" + atype + "','" + cardno + "','" + pin + "','" + facility + "')";
                    String q2 = "INSERT INTO login VALUES('" + formno + "','" + cardno + "','" + pin + "')";
                    c1.s.executeUpdate(q1);
                    c1.s.executeUpdate(q2);

                    // Show confirmation and go to deposit page
                    JOptionPane.showMessageDialog(null, "Card Number: " + cardno + "\n PIN: " + pin);
                    new Deposit(pin).setVisible(true);
                    setVisible(false);
                }
            } else if (ae.getSource() == b2) {  // Cancel button
                System.exit(0);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    // Main method to run the form
    public static void main(String[] args) {
        new Signup3("").setVisible(true);
    }
}
