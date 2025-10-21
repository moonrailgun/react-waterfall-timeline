import './App.css';
import { Waterfall } from './components/Waterfall';
import type { WaterfallItem } from './components/Waterfall';

// Sample data to demonstrate the waterfall component
const sampleData: WaterfallItem[] = [
  {
    id: '1',
    name: 'index.html',
    startTime: 0,
    endTime: 120,
    color: '#4a90e2',
  },
  {
    id: '2',
    name: 'main.js',
    startTime: 50,
    endTime: 380,
    color: '#7b68ee',
  },
  {
    id: '3',
    name: 'vendor.js',
    startTime: 55,
    endTime: 520,
    color: '#7b68ee',
  },
  {
    id: '4',
    name: 'styles.css',
    startTime: 60,
    endTime: 180,
    color: '#50c878',
  },
  {
    id: '5',
    name: 'logo.png',
    startTime: 200,
    endTime: 450,
    color: '#ff6b6b',
  },
  {
    id: '6',
    name: 'api/auth',
    startTime: 350,
    endTime: 720,
    color: '#feca57',
  },
  {
    id: '7',
    name: 'api/user/profile',
    startTime: 730,
    endTime: 950,
    color: '#feca57',
  },
  {
    id: '8',
    name: 'api/dashboard',
    startTime: 960,
    endTime: 1200,
    color: '#feca57',
  },
];

function App() {
  const handleItemClick = (item: WaterfallItem) => {
    console.log('Clicked item:', item);
    alert(`Clicked: ${item.name}`);
  };

  const handleItemHover = (item: WaterfallItem | null) => {
    if (item) {
      console.log('Hovering item:', item.name);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Waterfall Timeline</h1>
        <p>A timeline component similar to Chrome DevTools Network panel</p>
      </header>
      <main className="app-main">
        <Waterfall
          items={sampleData}
          labelWidth={200}
          rowHeight={32}
          rulerHeight={40}
          onItemClick={handleItemClick}
          onItemHover={handleItemHover}
        />
      </main>
      <footer className="app-footer">
        <p>
          Hover over the timeline bars to see details, click to interact. Open
          Storybook for more examples.
        </p>
      </footer>
    </div>
  );
}

export default App;
