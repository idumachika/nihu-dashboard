import {ApiService} from "./api.service";

const WalletService = {
    creditWallet: async () => {
        return await ApiService.post("/wallet/credit").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {WalletService};