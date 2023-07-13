import logo from './logo.svg';
import './App.css';

import {AgGridReact} from 'ag-grid-react';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
// import SimpleComp from './SimpleCopm';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';



const SimpleComp = (p) => {
  const [cellValue, setCellValue] = useState(p.value);
  const isRed = cellValue > 0;

  const onDots = useCallback(() => {
    window.alert('Amount prepared: ' + cellValue);
    setCellValue(0);
  }, [cellValue]);

  const cellStyle = {
    color: isRed ? 'red' : 'black',
    fontSize: '16px'
  };

  useEffect(() => {
    setCellValue(p.value);
  }, [p.value]);

  return (
    <div>
      <span style={cellStyle}>{cellValue}</span>
      <button onClick={onDots} style={{ marginLeft: '20px' }}>...</button>
    </div>
  );
};


function App() {

  const [rowData, setRowData] = useState ([
    {Medications: 'Bandage', Ambulance1: 1, Ambulance2: 1, Ambulance3: 1, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Cannula', Ambulance1: 3, Ambulance2: 1, Ambulance3: 1, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Injection', Ambulance1: 5, Ambulance2: 0, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Intravenous vein catheter', Ambulance1: 5, Ambulance2: 1, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Infusion set', Ambulance1: 0, Ambulance2: 0, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: "Ringer's solution", Ambulance1: 0, Ambulance2: 0, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Oxygen mask', Ambulance1: 5, Ambulance2: 0, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Oxygen goggles', Ambulance1: 0, Ambulance2: 1, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Oxygen extension', Ambulance1: 0, Ambulance2: 1, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
    {Medications: 'Swab', Ambulance1: 5, Ambulance2: 1, Ambulance3: 0, Ambulance4: 0, Ambulance5:0, Ambulance6:0},
  ]);

  const [columnDefs, setColumnDefs] = useState ([
    {field:'Medications',sortable: true, filter:true},
    {field:'Ambulance1',cellRenderer: SimpleComp},
    {field:'Ambulance2',cellRenderer: SimpleComp},
    {field:'Ambulance3',cellRenderer: SimpleComp},
    {field:'Ambulance4',cellRenderer: SimpleComp},
    {field:'Ambulance5',cellRenderer: SimpleComp},
    {field:'Ambulance6',cellRenderer: SimpleComp}
  ]);

  const defaultColDef = useMemo( () => ( {
    sortable: true,
    filter: true,
    cellRenderer: SimpleComp
  }), []);


  useEffect(() => {
    fetch('/redm/hello/mydata.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData));

    const ambulance1 = new AmbulanceTimer('Ambulance1');
    const ambulance2 = new AmbulanceTimer('Ambulance2');
    const ambulance3 = new AmbulanceTimer('Ambulance3');

    ambulance1.startTimer();
    ambulance2.startTimer();
    ambulance3.startTimer();

    return () => {
      ambulance1.resetTimer();
      ambulance2.resetTimer();
      ambulance3.resetTimer();
    };
  }, []);
   
  class AmbulanceTimer {
    constructor(ambulanceName) {
      this.ambulanceName = ambulanceName;
      this.timer = null;
      this.startTime = null;
    }
  
    startTimer() {
      this.startTime = new Date();
      this.timer = setInterval(() => {
        const currentTime = new Date();
        const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
        const remainingTime = 5 * 60 - elapsedTime;
  
        if (remainingTime <= 0) {
          console.log(`Timer for ${this.ambulanceName} has reached the end.`);
          this.resetTimer();
        } else {
          console.log(
            `${this.ambulanceName} Timer: ${Math.floor(
              remainingTime / 60
            )} minutes ${remainingTime % 60} seconds remaining.`
          );
        }
      }, 1000);
    }
  
    resetTimer() {
      clearInterval(this.timer);
      this.startTimer();
    }
  }
  
  const ambulance1 = new AmbulanceTimer('Ambulance1');
  const ambulance2 = new AmbulanceTimer('Ambulance2');
  const ambulance3 = new AmbulanceTimer('Ambulance3');
  
  ambulance1.startTimer();
  ambulance2.startTimer();
  ambulance3.startTimer();
  

  return (
    <div>
      <div className='ag-theme-alpine' style={{ height: 470 }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs} />
      </div>

      <div>
        <br/>
        <h2>Timers:</h2>
        <div>
          <TimerComponent ambulanceName="Ambulance1" duration={5 * 60} />
        </div>
        <div>
          <TimerComponent ambulanceName="Ambulance2" duration={10 * 60} />
        </div>
        <div>
          <TimerComponent ambulanceName="Ambulance3" duration={20 * 60} />
        </div>
      </div>
    </div>
  );
}

class TimerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      remainingTime: props.duration,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.setState(prevState => ({
        remainingTime: prevState.remainingTime - 1,
      }), () => {
        if (this.state.remainingTime <= 0) {
          clearInterval(this.timer);
          console.log(`Timer for ${this.props.ambulanceName} has reached the end.`);
          this.setState({
            remainingTime: this.props.duration,
          }, () => {
            this.startTimer();
          });
        }
      });
    }, 1000);
  }

  render() {
    const { ambulanceName } = this.props;
    const { remainingTime } = this.state;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
      <div>
        <p>{ambulanceName} : {minutes} minutes {seconds} seconds remaining.</p>
      </div>
    );
  }
}

export default App;
