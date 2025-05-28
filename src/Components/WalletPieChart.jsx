/* eslint-disable react/prop-types */
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './WalletPieChart.module.css'
import { COLORS } from '../Assets/constants'


//const COLORS = ["#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226", "#005f73", "#0a9396", "#94d2bd",];

export default function WalletPieChart({ data = [], totalValue, ...rest }) {

    function Legend() {

        return (
            <div className={styles["legends-container"]} >
                {data.map((coin, index) =>
                    <div key={coin.name} className={styles['legend']} >
                        <div className={styles['legend-color']} style={{ backgroundColor: COLORS[index % COLORS.length] }} >
                        </div>
                        {coin.name}
                    </div>)}
            </div>
        )
    }

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles["custom-tooltip"]}>
                    <p>
                        {`${payload[0].name}:`}
                        <span> {`${(payload[0].value / totalValue * 100).toFixed(1)}%`}</span>
                    </p>
                </div>
            );
        }

        return null;
    };


    return (
        <div {...rest}>
            <div className={styles['main-container']}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            cx={"50%"}
                            cy={"50%"}
                            innerRadius={30}
                            outerRadius={40}
                            fill="#1884d8"
                            paddingAngle={2}
                            cornerRadius={0}
                            dataKey="value"
                            fontSize={"0.8rem"}
                        >
                            {data.map((entry, index) => {
                                return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={'transparent'} style={{ outline: 'none' }} />
                            })}

                            {/*<LabelList dataKey="name" position="outside" fontSize={"0.7rem"} >*/}

                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
                {/* <Legend /> */}
            </div>
        </div>
    );
}