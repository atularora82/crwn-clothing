import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '../menu-item/menu-item.component';
import { createStructuredSelector } from 'reselect';
import { selectDirctorySections } from '../../redux/directory/directory.selector';

import './directory.styles.scss';

const Directory = ({sections}) => (
    <div className='directory-menu'>
    {
        sections.map(({id, ...props}) => (
            <MenuItem key={id} {...props}/>
        ))
    }
  </div>
)
  
const mapStateToProps = createStructuredSelector({
  sections: selectDirctorySections
})
export default connect(mapStateToProps)(Directory);
