import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? { y: curIndex * 100 + y, scale: 1.1, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = Math.min(Math.max(Math.round((curIndex * 100 + y) / 100), 0), items.length - 1)
    const newOrder = [order.current[curIndex], order.current[curRow]] = [order.current[curRow], order.current[curIndex]];
    setSprings(fn(newOrder, down, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })

  let classes = useStyles();
  return (
    <div>
    <div className={classes.content} style={{ height: items.length * 100 }}>
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          className={classes.card}
          style={{
            zIndex,
            // boxShadow: shadow.to(s => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`),
            y,
            scale
          }}
          children={items[i]}
        />
      ))}
    </div>
    </div>
  )
}


let useStyles = makeStyles((theme) => ({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    card:{
        position: 'absolute',
        width: '320px',
        height: '90px',
        pointerEvents: 'auto',
        background: 'lightblue',
      }
  }));
  

export default DraggableList;
