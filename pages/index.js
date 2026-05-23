import { useEffect, useState } from "react";

export default function Home() {

    const [results, setResults] = useState([]);
    const [stats, setStats] = useState({});
    const [prediction, setPrediction] = useState([]);

    useEffect(() => {

        loadData();

    }, []);

    async function loadData(){

        const res = await fetch("/api/results");

        const data = await res.json();

        setResults(data);

        calculateStats(data);

    }

    function calculateStats(data){

        let digits = {};

        for(let i=0;i<=9;i++){
            digits[i] = 0;
        }

        data.forEach(item=>{

            item.result.split("").forEach(num=>{

                digits[num]++;

            });

        });

        setStats(digits);

        let sorted = Object.entries(digits)
            .sort((a,b)=>b[1]-a[1]);

        setPrediction(sorted.slice(0,5));

    }

    return (

        <div style={{
            background:"#111",
            minHeight:"100vh",
            color:"#fff",
            padding:"30px",
            fontFamily:"Arial"
        }}>

            <h1>TOTO AI ANALYTICS</h1>

            <h2>Result Mingguan</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Pool</th>
                        <th>Date</th>
                        <th>Result</th>
                    </tr>
                </thead>

                <tbody>

                    {results.map((r,i)=>(

                        <tr key={i}>
                            <td>{r.pool}</td>
                            <td>{r.date}</td>
                            <td>{r.result}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

            <h2>Statistik Digit</h2>

            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>Digit</th>
                        <th>Frekuensi</th>
                    </tr>
                </thead>

                <tbody>

                    {Object.keys(stats).map((k)=>(

                        <tr key={k}>
                            <td>{k}</td>
                            <td>{stats[k]}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

            <h2>Prediksi BBFS</h2>

            <h1>

                {prediction.map(x=>x[0]).join("")}

            </h1>

        </div>

    );

                  }
