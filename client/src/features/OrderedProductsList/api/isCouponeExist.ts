import { host } from "../../../shared/constants/host"

export default function isCouponeExist(coupone: string) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/get-specific-coupone/:${coupone}`))
        } catch (err) {
            reject(console.error(err))
        }
    })
    .then((response: any) => response.json())
};