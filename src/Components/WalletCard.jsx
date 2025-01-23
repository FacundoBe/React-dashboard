/* eslint-disable react/prop-types */
import AssetsTable from './AssetsTable'
import { ButtonIcon } from './ButtonIcon'
import './WalletCard.css'

export default function WalletCard({ source, editSource, }) {


    return (
        <div className='wallet-card-container'>
            <div className='wallet-card-name'>
                {source.name}
                <div className='flex'>
                    <ButtonIcon type={"edit"} onClick={() => editSource(source.name)} />
                    <ButtonIcon type={"clear"} />
                </div>
            </div>
            <div className='wallet-card-list'>
                <AssetsTable myCoinsData={source.sourceAssets} editable={false} />
            </div>

        </div>
    )
}