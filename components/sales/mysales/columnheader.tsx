'use_client'
import React from 'react';
import { Button } from '@/components/ui/button';
import SortIcon from '@/public/sort.svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ColumnHeaderProps {
  text: string;
  column: any;
}

const ColumnHeader: React.FC<ColumnHeaderProps> = ({ text, column }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentOrder = searchParams?.get('order');

    const handelesortcolumn = () => {
    
    // Create a new URLSearchParams object from the current search parameters
    const params = new URLSearchParams(searchParams?.toString());

    // Update orderBy and order parameters
    params.set('orderBy', column.id);
    params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');

    // Push the updated URL with query parameters
    router.push(`${pathname}?${params.toString()}`);
    }

  return (
    <Button
      className='flex items-center bg-inherit text-[#637083] group hover:text-blue-500 hover:bg-slate-50 p-0'
       onClick={handelesortcolumn}
    >
      <SortIcon className="stroke-[#637083] mr-2 group-hover:stroke-blue-500" stroke-linecap="round" stroke-linejoin="round"/>
      {text}
    </Button>
  );
};

export default ColumnHeader;