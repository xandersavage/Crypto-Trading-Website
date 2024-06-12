import axios from "axios";
import { showEmailModal } from "./alerts";

// Function to send email
export const sendEmail = async (userId) => {
    try {
        const res = await axios({
          method: "POST",
          url: "/send-transaction-email",
          data: {
            userId,
          }
        });
    
        if (res.status === 200) {
          showEmailModal('Emails sent successfully');
        }

    } catch (e) {
        showEmailModal(`Error sending email ${e}`);
    }
};