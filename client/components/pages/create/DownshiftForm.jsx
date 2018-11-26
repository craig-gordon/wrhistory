import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import axios from 'axios';
import Input from 'antd/lib/input';
import 'antd/lib/input/style/index.css';

const Menu = styled.ul`
  padding: 0;
  margin-top: 0;
  position: absolute;
  background-color: white;
  max-height: 20rem;
  overflow-y: auto;
  overflow-x: hidden;
  outline: 0;
  transition: opacity .1s ease;
  border-radius: 0 0 .28571429rem .28571429rem;
  box-shadow: 0 2px 3px 0 rgba(34,36,38,.15);
  border-color: #96c8da;
  border-top-width: 0;
  border-right-width: 1;
  border-bottom-width: 1;
  border-left-width: 1;
  border-style: solid;
`;

const Item = styled.li`
  position: relative;
  cursor: pointer;
  display: block;
  border: none;
  height: auto;
  text-align: left;
  border-top: none;
  line-height: 1em;
  color: rgba(0,0,0,.87);
  font-size: 1rem;
  text-transform: none;
  font-weight: 400;
  box-shadow: none;
  padding: .8rem 1.1rem;
  white-space: normal;
  word-wrap: normal;
`;

const items = [
  {value: 'Mega Man 2'},
  {value: 'Donkey Kong'}
];

export default class DownshiftForm extends React.Component {
  render() {
    return (
      <Downshift
        onChange={selection => alert(`You selected ${selection.value}`)}
        itemToString={item => (item ? item.value : '')}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem,
        }) => (
          <div>
            <label {...getLabelProps()}>Game Title: </label>
            <div style={{'position': 'relative'}}>
              <Input {...getInputProps()} />
            </div>
            <div style={{'position': 'relative'}}>
              <Menu {...getMenuProps()}>
                {isOpen
                  ? items
                      .filter(item => !inputValue || item.value.includes(inputValue))
                      .map((item, index) => (
                        <Item
                          {...getItemProps({
                            key: item.value,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? 'lightgray' : null,
                              fontWeight: selectedItem === item ? 'bold' : 'normal',
                            },
                          })}
                        >
                          {item.value}
                        </Item>
                      ))
                  : null}
              </Menu>
            </div>
          </div>
        )}
      </Downshift>
    )
  }
};