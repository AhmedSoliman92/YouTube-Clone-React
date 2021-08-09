import React from 'react';
import {Grid} from '@material-ui/core';
import {SearchBar, VideoDetail,VideoList} from './components';
import youtube from './api/youtube';
class App extends React.Component{
    state={
        video:[],
        selectedVideo:null
    }
    onVideoSelect = (video)=> {
        this.setState({selectedVideo:video})
    }
    handleSubmit= async (searchTerm)=>{
        const response= await youtube.get('search',{params:{
            part:'snippet',
            maxResults:5,
            key:'AIzaSyC34mDgcGGK_b3ISMyBNrA-LH1gL_upji8',
            q:searchTerm,
        }})
        this.setState({
            video: response.data.items,
            selectedVideo: response.data.items[0]
        })
    }
    render(){
        const {selectedVideo,video}= this.state;
        return(
            <Grid justifyContent ="center" container spacing={10}>
                <Grid item xs={12}>
                    <Grid container spacing={10}>
                        <Grid item xs={12}>
                            <SearchBar onFormSubmit={this.handleSubmit} />
                        </Grid>
                        <Grid item xs={8}>
                            <VideoDetail video={selectedVideo} />
                        </Grid>
                        <Grid item xs={4}>
                            <VideoList videos={video} onVideoSelect={this.onVideoSelect}/>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default App