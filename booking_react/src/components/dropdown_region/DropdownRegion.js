import React, { useEffect, useState, useCallback, useRef } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import style from "./DropdownRegion.module.css";
import { Button } from 'react-bootstrap';
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';

export const DropdownRegion = (props) => {
const [regions, setRegions] = useState([])
const [region, setRegion] = useState('Куда вы хотите поехать?')
const closeBtn = React.createRef()
const target = useRef(null);

  const close = () => {
    selectRegion({id: 0, region: 'Куда вы хотите поехать?'});
  }

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Button
      className={style.dropBtn}
      variant='outline-success'
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        props.close()
        if (e.target === closeBtn.current){
          close()
        } else {
          onClick(e);
        }
      }}
    >
      {children}
      {/* &#x25bc; */}
    </Button>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');

      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => {
              setValue(e.target.value)
            }}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().includes(value),
            )}
          </ul>
        </div>
      );
    },
  );


  const selectRegion = (region) => {
    // console.log(JSON.stringify(region))
    setRegion(region.region)
    props.update(region?.id)
  }


  const getRegions = useCallback(async() => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/booking/regions');
      if(!response.ok) {
        throw new Error();
      }
      const data = await response.json();
      const regions = data.data.regions;
      setRegions(regions)  
    } catch (error) {
      console.log(error)
    }
  }, [])
  

  useEffect(() => {
    getRegions()
  }, [getRegions])

  return (
    <div className={style.dropdownRegion}>
        <Dropdown ref={target}>
          <Dropdown.Toggle variant='outline-success' as={CustomToggle} id="dropdown-custom-components">
            <div className={style.regionWrap}>{region}</div>
          </Dropdown.Toggle>
          <Dropdown.Menu as={CustomMenu}>
            {regions.map((item, i) => {
              return <Dropdown.Item eventKey={i} key={i} value={JSON.stringify(item)} onClick={() => selectRegion(item)}>
                {`${item?.region} (${item?.country?.country})`}
              </Dropdown.Item>
            })}
          </Dropdown.Menu>
        </Dropdown>
      <Overlay target={target.current} show={props.show} placement="bottom" style={{background: "orange"}}>
        {(props) => (
          <Tooltip className={style.tooltip} id="overlay-example" {...props}>
             Чтобы начать поиск, введите направление
          </Tooltip>
        )}
      </Overlay>
    </div>
  )
}