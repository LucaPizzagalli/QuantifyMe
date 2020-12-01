import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';


function SwitchIcon(props) {
  return (
    <SvgIcon {...props}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12.306 10.774"><path d="M2.798 2.04a.25.25 0 00-.25.248l-.024 3.53L0 5.822l1.788 2.476 1.787 2.477L5.36 8.296l1.784-2.48-2.498.003.023-3.53a.247.247 0 00-.247-.248z"/><path d="M8.738 0L6.951 2.477 5.163 4.953l2.473.002.023 3.519c0 .144.118.26.263.26h1.703c.144 0 .26-.117.26-.261L9.86 4.956l2.445.002-1.784-2.479z"/></svg>
    </SvgIcon>
  );
}

export { SwitchIcon }
