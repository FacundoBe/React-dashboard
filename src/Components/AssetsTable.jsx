/* eslint-disable react/prop-types */
import { ButtonIcon } from "./ButtonIcon"
import './AssetsTable.css'


export default function AssetsTable({ myCoinsData, editable=true, handleEditCoin = ()=>{}, handleDeleteCoin = ()=>{} }) {


    if (myCoinsData.length === 0) return //early return for empty assets array

    return (

        <div className="fund-list flex-column w100">
            <div className={`${"funds-header"} ${!editable ? "no-btn" : null}`}>
                <span className="flex">Coin</span>
                <span className="flex right ">Funds</span>
                <div className="grid-divider">  </div>
            </div>

            {myCoinsData.map(coin => (
                <div key={coin.name} className={`${"funds-row"} ${!editable ? "no-btn" : null}`}>
                    <div className="funds-coin-name ">
                        {coin.name}
                        <span > {coin?.symbol.toUpperCase()}</span>
                    </div>
                    <div className="flex right ">{coin.amount}</div>
                   {editable && 
                    <div className="flex right ">
                        <ButtonIcon type="edit" height="1.25em" onClick={() => handleEditCoin(coin.name, coin.amount)} />
                        <ButtonIcon type="clear" height="1.25em" onClick={() => handleDeleteCoin(coin.name)} />
                    </div>}
                    <div className="grid-divider">  </div>
                </div>))}
        </div>
     

    )
}