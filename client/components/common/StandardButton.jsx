import React from 'react';
import Button from 'antd/lib/button';
import 'antd/lib/button/style/index.css';

const StandardButton = (props) => {
  let styleObj = {};
  if (props.iconSide === 'left') styleObj.marginLeft = '8px';
  else if (props.iconSide === 'right') styleObj.marginRight = '8px';

  return (
    <Button
      type='primary'
      size='large'
    >
      {props.iconSide === 'left' ? <i className={props.iconClasses}></i> : null}
      <span style={styleObj}>
        {props.text}
      </span>
      {props.iconSide === 'right' ? <i className={props.iconClasses}></i> : null}
    </Button>
  );
};

export default StandardButton;