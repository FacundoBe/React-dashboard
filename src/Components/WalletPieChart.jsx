import { PieChart, Pie,  Cell, ResponsiveContainer, LabelList } from 'recharts';

export default function WalletPieChart({data=[]}) {


      const COLORS = [ "#e9d8a6", "#ee9b00", "#ca6702", "#bb3e03", "#ae2012", "#9b2226","#005f73", "#0a9396", "#94d2bd",];

    return (

        <PieChart width={200} height={200} >
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

    );
}