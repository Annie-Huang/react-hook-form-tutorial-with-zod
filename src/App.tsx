import './App.css';
import SimpleForm from './components/1-simple-form.tsx';
import ReactHookForm from './components/2-with-react-hook-form.tsx';
import ReactHookFormWithZod from './components/3-react-hook-form-with-zod.tsx';

function App() {
  return (
    <div>
      <h1>React Hook Form Tutorial</h1>
      {/*<SimpleForm/>*/}
      {/*<ReactHookForm />*/}
      <ReactHookFormWithZod />
    </div>
  );
}

export default App;
