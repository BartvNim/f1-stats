import './App.css' 
import DriverStandings from './Pages/DriverStandings'
import TeamStandings from './Pages/TeamStandings'
import { registerChart } from './helper/chartLoader'

function App() {
  registerChart();

  return (
    <div className="App">
      <div className='pb-10'>
        <h1>Points</h1>
      </div>
      <div className='flex items-stretch gap-x-24'>
        <div>
          <DriverStandings/>
        </div>
        <div>

        </div>
        <div>
          <TeamStandings/>
        </div>
      </div>
    </div>
  )
}

export default App
