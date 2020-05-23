import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';




const burgerBuilder = props => {
    //    constructor(props) {
    //        super(props);
    //        state{...}
    //    };

    const [ purchasing , setPurchasing ] = useState(false);

    const dispatch  = useDispatch();
       
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredients = useCallback( () => dispatch(actions.initIngredients()), []);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));

    const ings = useSelector( state => state.burgerBuilder.ingredients );
    const price = useState (state => state.burgerBuilder.totalPrice);
    const error = useState (state => state.burgerBuilder.error);
    const isAuthenticated = useState (state => state.auth.token !== null);
    

    useEffect( () => {
        onInitIngredients();
    }, [onInitIngredients])

    const updatePurchaseState = (ingredients) => {
        
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0); 
        return sum > 0;    
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }    
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    };

    const purchaseContinueHandler = () => {
        onInitPurchase();
        props.history.push('/checkout');
        };

        const disableInfo = {
            ...ings
        };
        for (let key in disableInfo) {
            disableInfo[key] = disableInfo[key] <= 0
        }
        
        let orderSummary = null;
        let burger = error ? <p>Ingredients can't be loaded!!!</p> : <Spinner />;

        if (ings) {
            burger = (
                <Aux>
                <Burger ingredients={ings} />
                    <BuildControls
                        ingredientAdded={onIngredientAdded}
                        ingredientRemoved={onIngredientRemoved}    
                        disabled={disableInfo}
                        purchasable={updatePurchaseState(props.ings)}
                        ordered={purchaseHandler}
                        isAuth={isAuthenticated}
                        price={price}    
                        />
                </Aux>        
            );
            orderSummary = <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCancelled={purchaseCancelHandler}
                purchaseContinued={purchaseContinueHandler}/>;
        }

       // we will get something like {salad: true, meat: false, ...}
        return(
            <Aux>
                <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

export default withErrorHandler(burgerBuilder, axios); 