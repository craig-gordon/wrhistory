import React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const StandardButton = (props) => {
  let styleObj = {fontSize: '18px'};
  if (props.iconSide === 'left') styleObj.marginLeft = '8px';
  else if (props.iconSide === 'right') styleObj.marginRight = '8px';

  return (
    <Button
      type='primary'
      size='large'
      onClick={props.onClickFn}
    >
      {props.iconSide === 'left' ? <i className={props.iconClasses} style={{fontSize: '18px'}}></i> : null}
      <span style={styleObj}>
        {props.title}{props.category ? ` – ${props.category}` : null}
      </span>
      {props.iconSide === 'right' ? <i className={props.iconClasses} style={{fontSize: '18px'}}></i> : null}
    </Button>
  );
};

export default StandardButton;