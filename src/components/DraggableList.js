import { makeStyles } from '@material-ui/core/styles';
import React, { useRef } from 'react'
import { useDrag } from 'react-use-gesture'
import { useSprings, animated } from 'react-spring'

// Returns fitting styles for dragged/idle items
const fn = (order, down, originalIndex, oldIndex, y) => index =>
  // down && index === originalIndex
    // ? { y: oldIndex * 100 + y, scale: 1.3, zIndex: '1', shadow: 15, immediate: n => n === 'y' || n === 'zIndex' }
    // : { y: order.indexOf(index) * 100, scale: 1, zIndex: '0', shadow: 1, immediate: false }
    {
      if (down && index === originalIndex){
      console.log(index + ' ' + originalIndex + ' ' + down);
      return { y: oldIndex * 100 + y, transform: 'scale(1.1)', zIndex: '1', boxShadow: '0 0 1rem', immediate: n => n === 'y' || n === 'zIndex' }
      }
      return { y: order.indexOf(index) * 100, transform: 'scale(1)', zIndex: '0', boxShadow: '0 0 0rem', immediate: false }
    }

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(items.length, fn(order.current)) // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], down, movement: [, y] }) => {
    let oldIndex = order.current.indexOf(originalIndex);
    let newIndex = Math.min(Math.max(Math.round((oldIndex * 100 + y) / 100), 0), items.length - 1);
    
    const newOrder = order.current.slice();
    let temp = order.current[oldIndex];
    newOrder[oldIndex] = order.current[newIndex];
    newOrder[newIndex] = temp;
    
    setSprings(fn(newOrder, down, originalIndex, oldIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!down) order.current = newOrder
  })

  let classes = useStyles();
  return (
    <div>
    <div className={classes.content} style={{ height: items.length * 100 }}>
      giggino
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
          children={items[i]}
        />
      ))}
    </div>
    </div>
  )
}

let useStyles = makeStyles((theme) => ({
    content: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      },
    card:{
        position: 'absolute',
        width: '320px',
        height: '90px',
        // pointerEvents: 'auto',
        background: 'lightblue',
      }
  }));
  

export default DraggableList;
