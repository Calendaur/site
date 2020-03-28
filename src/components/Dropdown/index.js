import React from 'react'
import { useSelect } from 'downshift'

import styles from './styles.module.css'

function Dropdown({ items, defaultSelectedItem, label, onSelect }) {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items,
    defaultSelectedItem,
    itemToString: item => item.label,
    onSelectedItemChange: onSelect,
  })

  return (
    <div className={styles.Wrapper}>
      <button
        {...getToggleButtonProps({
          className: styles.Button,
        })}
      >
        {selectedItem.label || label}
        <img src="/icons/arrow.svg" alt="" />
      </button>
      <ul
        {...getMenuProps({
          className: styles.List,
        })}
      >
        {isOpen &&
          items.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: '#ddd' } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index, className: styles.ListItem })}
            >
              {item.label}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Dropdown
