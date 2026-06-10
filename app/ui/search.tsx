'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams(); // Get the read-only parameter object of the current URL
  const pathname = usePathname();  // Get the current page path, like "/dashboard/invoices" 
  const { replace } = useRouter();  // Get the route jump method
  
  // Handle search
  // Use useDebouncedCallback() for debouncing design.
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams); // Deep copy 'searchParams', then it can be modify.
    params.set('page', '1');  // reset the page, if you are searching on page 5, it will jump page 1.
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`); // Feed the new path to the browser.
  }, 300);
  
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
