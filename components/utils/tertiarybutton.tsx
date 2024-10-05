import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

export default function TertiaryButton(
	{ content, disabled, toltip, className, onClick }: { content: string | any, disabled?: boolean, toltip?: string | any, className?: string, onClick?: () => void }
) {
	return (
        <TooltipProvider>
            {toltip ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onClick}
                    className={`rounded-[8px] px-[24px] font-semibold text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-product1 text-[#344051] bg-[#FFFFFF] hover:bg-[#F3F3F3] focus:shadow-none focus:border-[#DCDCE4] focus:border-[2px] focus:bg-[#EAEAEF] disabled:shadow-none disabled:border-[#CED2DA] disabled:border-[1px] disabled:text-[#CED2DA] disabled:bg-inherit ${className}`}
                    disabled={disabled}
                  >
                    {content}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{toltip}</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <Button
                onClick={onClick}
                className={`rounded-[8px] px-[24px] font-semibold text-[13px] focus-visible:ring-0 focus-visible:ring-offset-0 shadow-product1 text-[#344051] bg-[#FFFFFF] hover:bg-[#F3F3F3] focus:shadow-none focus:border-[#DCDCE4] focus:border-[2px] focus:bg-[#EAEAEF] disabled:shadow-none disabled:border-[#CED2DA] disabled:border-[1px] disabled:text-[#CED2DA] disabled:bg-inherit ${className}`}
                disabled={disabled}
              >
                {content}
              </Button>
            )}
      </TooltipProvider>
	)
}
