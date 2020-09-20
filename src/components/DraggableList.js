import { makeStyles } from '@material-ui/core/styles';
import React, { useRef, useEffect, useCallback } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'


function DraggableList({ children, padding }) {
  let heights = useRef(children.map(_ => 0));
  let order = useRef(children.map((_, index) => index));
  let [springs, setSprings] = useSprings(children.length, updatePositions(false, order.current));


  let measuredRef = useCallback(
    children.map((_, index) => node => {
      if (node !== null)
        heights.current[index] = node.getBoundingClientRect().height;
    })
    , [children]);

  useEffect(() => {
    if (children.length > order.current.length)
      order.current.push(children.length - 1);
    // if (children.length < order.current.length) TODO
    measuredRef.current = children.map((_, index) => node => {
      if (node !== null)
        heights.current[index] = node.getBoundingClientRect().height;
    });
    setSprings(updatePositions(false, order.current));
    });



  let bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    let oldIndex = order.current.indexOf(originalIndex);
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

    setSprings(updatePositions(down, newOrder, originalIndex, order.current, y));
    if (!down)
      order.current = newOrder;
  }, { delay: 350 })

  function updatePositions(down, newOrder, originalIndex, oldOrder, y) {
    return index => {
      let yOffset = 0;
      if (down && index === originalIndex) {
        for (let i = 0; index !== oldOrder[i]; i++)
          yOffset += heights.current[oldOrder[i]] + padding;
        return { y: yOffset + y, transform: 'scale(1.1)', zIndex: '1', boxShadow: '0 0 0.2rem', immediate: n => n === 'y' || n === 'zIndex' }
      }

      for (let i = 0; index !== newOrder[i] && i < newOrder.length; i++)
        yOffset += heights.current[newOrder[i]] + padding;
      return { y: yOffset, transform: 'scale(1)', zIndex: '0', boxShadow: '0 0 0rem', immediate: false }
    };
  }

  let classes = useStyles();
  return (
    <div className={classes.content}>
      {springs.map(({ zIndex, boxShadow, y, transform }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
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
