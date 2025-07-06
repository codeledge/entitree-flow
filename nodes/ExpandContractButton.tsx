import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/joy";

interface ExpandContractButtonProps {
  count: number;
  position: "top" | "bottom";
  onClick: () => void;
  isExpanded?: boolean;
  isLoading?: boolean;
}

export const ExpandContractButton = ({
  count,
  position,
  onClick,
  isExpanded = false,
  isLoading = false,
}: ExpandContractButtonProps) => {
  const getIcon = () => {
    if (isLoading) return null;
    if (position === "top") return <KeyboardArrowUpIcon />;
    return isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />;
  };

  const getPositionStyles = () => {
    const baseStyles = {
      position: "absolute" as const,
      left: "50%",
      transform: "translateX(-50%)",
      background: "rgba(0, 0, 0, 0.8)",
      fontSize: 10,
      padding: "2px 4px 2px 0",
      minHeight: 16,
    };

    if (position === "top") {
      return { ...baseStyles, top: -26 };
    }
    return { ...baseStyles, bottom: -26 };
  };

  return (
    <Button
      onClick={onClick}
      size="sm"
      sx={getPositionStyles()}
      variant="plain"
      color="neutral"
    >
      {isLoading ? (
        <>loading</>
      ) : (
        <>
          {getIcon()} {count}
        </>
      )}
    </Button>
  );
};
