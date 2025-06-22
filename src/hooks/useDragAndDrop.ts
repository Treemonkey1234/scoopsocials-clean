import { useRef, useCallback, useState } from 'react';

interface DragState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

interface UseDragAndDropOptions {
  onDragStart?: (state: DragState) => void;
  onDrag?: (state: DragState) => void;
  onDragEnd?: (state: DragState) => void;
  enabled?: boolean;
}

export function useDragAndDrop({
  onDragStart,
  onDrag,
  onDragEnd,
  enabled = true
}: UseDragAndDropOptions = {}) {
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0
  });

  const handleDragStart = useCallback(
    (event: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!enabled) return;

      const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).touches[0].clientX;
      const clientY = 'clientY' in event ? event.clientY : (event as TouchEvent).touches[0].clientY;

      dragStateRef.current = {
        isDragging: true,
        startX: clientX,
        startY: clientY,
        currentX: clientX,
        currentY: clientY
      };

      setIsDragging(true);
      onDragStart?.(dragStateRef.current);
    },
    [enabled, onDragStart]
  );

  const handleDrag = useCallback(
    (event: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!enabled || !dragStateRef.current.isDragging) return;

      const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).touches[0].clientX;
      const clientY = 'clientY' in event ? event.clientY : (event as TouchEvent).touches[0].clientY;

      dragStateRef.current = {
        ...dragStateRef.current,
        currentX: clientX,
        currentY: clientY
      };

      onDrag?.(dragStateRef.current);
    },
    [enabled, onDrag]
  );

  const handleDragEnd = useCallback(
    (event: React.DragEvent | MouseEvent | TouchEvent) => {
      if (!enabled || !dragStateRef.current.isDragging) return;

      const clientX = 'clientX' in event ? event.clientX : (event as TouchEvent).changedTouches[0].clientX;
      const clientY = 'clientY' in event ? event.clientY : (event as TouchEvent).changedTouches[0].clientY;

      dragStateRef.current = {
        ...dragStateRef.current,
        isDragging: false,
        currentX: clientX,
        currentY: clientY
      };

      setIsDragging(false);
      onDragEnd?.(dragStateRef.current);
    },
    [enabled, onDragEnd]
  );

  const dragHandlers = {
    onMouseDown: handleDragStart,
    onMouseMove: handleDrag,
    onMouseUp: handleDragEnd,
    onMouseLeave: handleDragEnd,
    onTouchStart: handleDragStart,
    onTouchMove: handleDrag,
    onTouchEnd: handleDragEnd
  };

  return {
    isDragging,
    dragState: dragStateRef.current,
    dragHandlers
  };
}

// Example usage:
// const { isDragging, dragState, dragHandlers } = useDragAndDrop({
//   onDragStart: (state) => {
//     console.log('Drag started:', state);
//   },
//   onDrag: (state) => {
//     const deltaX = state.currentX - state.startX;
//     const deltaY = state.currentY - state.startY;
//     element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
//   },
//   onDragEnd: (state) => {
//     console.log('Drag ended:', state);
//   }
// });
//
// return (
//   <div {...dragHandlers}>
//     Drag me!
//   </div>
// ); 