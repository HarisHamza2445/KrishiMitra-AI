const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, html) => {
    try {
        if (!process.env.BREVO_USER || !process.env.BREVO_PASS) {
            console.error("CRITICAL: BREVO_USER or BREVO_PASS not set in .env");
            return false;
        }

        const transporter = nodemailer.createTransport({
            host: "smtp-relay.brevo.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_PASS,
            },
        });

        const mailOptions = {
            from: `"KrishiMitra AI" <${process.env.BREVO_USER}>`,
            to: email,
            subject: subject,
            html: html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.messageId);
        return true;
    } catch (error) {
        console.error("❌ Brevo Email Error:", error.message);
        return false;
    }
};

module.exports = sendEmail;
