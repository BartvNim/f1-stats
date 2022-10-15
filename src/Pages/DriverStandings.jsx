import { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { teamColors } from "../assets/teamColors";

export default class DriverStandings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: {},
            data: {
                labels: [],
                datasets: []
            }
        }
        this.getApiDataTeams = this.getApiDataTeams.bind(this);
    }

    componentDidMount(){
        const opt = {
            indexAxis: 'y',
            scales: {
                y: {
                    ticks: { color: 'DarkGrey'}
                }
            },
            plugins: {
                legend: false,
                title: {
                    display: true,
                    text: 'Driver Points',
                    color: "DarkGrey",
                    font: { size: "20" }
                },
                datalabels: {
                    display: true,
                    color: "DarkGrey",
                    align: "end",
                    anchor: "end",
                    font: { size: "14" }
                }
            }
        }
        this.setState({ options: opt });

        this.getApiDataTeams();
    }

    async getApiDataTeams() {
        await axios.get(`http://ergast.com/api/f1/current/driverStandings.json`)
        .then(async (res) => {
            let driverData = {
                labels: [],
                datasets: [{
                    label: 'Points',
                    backgroundColor: [],
                    data: [],
                }]
            }
            console.log(res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
            
            const d = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            d.forEach(driver => {
                driverData.labels.push(`${driver.Driver.givenName} ${driver.Driver.familyName}`);
                driverData.datasets[0].backgroundColor.push(teamColors[driver.Constructors[0].constructorId]);
                driverData.datasets[0].data.push(driver.points);
            })
            this.setState({data: driverData});
        })
    }

    render() {
        return (
            <div>
                <Bar data={this.state.data} plugins={[ChartDataLabels]} options={this.state.options} height='650' width='500'/>
            </div>
        )
    }
}