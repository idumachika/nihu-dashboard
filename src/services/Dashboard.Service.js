import {ApiService} from "./api.service";

const dashboardService = {
    dashboardstatistic: async () => {
        return await ApiService.get("/dashboard/stats").then((res) => {
            window.console.log(res.data.data);
            return Promise.resolve(res.data.data);
        }).catch(() => {
            return Promise.reject(false);
        });
    },
};

export {dashboardService};