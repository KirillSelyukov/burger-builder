import React from 'react';
import { BurgerIngredient } from './BurgerIngredient/BurgerIngredient';
import './Burger.css';

export const Burger = () => {
    return (
        <div className='Burger'>
            <BurgerIngredient type='bread-top' />
            <BurgerIngredient type='cheese' />
            <BurgerIngredient type='meat' />
            <BurgerIngredient type='bread-bottom' />
        </div>
    );
}