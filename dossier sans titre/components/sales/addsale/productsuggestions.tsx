"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { Product } from '@/types/types';
import { ClipLoader } from 'react-spinners';

interface ProductsTableProps { 
    searchFilters: any;
    onAddToCart: (product: Product) => void;
    setSearchFilters: (filters: any) => void;
}

const ProductsTable = ({ searchFilters, onAddToCart, setSearchFilters }: ProductsTableProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const tableContainerRef = useRef<HTMLDivElement>(null);

    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return (...args: any[]) => {
            if (timeoutId) clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const fetchProducts = async (filters: typeof searchFilters, page: number) => {
        setIsLoading(true);
        const query = new URLSearchParams({
            ...filters,
            page: page.toString(),
            limit: '40', // Adjust the limit as needed
        }).toString();
        const response = await fetch(`/api/products?${query}`, { cache: "no-cache" });
        const data = await response.json();
        
        const productsData = data.map((product: any) => ({
            id: product.id,
            name: product.name,
            ppv: product.ppv,
            pph: product.pph,
            selected_ppv: product.ppv[0],
            zone: product.zone,
            disp: product.disp,
        }));
        
        console.log(productsData);
        setProducts(prevProducts => [...prevProducts, ...productsData]);
        setIsLoading(false);
        setHasMore(productsData.length > 0); // Update hasMore based on the fetched data
    };

    const debouncedFetchProducts = useCallback(debounce(fetchProducts, 500), []);

    useEffect(() => {
        const handleScroll = () => {
            const container = tableContainerRef.current;
            if (!container) return;

            if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10 && !isLoading && hasMore) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        };
    
        const container = tableContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
            }
        };
    }, [isLoading, hasMore]);
    
    useEffect(() => {
        if (hasMore && !isLoading) {
            debouncedFetchProducts(searchFilters, currentPage);
        }
    }, [currentPage]);

    useEffect(() => {
        const shouldFetch = 
            (searchFilters.nameOrCode.trim().length > 2) ||
            (searchFilters.name.trim().length > 2) ||
            (searchFilters.ppv.trim().length > 0) ||
            (searchFilters.pph.trim().length > 0) ||
            (searchFilters.zone.trim().length > 0) ||
            (searchFilters.molecule.trim().length > 2);
    
        if (shouldFetch) {
            setProducts([]);
            setCurrentPage(1);
            setHasMore(true);
            debouncedFetchProducts(searchFilters, 1);
        } else {
            setProducts([]);
            setHasMore(false); // No more products to load if search criteria are not met
        }
    }, [searchFilters, debouncedFetchProducts]);

    return (
        <div className={`max-h-[40svh] ${(products.length > 0 || isLoading) ? "flex flex-col" : "hidden"}`} >
            <div className={`flex flex-col overflow-auto ${products.length ? "border" : ""}`} ref={tableContainerRef}>
                {products.length > 0 && (
                    <table className="w-full divide-y divide-gray-200 relative">
                        <thead className="">
                            <tr className="text-[#344051] font-bold text-xs">
                                <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left tracking-wider">Nom</th>
                                <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left uppercase tracking-wider">PPV</th>
                                <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left tracking-wider">Prix</th>
                                <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left tracking-wider">Disp.</th>
                                <th className="sticky top-0 bg-gray-100 px-6 py-3 text-left tracking-wider">Zone</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 ">
                            {products.map((product: Product, index) => (
                                <tr
                                    key={index}
                                    className={`hover:bg-gray-200 product-suggestions cursor-pointer text-[#344051] text-[13px]/[13px] font-medium text-wrap w-full ${index % 2 === 0 ? 'bg-white' : 'bg-[#CCE0FF40]'}`}
                                    onClick={() => {
                                        onAddToCart(product);
                                        setProducts([]);
                                        setSearchFilters({
                                            nameOrCode: '',
                                            name: '',
                                            ppv: '',
                                            pph: '',
                                            zone: '',
                                            molecule: '',
                                        });
                                        setHasMore(false);
                                    }}
                                >
                                    <td className="p-4">{product.name}</td>
                                    <td className="p-4 whitespace-nowrap">{product.ppv[0]}</td>
                                    <td className="p-4 whitespace-nowrap text-center justify-center items-center">
                                        {product.ppv.length > 1 && (
                                            <span className='flex bg-white border border-[#F89406] rounded-[6px] max-w-8 min-h-7 text-[#F89406] text-xs text-center items-center justify-center'>
                                                {product.ppv.length}
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-4 whitespace-nowrap text-center justify-center items-center">
                                        <span className='flex bg-[#ECF9F2] border border-[#9FDFBF] rounded-[6px] max-w-8 min-h-7 text-[#39AC73] text-xs text-center items-center justify-center'>
                                            {product.disp}
                                        </span>
                                    </td>
                                    <td className="p-4 whitespace-nowrap">{product.zone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {isLoading && (
                    <div className="flex justify-center p-4">
                        <ClipLoader size={35} color={"#50C878"} loading={isLoading} />
                    </div>
                )}
                {!hasMore && !isLoading && (
                    <div className="flex justify-center p-4">
                        <span className="text-gray-500">Aucun autre produit à afficher</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProductsTable;