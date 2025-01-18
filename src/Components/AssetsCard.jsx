/* eslint-disable react/prop-types */
import './AssetsCard.css'

export default function AssetsCard({ source, editSource }) {


    return (
        <div className='assets-card-container'>
            {source.name}                         
            <button onClick={() => editSource(source.name)}>Edit </button>
            {<div>
                {source.sourceAssets.map(coin => (
                    <div key={coin.name} className="flex" style={{ gap: "10px", padding: "10px" }}>
                        <img src={coin.image} className="coin-img" />
                        <div> {coin.name} </div>
                        <div>{coin.amount}</div>
                    </div>))}
            </div>}

        </div>
    )
}