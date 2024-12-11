import React, { useRef, useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TextTooltipProps {
  tooltipContent?: string;
  className?: string;
  children: React.ReactNode;
}

const TextTooltip: React.FC<TextTooltipProps> = ({
  tooltipContent,
  className,
  children,
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      setIsTruncated(element.scrollWidth > element.offsetWidth);
    }
  }, [children]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div ref={textRef} className={`truncate ${className}`}>
          {children}
        </div>
      </TooltipTrigger>
      {isTruncated && (
        <TooltipContent sideOffset={15} className="text-loco-blue font-medium">
          {tooltipContent || children}
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default TextTooltip;
