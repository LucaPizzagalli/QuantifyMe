import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useEffect, useCallback } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'


function DraggableList({ children, ids, statics, padding }) {
  let heights = useRef(Object.fromEntries(ids.map(id => [id, 0])));
  let order = useRef(ids);
  let [springs, setSprings] = useSprings(children.length, updatePositions(false, order.current));

  let measuredRef = useCallback(
    ids.map(id => node => {
      if (node !== null)
        heights.current[id] = node.getBoundingClientRect().height;
    })
    , [children]);

  useEffect(() => {
    if (ids.length > order.current.length)
      order.current.push(ids[ids.length - 1]);
    // if (children.length < order.current.length) TODO
    measuredRef.current = ids.map(id => node => {
      if (node !== null)
        heights.current[id] = node.getBoundingClientRect().height;
    });
    setSprings(updatePositions(false, order.current));
  });

  let bind = useDrag(({ args: [originalId], down, movement: [, y] }) => {
    if (!statics.includes(originalId)) {
      let oldIndex = order.current.indexOf(originalId);
      let yOffset = 0;
      let newIndex = oldIndex;
      for (let i = oldIndex; Math.abs(y) > yOffset; i += y / Math.abs(y)) {
        yOffset += heights.current[order.current[i]] + padding;
        newIndex = i;
      }
      newIndex = Math.min(Math.max(newIndex, 0), children.length - 1);

      let newOrder = order.current.slice();
      let temp = order.current[oldIndex];
      let direction = (newIndex - oldIndex) / Math.abs(newIndex - oldIndex)
      for (let index = oldIndex; index !== newIndex; index += direction)
        newOrder[index] = newOrder[index + direction];
      newOrder[newIndex] = temp;

      setSprings(updatePositions(down, newOrder, originalId, order.current, y));
      if (!down)
        order.current = newOrder;
    }
  }, { delay: 350 })

  function updatePositions(down, newOrder, originalId, oldOrder, y) {
    return index => {
      let id = ids[index];
      let yOffset = 0;
      if (down && id === originalId) {
        for (let i = 0; id !== oldOrder[i]; i++)
          yOffset += heights.current[oldOrder[i]] + padding;
        return { y: yOffset + y, transform: 'scale(1.1)', zIndex: '1', boxShadow: '0 0 0.2rem', immediate: n => n === 'y' || n === 'zIndex' }
      }

      for (let i = 0; id !== newOrder[i] && i < newOrder.length; i++)
        yOffset += heights.current[newOrder[i]] + padding;
      return { y: yOffset, transform: 'scale(1)', zIndex: '0', boxShadow: '0 0 0rem', immediate: false }
    };
  }

  let classes = useStyles();
  return (
    <div className={classes.content}>
      {springs.map(({ zIndex, boxShadow, y, transform }, i) => (
        <animated.div
          {...bind(ids[i])}
          key={ids[i]}
          className={classes.card}
          style={{
            zIndex,
            boxShadow,
            top: y,
            transform,
          }}
          children={<div ref={measuredRef[i]} className={classes.child}>{children[i]}</div>}
        />
      ))}
    </div>
  );
}

let useStyles = makeStyles((theme) => ({
  content: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
  },
  card: {
    display: 'flex',
    position: 'absolute',
    // pointerEvents: 'auto',
    width: '100%'
  },
  child: {
    display: 'flex',
    flexGrow: 1,
  }
}));


export default DraggableList;
