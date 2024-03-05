import { host } from "../../../shared/constants/host";

export default function getAllCoupones() {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/all-coupones`))
        } catch (err) {
            reject(console.error(err))
        }
    })
    .then((response: any) => response.json())
    .then((data: any) => data);
};