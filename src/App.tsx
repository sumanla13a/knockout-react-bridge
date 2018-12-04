import React, { Component } from 'react';
import logo from './logo.svg';
import { KnockoutComponent } from './lib/knockout-component';
import { HelloWorldTemplate } from './lib/hello-world-knockout-template';

class App extends Component<{}, {ko: any}> {
  constructor(p: any, c: any) {
    super(p,c);
    this.state = {
      ko: new (window as any).ViewModel('React', 'World')
    };
  }

  render() {
    return (
      <header className="App-header react-header">
        <p>This is react rendered component.</p>
        <KnockoutComponent koModel={this.state.ko} koTemplate={HelloWorldTemplate}/>
      </header>
    );
  }
}

export default App;
