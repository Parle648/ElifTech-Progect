import { host } from "../constants/host"

export default function getByFilters(props: string) {
    return new Promise((resolve, reject) => {
        try {
            resolve(fetch(`${host}/api/get-by-filters?${props}`))
        } catch (error) {
            reject(console.error(error))
        }
    })
    .then((response: any) => response.json())
    .then(data => data)
};