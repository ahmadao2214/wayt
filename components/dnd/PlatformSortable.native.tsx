import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Sortable, SortableItem, SortableRenderItemProps } from 'react-native-reanimated-dnd';

export interface PlatformSortableProps<TItem extends { id: string }> {
  items: TItem[];
  itemHeight: number;
  renderItem: (item: TItem) => React.ReactNode;
  onMove: (from: number, to: number) => void;
}

export function PlatformSortable<TItem extends { id: string }>(
  { items, itemHeight, renderItem, onMove }: PlatformSortableProps<TItem>
) {
  const [dragFromIndex, setDragFromIndex] = React.useState<number | null>(null);
  const [dragToIndex, setDragToIndex] = React.useState<number | null>(null);

  const renderRow = React.useCallback((props: SortableRenderItemProps<TItem>) => {
    const { item, id, positions, lowerBound, autoScrollDirection, itemsCount, itemHeight: libItemHeight } = props;
    return (
      <SortableItem
        key={id}
        id={id}
        data={item}
        positions={positions}
        lowerBound={lowerBound}
        autoScrollDirection={autoScrollDirection}
        itemsCount={itemsCount}
        itemHeight={libItemHeight}
        onMove={(_id, from, to) => {
          setDragFromIndex(from);
          setDragToIndex(to);
        }}
        onDrop={() => {
          // Commit the final move once the drag ends to avoid janky re-renders mid-gesture
          if (dragFromIndex !== null && dragToIndex !== null && dragFromIndex !== dragToIndex) {
            onMove(dragFromIndex, dragToIndex);
          }
          setDragFromIndex(null);
          setDragToIndex(null);
        }}
        style={{ height: itemHeight }}
      >
        <View style={styles.rowContainer}>
          {renderItem(item)}
        </View>
      </SortableItem>
    );
  }, [onMove, renderItem, itemHeight, dragFromIndex, dragToIndex]);

  return (
    <Sortable
      data={items}
      renderItem={renderRow}
      itemHeight={itemHeight}
      itemKeyExtractor={(t: TItem) => t.id}
      style={styles.list}
      contentContainerStyle={{ paddingBottom: 8 }}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  rowContainer: {
    position: 'relative',
  },
  insertionIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: -1,
    height: 2,
    backgroundColor: '#007AFF',
    zIndex: 1,
  },
});

export default PlatformSortable;


