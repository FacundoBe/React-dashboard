/* eslint-disable react/prop-types */
import { useContext, useState, useCallback } from 'react'
import { CoinsDataContext } from '../context/CoinsDataProvider'
import { PieChart, Pie, Sector, Cell } from "recharts";
import styles from './PortfolioPieChart.module.css'
import { COLORS } from '../Assets/constants'



export default function PortfolioPieChart({ portfolioCoinList }) {

    const { coinPrice } = useContext(CoinsDataContext)
    const [activeIndex, setActiveIndex] = useState(0);
    let totalValue = 0

    const coinData = portfolioCoinList.map(coin => {
        const totalCoin = coin.coinByWalletList.map(wallet => wallet.amount).reduce(
            (accumulator, currentValue) => accumulator + currentValue)
        return { name: coin.name, symbol: coin.symbol, amount: totalCoin, value: coinPrice(coin.symbol) * totalCoin }
    }).sort((a,b) => b.value - a.value) // Sorts the coin list array in descending order by value


    if (coinData.length > 0) {
        totalValue = coinData.map(coin => coin.value).reduce(
            (accum, currentVal) => accum + currentVal)
    }

    const data = coinData.map(coin => ({ name: coin.name, value: coin.value, symbol: coin.symbol }));

    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value
        } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const sx = cx + (outerRadius + 10) * cos;
        const sy = cy + (outerRadius + 10) * sin;
        const mx = cx + (outerRadius + 30) * cos;
        const my = cy + (outerRadius + 30) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? "start" : "end";

        return (
            <g >

                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    cornerRadius={percent < 0.018 ? 6 * percent / 0.018 : 6}
                    fill={fill}
                    style={{ outline: 'none' }}
                    tabIndex={-1}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                    style={{ outline: 'none' }}
                    tabIndex={-1}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -4.7) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    dy={-3}
                    fill={fill}
                    fontSize={"0.9rem"}
                    fontWeight={700}>
                    {payload.symbol.toUpperCase()}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    dy={15}
                    textAnchor={textAnchor}
                    fill="#c3c3c3"
                    style={{ outline: 'none' }}
                    tabIndex={-1}
                >
                    {`$${value.toFixed(2)}`}
                </text>
                <text
                    x={ex + (cos >= 0 ? 1 : 0.2) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    dy={32}
                    fill={"#8C8BA1"}
                    fontSize={"0.9rem"}
                    fontWeight={400}>
                    {`(Rate ${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );

    function Legend() {

        return (
            <div className={styles["legends-container"]} >
                {data.map((coin, index) =>
                    <div key={coin.name} className={styles['legend']} >
                        <div className={styles['legend-color']} style={{ backgroundColor: COLORS[index % COLORS.length] }} >
                        </div>
                        <div className={styles['coin-rate']}>
                            {totalValue && (coin.value / totalValue * 100).toFixed(2)}%
                        </div>
                        <div className={styles['coin-name']}>
                            {coin.name}
                            <span> {coin.symbol.toUpperCase()}</span>
                        </div>
                    </div>)}
            </div>
        )
    }

    return (
        <div className={styles['main-container']}>
            <PieChart width={600} height={450}>
                <Pie
                    activeIndex={activeIndex}
                    activeShape={renderActiveShape}
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={120}
                    outerRadius={132}
                    paddingAngle={0.5}
                    // cornerRadius={6}  //Corner radius is customized inside cell elemnt to provide samler angle for 1% or smaller elements
                    fill="#8884d8"
                    dataKey="value"
                    onMouseEnter={onPieEnter}
                >

                    {data.map((entry, index) => {// outline none prevents selection retangle from being visible when eleemnt is cliked
                        return <Cell key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                            stroke={'transparent'}
                            strokeWidth={0}
                            cornerRadius={coinData[index].value / totalValue < 0.018 ? 6 * coinData[index].value / totalValue / 0.018 : 6}
                            style={{ outline: 'none' }} />

                    })}
                </Pie>
            </PieChart>
            <Legend />
        </div>
    );


}




