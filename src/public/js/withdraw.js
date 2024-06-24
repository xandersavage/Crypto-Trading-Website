import axios from "axios";
import { showWithdrawalEmailModal } from './alerts'

export const withdrawAmount = async (amount, userId) => {
    try {
      const res = await axios({
        method: 'POST',
        url: '/withdraw',
        data: {
          amount,
          userId
        }
      });
  
      if (res.status === 200) {
        showWithdrawalEmailModal('Withdrawal successful!')
        window.setTimeout(() => {
          location.reload(true);
        }, 2000);
      }
    } catch (error) {
      showWithdrawalEmailModal(`Error: ${error.response.data.error}`) 
    }
  };
  