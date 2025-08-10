import React from 'react';
import { CSSProperties } from 'react';
import { DndContext, DragEndEvent, DragOverlay, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { createPortal } from 'react-dom';

export interface PlatformSortableProps<TItem extends { id: string }> {
  items: TItem[];
  itemHeight: number;
  renderItem: (item: TItem) => React.ReactNode;
  onMove: (from: number, to: number) => void;
}

export default function PlatformSortable<TItem extends { id: string }>(
  { items, itemHeight, renderItem, onMove }: PlatformSortableProps<TItem>
) {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const ids = React.useMemo(() => items.map(i => i.id), [items]);
  const activeItem = React.useMemo(() => items.find(i => i.id === activeId) || null, [items, activeId]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const from = ids.indexOf(String(active.id));
    const to = ids.indexOf(String(over.id));
    if (from !== -1 && to !== -1 && from !== to) onMove(from, to);
  };

  const Row: React.FC<{ id: string; item: TItem }> = ({ id, item }) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
    const style: CSSProperties = {
      transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
      transition,
      touchAction: 'none',
      height: itemHeight,
      position: 'relative',
      opacity: isDragging ? 0 : 1,
    };
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderItem(item)}
      </div>
    );
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e: any) => setActiveId(String(e.active.id))}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        <div style={styles.list}>
          {items.map((item) => (
            <Row key={item.id} id={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
      {createPortal(
        <DragOverlay dropAnimation={null}>
          {activeItem ? (
            <div style={styles.overlay}>{renderItem(activeItem)}</div>
          ) : null}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
  } as CSSProperties,
  overlay: {
    boxShadow: '0 6px 24px rgba(0,0,0,0.15)',
    background: 'rgba(0,122,255,0.06)',
  } as CSSProperties,
};


