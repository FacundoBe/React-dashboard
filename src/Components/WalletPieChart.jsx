import { PieChart, Pie, Cell, ResponsiveContainer, LabelList } from 'recharts';

export default function WalletPieChart({ data = [], ...rest }) {


    const COLORS = ["#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226", "#005f73", "#0a9396", "#94d2bd",];


    return (
        <div {...rest}> 
            <PieChart width={100} height={100} >
                <Pie
                    data={data}
                    cx={"50%"}
                    cy={"50%"}
                    innerRadius={35}
                    outerRadius={40}
                    fill="#1884d8"
                    paddingAngle={8}
                    cornerRadius={2}
                    dataKey="value"
                    fontSize={"0.8rem"}
                >
                    { /* <LabelList dataKey="name" position="outside" fontSize={"0.7rem"} /> */}

                    {data.map((entry, index) => {
                        return <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={'transparent'} />
                    })}

                </Pie>
            </PieChart>
            <div className='flex-col' style={{padding:"0.2em 0 0 1.7em"}}>
                {data.map((coin, index) =>
                    <div key={coin.name} className='flex align-center' style={{fontSize:"0.7rem", padding:"0.15em 0"}}>
                        <div className='legend-color' style={{  width: "0.7rem", height: "0.7rem", borderRadius: "4px", backgroundColor: COLORS[index % COLORS.length], marginRight:"0.2em" }} >
                        </div>
                        {coin.name}
                    </div>)}
            </div>
        </div>
    );
}