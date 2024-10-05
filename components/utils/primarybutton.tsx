import { MouseEventHandler } from "react";
import { Button } from "../ui/button";

interface PrimaryButtonProps {
    content: string;
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string; // Add className prop
}

export default function PrimaryButton({
    content,
    disabled,
    onClick,
    className, // Destructure className prop
}: PrimaryButtonProps) {
    return (
        <Button
            className={`rounded-[8px] px-[24px] font-semibold text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-product1 text-[#FFFFFF] bg-[#2C71F6] hover:text-[#FFFFFF] hover:bg-[#2866DD] focus:shadow-none focus:border-[#99C2FF] focus:border-[2px] focus:bg-[#2C71F6] disabled:shadow-none disabled:text-[#FFFFFF] disabled:bg-[#CCE0FF] ${className}`} // Merge className prop
            disabled={disabled}
            onClick={onClick}
        >
            {content}
        </Button>
    );
}