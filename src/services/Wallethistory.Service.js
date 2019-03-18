import {ApiService} from "./api.service";

const WalletHistoryService = {
    wallethistory: async () => {
        return await ApiService.get("/admin/history/wallet").then((res) => {
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
    
};


export {WalletHistoryService};