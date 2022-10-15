import { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const teamColors = {
    alfa: '#B12039',
    alphatauri: '#4E7C9B',
    alpine: '#2293D1',
    aston_martin: '#2D826D',
    ferrari: '#ED1C24',
    haas: '#B6BABD',
    mclaren: '#F58020',
    mercedes: '#6CD3BF',
    red_bull: '#1E5BC6',
    williams: '#37BEDD'
}

export default class TeamStandings extends Component {
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
                    text: 'Constructor Points',
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
        await axios.get(`http://ergast.com/api/f1/current/constructorStandings.json`)
        .then(async (res) => {
            let teamsData = {
                labels: [],
                datasets: [{
                    label: 'Points',
                    backgroundColor: [],
                    data: [],
                    hoverBackgroundColor: 'DarkGrey',
                }]
            }
            const d = res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
            d.forEach(team => {
                teamsData.labels.push(team.Constructor.name);
                teamsData.datasets[0].backgroundColor.push(teamColors[team.Constructor.constructorId]);
                teamsData.datasets[0].data.push(team.points);
                // console.log(team.Constructor.constructorId)
            });
            this.setState({data: teamsData})
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