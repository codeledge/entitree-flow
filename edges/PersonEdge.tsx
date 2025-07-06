import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
} from "@xyflow/react";

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
  target,
}: EdgeProps) => {
  const [edgePath, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    offset: 0,
    borderRadius: 16,
  });

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={{
          strokeWidth: 6,
          stroke: "grey",
          ...style,
        }}
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${targetX}px,${labelY}px)`,
            fontSize: 12,
            fontWeight: 500,
            background: "rgba(0, 0, 0, 0.8)",
            color: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            pointerEvents: "none",
            zIndex: 10,
            maxWidth: "200px", // Using fixed width since we can't get dynamic width from target
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
