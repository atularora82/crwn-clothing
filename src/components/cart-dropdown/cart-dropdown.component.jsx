import React from 'react';
import {connect} from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';

import './cart-dropdown.styles.scss';

import CartItem from '../cart-item/cart-item.component';
import {createStructuredSelector} from 'reselect';
import {selectCartItems} from '../../redux/cart/cart.selectors';

const CartDropdown =({cartItems}) => (
    <div className='cart-dropdown'>
        <div className='cart-items'>

            {
                cartItems.map(
                    item =>
                      <CartItem key={item.id} item={item}/>
                    )
            }
        </div>
        <CustomButton>Go To Checkout</CustomButton>

    </div>
);

const mapStateToProps = createStructuredSelector ({
    cartItems: selectCartItems
})

export default connect(mapStateToProps)(CartDropdown);
