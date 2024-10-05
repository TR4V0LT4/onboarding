import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

export default function SecondaryButton(
	{ content, disabled, onClick }: { content: string | any, disabled?: boolean, onClick?:MouseEventHandler<HTMLButtonElement> }
) {
	return (
		<Button
			className="rounded-[8px] border-[1px] px-[24px] font-semibold text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-product1 border-[#2C71F6] text-[#2C71F6] bg-[#FFFFFF] hover:border-[#2866DD] hover:text-[#2866DD] hover:bg-[#F0F6FF] focus:shadow-none focus:border-[#99C2FF] focus:border-[2px] focus:bg-[#F0F6FF] disabled:shadow-none disabled:border-[#99C2FF] disabled:text-[#99C2FF] disabled:bg-inherit"
			disabled={disabled}
			onClick={onClick}
		>
				{ content }
		</Button>
	);
}
