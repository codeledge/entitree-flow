import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";

// Custom edge component to better display relationship labels
export const PersonEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  label,
}: EdgeProps) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: 2,
          stroke: "#b1b1b7",
          ...style,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            fontWeight: 500,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 10,
            maxWidth: "200px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          className="nodrag nopan"
          title={typeof label === "string" ? label : undefined}
        >
          {label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};
