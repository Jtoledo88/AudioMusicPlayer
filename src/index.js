import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Player extends React.Component {
   
    constructor(){
        super();
        this.state = {
            songs:[],
            currentIndex: 0
        };
        this.player = null
    }
        
   componentDidMount(){
        this.pauseButton.style.display = 'none';
        fetch('https://assets.breatheco.de/apis/sound/songs')
          .then(resp => resp.json())
          .then(songs => this.setState({ songs }));
    }
        
    play(index){
        const url = this.state.songs[index].url;
        if(url) this.player.src = "https://assets.breatheco.de/apis/sound/"+url;
        this.player.play();
        this.playButton.style.display = 'none';
        this.pauseButton.style.display = 'inline-block';
        this.setState({ currentIndex: index });
    }
        
        
    pause(){
        this.player.pause();
        this.pauseButton.style.display = 'none';
        this.playButton.style.display = 'inline-block';
    }
    render(){
            
        const songs = this.state.songs.map((song, i)=> {
        return  <div key={i} className={`track ${this.state.currentIndex == i ? 'active':''}`} onClick={() => {
            this.play(i);
        }}>
                <div className="track__number">{i+1}</div>
                <div className="track__title featured">
                    <span className="title">{song.name}</span>
                </div>
          </div>;
            });
            
        return (
            <div className="player">
                <section className="content">
                    <div className="tracks">
                          {songs}
                    </div>
                </section>
                <section className="current-track">
                    <div className="current-track__actions">
                        <a href="#" className="skipbackward" onClick={() => this.play(this.state.currentIndex-1)}><i className="fas fa-caret-square-left"></i></a>
                        <a  href="#" ref={(elm) => this.playButton = elm} onClick={() => this.play()}><i className="fas fa-play"></i></a>
                        <a  href="#" ref={(elm) => this.pauseButton = elm} onClick={() => this.pause()}><i className="fas fa-pause-circle"></i></a>
                        <a  href="#" className="skipforward" onClick={() => this.play(this.state.currentIndex+1)}><i className="fas fa-caret-square-right"></i></a>
                    </div>
                </section>
               <audio ref={(t) => this.player = t} controls/>
            </div>
                
                )   
        }
    }





ReactDOM.render(<Player />, document.getElementById('root'));


