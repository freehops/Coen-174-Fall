import React from 'react';

const Dropdown = props => {      
    
    const dropdownChanged = e => {
        props.changed(e.target.value);
    }  

    return (
        <div className="col-sm-6 form-group row px-0">     
            <label className="form-label col-sm-2">{props.label}</label>       
            <select value={props.selectedValue} onChange={dropdownChanged} className="form-control form-control-sm col-sm-10 rounded-md text-[1.5vw] p-[0.4vw] cursor-pointer">
                <option key={0}>Choose a Playlist...</option>
                {props.options.map((item, idx) => <option key={idx + 1} value={item.id}>{item.name}</option>)}
            </select>            
        </div>
    );
}

export default Dropdown;