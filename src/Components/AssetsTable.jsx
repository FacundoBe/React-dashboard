/* eslint-disable react/prop-types */
import { ButtonIcon } from "./ButtonIcon"
import './AssetsTable.css'
import {COLORS} from '../Assets/constants'

export default function AssetsTable({ myCoinsData, editable = true, handleEditCoin = () => { }, handleDeleteCoin = () => { } }) {


    if (myCoinsData.length === 0) return //early return for empty assets array

    return (

        <div className="fund-list flex-column w100">
            <div className={`${"funds-header"} ${!editable ? "no-btn" : null}`}>
                <span className="flex">Coin</span>
                <span className="flex right ">Funds</span>
                <div className="grid-divider">  </div>
            </div>

            {myCoinsData.map((coin,index) => (
                <div key={coin.name} className={`${"funds-row"} ${!editable ? "no-btn" : null}`}>
                    <div className="funds-coin-name ">
                        <div className={'legend-color'} style={{ backgroundColor: COLORS[index % COLORS.length] }} > </div>
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