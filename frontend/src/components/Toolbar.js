import React, { useState } from 'react'

function Toolbar({style, setStyle}) {
    const [isChecked, setIsChecked] = useState({bold: false, italic: false})
    
    function handleSelect(e) {
        setStyle({...style, [e.target.name]: e.target.value})
    }

  return (
    <div>
        <label>Modify text size: </label>
        <select name='fontSize' onChange={handleSelect}>
            <option value='' selected>Original</option>
            <option value='x-large' >XL</option>
            <option value='xx-large' >XXL</option>
            <option value='large' >Large</option>
            <option value='medium' >Medium</option>
            <option value='small' >Small</option>
        </select>
        
        <label style={{marginLeft: '10px'}} >Modify text color: </label>
        <select name='color' onChange={handleSelect} >
            <option value='' selected>Original</option>
            <option value='blue' >blue</option>
            <option value='red' >red</option>
            <option value='orange' >orange</option>
            <option value='yellow' >yellow</option>
            <option value='green' >green</option>
        </select>
        <input 
        style={{marginLeft: '10px'}}
        type='checkbox'
        name='bold'
        checked={isChecked.bold}
        onChange={(e) => {
            setIsChecked({...isChecked, bold: !isChecked.bold})
            e.target.checked ? 
            setStyle({...style, fontWeight: e.target.name}) 
            : setStyle({...style, fontWeight: ''})
        }}
        ></input>
        <label >Bold</label>
        <input 
        style={{marginLeft: '10px'}} 
        type='checkbox'
        name='italic'
        checked={isChecked.italic}
        onChange={(e) => {
            setIsChecked({...isChecked, italic: !isChecked.italic})
            e.target.checked ? 
            setStyle({...style, fontStyle: e.target.name}) 
            : setStyle({...style, fontStyle: ''})
        }}
        ></input>
        <label >Italic</label>
        
    </div>
  )
}

export default Toolbar