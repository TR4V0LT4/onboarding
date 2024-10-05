"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function PaginationButton(
	{
		disabled,
		content,
		url,
		page,
		current,
		search
	}: {
		disabled?: boolean,
		content: number | any | string,
		url: string,
		page: number,
		current?: number,
		search?: string
	}
) {
	const	router = useRouter();

	function clickPagination() {
		if (content != "...")
			router.push(url + `?page=${page}${search ? `&search=${search}` : ""}`);
	}

	return (
		<Button
			className={`bg-white w-[32px] h-[32px] rounded-[8px] ${ (typeof content == "number" || content == "...") ? "" : "border-[1px]" } border-[#CED2DA] p-0 text-[#344051] text-[12px] font-normal ${ content == "..." ? "hover:bg-inherit cursor-default" : "hover:bg-[#F3F3F3] hover:shadow-product1 hover:border-[1px]" } disabled:border-[#F2F4F7] disabled:text-[#CED2DA] ${ (current && current == page) ? "border-[1px] bg-white shadow-product1 font-bold text-[#2C71F6]" : "" }`}
			disabled={disabled}
			onClick={clickPagination}
		>
			{ content }
		</Button>
	);
}