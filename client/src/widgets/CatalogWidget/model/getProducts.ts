export default function getProducts(filters: any) {
    console.log(filters);
    
    console.log(`sortby=${filters.sortBy}&types=${JSON.stringify(filters.types)}&prefered=${JSON.stringify(filters.prefered)}`);
    
}