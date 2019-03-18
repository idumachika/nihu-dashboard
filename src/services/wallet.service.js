import {ApiService} from "./api.service";

const WalletService = {
    creditWallet: async ({user, amount_paid, description,unit_worth}) => {
        return await ApiService.post('/wallet/credit', {user:user, amount_paid:amount_paid,description:description,unit_worth:unit_worth}).then((res) => {
            return Promise.resolve(res.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
    
  
    
};
export {WalletService};