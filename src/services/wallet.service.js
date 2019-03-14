import {ApiService} from "./api.service";

// const WalletService = {
//     creditWallet: async () => {
//         return await ApiService.post("/wallet/credit").then((res) => {
//             window.console.log(res.data.data);
//             return Promise.resolve(res.data.data);
//         }).catch(() => {
//             return Promise.reject(false);
//         });
//     },
// };




const WalletService = {
    creditWallet: ({user, amount_paid, description,unit_worth}) => {
        return new Promise(function (resolve, reject) {
            ApiService.post('/wallet/credit', {user:user, amount_paid:amount_paid,description:description,unit_worth:unit_worth}).then(async (res) => {
                let token = res.data.data.token;
                resolve(token);
            }).catch((error) => {
                reject(error.response.data);
            });
        });
    },
  
    
};
export {WalletService};