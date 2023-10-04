import React, { useState } from 'react'

function Toolbar({style, setStyle}) {
    const [isChecked, setIsChecked] = useState({bold: false, italic: false})
    
    function handleSelect(e) {
        setStyle({...style, [e.target.name]: e.target.value})
    }
console.log(style)
  return (
    <div className='toolbar'>
        <label >Font: </label>
        <select name='fontFamily' onChange={handleSelect}>
            <option value='' selected>Original</option>
            <option value='Impact' >Impact</option>
            <option value='Arial' >Arial</option>
            <option value='Courier New' >Courier New</option>
            <option value='Lucida Console' >Lucida Console</option>
            <option value='Franklin Gothic Medium' >Franklin Gothic Medium</option>
        </select>
        <label>Text size: </label>
        <select name='fontSize' onChange={handleSelect}>
            <option value='' selected>Original</option>
            <option value='x-large' >XL</option>
            <option value='xx-large' >XXL</option>
            <option value='large' >Large</option>
            <option value='medium' >Medium</option>
            <option value='small' >Small</option>
        </select>
        
        <label >Text color: </label>
        <select name='color' onChange={handleSelect} >
            <option value='' selected>Original</option>
            <option value='blue' >blue</option>
            <option value='red' >red</option>
            <option value='orange' >orange</option>
            <option value='green' >green</option>
            <option value='yellow' >yellow</option>
        </select>
        <label >Background color: </label>
        <select name='background' onChange={handleSelect} >
            <option value='' selected>Original</option>
            <option value='blue' >blue</option>
            <option value='red' >red</option>
            <option value='orange' >orange</option>
            <option value='green' >green</option>
            <option value='yellow' >yellow</option>
        </select>
        <input 
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
        <label style={{marginLeft: 0}}>Bold</label>
        <input 
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
        <label style={{marginLeft: 0}}>Italic</label>
        
    </div>
  )
}

export default Toolbar