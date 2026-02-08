// Importing necessary libraries for GUI, events, SQL, and calendar
import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.sql.*;
import com.toedter.calendar.JDateChooser; // External library for date picking
import java.util.*;

public class Signup extends JFrame implements ActionListener {

    // Declaration of GUI components
    JLabel l1,l2,l3,l4,l5,l6,l7,l8,l9,l10,l11,l12,l13,l14,l15;
    JTextField t1,t2,t3,t4,t5,t6,t7;
    JRadioButton r1,r2,r3,r4,r5;
    JButton b;
    JDateChooser dateChooser;

    // Generate a random 4-digit form number
    Random ran = new Random();
    long first4 = (ran.nextLong() % 9000L) + 1000L;
    String first = "" + Math.abs(first4);

    // Constructor to initialize GUI
    Signup() {

        setTitle("NEW ACCOUNT APPLICATION FORM");

        // Adding a logo image to the form
        ImageIcon i1 = new ImageIcon(ClassLoader.getSystemResource("icons/logo.jpg"));
        Image i2 = i1.getImage().getScaledInstance(100, 100, Image.SCALE_DEFAULT);
        ImageIcon i3 = new ImageIcon(i2);
        JLabel l11 = new JLabel(i3);
        l11.setBounds(20, 0, 100, 100);
        add(l11);

        // Setting heading labels
        l1 = new JLabel("APPLICATION FORM NO. "+first);
        l1.setFont(new Font("Raleway", Font.BOLD, 38));

        l2 = new JLabel("Page 1: Personal Details");
        l2.setFont(new Font("Raleway", Font.BOLD, 22));

        // Setting field labels
        l3 = new JLabel("Name:");
        l4 = new JLabel("Father's Name:");
        l5 = new JLabel("Date of Birth:");
        l6 = new JLabel("Gender:");
        l7 = new JLabel("Email Address:");
        l8 = new JLabel("Marital Status:");
        l9 = new JLabel("Address:");
        l10 = new JLabel("City:");
        l11 = new JLabel("Pin Code:");
        l12 = new JLabel("State:");
        l13 = new JLabel("Date");
        l14 = new JLabel("Month");
        l15 = new JLabel("Year");

        // Setting fonts
        l3.setFont(new Font("Raleway", Font.BOLD, 20));
        l4.setFont(new Font("Raleway", Font.BOLD, 20));
        l5.setFont(new Font("Raleway", Font.BOLD, 20));
        l6.setFont(new Font("Raleway", Font.BOLD, 20));
        l7.setFont(new Font("Raleway", Font.BOLD, 20));
        l8.setFont(new Font("Raleway", Font.BOLD, 20));
        l9.setFont(new Font("Raleway", Font.BOLD, 20));
        l10.setFont(new Font("Raleway", Font.BOLD, 20));
        l11.setFont(new Font("Raleway", Font.BOLD, 20));
        l12.setFont(new Font("Raleway", Font.BOLD, 20));
        l13.setFont(new Font("Raleway", Font.BOLD, 14));
        l14.setFont(new Font("Raleway", Font.BOLD, 14));
        l15.setFont(new Font("Raleway", Font.BOLD, 14));

        // Creating text fields
        t1 = new JTextField(); // Name
        t2 = new JTextField(); // Father's Name
        t3 = new JTextField(); // Email
        t4 = new JTextField(); // Address
        t5 = new JTextField(); // City
        t6 = new JTextField(); // Pin Code
        t7 = new JTextField(); // State

        // Set font for all text fields
        Font tfFont = new Font("Raleway", Font.BOLD, 14);
        t1.setFont(tfFont); t2.setFont(tfFont); t3.setFont(tfFont);
        t4.setFont(tfFont); t5.setFont(tfFont); t6.setFont(tfFont); t7.setFont(tfFont);

        // Submit button
        b = new JButton("Next");
        b.setFont(tfFont);
        b.setBackground(Color.BLACK);
        b.setForeground(Color.black);

        // Radio buttons for gender
        r1 = new JRadioButton("Male");
        r2 = new JRadioButton("Female");
        r1.setFont(tfFont); r2.setFont(tfFont);
        r1.setBackground(Color.WHITE); r2.setBackground(Color.WHITE);
        ButtonGroup groupgender = new ButtonGroup(); // Only one gender can be selected
        groupgender.add(r1); groupgender.add(r2);

        // Radio buttons for marital status
        r3 = new JRadioButton("Married");
        r4 = new JRadioButton("Unmarried");
        r5 = new JRadioButton("Other");
        r3.setFont(tfFont); r4.setFont(tfFont); r5.setFont(tfFont);
        r3.setBackground(Color.WHITE); r4.setBackground(Color.WHITE); r5.setBackground(Color.WHITE);
        ButtonGroup groupstatus = new ButtonGroup(); // Only one marital status can be selected
        groupstatus.add(r3); groupstatus.add(r4); groupstatus.add(r5);

        // Date picker for DOB
        dateChooser = new JDateChooser();
        dateChooser.setForeground(new Color(105, 105, 105));
        dateChooser.setBounds(137, 337, 200, 29);
        add(dateChooser);

        // Setting layout manually
        setLayout(null);

        // Positioning all components using setBounds and adding to frame
        l1.setBounds(140,20,600,40); add(l1);
        l2.setBounds(290,80,600,30); add(l2);
        l3.setBounds(100,140,100,30); add(l3); t1.setBounds(300,140,400,30); add(t1);
        l4.setBounds(100,190,200,30); add(l4); t2.setBounds(300,190,400,30); add(t2);
        l5.setBounds(100,240,200,30); add(l5); dateChooser.setBounds(300, 240, 400, 30); add(dateChooser);
        l6.setBounds(100,290,200,30); add(l6); r1.setBounds(300,290,60,30); add(r1); r2.setBounds(450,290,90,30); add(r2);
        l7.setBounds(100,340,200,30); add(l7); t3.setBounds(300,340,400,30); add(t3);
        l8.setBounds(100,390,200,30); add(l8); r3.setBounds(300,390,100,30); add(r3); r4.setBounds(450,390,100,30); add(r4); r5.setBounds(635,390,100,30); add(r5);
        l9.setBounds(100,440,200,30); add(l9); t4.setBounds(300,440,400,30); add(t4);
        l10.setBounds(100,490,200,30); add(l10); t5.setBounds(300,490,400,30); add(t5);
        l11.setBounds(100,540,200,30); add(l11); t6.setBounds(300,540,400,30); add(t6);
        l12.setBounds(100,590,200,30); add(l12); t7.setBounds(300,590,400,30); add(t7);

        b.setBounds(620,660,80,30); add(b); // Add submit button
        b.addActionListener(this); // Add action listener to button

        // Frame background and size
        getContentPane().setBackground(Color.WHITE);
        setSize(850,800);
        setLocation(500,120);
        setVisible(true);
    }

    // Action performed when 'Next' button is clicked
    public void actionPerformed(ActionEvent ae) {
        // Retrieve all form values
        String formno = first;
        String name = t1.getText();
        String fname = t2.getText();
        String dob = ((JTextField) dateChooser.getDateEditor().getUiComponent()).getText();
        
        String gender = null;
        if(r1.isSelected()) gender = "Male";
        else if(r2.isSelected()) gender = "Female";

        String email = t3.getText();
        String marital = null;
        if(r3.isSelected()) marital = "Married";
        else if(r4.isSelected()) marital = "Unmarried";
        else if(r5.isSelected()) marital = "Other";

        String address = t4.getText();
        String city = t5.getText();
        String pincode = t6.getText();
        String state = t7.getText();

        // Save data to the database
        try {
            if(t6.getText().equals("")) {
                JOptionPane.showMessageDialog(null, "Fill all the required fields");
            } else {
                Conn c1 = new Conn(); // Assuming Conn is a class that handles DB connection
                String q1 = "insert into signup values('"+formno+"','"+name+"','"+fname+"','"+dob+"','"+gender+"','"+email+"','"+marital+"','"+address+"','"+city+"','"+pincode+"','"+state+"')";
                c1.s.executeUpdate(q1); // Execute insert query
                
                new Signup2(first).setVisible(true); // Move to next page/form
                setVisible(false); // Hide current form
            }

        } catch(Exception e) {
            e.printStackTrace();
        }
    }

    // Main method to run the form
    public static void main(String[] args) {
        new Signup().setVisible(true);
    }
}
