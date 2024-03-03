import getAllProducts from "../../../shared/api/getAllProducts";
import getByFilters from "../../../shared/api/getByFilters";

export default function getProducts(filters: any) {
    if (JSON.stringify(filters) === '{"sortBy":"nothing","types":[],"prefered":[]}') {
        return getAllProducts();
    } else {
        return getByFilters(`sortby=${filters.sortBy}&types=${JSON.stringify(filters.types)}&prefered=${JSON.stringify(filters.prefered)}`)
    }
}